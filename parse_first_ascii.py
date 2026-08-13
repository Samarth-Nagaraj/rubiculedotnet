import cv2
import numpy as np

img = cv2.imread('/Users/samarthnagaraj/.gemini/antigravity/brain/03fcd043-7e3a-4085-831a-9e7cb987fed3/.user_uploaded/media__1786114275968.png')
h, w, _ = img.shape

# Resize to 40x40 for ASCII art
small = cv2.resize(img, (40, 40))

for y in range(40):
    line = ""
    for x in range(40):
        b, g, r = small[y, x]
        if r > 200 and g < 100: line += "B" # Bright
        elif r > 150 and g < 50: line += "M" # Medium
        elif r > 100 and g < 50: line += "D" # Dark
        else: line += "."
    print(line)

