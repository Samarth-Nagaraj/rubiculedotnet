import cv2
import numpy as np

img = cv2.imread('/Users/samarthnagaraj/.gemini/antigravity/brain/03fcd043-7e3a-4085-831a-9e7cb987fed3/.user_uploaded/media__1786114275968.png')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

h, w, _ = img.shape
colors = {}
for y in range(0, h, 20):
    for x in range(0, w, 20):
        c = tuple(img_rgb[y, x])
        if c not in colors:
            colors[c] = 0
        colors[c] += 1

sorted_colors = sorted(colors.items(), key=lambda item: item[1], reverse=True)
print("Most frequent colors in first image:")
for c, count in sorted_colors[:10]:
    print(f"#{c[0]:02x}{c[1]:02x}{c[2]:02x} : {count}")
