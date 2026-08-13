import zlib
import struct
import math
import sys

def read_png(filename):
    with open(filename, 'rb') as f: data = f.read()
    pos = 8
    width = height = color_type = bpp = 0
    idat_data = b''
    while pos < len(data):
        length, = struct.unpack('>I', data[pos:pos+4])
        chunk_type = data[pos+4:pos+8].decode('ascii')
        chunk_data = data[pos+8:pos+8+length]
        pos += 12 + length
        if chunk_type == 'IHDR': width, height, _, color_type = struct.unpack('>IIBB', chunk_data[:10])
        elif chunk_type == 'IDAT': idat_data += chunk_data
    decompressed = zlib.decompress(idat_data)
    bpp = 3 if color_type == 2 else 4
    pixels = [[(0,0,0,0) for _ in range(width)] for _ in range(height)]
    stride = width * bpp
    idx = 0
    def paeth(a, b, c):
        p = a + b - c
        pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
        if pa <= pb and pa <= pc: return a
        elif pb <= pc: return b
        return c
    prev_row = bytearray(stride)
    for y in range(height):
        filter_type = decompressed[idx]
        idx += 1
        row_data = decompressed[idx:idx+stride]
        idx += stride
        recon_row = bytearray(stride)
        for x in range(stride):
            left = recon_row[x - bpp] if x >= bpp else 0
            up = prev_row[x]
            up_left = prev_row[x - bpp] if x >= bpp else 0
            c = row_data[x]
            if filter_type == 0: recon_row[x] = c
            elif filter_type == 1: recon_row[x] = (c + left) & 0xff
            elif filter_type == 2: recon_row[x] = (c + up) & 0xff
            elif filter_type == 3: recon_row[x] = (c + (left + up) // 2) & 0xff
            elif filter_type == 4: recon_row[x] = (c + paeth(left, up, up_left)) & 0xff
        prev_row = recon_row
        for i in range(width):
            px_idx = i * bpp
            pixels[y][i] = (recon_row[px_idx], recon_row[px_idx+1], recon_row[px_idx+2], recon_row[px_idx+3] if bpp==4 else 255)
    return width, height, pixels

w, h, p = read_png('/Users/samarthnagaraj/.gemini/antigravity/brain/03fcd043-7e3a-4085-831a-9e7cb987fed3/.user_uploaded/media__1786116715510.png')

grid = [[0 for _ in range(w)] for _ in range(h)]
points = []
for y in range(h):
    for x in range(w):
        r,g,b,a = p[y][x]
        if a < 128 or (r>240 and g>240 and b>240): grid[y][x] = 0
        elif r > 210 and g < 60: 
            grid[y][x] = 1 # Bright
            points.append((x,y))
        elif r > 160: 
            grid[y][x] = 2 # Medium
            points.append((x,y))
        elif r > 100: 
            grid[y][x] = 3 # Dark
            points.append((x,y))

min_x = min(x for x,y in points)
max_x = max(x for x,y in points)
min_y = min(y for x,y in points)
max_y = max(y for x,y in points)
w_box = max_x - min_x
h_box = max_y - min_y

def scale(x, y):
    return (x - min_x) / w_box * 90 + 5, (y - min_y) / h_box * 90 + 5

# Function to trace the boundary of a region of a specific color
def find_corners(color_code):
    color_pts = [(x,y) for x,y in points if grid[y][x] == color_code]
    if not color_pts: return []
    # Find extreme points for this color
    top = min(color_pts, key=lambda pt: pt[1])
    bottom = max(color_pts, key=lambda pt: pt[1])
    left = min(color_pts, key=lambda pt: pt[0])
    right = max(color_pts, key=lambda pt: pt[0])
    
    # Simple heuristic to find vertices: find points furthest from the center
    cx = sum(x for x,y in color_pts) / len(color_pts)
    cy = sum(y for x,y in color_pts) / len(color_pts)
    
    # We know the shapes are convex polygons (triangles/rhombus)
    # Let's just output the convex hull
    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    hull = []
    color_pts.sort()
    for pt in color_pts:
        while len(hull) >= 2 and cross(hull[-2], hull[-1], pt) <= 0:
            hull.pop()
        hull.append(pt)
    upper = hull[:]
    hull = []
    for pt in reversed(color_pts):
        while len(hull) >= 2 and cross(hull[-2], hull[-1], pt) <= 0:
            hull.pop()
        hull.append(pt)
    hull = upper[:-1] + hull[:-1]
    
    # Simplify hull to < 6 vertices
    while len(hull) > 6:
        # Remove point with smallest triangle area
        min_area = float('inf')
        min_idx = -1
        for i in range(len(hull)):
            prev = hull[i-1]
            curr = hull[i]
            nxt = hull[(i+1)%len(hull)]
            area = abs(cross(prev, curr, nxt))
            if area < min_area:
                min_area = area
                min_idx = i
        hull.pop(min_idx)
        
    return [scale(x,y) for x,y in hull]

bright_corners = find_corners(1)
medium_corners = find_corners(2)
dark_corners = find_corners(3)

print("Bright:", bright_corners)
print("Medium:", medium_corners)
print("Dark:", dark_corners)

svg = """export function Logo({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
"""

if bright_corners:
    path = "M " + " L ".join(f"{x:.1f} {y:.1f}" for x,y in bright_corners) + " Z"
    svg += f'      <path d="{path}" fill="#fc2629" />\n'
    
if medium_corners:
    path = "M " + " L ".join(f"{x:.1f} {y:.1f}" for x,y in medium_corners) + " Z"
    svg += f'      <path d="{path}" fill="#ca000f" />\n'
    
if dark_corners:
    path = "M " + " L ".join(f"{x:.1f} {y:.1f}" for x,y in dark_corners) + " Z"
    svg += f'      <path d="{path}" fill="#a31d1f" />\n'

svg += """    </svg>
  );
}
"""

with open('/Users/samarthnagaraj/Documents/Rubicule/Rubicule/src/components/Logo.jsx', 'w') as f:
    f.write(svg)
    
print("Wrote SVG")
