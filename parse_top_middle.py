import cv2
import numpy as np
from collections import Counter

img = cv2.imread('/Users/samarthnagaraj/Documents/Rubicule/Rubicule/public/media.png')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

h, w, _ = img.shape
# The V-notch is around x=w/2, y=h/4 to h/2
center_x = w // 2
colors = []
for y in range(int(h*0.2), int(h*0.6)):
    for x in range(int(center_x - w*0.2), int(center_x + w*0.2)):
        colors.append(tuple(img_rgb[y, x]))

counter = Counter(colors)
print("Top 10 Colors in Top-Middle Region:")
for c, count in counter.most_common(10):
    print(f"#{c[0]:02x}{c[1]:02x}{c[2]:02x} : {count}")

