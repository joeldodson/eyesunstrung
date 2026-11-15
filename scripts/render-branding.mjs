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
//
// And, in content/assets/images/, published with the site:
//   social-card.png                     the picture apps show beside a shared link to the site,
//                                       1200 by 630, the size they ask for
// No page displays it. The site shows only SVG images; this is a copy for the apps that build
// link previews, which do not accept SVG. base.njk names it in each page's head. It is the
// YouTube banner's drawing, which has the wall above and the table below the site banner, cut to
// the site banner with a margin of 50 units each side.
//
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

// The link preview picture. The YouTube banner's SVG is in the site banner's coordinates, 1200 by
// 240 with its top left at 0, 0, so a viewBox 1300 wide centred on the banner, in the card's
// proportions, shows the whole banner with wall above it and table below.
{
  const card = { width: 1200, height: 630, units: 1300 };
  const unitsHigh = (card.units * card.height) / card.width;
  const viewBox = `${600 - card.units / 2} ${120 - unitsHigh / 2} ${card.units} ${unitsHigh}`;
  const source = fs.readFileSync(path.join(dir, "unstrungApp-youtube-banner.svg"), "utf8");
  if (!/^<svg [^>]*viewBox="[^"]*"/.test(source)) throw new Error("unstrungApp-youtube-banner.svg has no viewBox to replace");
  const svg = source.replace(/viewBox="[^"]*"/, `viewBox="${viewBox}" width="${card.width}" height="${card.height}" style="display:block"`);
  const page = await browser.newPage({ viewport: { width: card.width, height: card.height } });
  await page.setContent(`<!doctype html><body style="margin:0">${svg}</body>`);
  const file = path.join(dir, "..", "content", "assets", "images", "social-card.png");
  await page.screenshot({ path: file });
  console.log(`social-card.png: ${card.width} by ${card.height}, ${fs.statSync(file).size} bytes`);
  await page.close();
}
await browser.close();
