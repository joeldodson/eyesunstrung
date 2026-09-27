// Data for every page in content/articles/.
//
// Tags each one as an article, so it appears in the article lists, and checks
// its front matter. index.md, which is the /articles/ page, opts out of the
// lists with eleventyExcludeFromCollections: true, and the layout reads that
// same flag to give it the plain page layout. A missing title, description or date stops the build with a message
// naming the file. docs/article-format.md describes the format.

function checkFrontMatter(data) {
  // index.md, the /articles/ page, is not an article and needs no date.
  const required = data.eleventyExcludeFromCollections ? ["title"] : ["title", "description", "date"];
  const missing = required.filter((key) => !data[key]);
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
