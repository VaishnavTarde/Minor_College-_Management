const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIcoModule = require('png-to-ico');
const pngToIco = pngToIcoModule && pngToIcoModule.default ? pngToIcoModule.default : pngToIcoModule;

async function generate() {
  const root = path.resolve(__dirname, '..');
  const svgPath = path.join(root, 'public', 'favicon.svg');
  const icoPath = path.join(root, 'public', 'favicon.ico');

  if (!fs.existsSync(svgPath)) {
    console.error('SVG file not found:', svgPath);
    process.exit(1);
  }

  const svgBuffer = fs.readFileSync(svgPath);
  const sizes = [16, 32, 48, 64, 128];

  try {
    const pngBuffers = [];
    for (const size of sizes) {
      const buf = await sharp(svgBuffer)
        .resize(size, size, { fit: 'contain' })
        .png()
        .toBuffer();
      pngBuffers.push(buf);
      const outPng = path.join(root, 'public', `favicon-${size}.png`);
      fs.writeFileSync(outPng, buf);
      console.log('Wrote', outPng);
    }

    const icoBuffer = await pngToIco(pngBuffers);
    fs.writeFileSync(icoPath, icoBuffer);
    console.log('Wrote', icoPath);
    console.log('Favicon generation complete.');
  } catch (err) {
    console.error('Error generating favicon:', err);
    process.exit(1);
  }
}

generate();
