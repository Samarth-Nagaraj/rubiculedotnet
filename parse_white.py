import cv2
import numpy as np

img = cv2.imread('/Users/samarthnagaraj/Documents/Rubicule/Rubicule/public/media.png')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

h, w, _ = img.shape
center_x = w // 2
white_pixels = []
for y in range(int(h*0.2), int(h*0.6)):
    for x in range(int(center_x - w*0.2), int(center_x + w*0.2)):
        r, g, b = img_rgb[y, x]
        if r > 240 and g > 240 and b > 240:
            white_pixels.append((x, y))

if white_pixels:
    min_y = min(y for x, y in white_pixels)
    max_y = max(y for x, y in white_pixels)
    print(f"White pixels Y range: {min_y} to {max_y}")
    
    # Check if they form lines
    import math
    print(f"Found {len(white_pixels)} white pixels")
