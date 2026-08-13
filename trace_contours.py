import cv2
import numpy as np

# Load image
img = cv2.imread('/Users/samarthnagaraj/.gemini/antigravity/brain/03fcd043-7e3a-4085-831a-9e7cb987fed3/.user_uploaded/media__1786116715510.png')
h, w, _ = img.shape

# Define color bounds for the 3 reds (BGR format in OpenCV)
# Bright Red: #fc2629 -> RGB(252, 38, 41) -> BGR(41, 38, 252)
# Medium Red: #ca000f -> RGB(202, 0, 15) -> BGR(15, 0, 202)
# Dark Red: #a31d1f -> RGB(163, 29, 31) -> BGR(31, 29, 163)

# We will use HSV to segment the image more robustly
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Create masks for the entire red shape
lower_red1 = np.array([0, 100, 100])
upper_red1 = np.array([10, 255, 255])
lower_red2 = np.array([160, 100, 100])
upper_red2 = np.array([180, 255, 255])
mask_red = cv2.bitwise_or(cv2.inRange(hsv, lower_red1, upper_red1), cv2.inRange(hsv, lower_red2, upper_red2))

# Find the bounding box of the red shape
contours, _ = cv2.findContours(mask_red, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
if not contours:
    print("No red shape found.")
    exit(1)
    
main_contour = max(contours, key=cv2.contourArea)
x, y, w_box, h_box = cv2.boundingRect(main_contour)

# We want to scale coordinates so the bounding box fits in 0-100
def scale_pt(px, py):
    sx = (px - x) / w_box * 90 + 5
    sy = (py - y) / h_box * 90 + 5
    return sx, sy

# Let's segment by the 3 colors
# 1. Bright Red (highest Value in HSV)
mask_bright = cv2.inRange(hsv, np.array([0, 150, 200]), np.array([10, 255, 255]))
# 2. Medium Red
mask_medium = cv2.inRange(hsv, np.array([0, 150, 120]), np.array([10, 255, 199]))
# 3. Dark Red
mask_dark = cv2.inRange(hsv, np.array([0, 150, 50]), np.array([10, 255, 119]))

svg_paths = []

for mask, color in [(mask_bright, "#fc2629"), (mask_medium, "#ca000f"), (mask_dark, "#a31d1f")]:
    # Morphological operations to clean up masks
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    cnts, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for c in cnts:
        if cv2.contourArea(c) < (w_box * h_box * 0.01): continue # ignore tiny artifacts
        
        # Approximate contour to polygons
        epsilon = 0.02 * cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, epsilon, True)
        
        # Build SVG path
        pts = []
        for pt in approx:
            px, py = pt[0]
            sx, sy = scale_pt(px, py)
            pts.append(f"{sx:.1f} {sy:.1f}")
            
        path_d = f"M {pts[0]} " + " ".join(f"L {p}" for p in pts[1:]) + " Z"
        svg_paths.append(f'      <path d="{path_d}" fill="{color}" stroke="{color}" strokeWidth="0.5" />')

svg_content = f"""export function Logo({{ className = "w-10 h-10" }}) {{
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={{className}}>
{chr(10).join(svg_paths)}
    </svg>
  );
}}
"""

with open('/Users/samarthnagaraj/Documents/Rubicule/Rubicule/src/components/Logo.jsx', 'w') as f:
    f.write(svg_content)

print(f"Extracted {len(svg_paths)} polygons.")
