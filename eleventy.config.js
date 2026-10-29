// Eleventy configuration for eyesunstrung.vip.
//
// Pages are Markdown in content/, rendered through the one layout in
// content/_includes/base.njk. The font comes from its npm package at build
// time, with its licence, so nothing third-party is committed here.

import fs from "node:fs";
import path from "node:path";

const fontPackage = "node_modules/@fontsource-variable/atkinson-hyperlegible-next";

// Markdown output escapes these in heading text; ids are made from the
// characters themselves, so "&amp;" becomes "and", not "amp".
function decodeEntities(text) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'" };
  return text.replace(/&(amp|lt|gt|quot|#39);/g, (whole, name) => named[name]);
}

// The section number of a heading, from the count of headings so far at each
// level from h2 down: the second h3 under the first h2 is "1.2". Truncating
// counters drops the deeper counts, so they start again under a new heading.
// A level with no heading yet above this one counts as 0. unstrungApp numbers
// its Help documents the same way (src/shared/markdown.mjs), so a section has
// the same number in the app and here.
function sectionNumber(counters, level) {
  const depth = level - 2;
  counters.length = depth + 1;
  counters[depth] = (counters[depth] ?? 0) + 1;
  return Array.from(counters, (n) => n ?? 0).join(".");
}

// The contents navigation for a page, titled "Current Page Contents" on
// screen and, like the list panels in the layout, with no aria-label, so the
// title is what NVDA reads after "navigation landmark". Its first link is the
// page's h1,
// which the layout gives the id page-title, without a number. Then come the
// h2 headings, with their h3 headings in a list inside each and the h4
// headings inside those, each with its section number. Empty when the page
// has no h2, h3 or h4.
function contentsNav(headings, title) {
  const entries = headings.filter((h) => h.level >= 2 && h.level <= 4);
  if (!entries.length) return "";

  // title gives mouse users the full heading when the panel truncates it.
  const link = (id, text) => `<a href="#${id}" title="${text.replace(/"/g, "&quot;")}">${text}</a>`;
  let items = `<li>${link("page-title", title)}</li>`;
  // The entries whose <li> is still open, outermost first. A heading closes
  // every open entry at its own level or deeper, then sits inside the one
  // left, or at the top when none is: an h3 before any h2 has nothing to sit
  // under.
  const open = [];
  const close = () => {
    const entry = open.pop();
    items += (entry.hasList ? "</ul>" : "") + "</li>";
  };
  for (const h of entries) {
    while (open.length && open.at(-1).level >= h.level) close();
    const parent = open.at(-1);
    if (parent && !parent.hasList) {
      items += '<ul role="list">';
      parent.hasList = true;
    }
    items += `<li>${link(h.id, `${h.number}: ${h.label}`)}`;
    open.push({ level: h.level, hasList: false });
  }
  while (open.length) close();

  return `<nav class="panel">
          <p class="panel-title">Current Page Contents</p>
          <ul role="list">${items}</ul>
        </nav>`;
}

// Structural problems in one built article page, as sentences.
function articleProblems(html) {
  const problems = [];
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) {
    problems.push(
      `the page has ${h1Count} level 1 headings; the title is the only one, so start sections at ##`,
    );
  }

  let previous = 1;
  for (const match of html.matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gs)) {
    const level = Number(match[1]);
    if (level > previous + 1) {
      const text = match[2].replace(/<[^>]+>/g, "").trim();
      problems.push(`"${text}" is a level ${level} heading after level ${previous}; levels cannot be skipped`);
    }
    previous = level;
  }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, target] of html.matchAll(/href="#([^"]*)"/g)) {
    if (!ids.has(target)) problems.push(`the link to #${target} matches no heading`);
  }
  return problems;
}

// Whether a page is one of the site's own HTML pages, which the transforms
// below work on. The unstrung web app's page is not: it is the app's markup,
// with only the menu bar added.
function isSitePage(page) {
  return (page.outputPath || "").endsWith(".html") && page.url !== "/unstrung/app/";
}

export default function (eleventyConfig) {
  // Gives every heading without an id one made from its text, so a page can
  // link to its own sections and other pages can link to them: "## Part 1:
  // Sound and waves" becomes id="part-1-sound-and-waves". Uses Eleventy's
  // slugify filter, the same one its IdAttributePlugin uses.
  //
  // On pages with a side panel, which the page-contents comment in the layout
  // marks, every heading below the h1 also gets its section number in front of
  // its text: "1: ", "1.1: ", "1.1.1: ". The colon makes a short pause after
  // the number in speech. The id is made from the text without the number, so
  // links to a section keep working when sections are added or moved. Then the
  // comment is replaced with the contents navigation, built from the same
  // headings. docs/site-structure.md has the reasons.
  eleventyConfig.addTransform("headings", function (content) {
    if (!isSitePage(this.page)) return content;
    const slugify = eleventyConfig.getFilter("slugify");
    const used = new Set([...content.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const hasContents = content.includes("<!--page-contents-->");
    const counters = [];
    const headings = [];

    const withIds = content.replace(/<h([1-6])>(.*?)<\/h\1>/gs, (whole, level, inner) => {
      const label = inner.replace(/<[^>]+>/g, "").trim();
      const base = slugify(decodeEntities(label)) || "section";
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      const number = hasContents && level >= 2 ? sectionNumber(counters, Number(level)) : "";
      headings.push({ level: Number(level), id, label, number });
      return `<h${level} id="${id}">${number ? `${number}: ` : ""}${inner}</h${level}>`;
    });

    if (!hasContents) return withIds;
    const title = (withIds.match(/<h1 id="page-title">(.*?)<\/h1>/s)?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
    return withIds.replace("<!--page-contents-->", contentsNav(headings, title));
  });

  // Bulleted lists are shown without bullets (see style.css). Safari drops list
  // semantics from a list with no bullets unless it has role="list", and
  // Markdown cannot add attributes, so add it to every <ul> here.
  eleventyConfig.addTransform("list-role", function (content) {
    if (!isSitePage(this.page)) return content;
    return content.replaceAll("<ul>", '<ul role="list">');
  });

  // A link whose text says "(opens in new tab)" opens in a new tab. Markdown
  // cannot say so itself, and the words belong in the link anyway: a screen
  // reader user moved to a new tab without warning loses the way back. So the
  // words are the instruction, and nothing else is written. "a new tab" and
  // any capitals match too. A link that already says where it opens is left
  // alone.
  eleventyConfig.addTransform("new-tab-links", function (content) {
    if (!isSitePage(this.page)) return content;
    return content.replace(
      /<a\s((?:(?!\btarget=)[^>])*)>((?:(?!<\/a>)[\s\S])*?\(opens in (?:a )?new tab\)(?:(?!<\/a>)[\s\S])*?)<\/a>/gi,
      '<a $1 target="_blank" rel="noopener">$2</a>',
    );
  });

  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });

  // The web version of unstrung, unpacked from an unstrungApp release by
  // scripts/fetch-unstrung.mjs (npm run fetch:unstrung). Copied as it is: it is
  // a finished app, not pages for this site to process. Its index.html is not
  // in the folder; content/unstrung/app/index.njk writes it, adding the menu bar.
  if (fs.existsSync("unstrung-release/app")) {
    eleventyConfig.addPassthroughCopy({ "unstrung-release/app": "unstrung/app" });
  }
  // The documentation pages read unstrung-release/user-docs at build time, and
  // content/unstrung/app/index.njk reads the app's page.
  eleventyConfig.addWatchTarget("unstrung-release/user-docs/");
  eleventyConfig.addWatchTarget("unstrung-release/app-page.html");
  eleventyConfig.addPassthroughCopy({
    [`${fontPackage}/files/atkinson-hyperlegible-next-latin-wght-normal.woff2`]:
      "assets/fonts/atkinson-hyperlegible-next-latin.woff2",
    [`${fontPackage}/LICENSE`]: "assets/fonts/OFL.txt",
  });

  // Checks every built article page and stops the build on a problem. Runs
  // after the build, not as a linter, because heading ids are only added at
  // the very end. docs/article-format.md describes the format checked here.
  eleventyConfig.on("eleventy.after", ({ results }) => {
    const reports = results
      .filter((r) => r.inputPath.startsWith("./content/articles/") && r.outputPath)
      .map((r) => [r.inputPath, articleProblems(fs.readFileSync(r.outputPath, "utf8"))])
      .filter(([, problems]) => problems.length)
      .map(([inputPath, problems]) => `${inputPath}:\n- ${problems.join("\n- ")}`);
    if (reports.length) {
      throw new Error(`${reports.join("\n")}\nSee docs/article-format.md.`);
    }
  });

  // Checks every link within the site, on every page: the page or file it
  // points to must exist, and so must the heading id after a #. Stops the
  // build on a broken link. Links to other sites are not checked.
  eleventyConfig.on("eleventy.after", ({ dir, results }) => {
    const pages = results.filter((r) => r.outputPath && r.outputPath.endsWith(".html"));
    const html = new Map(pages.map((r) => [path.resolve(r.outputPath), fs.readFileSync(r.outputPath, "utf8")]));
    const broken = [];

    for (const page of pages) {
      const source = html.get(path.resolve(page.outputPath));
      for (const [, href] of source.matchAll(/href="(\/(?!\/)[^"]*)"/g)) {
        const [target, hash] = href.split("#");
        let file = path.resolve(dir.output, "." + decodeURI(target.split("?")[0]));
        if (target.endsWith("/")) file = path.join(file, "index.html");
        if (!fs.existsSync(file)) {
          broken.push(`${page.inputPath}: ${href} does not exist`);
        } else if (hash && !new RegExp(`\\sid="${hash}"`).test(html.get(file) ?? fs.readFileSync(file, "utf8"))) {
          broken.push(`${page.inputPath}: ${href} has no heading with the id ${hash}`);
        }
      }
    }
    if (broken.length) {
      throw new Error(`Broken links:\n- ${[...new Set(broken)].join("\n- ")}`);
    }
  });

  // Dates in front matter are read as midnight UTC, so format them in UTC too,
  // or a date can show as the day before.
  eleventyConfig.addFilter("isoDate", (date) => date.toISOString().slice(0, 10));
  eleventyConfig.addFilter("readableDate", (date) =>
    date.toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" }),
  );

  // Plain text from elsewhere (YouTube descriptions) as HTML: escaped, blank
  // lines between paragraphs, single line breaks kept, web addresses as links.
  eleventyConfig.addFilter("paragraphs", (text) => {
    const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const linkify = (s) => s.replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)]/g, (url) => `<a href="${url}">${url}</a>`);
    return (text || "")
      .trim()
      .split(/\n\s*\n/)
      .map((para) => `<p>${linkify(escape(para.trim())).replace(/ *\n/g, "<br>\n")}</p>`)
      .join("\n");
  });

  eleventyConfig.addGlobalData("layout", "base.njk");
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());
}

export const config = {
  dir: {
    input: "content",
    output: "_site",
  },
  markdownTemplateEngine: "njk",
};
