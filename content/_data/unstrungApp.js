// The web app's page, from the release that scripts/fetch-unstrung.mjs unpacked into
// unstrung-release/, split where content/unstrung/app/index.njk puts the site's Main navigation
// bar: straight after the app's banner, the page's one <header>. The bar's stylesheet and script
// are added to the page's head. They are the only parts of the site the page loads; style.css
// would restyle the app.
//
// available is false when no release has been fetched. The build stops if the page has no single
// </header> or </head> to place the bar by, since the app's page would then have changed shape.

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

export default function () {
  if (!fs.existsSync(pageFile)) return { available: false };

  const page = fs.readFileSync(pageFile, "utf8");
  const [head, body] = splitOnce(page, "</head>");
  const [beforeMenu, afterMenu] = splitOnce(body, "</header>");
  const menuAssets =
    '    <link rel="stylesheet" href="/assets/css/menu.css" />\n' +
    '    <script src="/assets/js/menu.js" defer></script>\n';
  return {
    available: true,
    beforeMenu: `${head}${menuAssets}</head>${beforeMenu}</header>\n`,
    afterMenu,
  };
}
