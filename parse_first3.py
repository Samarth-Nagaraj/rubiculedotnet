import cv2
import numpy as np

img = cv2.imread('/Users/samarthnagaraj/.gemini/antigravity/brain/03fcd043-7e3a-4085-831a-9e7cb987fed3/.user_uploaded/media__1786114275968.png')
h_img, w_img, _ = img.shape

# Convert to HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Define masks for the colors found in first image
# #f42024 (Bright) -> RGB (244, 32, 36) -> HSV ~ (359, 87, 96)
# #ca0211 (Medium) -> RGB (202, 2, 17) -> HSV ~ (355, 99, 79)
# #950a10 (Dark) -> RGB (149, 10, 16) -> HSV ~ (357, 93, 58)

mask_red = cv2.inRange(hsv, np.array([0, 100, 50]), np.array([10, 255, 255]))
mask_red = cv2.bitwise_or(mask_red, cv2.inRange(hsv, np.array([170, 100, 50]), np.array([180, 255, 255])))

cnts_all, _ = cv2.findContours(mask_red, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
main_cnt = max(cnts_all, key=cv2.contourArea)
x_box, y_box, w_box, h_box = cv2.boundingRect(main_cnt)

def scale_pt(pt):
    sx = (pt[0] - x_box) / w_box * 90 + 5
    sy = (pt[1] - y_box) / h_box * 90 + 5
    return f"{sx:.1f} {sy:.1f}"

# We will just find all polygons inside the bounding box
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(img, 50, 150, apertureSize=3)
lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=50, minLineLength=20, maxLineGap=10)

print("Found lines:")
if lines is not None:
    for line in lines:
        x1, y1, x2, y2 = line[0]
        print(f"Line: {scale_pt((x1, y1))} to {scale_pt((x2, y2))}")

