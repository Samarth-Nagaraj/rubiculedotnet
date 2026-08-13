import zlib
import struct
import sys

def read_png(filename):
    with open(filename, 'rb') as f:
        data = f.read()

    assert data[:8] == b'\x89PNG\r\n\x1a\n'

    pos = 8
    width = 0
    height = 0
    color_type = 0
    bit_depth = 0
    idat_data = b''

    while pos < len(data):
        length, = struct.unpack('>I', data[pos:pos+4])
        chunk_type = data[pos+4:pos+8].decode('ascii')
        chunk_data = data[pos+8:pos+8+length]
        pos += 12 + length

        if chunk_type == 'IHDR':
            width, height, bit_depth, color_type, compression, filter_method, interlace = struct.unpack('>IIBBBBB', chunk_data)
        elif chunk_type == 'IDAT':
            idat_data += chunk_data
        elif chunk_type == 'IEND':
            break

    # Decompress IDAT
    decompressed = zlib.decompress(idat_data)

    # Calculate bytes per pixel
    if color_type == 2: # Truecolor (RGB)
        bpp = 3
    elif color_type == 6: # Truecolor with alpha (RGBA)
        bpp = 4
    elif color_type == 3: # Indexed
        bpp = 1
    else:
        raise Exception(f"Unsupported color type {color_type}")

    if color_type not in (2, 6):
        print(f"Skipping decoding, color_type is {color_type}")
        return

    pixels = [[(0,0,0,0) for _ in range(width)] for _ in range(height)]
    
    stride = width * bpp
    idx = 0
    
    # Paeth predictor
    def paeth(a, b, c):
        p = a + b - c
        pa = abs(p - a)
        pb = abs(p - b)
        pc = abs(p - c)
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
            if filter_type == 0:
                recon_row[x] = c
            elif filter_type == 1:
                recon_row[x] = (c + left) & 0xff
            elif filter_type == 2:
                recon_row[x] = (c + up) & 0xff
            elif filter_type == 3:
                recon_row[x] = (c + (left + up) // 2) & 0xff
            elif filter_type == 4:
                recon_row[x] = (c + paeth(left, up, up_left)) & 0xff
                
        prev_row = recon_row
        
        # Parse pixels
        for i in range(width):
            px_idx = i * bpp
            r = recon_row[px_idx]
            g = recon_row[px_idx+1]
            b = recon_row[px_idx+2]
            a = recon_row[px_idx+3] if bpp == 4 else 255
            pixels[y][i] = (r, g, b, a)

    return width, height, pixels

filename = '/Users/samarthnagaraj/.gemini/antigravity/brain/03fcd043-7e3a-4085-831a-9e7cb987fed3/.user_uploaded/media__1786116715510.png'
width, height, pixels = read_png(filename)

scale_x = width / 70
scale_y = height / 70

print(f"Image size: {width}x{height}")

for out_y in range(70):
    line = ""
    for out_x in range(70):
        in_x = int(out_x * scale_x)
        in_y = int(out_y * scale_y)
        r, g, b, a = pixels[in_y][in_x]
        
        if a < 128 or (r>240 and g>240 and b>240): 
            line += " "
        elif r > 100:
            if r > 210 and g < 60:
                line += "1" # Bright red
            elif r > 160:
                line += "2" # Medium red
            else:
                line += "3" # Dark red
        else:
            line += "."
    print(line)
