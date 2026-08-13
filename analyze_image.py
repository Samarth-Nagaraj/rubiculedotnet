from PIL import Image
import numpy as np
import cv2

# Load image
img = Image.open('/Users/samarthnagaraj/.gemini/antigravity/brain/03fcd043-7e3a-4085-831a-9e7cb987fed3/.user_uploaded/media__1786116715510.png').convert('RGB')
img_np = np.array(img)

# Find all non-white pixels (the red logo)
mask = np.any(img_np < 240, axis=-1).astype(np.uint8) * 255

# Find contours
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
if contours:
    # Get the largest contour
    cnt = max(contours, key=cv2.contourArea)
    
    # Simplify the contour to a polygon
    epsilon = 0.01 * cv2.arcLength(cnt, True)
    approx = cv2.approxPolyDP(cnt, epsilon, True)
    
    print("Outer Polygon Vertices:")
    for p in approx:
        print(f"X: {p[0][0]}, Y: {p[0][1]}")
        
    # Let's also find internal edges by running edge detection
    edges = cv2.Canny(img_np, 50, 150)
    lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=50, minLineLength=30, maxLineGap=10)
    
    print("\nInternal Lines detected:")
    if lines is not None:
        for line in lines:
            x1, y1, x2, y2 = line[0]
            print(f"Line: ({x1}, {y1}) -> ({x2}, {y2})")
