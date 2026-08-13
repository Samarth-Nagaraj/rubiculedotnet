import cv2
import numpy as np
import base64

img = cv2.imread('/Users/samarthnagaraj/Documents/Rubicule/Rubicule/public/media.png')
h_img, w_img, _ = img.shape

# Convert to HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Define masks for the 3 colors
mask_bright = cv2.inRange(hsv, np.array([0, 150, 200]), np.array([10, 255, 255]))
mask_medium = cv2.inRange(hsv, np.array([0, 150, 120]), np.array([10, 255, 199]))
mask_dark = cv2.inRange(hsv, np.array([0, 150, 50]), np.array([10, 255, 119]))

# Find overall bounding box to scale to 0-100
mask_all = cv2.bitwise_or(mask_bright, cv2.bitwise_or(mask_medium, mask_dark))
cnts_all, _ = cv2.findContours(mask_all, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
main_cnt = max(cnts_all, key=cv2.contourArea)
x_box, y_box, w_box, h_box = cv2.boundingRect(main_cnt)

def scale_pt(pt):
    sx = (pt[0] - x_box) / w_box * 90 + 5
    sy = (pt[1] - y_box) / h_box * 90 + 5
    return f"{sx:.1f} {sy:.1f}"

svg_paths = []
for mask, color in [(mask_bright, "#fc2629"), (mask_medium, "#ca000f"), (mask_dark, "#a31d1f")]:
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    cnts, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for c in cnts:
        if cv2.contourArea(c) < (w_box * h_box * 0.01): continue
        
        # Use approxPolyDP to find exact corners (keeps concave shapes!)
        epsilon = 0.01 * cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, epsilon, True)
        
        if len(approx) < 3: continue
        
        path_d = "M " + scale_pt(approx[0][0])
        for pt in approx[1:]:
            path_d += " L " + scale_pt(pt[0])
        path_d += " Z"
        
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

print(f"Extracted exact SVG from image.")
