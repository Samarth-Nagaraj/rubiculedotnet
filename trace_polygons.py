import zlib
import struct

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

# Classify colors
# C1: Bright Red (~ fc2629)
# C2: Medium Red (~ ca000f)
# C3: Dark Red (~ a31d1f)
# C0: Transparent/Background

grid = [[0 for _ in range(w)] for _ in range(h)]
for y in range(h):
    for x in range(w):
        r,g,b,a = p[y][x]
        if a < 128 or (r>240 and g>240 and b>240): grid[y][x] = 0
        elif r > 210 and g < 60: grid[y][x] = 1 # Bright
        elif r > 160: grid[y][x] = 2 # Medium
        elif r > 100: grid[y][x] = 3 # Dark
        else: grid[y][x] = 0

# Find edges between regions
edges = set()
for y in range(1, h-1):
    for x in range(1, w-1):
        if grid[y][x] != 0:
            if grid[y][x] != grid[y][x-1] and grid[y][x-1] != 0:
                edges.add((x, y, grid[y][x-1], grid[y][x]))
            if grid[y][x] != grid[y-1][x] and grid[y-1][x] != 0:
                edges.add((x, y, grid[y-1][x], grid[y][x]))

print("Finding key vertices...")
# Find highest, lowest, leftmost, rightmost points
points = [(x,y) for y in range(h) for x in range(w) if grid[y][x] != 0]
if not points:
    print("No shape found")
    sys.exit(0)

min_y = min(points, key=lambda p: p[1])
max_y = max(points, key=lambda p: p[1])
min_x = min(points, key=lambda p: p[0])
max_x = max(points, key=lambda p: p[0])
print(f"Top: {min_y}, Bottom: {max_y}, Left: {min_x}, Right: {max_x}")

# Find center point where multiple regions meet
center_candidates = []
for y in range(1, h-1):
    for x in range(1, w-1):
        colors = set([grid[y-1][x], grid[y+1][x], grid[y][x-1], grid[y][x+1]])
        if len(colors - {0}) >= 3:
            center_candidates.append((x,y))

if center_candidates:
    cx = sum(x for x,y in center_candidates) // len(center_candidates)
    cy = sum(y for x,y in center_candidates) // len(center_candidates)
    print(f"Center intersection: ({cx}, {cy})")

# Trace vertical lines
v_lines = {}
for x,y,c1,c2 in edges:
    if (c1,c2) not in v_lines: v_lines[(c1,c2)] = []
    v_lines[(c1,c2)].append((x,y))

for (c1,c2), pts in v_lines.items():
    if len(pts) > 100:
        min_p = min(pts, key=lambda p: p[1])
        max_p = max(pts, key=lambda p: p[1])
        print(f"Boundary between {c1} and {c2}: from {min_p} to {max_p}")

