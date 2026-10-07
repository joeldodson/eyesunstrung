// The unstrung documentation, from the release that scripts/fetch-unstrung.mjs unpacked into
// unstrung-release/. The files come from unstrungApp's user-docs folder, so they are written once
// for both the app's Help menu and these pages.
//
// Each document's own level 1 heading becomes the page title, which the layout writes as the h1,
// so it is left out of the body. Links to eyesunstrung.vip are written as full addresses, so they
// work inside the desktop app; here they become site-relative, so the build's link check covers
// them.
//
// available is false when no release has been fetched, or the release has no documentation. The
// pages that use this say so rather than failing the build.

import fs from "node:fs";
import path from "node:path";
import markdownIt from "markdown-it";

const docsDir = path.join(import.meta.dirname, "..", "..", "unstrung-release", "user-docs");
const md = markdownIt({ html: true });

function render(id) {
  const markdown = fs.readFileSync(path.join(docsDir, `${id}.md`), "utf8").replace(/\r\n/g, "\n");
  const body = markdown.replace(/^\s*#\s+.*\n/, "");
  return md.render(body).replace(/href="https:\/\/eyesunstrung\.vip(\/[^"]*)?"/g, (_m, rest) => `href="${rest || "/"}"`);
}

export default function () {
  const indexFile = path.join(docsDir, "index.json");
  if (!fs.existsSync(indexFile)) return { available: false, documents: [] };

  const index = JSON.parse(fs.readFileSync(indexFile, "utf8"));
  return {
    available: true,
    version: index.version,
    about: { ...index.about, html: render(index.about.id) },
    documents: index.documents.map((doc) => ({ ...doc, html: render(doc.id) })),
    introduction: (() => {
      const doc = index.documents.find((d) => d.id === "introduction");
      return doc ? { ...doc, html: render(doc.id) } : null;
    })(),
  };
}
