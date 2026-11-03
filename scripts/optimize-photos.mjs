// Resize source photos into public/photos (max 2000px, progressive JPEG).
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, parse } from 'node:path';

const [src = 'photos', out = 'public/photos'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
for (const f of readdirSync(src)) {
  if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
  const dest = join(out, parse(f).name + '.jpg');
  await sharp(join(src, f)).rotate().resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(dest);
  console.log('→', dest);
}
