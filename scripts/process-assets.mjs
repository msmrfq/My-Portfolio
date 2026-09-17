// Asset pipeline: recovers real portraits + certificate scans from the archived
// Wix exports (_source/) and the root Photo.JPG, applies an editorial tone, and
// writes optimized WebP into public/assets. Also generates the OG image.
//
//   npm run assets
//
// Re-runnable and idempotent. Missing sources are logged, not fatal.

import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, '_source');
const OUT_PORTRAIT = path.join(root, 'public', 'assets', 'portrait');
const OUT_CERT = path.join(root, 'public', 'assets', 'certificates');

const CHARCOAL = { r: 14, g: 14, b: 16 };

async function ensure(dir) {
  await fs.mkdir(dir, { recursive: true });
}

// Pick the largest AVIF in `dir` whose name contains `hash`.
async function largestByHash(dir, hash) {
  let best = null;
  let bestSize = -1;
  let entries = [];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return null;
  }
  for (const name of entries) {
    if (!name.toLowerCase().endsWith('.avif')) continue;
    if (hash && !name.includes(hash)) continue;
    const full = path.join(dir, name);
    const { size } = await fs.stat(full);
    if (size > bestSize) {
      bestSize = size;
      best = full;
    }
  }
  return best;
}

async function heroPortrait() {
  const src = path.join(root, 'Photo.JPG');
  try {
    await fs.access(src);
  } catch {
    console.warn('! Photo.JPG missing — skipping hero portrait');
    return null;
  }
  // Refined monochrome with a subtle warm cast; lifted contrast. Reads as a
  // mounted archival / faculty portrait.
  const treat = () =>
    sharp(src)
      .rotate()
      .grayscale()
      .linear(1.12, -14)
      .modulate({ brightness: 1.03 })
      .gamma(1.05)
      .tint({ r: 250, g: 244, b: 232 });

  await treat()
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT_PORTRAIT, 'hero-portrait.webp'));
  await treat()
    .resize({ width: 560, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT_PORTRAIT, 'hero-portrait-sm.webp'));
  console.log('✓ hero portrait (Photo.JPG → monochrome)');
  return treat().resize({ width: 620 }).toBuffer();
}

async function aboutPortrait() {
  const src = path.join(
    SRC,
    'Home_files',
    'IMG_20220721_180512_edited_edited_Bbf5.avif',
  );
  try {
    await fs.access(src);
  } catch {
    console.warn('! about portrait source missing — skipping');
    return;
  }
  const treat = () =>
    sharp(src)
      .rotate()
      .modulate({ saturation: 0.5, brightness: 1.02 })
      .linear(1.06, -8);
  await treat()
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT_PORTRAIT, 'about-portrait.webp'));
  await treat()
    .resize({ width: 520, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(OUT_PORTRAIT, 'about-portrait-sm.webp'));
  console.log('✓ about portrait (natural → toned)');
}

const CERTS = [
  {
    slug: 'scholarship-rossotrudnichestvo',
    folder: '2023 Rossotrudnichestvo - Minobrnauki, Russian Government Scholarship _ Masumrafique_files',
    hash: 'b33fa45da54b4a5fa17293647ba71e6a',
  },
  {
    slug: 'police-appreciation',
    folder: 'Appreciation Certificate From Police _ Masumrafique_files',
    hash: 'b95dbe5fae29498fb83c89f8ce070602',
  },
  {
    slug: 'talent-adamas',
    folder: 'Certificate For All India Adamas Talent Search Examination _ Masumrafique_files',
    hash: 'cd5c48f26f8940549583436409a2e8de',
  },
  {
    slug: 'talent-pathfinder',
    folder: 'Certificate For All India National Pathfinder Talent Search Examination _ Masumrafique_files',
    hash: '0f4d106c72fb48cda80a485577fe6c66',
  },
  {
    slug: 'talent-science',
    folder: 'Certificate For Talent Search Examination on Science _ Masumrafique_files',
    hash: '164c8bb2d6d64156ae37f1db7cbae666',
  },
  {
    slug: 'talent-geography',
    folder: 'Certificate in Talent Test Examination in Geography _ Masumrafique_files',
    hash: 'df7a366545574ff4b44b2617aee95a98',
  },
];

const FINE_ARTS = {
  folder: 'Certificates in Fine Arts _ Masumrafique_files',
  hashes: [
    '261771c2c954452db5c8167c8f6b84b7',
    '7a2113774e274afca1e92e896237028a',
    '16cf67a740ac461eac85353edc142bbe',
    '6e809128160e4604b9dffb51c637a612',
    'c5ae4201362947dd9c6dad982ec305b5',
    '464ff5bd456440f898650bf2dad3725a',
  ],
};

async function convertCert(srcFile, slug) {
  if (!srcFile) {
    console.warn(`! no source for ${slug}`);
    return;
  }
  await sharp(srcFile)
    .resize({ width: 1500, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT_CERT, `${slug}.webp`));
  await sharp(srcFile)
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(path.join(OUT_CERT, `${slug}-thumb.webp`));
  console.log(`✓ cert ${slug}`);
}

async function certificates() {
  for (const c of CERTS) {
    const file = await largestByHash(path.join(SRC, c.folder), c.hash);
    await convertCert(file, c.slug);
  }
  let i = 1;
  for (const hash of FINE_ARTS.hashes) {
    const file = await largestByHash(path.join(SRC, FINE_ARTS.folder), hash);
    await convertCert(file, `fine-arts-${i}`);
    i += 1;
  }
}

async function ogImage(portraitBuffer) {
  const W = 1200;
  const H = 630;
  // Background layer only. Kept separate from the text so the portrait can be
  // composited BETWEEN them — previously the opaque #bg rect painted over it.
  const bgSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#101013"/>
        <stop offset="1" stop-color="#0b0b0d"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
  </svg>`;

  // Foreground layer: a left-weighted scrim keeps the headline legible over the
  // portrait's faded edge, then clears by 72% so the portrait reads on the right.
  const textSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0.42" stop-color="#0b0b0d" stop-opacity="0.9"/>
        <stop offset="0.72" stop-color="#0b0b0d" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#scrim)"/>
    <rect x="80" y="196" width="54" height="2" fill="#b7a98b"/>
    <text x="80" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="86" fill="#f2efe9" letter-spacing="1">Masum Rafique</text>
    <text x="82" y="315" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#b7a98b" letter-spacing="6">MEDICINE · TECHNOLOGY · ENTERPRISE</text>
    <text x="82" y="372" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#8a8a90">Building at the intersection of medicine, technology and enterprise.</text>
  </svg>`;

  // Compositing order: background (bottom) → portrait → text/scrim (top).
  const layers = [{ input: Buffer.from(bgSvg) }];
  if (portraitBuffer) {
    const portrait = await sharp(portraitBuffer)
      .resize({ width: 430, height: 630, fit: 'cover', position: 'top' })
      .toBuffer();
    // right-aligned, faded into the background via a horizontal alpha mask
    const mask = Buffer.from(
      `<svg width="430" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="m" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#000" stop-opacity="0"/>
          <stop offset="0.55" stop-color="#000" stop-opacity="0.75"/>
          <stop offset="1" stop-color="#000" stop-opacity="0.95"/>
        </linearGradient></defs>
        <rect width="430" height="630" fill="url(#m)"/>
      </svg>`,
    );
    const masked = await sharp(portrait)
      .composite([{ input: mask, blend: 'dest-in' }])
      .toBuffer();
    layers.push({ input: masked, left: W - 430, top: 0 });
  }
  layers.push({ input: Buffer.from(textSvg) });

  await sharp({
    create: { width: W, height: H, channels: 3, background: CHARCOAL },
  })
    .composite(layers)
    .png()
    .toFile(path.join(root, 'public', 'og.png'));
  console.log('✓ og.png');
}

async function main() {
  await Promise.all([ensure(OUT_PORTRAIT), ensure(OUT_CERT)]);
  const portraitBuffer = await heroPortrait();
  await aboutPortrait();
  await certificates();
  await ogImage(portraitBuffer);
  console.log('\nAssets complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
