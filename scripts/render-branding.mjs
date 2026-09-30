// Renders the unstrungApp YouTube channel images in branding/ from SVG to PNG,
// since YouTube does not accept SVG.
//
//   npm run build:branding
//
// Writes, in branding/:
//   unstrungApp-avatar-150.png          profile picture, YouTube's recommended 150 by 150
//   unstrungApp-avatar-800.png          the same, sharper on high-resolution screens
//   unstrungApp-youtube-banner.png      channel banner, YouTube's recommended 2560 by 1440
// All are far under YouTube's limits (1MB for the picture, 6MB for the banner).
// Run npm run build:banner first if the drawing changed.
//
// Uses playwright-core with the Microsoft Edge already installed on Windows,
// so no browser is downloaded.

import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const dir = path.join(import.meta.dirname, "..", "branding");
const fileUrl = (name) => "file:///" + path.join(dir, name).replaceAll("\\", "/");

const renders = [
  { svg: "unstrungApp-avatar.svg", png: "unstrungApp-avatar-150.png", width: 150, height: 150 },
  { svg: "unstrungApp-avatar.svg", png: "unstrungApp-avatar-800.png", width: 800, height: 800 },
  { svg: "unstrungApp-youtube-banner.svg", png: "unstrungApp-youtube-banner.png", width: 2560, height: 1440 },
];

const browser = await chromium.launch({ channel: "msedge" });
for (const { svg, png, width, height } of renders) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(fileUrl(svg));
  const file = path.join(dir, png);
  await page.screenshot({ path: file });
  console.log(`${png}: ${width} by ${height}, ${fs.statSync(file).size} bytes`);
  await page.close();
}
await browser.close();
