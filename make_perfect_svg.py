import cv2
import numpy as np

img = cv2.imread('/Users/samarthnagaraj/Documents/Rubicule/Rubicule/public/media.png')
h_img, w_img, _ = img.shape

# Convert to RGB to easily match colors
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Define the exact colors in the image (based on previous analysis)
colors = [
    ("#fc2629", [252, 38, 41]),   # Bright Red
    ("#ca000f", [202, 0, 15]),    # Medium Red
    ("#a31d1f", [163, 29, 31])    # Dark Red
]

def get_mask(color_rgb):
    # Create a mask for pixels close to this color
    c = np.array(color_rgb)
    lower = np.clip(c - 40, 0, 255)
    upper = np.clip(c + 40, 0, 255)
    return cv2.inRange(img_rgb, lower, upper)

mask_all = cv2.bitwise_or(get_mask(colors[0][1]), cv2.bitwise_or(get_mask(colors[1][1]), get_mask(colors[2][1])))
cnts_all, _ = cv2.findContours(mask_all, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
main_cnt = max(cnts_all, key=cv2.contourArea)
x_box, y_box, w_box, h_box = cv2.boundingRect(main_cnt)

def scale_pt(pt):
    sx = (pt[0] - x_box) / w_box * 90 + 5
    sy = (pt[1] - y_box) / h_box * 90 + 5
    return f"{sx:.1f} {sy:.1f}"

svg_paths = []
for hex_color, rgb in colors:
    mask = get_mask(rgb)
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    cnts, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for c in cnts:
        if cv2.contourArea(c) < (w_box * h_box * 0.01): continue
        
        epsilon = 0.005 * cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, epsilon, True)
        
        if len(approx) < 3: continue
        
        path_d = "M " + scale_pt(approx[0][0])
        for pt in approx[1:]:
            path_d += " L " + scale_pt(pt[0])
        path_d += " Z"
        
        svg_paths.append(f'      <path d="{path_d}" fill="{hex_color}" />')

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
