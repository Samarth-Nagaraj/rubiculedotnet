import cv2
import numpy as np

img = cv2.imread('/Users/samarthnagaraj/Documents/Rubicule/Rubicule/public/media.png')

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Edge detection
edges = cv2.Canny(gray, 50, 150, apertureSize=3)

# Find lines
lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=20, minLineLength=10, maxLineGap=10)

h, w = gray.shape
def scale_pt(x, y):
    sx = x / w * 100
    sy = y / h * 100
    return f"{sx:.1f}, {sy:.1f}"

print("Found lines in second image:")
if lines is not None:
    for line in lines:
        x1, y1, x2, y2 = line[0]
        print(f"Line: {scale_pt(x1, y1)} to {scale_pt(x2, y2)}")

