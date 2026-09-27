// Data for every page in content/articles/.
//
// Tags each one as an article, so it appears on /articles/, and checks its front
// matter. A missing title, description or date stops the build with a message
// naming the file. docs/article-format.md describes the format.

function checkFrontMatter(data) {
  const missing = ["title", "description", "date"].filter((key) => !data[key]);
  if (missing.length) {
    throw new Error(
      `${data.page.inputPath}: front matter is missing ${missing.join(", ")}. ` +
        "See docs/article-format.md.",
    );
  }
  return true;
}

export default {
  tags: "articles",
  eleventyComputed: {
    frontMatterChecked: checkFrontMatter,
  },
};
