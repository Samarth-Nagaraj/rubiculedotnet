import zlib
import struct
import sys

def read_png(filename):
    with open(filename, 'rb') as f:
        data = f.read()

    pos = 8
    width = height = color_type = bpp = 0
    idat_data = b''

    while pos < len(data):
        length, = struct.unpack('>I', data[pos:pos+4])
        chunk_type = data[pos+4:pos+8].decode('ascii')
        chunk_data = data[pos+8:pos+8+length]
        pos += 12 + length
        if chunk_type == 'IHDR':
            width, height, bit_depth, color_type = struct.unpack('>IIBB', chunk_data[:10])
        elif chunk_type == 'IDAT':
            idat_data += chunk_data

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

filename = '/Users/samarthnagaraj/.gemini/antigravity/brain/03fcd043-7e3a-4085-831a-9e7cb987fed3/.user_uploaded/media__1786116715510.png'
w, h, p = read_png(filename)

# Sample some key points in the 932x888 image
points = [
    ("Left Peak Center", int(w*0.2), int(h*0.2)),
    ("Right Peak Center", int(w*0.8), int(h*0.2)),
    ("Middle Left", int(w*0.2), int(h*0.5)),
    ("Middle Right", int(w*0.8), int(h*0.5)),
    ("Bottom Center", int(w*0.5), int(h*0.8)),
    ("Center Point", int(w*0.5), int(h*0.5)),
    ("Inner V Left", int(w*0.4), int(h*0.2)),
    ("Inner V Right", int(w*0.6), int(h*0.2)),
]

for name, x, y in points:
    r,g,b,a = p[y][x]
    print(f"{name} ({x},{y}): #{r:02x}{g:02x}{b:02x} (a={a})")

