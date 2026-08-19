import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const outDir = path.resolve('public/brand-assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Cube Only
const cubeSvg = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
  <path d="M 16 70 L 16 30 L 33 20 L 33 40 L 50 30 L 50 50 Z" fill="#fc2629" />
  <path d="M 33 20 L 50 30 L 33 40 Z" fill="#ca000f" />
  <path d="M 84 70 L 50 50 L 50 30 L 67 40 L 67 20 L 84 30 Z" fill="#ca000f" />
  <path d="M 67 20 L 67 40 L 50 30 Z" fill="#fc2629" />
  <path d="M 16 70 L 50 50 L 84 70 L 50 90 Z" fill="#a31d1f" />
</svg>`;

// 2. Cube + Horizontal Text
const horizontalSvg = `<svg viewBox="0 0 450 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="1800" height="400">
  <g transform="translate(0, 0)">
    <path d="M 16 70 L 16 30 L 33 20 L 33 40 L 50 30 L 50 50 Z" fill="#fc2629" />
    <path d="M 33 20 L 50 30 L 33 40 Z" fill="#ca000f" />
    <path d="M 84 70 L 50 50 L 50 30 L 67 40 L 67 20 L 84 30 Z" fill="#ca000f" />
    <path d="M 67 20 L 67 40 L 50 30 Z" fill="#fc2629" />
    <path d="M 16 70 L 50 50 L 84 70 L 50 90 Z" fill="#a31d1f" />
  </g>
  <text x="110" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="52" fill="#1F2937" letter-spacing="-0.035em">RUBICULE</text>
</svg>`;

// 3. Cube + Stacked Text
const stackedSvg = `<svg viewBox="0 0 300 350" fill="none" xmlns="http://www.w3.org/2000/svg" width="1200" height="1400">
  <g transform="translate(50, 20) scale(2)">
    <path d="M 16 70 L 16 30 L 33 20 L 33 40 L 50 30 L 50 50 Z" fill="#fc2629" />
    <path d="M 33 20 L 50 30 L 33 40 Z" fill="#ca000f" />
    <path d="M 84 70 L 50 50 L 50 30 L 67 40 L 67 20 L 84 30 Z" fill="#ca000f" />
    <path d="M 67 20 L 67 40 L 50 30 Z" fill="#fc2629" />
    <path d="M 16 70 L 50 50 L 84 70 L 50 90 Z" fill="#a31d1f" />
  </g>
  <text x="150" y="300" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="55" fill="#1F2937" letter-spacing="-0.035em" text-anchor="middle">RUBICULE</text>
</svg>`;

const files = [
  { name: 'rubicule-logo-cube', svg: cubeSvg },
  { name: 'rubicule-logo-horizontal', svg: horizontalSvg },
  { name: 'rubicule-logo-stacked', svg: stackedSvg }
];

files.forEach(file => {
  fs.writeFileSync(path.join(outDir, file.name + '.svg'), file.svg);
});

console.log('SVGs generated. Now attempting PNG and JPEG conversion...');

try {
  execSync('npm install sharp --no-save', { stdio: 'inherit' });
  const sharp = (await import('sharp')).default;
  
  for (const file of files) {
    const svgPath = path.join(outDir, file.name + '.svg');
    
    await sharp(svgPath)
      .png()
      .toFile(path.join(outDir, file.name + '.png'));
      
    await sharp(svgPath)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 95 })
      .toFile(path.join(outDir, file.name + '.jpg'));
  }
  
  console.log('Successfully generated all PNG and JPEG files!');
} catch (e) {
  console.error('Error generating raster images:', e.message);
}
