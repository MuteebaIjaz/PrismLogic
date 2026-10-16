const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateCleanBrandAssets() {
  const brandDir = path.join('public', 'brand');
  const logoPath = path.join(brandDir, 'logo-full-source.png');
  const favPath = path.join(brandDir, 'favicon-source.png');

  console.log('Processing logo-full-source.png...');
  const { data: rawLogo, info: logoInfo } = await sharp(logoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 1. Transparency extraction with soft alpha and black de-fringing
  const bgR = 8, bgG = 7, bgB = 14;
  const transparentBuffer = Buffer.alloc(logoInfo.width * logoInfo.height * 4);

  // Measure content bounds
  let fullMinX = logoInfo.width, fullMaxX = 0, fullMinY = logoInfo.height, fullMaxY = 0;
  let markMinX = logoInfo.width, markMaxX = 0, markMinY = logoInfo.height, markMaxY = 0;
  let textMinX = logoInfo.width, textMaxX = 0, textMinY = logoInfo.height, textMaxY = 0;

  for (let y = 0; y < logoInfo.height; y++) {
    for (let x = 0; x < logoInfo.width; x++) {
      const idx = (y * logoInfo.width + x) * 4;
      const r = rawLogo[idx];
      const g = rawLogo[idx + 1];
      const b = rawLogo[idx + 2];
      const br = Math.max(r, g, b);

      const lowThresh = 24;
      const highThresh = 68;

      let alpha = 0;
      let outR = r, outG = g, outB = b;

      if (br <= lowThresh) {
        alpha = 0;
        outR = 0;
        outG = 0;
        outB = 0;
      } else if (br >= highThresh) {
        alpha = 255;
      } else {
        const t = (br - lowThresh) / (highThresh - lowThresh);
        alpha = Math.round(t * 255);
        const factor = Math.max(0.12, t);
        outR = Math.min(255, Math.round(Math.max(0, r - bgR * (1 - factor)) / factor));
        outG = Math.min(255, Math.round(Math.max(0, g - bgG * (1 - factor)) / factor));
        outB = Math.min(255, Math.round(Math.max(0, b - bgB * (1 - factor)) / factor));
      }

      transparentBuffer[idx] = outR;
      transparentBuffer[idx + 1] = outG;
      transparentBuffer[idx + 2] = outB;
      transparentBuffer[idx + 3] = alpha;

      if (alpha > 15) {
        if (x < fullMinX) fullMinX = x;
        if (x > fullMaxX) fullMaxX = x;
        if (y < fullMinY) fullMinY = y;
        if (y > fullMaxY) fullMaxY = y;

        if (x < 650) {
          if (x < markMinX) markMinX = x;
          if (x > markMaxX) markMaxX = x;
          if (y < markMinY) markMinY = y;
          if (y > markMaxY) markMaxY = y;
        } else {
          if (x < textMinX) textMinX = x;
          if (x > textMaxX) textMaxX = x;
          if (y < textMinY) textMinY = y;
          if (y > textMaxY) textMaxY = y;
        }
      }
    }
  }

  console.log('Bounds:', {
    full: { fullMinX, fullMaxX, fullMinY, fullMaxY, w: fullMaxX - fullMinX, h: fullMaxY - fullMinY },
    mark: { markMinX, markMaxX, markMinY, markMaxY, w: markMaxX - markMinX, h: markMaxY - markMinY },
    text: { textMinX, textMaxX, textMinY, textMaxY, w: textMaxX - textMinX, h: textMaxY - textMinY },
  });

  // Add subtle padding for optical breathing room
  const pad = 12;
  const fullCropX = Math.max(0, fullMinX - pad);
  const fullCropY = Math.max(0, fullMinY - pad);
  const fullCropW = Math.min(logoInfo.width - fullCropX, (fullMaxX - fullMinX) + pad * 2);
  const fullCropH = Math.min(logoInfo.height - fullCropY, (fullMaxY - fullMinY) + pad * 2);

  const fullTransparentImage = sharp(transparentBuffer, {
    raw: { width: logoInfo.width, height: logoInfo.height, channels: 4 }
  });

  // Extract logo-full.png (White text for dark / purple backgrounds like footer)
  const logoFullPng = await fullTransparentImage
    .clone()
    .extract({ left: fullCropX, top: fullCropY, width: fullCropW, height: fullCropH })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(brandDir, 'logo-full.png'), logoFullPng);

  const logoFullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${fullCropW} ${fullCropH}" width="${fullCropW}" height="${fullCropH}">
  <image href="data:image/png;base64,${logoFullPng.toString('base64')}" width="${fullCropW}" height="${fullCropH}" />
</svg>`;
  fs.writeFileSync(path.join(brandDir, 'logo-full.svg'), logoFullSvg);
  console.log('Created logo-full.png and logo-full.svg (transparent bg)');

  // Extract logo-mark.png (Prism icon only, tight crop)
  const markPad = 8;
  const markCropX = Math.max(0, markMinX - markPad);
  const markCropY = Math.max(0, markMinY - markPad);
  const markCropW = Math.min(logoInfo.width - markCropX, (markMaxX - markMinX) + markPad * 2);
  const markCropH = Math.min(logoInfo.height - markCropY, (markMaxY - markMinY) + markPad * 2);

  const logoMarkPng = await fullTransparentImage
    .clone()
    .extract({ left: markCropX, top: markCropY, width: markCropW, height: markCropH })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(brandDir, 'logo-mark.png'), logoMarkPng);

  const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${markCropW} ${markCropH}" width="${markCropW}" height="${markCropH}">
  <image href="data:image/png;base64,${logoMarkPng.toString('base64')}" width="${markCropW}" height="${markCropH}" />
</svg>`;
  fs.writeFileSync(path.join(brandDir, 'logo-mark.svg'), logoMarkSvg);
  console.log('Created logo-mark.png and logo-mark.svg (transparent bg)');

  // Extract logo-dark (for light backgrounds like white navbar)
  // Recolor the white 'Prism' text to dark slate #0F172A while preserving alpha and anti-aliasing
  const darkBuffer = Buffer.from(transparentBuffer);
  for (let y = 0; y < logoInfo.height; y++) {
    for (let x = 650; x < logoInfo.width; x++) {
      const idx = (y * logoInfo.width + x) * 4;
      const alpha = darkBuffer[idx + 3];
      if (alpha > 0) {
        const r = darkBuffer[idx];
        const g = darkBuffer[idx + 1];
        const b = darkBuffer[idx + 2];
        // If it's neutral/white (the "Prism" word is on the left side of text region, approx x: 650 to 1100)
        if (x < 1140) {
          // Prism word: map from white to #0F172A (15, 23, 42)
          const brightness = (r + g + b) / 3 / 255;
          darkBuffer[idx] = Math.round(15 + (1 - brightness) * 10);
          darkBuffer[idx + 1] = Math.round(23 + (1 - brightness) * 10);
          darkBuffer[idx + 2] = Math.round(42 + (1 - brightness) * 10);
        }
      }
    }
  }

  const darkTransparentImage = sharp(darkBuffer, {
    raw: { width: logoInfo.width, height: logoInfo.height, channels: 4 }
  });

  const logoDarkPng = await darkTransparentImage
    .clone()
    .extract({ left: fullCropX, top: fullCropY, width: fullCropW, height: fullCropH })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(brandDir, 'logo-dark.png'), logoDarkPng);

  const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${fullCropW} ${fullCropH}" width="${fullCropW}" height="${fullCropH}">
  <image href="data:image/png;base64,${logoDarkPng.toString('base64')}" width="${fullCropW}" height="${fullCropH}" />
</svg>`;
  fs.writeFileSync(path.join(brandDir, 'logo-dark.svg'), logoDarkSvg);
  console.log('Created logo-dark.png and logo-dark.svg (for light backgrounds)');

  // 2. Favicon transparency extraction
  console.log('Processing favicon-source.png...');
  const { data: rawFav, info: favInfo } = await sharp(favPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const favTransparent = Buffer.alloc(favInfo.width * favInfo.height * 4);
  let fMinX = favInfo.width, fMaxX = 0, fMinY = favInfo.height, fMaxY = 0;

  for (let y = 0; y < favInfo.height; y++) {
    for (let x = 0; x < favInfo.width; x++) {
      const idx = (y * favInfo.width + x) * 4;
      const r = rawFav[idx];
      const g = rawFav[idx + 1];
      const b = rawFav[idx + 2];
      const br = Math.max(r, g, b);

      const lowThresh = 24;
      const highThresh = 65;

      let alpha = 0;
      let outR = r, outG = g, outB = b;

      if (br <= lowThresh) {
        alpha = 0;
        outR = 0; outG = 0; outB = 0;
      } else if (br >= highThresh) {
        alpha = 255;
      } else {
        const t = (br - lowThresh) / (highThresh - lowThresh);
        alpha = Math.round(t * 255);
        const factor = Math.max(0.12, t);
        outR = Math.min(255, Math.round(Math.max(0, r - 5 * (1 - factor)) / factor));
        outG = Math.min(255, Math.round(Math.max(0, g - 5 * (1 - factor)) / factor));
        outB = Math.min(255, Math.round(Math.max(0, b - 10 * (1 - factor)) / factor));
      }

      favTransparent[idx] = outR;
      favTransparent[idx + 1] = outG;
      favTransparent[idx + 2] = outB;
      favTransparent[idx + 3] = alpha;

      if (alpha > 15) {
        if (x < fMinX) fMinX = x;
        if (x > fMaxX) fMaxX = x;
        if (y < fMinY) fMinY = y;
        if (y > fMaxY) fMaxY = y;
      }
    }
  }

  const fPad = 14;
  const fCropX = Math.max(0, fMinX - fPad);
  const fCropY = Math.max(0, fMinY - fPad);
  const fCropW = Math.min(favInfo.width - fCropX, (fMaxX - fMinX) + fPad * 2);
  const fCropH = Math.min(favInfo.height - fCropY, (fMaxY - fMinY) + fPad * 2);

  const favSharp = sharp(favTransparent, {
    raw: { width: favInfo.width, height: favInfo.height, channels: 4 }
  });

  const fav512 = await favSharp
    .clone()
    .extract({ left: fCropX, top: fCropY, width: fCropW, height: fCropH })
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(brandDir, 'favicon.png'), fav512);

  const fav192 = await favSharp
    .clone()
    .extract({ left: fCropX, top: fCropY, width: fCropW, height: fCropH })
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(brandDir, 'apple-touch-icon.png'), fav192);

  const favSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${fav512.toString('base64')}" width="512" height="512" />
</svg>`;
  fs.writeFileSync(path.join(brandDir, 'favicon.svg'), favSvg);
  fs.writeFileSync(path.join('public', 'favicon.svg'), favSvg);

  console.log('Successfully generated all clean, transparent brand assets!');
}

generateCleanBrandAssets().catch(console.error);
