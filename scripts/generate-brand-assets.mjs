import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const branding = path.join(root, "public", "branding");

async function readSvg(name) {
  return readFile(path.join(branding, name), "utf8");
}

function nestedSvg(svg, { x, y, width, height }) {
  return svg
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(
      /<svg\b([^>]*)>/,
      (match, attributes) => {
        const viewBox = attributes.match(/viewBox="([^"]+)"/)?.[1];
        if (!viewBox) {
          throw new Error("Brand SVG is missing a viewBox");
        }
        return `<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${viewBox}">`;
      },
    )
    .replace(/<title>.*?<\/title>/g, "");
}

function buildOgSvg(logo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#141B3D"/>
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#FFFFFF" stroke-opacity="0.045"/>
    </pattern>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.7">
      <stop offset="0" stop-color="#2F55D4" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#2F55D4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g fill="none" stroke="#FFFFFF" stroke-opacity="0.07">
    <circle cx="1010" cy="315" r="150"/>
    <circle cx="1010" cy="315" r="250"/>
    <circle cx="1010" cy="315" r="350"/>
  </g>
  <circle cx="1010" cy="315" r="4" fill="#8FA6FF"/>
  <circle cx="860" cy="315" r="5" fill="#FFFFFF" fill-opacity="0.5"/>

  ${nestedSvg(logo, { x: 80, y: 78, width: 340, height: 63.4 })}

  <text x="80" y="236" fill="#9DB2FF" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="17" font-weight="600" letter-spacing="3">PRELAUNCH · BUILT ON SOLANA</text>
  <text x="80" y="320" fill="#FFFFFF" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="58" font-weight="600" letter-spacing="-2">A simpler way to explore</text>
  <text x="80" y="386" fill="#FFFFFF" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="58" font-weight="600" letter-spacing="-2">tokenized assets.</text>
  <text x="80" y="444" fill="#FFFFFF" fill-opacity="0.62" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="23" font-weight="400">Self-custodial investing on Solana. Join the waitlist.</text>

  <path d="M80 518H1120" stroke="#FFFFFF" stroke-opacity="0.12"/>
  <text x="80" y="560" fill="#FFFFFF" fill-opacity="0.5" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="17">debro.finance</text>
  <text x="1120" y="560" fill="#FFFFFF" fill-opacity="0.5" text-anchor="end" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="17">Prelaunch · Join the waitlist</text>
</svg>`;
}

function buildAppleIconSvg(icon) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="#141B3D"/>
  ${nestedSvg(icon, { x: 38, y: 38, width: 104, height: 104 })}
</svg>`;
}

async function main() {
  await mkdir(branding, { recursive: true });

  const [logo, icon] = await Promise.all([
    readSvg("debro-logo.svg"),
    readSvg("debro-icon.svg"),
  ]);

  const ogSvg = buildOgSvg(logo);
  await writeFile(path.join(branding, "og-image.svg"), ogSvg, "utf8");
  await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(
    path.join(branding, "og-image.png"),
  );

  const appleSvg = buildAppleIconSvg(icon);
  await sharp(Buffer.from(appleSvg))
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "src", "app", "apple-icon.png"));

  console.log("Generated public/branding/og-image.png and src/app/apple-icon.png");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
