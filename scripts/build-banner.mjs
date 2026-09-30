// Draws the eyesunstrung banner and favicon as SVG.
//
//   npm run build:banner
//
// Writes content/assets/images/banner.svg and content/assets/images/favicon.svg.
// Both are committed; rerun this after changing anything below.
//
// The banner: an unstrung archtop guitar lying on its edge on a table, body on
// the left, neck sloping down to the right so that it rests on both its lower
// bout and its headstock, with a pair of sunglasses on the table under the
// neck, and "eyesunstrung" in the upper right.
//
// The guitar is modelled on a 17-inch single-cutaway archtop such as the
// Eastman AR905CE, drawn to its proportions but with no maker's logo, inlay
// design or other trade dress: 25-inch scale, neck joining the body at the
// 14th fret, fretboard to the 20th fret, floating bridge, floating pickup and
// pickguard, ebony tailpiece. The sunglasses are a generic thick-framed shape
// with no branding.
//
// The guitar is drawn in inches in its own coordinates: x runs along the
// guitar from the endpin (0) to the headstock tip (42), y across it, negative
// on the bass side (upward in the picture) and positive on the treble side,
// where the cutaway is. One transform places, scales and tilts it; the tilt
// and position are worked out below from the drawing itself.
//
// The title is converted to outlines with opentype.js, because an SVG shown
// through <img> cannot load a web font. The typeface is Atkinson Hyperlegible
// Next, the site's own, at weight 800 (SIL Open Font License 1.1).

import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";

const root = path.join(import.meta.dirname, "..");
const outDir = path.join(root, "content", "assets", "images");
const fontFile = path.join(
  root,
  "node_modules/@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-800-normal.woff",
);

// ---------------------------------------------------------------- scene

const W = 1200;
const H = 240;
const scale = 11.5; // pixels per inch
const margin = { left: 40, top: 12 }; // space left of and above the guitar

const colors = {
  wallTop: "#15191d",
  wallBottom: "#232a30",
  tableTop: "#7a5433",
  tableFront: "#4f341d",
  tableGrain: "#5e3f24",
  title: "#f3e9d2",
  binding: "#efe3c4",
  ebony: "#1c1512",
  ebonyEdge: "#3a2a20",
  fret: "#c9c9c9",
  pearl: "#efe8da",
  gold: "#d4af37",
  pickguard: "#4a2310",
  pickup: "#121212",
  frame: "#0e0e0e",
};


// ---------------------------------------------------------------- guitar

const scaleLength = 25;
const bodyEnd = 21.5; // where the neck leaves the body, at the 14th fret
const nut = bodyEnd + scaleLength * (1 - 2 ** (-14 / 12));
const bridge = nut - scaleLength;
const fretX = (n) => nut - scaleLength * (1 - 2 ** (-n / 12));
const fretboardEnd = fretX(20);
const nutHalf = 0.86;
const endHalf = 1.13;
const halfWidthAt = (x) => nutHalf + ((nut - x) / (nut - fretboardEnd)) * (endHalf - nutHalf);

// Body outline, clockwise from the endpin: bass side (upper edge) to the neck,
// then the treble side back, through the rounded cutaway.
const bodySegments = [
  [[0, -5], [2.5, -8.5], [6, -8.5]], // lower bout, bass side
  [[9.4, -8.5], [10.8, -5.3], [12.6, -5.3]], // waist
  [[14.4, -5.3], [15.8, -6.4], [17.4, -6.4]], // upper bout
  [[19.8, -6.4], [bodyEnd, -4], [bodyEnd, -1.12]], // shoulder into the neck
];
const cutawaySegments = [
  [[21.7, 2.1], [20.9, 2.6], [20.2, 2.45]], // horn tip
  [[18.8, 2.1], [17.2, 2.8], [16.4, 4.3]], // the scoop
  [[15.8, 5.4], [14.4, 5.3], [12.6, 5.3]], // back to the waist
  [[10.8, 5.3], [9.4, 8.5], [6, 8.5]], // lower bout, treble side
  [[2.5, 8.5], [0, 5], [0, 0]],
];
const bodyPath =
  "M 0 0 " +
  bodySegments.map((s) => "C " + s.map((p) => p.join(" ")).join(", ")).join(" ") +
  ` L ${bodyEnd} 1.12 ` +
  cutawaySegments.map((s) => "C " + s.map((p) => p.join(" ")).join(", ")).join(" ") +
  " Z";

// Points along the body outline, for placing the table under it.
function sampleBody() {
  const points = [];
  let start = [0, 0];
  for (const seg of [...bodySegments, [[bodyEnd, 1.12], [bodyEnd, 1.12], [bodyEnd, 1.12]], ...cutawaySegments]) {
    const [c1, c2, end] = seg;
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const u = 1 - t;
      points.push([0, 1].map((k) => u * u * u * start[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t * t * t * end[k]));
    }
    start = end;
  }
  return points;
}

const f = (n) => Number(n.toFixed(3));

const fretboardPath = `M ${f(fretboardEnd)} ${-endHalf} L ${f(nut)} ${-nutHalf} L ${f(nut)} ${nutHalf} L ${f(fretboardEnd)} ${endHalf} Z`;

const frets = Array.from({ length: 20 }, (_, i) => {
  const x = f(fretX(i + 1));
  const h = f(halfWidthAt(x) - 0.04);
  return `<line x1="${x}" y1="${-h}" x2="${x}" y2="${h}"/>`;
}).join("");

const markers = [3, 5, 7, 9, 12, 15, 17]
  .flatMap((n) => {
    const x = f((fretX(n) + fretX(n - 1)) / 2);
    return n === 12 ? [[x, -0.45], [x, 0.45]] : [[x, 0]];
  })
  .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0.13"/>`)
  .join("");

// Flared headstock with a scalloped tip, ebony-faced, no logo.
const headstockPath = `M ${f(nut)} ${-nutHalf} C 36.5 -0.95, 37.5 -1.5, 38.5 -1.6 L 41.2 -1.75 C 41.9 -1.78, 42.2 -1.2, 41.9 -0.7 C 41.7 -0.3, 41.7 0.3, 41.9 0.7 C 42.2 1.2, 41.9 1.78, 41.2 1.75 L 38.5 1.6 C 37.5 1.5, 36.5 0.95, ${f(nut)} ${nutHalf} Z`;

const tunerXs = [37.3, 38.9, 40.5];
const tuners = tunerXs
  .flatMap((x) => [-1, 1].map((side) => {
    const edge = side * (x < 38.5 ? 1.35 + (x - 37) * 0.18 : 1.62);
    return `<rect x="${x - 0.09}" y="${Math.min(edge, side * 2.05)}" width="0.18" height="${f(Math.abs(side * 2.05 - edge))}" fill="${colors.gold}"/>` +
      `<ellipse cx="${x}" cy="${side * 2.3}" rx="0.32" ry="0.42" fill="${colors.gold}" stroke="#9c7c1c" stroke-width="0.05"/>` +
      `<circle cx="${x}" cy="${side * 1.05}" r="0.17" fill="${colors.gold}"/>`;
  }))
  .join("");

// F-holes: a curved slot with a round eye at each end and notches at the middle.
function fHole(side) {
  const y = (v) => f(side * v);
  return `<path d="M 7.9 ${y(4.55)} C 9.8 ${y(4.95)}, 11.6 ${y(2.95)}, 13.3 ${y(3.35)}" fill="none" stroke="${colors.ebony}" stroke-width="0.32" stroke-linecap="round"/>` +
    `<circle cx="7.9" cy="${y(4.55)}" r="0.38" fill="${colors.ebony}"/>` +
    `<circle cx="13.3" cy="${y(3.35)}" r="0.38" fill="${colors.ebony}"/>` +
    `<line x1="10.55" y1="${y(3.55)}" x2="10.55" y2="${y(4.45)}" stroke="${colors.ebony}" stroke-width="0.09"/>`;
}

// ---------------------------------------------------------------- resting position

// The guitar lies on its treble edge. Turn it, neck end down, until the lowest
// point of the headstock end (the treble-side tuner buttons) is as low as the
// lowest point of the body: then it rests on both, as a guitar laid on a
// table does. Found by bisection on the angle.
const bodyOutline = sampleBody();
const headstockRest = tunerXs.map((x) => [x, 2.3 + 0.42]);
const lowestAt = (points, t) => Math.max(...points.map(([x, y]) => x * Math.sin(t) + y * Math.cos(t)));
let lo = 0;
let hi = 0.6;
for (let i = 0; i < 60; i++) {
  const mid = (lo + hi) / 2;
  if (lowestAt(bodyOutline, mid) > lowestAt(headstockRest, mid)) lo = mid;
  else hi = mid;
}
const theta = lo;
const tiltDegrees = f((theta * 180) / Math.PI);

// Everything that sticks out furthest, for placing the guitar in the frame.
const extremities = [
  ...bodyOutline,
  ...tunerXs.flatMap((x) => [[x, -2.72], [x, 2.72]]),
  [41.2, -1.75], [42, 0], [41.2, 1.75],
];
const rotate = ([x, y]) => [x * Math.cos(theta) - y * Math.sin(theta), x * Math.sin(theta) + y * Math.cos(theta)];
const rotated = extremities.map(rotate);
const guitarOrigin = {
  x: f(margin.left - scale * Math.min(...rotated.map(([x]) => x))),
  y: f(margin.top - scale * Math.min(...rotated.map(([, y]) => y))),
};
const toPicture = (point) => {
  const [x, y] = rotate(point);
  return [guitarOrigin.x + scale * x, guitarOrigin.y + scale * y];
};

const pickguardPath = "M 18.1 1.5 C 17 1.6, 14.6 2.0, 13.4 3.0 C 12.8 3.6, 13.3 4.3, 14.3 4.2 C 15.7 4.0, 17.1 3.2, 18.1 2.2 Z";

const guitar = `
  <g id="guitar" transform="translate(${guitarOrigin.x} ${guitarOrigin.y}) rotate(${tiltDegrees}) scale(${scale})">
    <path id="guitar-body" d="${bodyPath}" fill="url(#finish)" stroke="${colors.binding}" stroke-width="0.16"/>
    ${fHole(1)}${fHole(-1)}
    <path id="tailpiece" d="M 0.4 -0.85 L 5 -1.3 Q 5.5 -1.3 5.5 -0.8 L 5.5 0.8 Q 5.5 1.3 5 1.3 L 0.4 0.85 Q 0.15 0.85 0.15 0.5 L 0.15 -0.5 Q 0.15 -0.85 0.4 -0.85 Z" fill="${colors.ebony}" stroke="${colors.ebonyEdge}" stroke-width="0.06"/>
    <circle cx="-0.05" cy="0" r="0.2" fill="${colors.binding}"/>
    <g id="bridge">
      <rect x="${f(bridge - 0.27)}" y="-2.7" width="0.54" height="5.4" rx="0.18" fill="${colors.ebony}" stroke="${colors.ebonyEdge}" stroke-width="0.06"/>
      <rect x="${f(bridge - 0.09)}" y="-1.45" width="0.18" height="2.9" rx="0.06" fill="#2e2019"/>
      <circle cx="${f(bridge)}" cy="-1.85" r="0.2" fill="${colors.gold}"/>
      <circle cx="${f(bridge)}" cy="1.85" r="0.2" fill="${colors.gold}"/>
    </g>
    <path id="pickguard" d="${pickguardPath}" fill="${colors.pickguard}" stroke="${colors.binding}" stroke-width="0.07"/>
    <path id="fretboard" d="${fretboardPath}" fill="${colors.ebony}" stroke="${colors.binding}" stroke-width="0.07"/>
    <g stroke="${colors.fret}" stroke-width="0.07">${frets}</g>
    <g fill="${colors.pearl}">${markers}</g>
    <rect id="pickup" x="${f(fretboardEnd - 1.75)}" y="-1.3" width="1.5" height="2.6" rx="0.15" fill="${colors.pickup}" stroke="#3a3a3a" stroke-width="0.06"/>
    <path id="headstock" d="${headstockPath}" fill="${colors.ebony}" stroke="${colors.binding}" stroke-width="0.07"/>
    <rect id="nut" x="${f(nut - 0.1)}" y="${-nutHalf}" width="0.2" height="${nutHalf * 2}" fill="${colors.pearl}"/>
    ${tuners}
  </g>`;

// ---------------------------------------------------------------- table

const bodyPoints = bodyOutline.map(toPicture);
const contactY = Math.max(...bodyPoints.map(([, y]) => y));
const contactX = bodyPoints.find(([, y]) => y === contactY)[0];
const headContactX = toPicture(headstockRest[1])[0];
const tableTop = Math.round(contactY - 20); // far edge of the table, behind the guitar
const tableFront = H - 12; // near edge, where the front face starts

const grain = [0.3, 0.55, 0.8]
  .map((t) => {
    const y = f(tableTop + t * (tableFront - tableTop));
    return `<path d="M 0 ${y} C 300 ${f(y - 3)}, 700 ${f(y + 4)}, ${W} ${f(y - 1)}" fill="none" stroke="${colors.tableGrain}" stroke-width="1.2" opacity="0.6"/>`;
  })
  .join("");

const table = `
  <g id="table">
    <rect x="0" y="${tableTop}" width="${W}" height="${tableFront - tableTop}" fill="${colors.tableTop}"/>
    ${grain}
    <rect x="0" y="${tableFront}" width="${W}" height="${H - tableFront}" fill="${colors.tableFront}"/>
  </g>
  <ellipse cx="${f(contactX + 60)}" cy="${f(contactY + 1)}" rx="150" ry="6" fill="#000" opacity="0.35" filter="url(#soft)"/>
  <ellipse cx="${f(headContactX)}" cy="${f(contactY + 1)}" rx="45" ry="4" fill="#000" opacity="0.35" filter="url(#soft)"/>`;

// ---------------------------------------------------------------- sunglasses

// Drawn around (0, 0) at the bottom centre of the frame, 152 by 58 units, then
// scaled to about real size for the guitar (roughly 6 by 2 inches, a little
// larger so they read) and placed on the table under the neck, just past where
// it leaves the body, slightly in front of the guitar.
const lensFrame = "M 6 -50 L 72 -58 Q 77 -58 76 -52 L 69 -15 Q 65 -2 50 -2 L 22 -2 Q 8 -2 6 -14 Z";
const lensGlass = "M 12 -45 L 68 -52 L 63 -17 Q 60 -8 48 -8 L 24 -8 Q 14 -8 12 -18 Z";
const glassesAt = { x: f(toPicture([bodyEnd + 1.5, 0])[0]), y: f(contactY + 7) };
const glassesScale = 0.6;
const oneSide = `<path d="${lensFrame}" fill="${colors.frame}"/><path d="${lensGlass}" fill="url(#lens)"/>` +
  `<path d="M 20 -40 L 34 -46 L 26 -20 Z" fill="#fff" opacity="0.12"/>` +
  `<circle cx="70" cy="-52" r="1.8" fill="#9aa3ab"/>`;
const sunglasses = `
  <ellipse cx="${glassesAt.x}" cy="${f(glassesAt.y + 2)}" rx="${f(80 * glassesScale)}" ry="3" fill="#000" opacity="0.4" filter="url(#soft)"/>
  <g id="sunglasses" transform="translate(${glassesAt.x} ${glassesAt.y}) scale(${glassesScale})">
    <g>${oneSide}</g>
    <g transform="scale(-1 1)">${oneSide}</g>
    <path d="M -7 -50 Q 0 -57 7 -50 L 7 -41 Q 0 -47 -7 -41 Z" fill="${colors.frame}"/>
  </g>`;

// ---------------------------------------------------------------- title

const fontBytes = fs.readFileSync(fontFile);
const font = opentype.parse(fontBytes.buffer.slice(fontBytes.byteOffset, fontBytes.byteOffset + fontBytes.byteLength));
const titleSize = 68;
const titleRight = W - 40;
const probe = font.getPath("eyesunstrung", 0, 0, titleSize).getBoundingBox();
const titlePath = font.getPath("eyesunstrung", titleRight - probe.x2, 84, titleSize);
// Path data written from opentype's commands rather than its toPathData(),
// which in opentype.js 2.0.0 can write NaN for a coordinate (it did for one
// "s" at 68px), and a browser stops drawing a path at the first bad number.
const pathData = (commands) =>
  commands
    .map((c) => c.type + ["x1", "y1", "x2", "y2", "x", "y"].filter((k) => k in c).map((k) => c[k].toFixed(2)).join(" "))
    .join("");
const title = `<path id="title" d="${pathData(titlePath.commands)}" fill="${colors.title}"/>`;

// ---------------------------------------------------------------- write

const description =
  "An unstrung archtop guitar lying on its edge on a wooden table, body on the left, the neck sloping " +
  "down to the right with the headstock resting on the table, and a pair of dark sunglasses on the " +
  "table below the neck. The word eyesunstrung is in the upper right.";

const banner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="banner-title banner-desc">
  <title id="banner-title">eyesunstrung</title>
  <desc id="banner-desc">${description}</desc>
  <!-- Generated by scripts/build-banner.mjs. Edit that, not this. -->
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${colors.wallTop}"/>
      <stop offset="1" stop-color="${colors.wallBottom}"/>
    </linearGradient>
    <radialGradient id="finish" gradientUnits="userSpaceOnUse" cx="9.5" cy="0.4" r="11.5">
      <stop offset="0" stop-color="#e3a549"/>
      <stop offset="0.5" stop-color="#c47a28"/>
      <stop offset="0.8" stop-color="#7d3d15"/>
      <stop offset="1" stop-color="#3c1b0a"/>
    </radialGradient>
    <linearGradient id="lens" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#101820"/>
      <stop offset="1" stop-color="#34495c"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-200%" width="140%" height="500%">
      <feGaussianBlur stdDeviation="4"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#wall)"/>
  ${table}
  ${guitar}
  ${sunglasses}
  ${title}
</svg>
`;

// Favicon: the sunglasses on a square in the guitar's amber finish.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <!-- Generated by scripts/build-banner.mjs. Edit that, not this. -->
  <defs>
    <radialGradient id="finish" cx="0.45" cy="0.4" r="0.75">
      <stop offset="0" stop-color="#e3a549"/>
      <stop offset="0.6" stop-color="#c47a28"/>
      <stop offset="1" stop-color="#6b3212"/>
    </radialGradient>
    <linearGradient id="lens" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#101820"/>
      <stop offset="1" stop-color="#34495c"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#finish)"/>
  <g transform="translate(32 45) scale(0.37)">
    <g><path d="${lensFrame}" fill="${colors.frame}"/><path d="${lensGlass}" fill="url(#lens)"/></g>
    <g transform="scale(-1 1)"><path d="${lensFrame}" fill="${colors.frame}"/><path d="${lensGlass}" fill="url(#lens)"/></g>
    <path d="M -7 -50 Q 0 -57 7 -50 L 7 -41 Q 0 -47 -7 -41 Z" fill="${colors.frame}"/>
  </g>
</svg>
`;

for (const [name, svg] of [["banner.svg", banner], ["favicon.svg", favicon]]) {
  if (/NaN|undefined/.test(svg)) throw new Error(`${name} contains NaN or undefined; not written`);
}
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "banner.svg"), banner);
fs.writeFileSync(path.join(outDir, "favicon.svg"), favicon);
console.log(`banner.svg ${banner.length} bytes, favicon.svg ${favicon.length} bytes; tilt ${tiltDegrees} degrees, guitar origin ${guitarOrigin.x},${guitarOrigin.y}, table contact at y=${f(contactY)}`);
