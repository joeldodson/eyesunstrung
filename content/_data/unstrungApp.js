// The web app's page, from the release that scripts/fetch-unstrung.mjs unpacked into
// unstrung-release/, split around the app's own banner: its <header>, and the comment just before
// it. content/unstrung/app/index.njk puts the site's banner and Main navigation bar in its place,
// so the page has the same banner as every other page on the site. The desktop app keeps its own
// copy; only the app and its documentation come from unstrungApp.
//
// The stylesheet and script for the banner and the bar are added to the page's head. They are the
// only parts of the site the page loads; style.css would restyle the app.
//
// available is false when no release has been fetched. The build stops if the page has no single
// </head> and no single <header> to replace, since the app's page would then have changed shape.

import fs from "node:fs";
import path from "node:path";

const pageFile = path.join(import.meta.dirname, "..", "..", "unstrung-release", "app-page.html");

function splitOnce(text, marker) {
  const parts = text.split(marker);
  if (parts.length !== 2) {
    throw new Error(`unstrung-release/app-page.html has ${parts.length - 1} ${marker}, not one`);
  }
  return parts;
}

// The app's <header>, with any comment and indentation just before it and the space after it.
const APP_HEADER = /[ \t]*(?:<!--(?:(?!-->)[\s\S])*-->\s*)?<header\b[\s\S]*?<\/header>\s*/g;

export default function () {
  if (!fs.existsSync(pageFile)) return { available: false };

  const page = fs.readFileSync(pageFile, "utf8");
  const [head, body] = splitOnce(page, "</head>");
  const headers = [...body.matchAll(APP_HEADER)];
  if (headers.length !== 1) {
    throw new Error(`unstrung-release/app-page.html has ${headers.length} <header> elements, not one`);
  }
  const { index, 0: header } = headers[0];
  const assets = [
    '    <link rel="stylesheet" href="/assets/css/header.css" />',
    '    <script src="/assets/js/menu.js" defer></script>',
    "",
  ].join("\n");
  return {
    available: true,
    beforeHeader: `${head}${assets}</head>${body.slice(0, index)}`,
    afterHeader: `\n    ${body.slice(index + header.length)}`,
  };
}
