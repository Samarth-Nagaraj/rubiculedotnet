import cv2
import numpy as np
from collections import Counter

img = cv2.imread('/Users/samarthnagaraj/Documents/Rubicule/Rubicule/public/media.png')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

h, w, _ = img.shape
colors = []
for y in range(0, h, 5):
    for x in range(0, w, 5):
        r, g, b = img_rgb[y, x]
        if r > 100 and g < 100: # Only count red colors
            colors.append((r, g, b))

counter = Counter(colors)
print("Top 10 Red Colors:")
for c, count in counter.most_common(10):
    print(f"#{c[0]:02x}{c[1]:02x}{c[2]:02x} : {count}")

