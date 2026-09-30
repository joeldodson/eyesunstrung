// Renders branding/unstrungApp-avatar.svg to PNG for the unstrungApp YouTube
// channel's profile picture.
//
//   npm run build:avatar
//
// Writes branding/unstrungApp-avatar-150.png (YouTube's recommended 150 by 150)
// and branding/unstrungApp-avatar-800.png (sharper on high-resolution screens;
// YouTube accepts it too). Both are far under YouTube's 1MB limit. Run
// npm run build:banner first if the drawing changed.
//
// Uses playwright-core with the Microsoft Edge already installed on Windows,
// so no browser is downloaded.

import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const dir = path.join(import.meta.dirname, "..", "branding");
const svgUrl = "file:///" + path.join(dir, "unstrungApp-avatar.svg").replaceAll("\\", "/");

const browser = await chromium.launch({ channel: "msedge" });
for (const size of [150, 800]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.goto(svgUrl);
  const file = path.join(dir, `unstrungApp-avatar-${size}.png`);
  await page.screenshot({ path: file, omitBackground: false });
  console.log(`${path.basename(file)}: ${size} by ${size}, ${fs.statSync(file).size} bytes`);
  await page.close();
}
await browser.close();
