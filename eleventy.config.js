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

// The contents navigation for a page: its h2 headings as a list, with each
// h2's h3 headings in a list inside it. Named by the page's h1, which the
// layout gives the id page-title. Empty when the page has no h2 or h3.
function contentsNav(headings) {
  const entries = headings.filter((h) => h.level === 2 || h.level === 3);
  if (!entries.length) return "";

  let items = "";
  let openItem = false; // a top-level <li> is waiting for its </li>
  let openList = false; // a nested <ul> of h3 entries is waiting for its </ul>
  for (const h of entries) {
    const link = `<a href="#${h.id}">${h.label}</a>`;
    if (h.level === 3 && openItem) {
      if (!openList) items += '<ul role="list">';
      openList = true;
      items += `<li>${link}</li>`;
    } else {
      // An h2, or an h3 that comes before any h2 and so has nothing to sit under.
      if (openList) items += "</ul>";
      if (openItem) items += "</li>";
      openList = false;
      openItem = true;
      items += `<li>${link}`;
    }
  }
  if (openList) items += "</ul>";
  if (openItem) items += "</li>";

  return `<nav class="panel" aria-labelledby="page-title">
          <p class="panel-title">Contents</p>
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

export default function (eleventyConfig) {
  // Gives every heading without an id one made from its text, so a page can
  // link to its own sections and other pages can link to them: "## Part 1:
  // Sound and waves" becomes id="part-1-sound-and-waves". Uses Eleventy's
  // slugify filter, the same one its IdAttributePlugin uses. Then, on pages with
  // a side panel, replaces the page-contents comment in the layout with the
  // contents navigation, built from the same headings.
  eleventyConfig.addTransform("headings", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    const slugify = eleventyConfig.getFilter("slugify");
    const used = new Set([...content.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const headings = [];

    const withIds = content.replace(/<h([1-6])>(.*?)<\/h\1>/gs, (whole, level, inner) => {
      const label = inner.replace(/<[^>]+>/g, "").trim();
      const base = slugify(decodeEntities(label)) || "section";
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      headings.push({ level: Number(level), id, label });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    });

    return withIds.replace("<!--page-contents-->", contentsNav(headings));
  });

  // Bulleted lists are shown without bullets (see style.css). Safari drops list
  // semantics from a list with no bullets unless it has role="list", and
  // Markdown cannot add attributes, so add it to every <ul> here.
  eleventyConfig.addTransform("list-role", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    return content.replaceAll("<ul>", '<ul role="list">');
  });

  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });
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
