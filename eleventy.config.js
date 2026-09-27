// Eleventy configuration for eyesunstrung.vip.
//
// Pages are Markdown in content/, rendered through the one layout in
// content/_includes/base.njk. The font comes from its npm package at build
// time, with its licence, so nothing third-party is committed here.

import fs from "node:fs";
import { IdAttributePlugin } from "@11ty/eleventy";

const fontPackage = "node_modules/@fontsource-variable/atkinson-hyperlegible-next";

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
  // Gives every heading an id made from its text, so a page can link to its own
  // sections and other pages can link to them: "## Part 1: Sound and waves"
  // becomes id="part-1-sound-and-waves".
  eleventyConfig.addPlugin(IdAttributePlugin);

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
