# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Eyes Unstrung'
copyright = '2024-%Y, Joel Dodson'
author = 'Joel Dodson'
version = '0.1'
release = '0.1.0'
needs_sphinx = '8.2'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ["myst_parser", "pydata_sphinx_theme"]

## have link refs auto created for headings up to level 3
myst_heading_anchors = 3

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_static_path = ["_static"]

# links for the sphinx_book_theme
# the 'book' theme is based on the 'pydata' theme thus options derive from there as well.
# pdata-sphinx-theme opsions: https://pydata-sphinx-theme.readthedocs.io/en/latest/user_guide/layout.html#references
# sphinx-book-theme options: https://sphinx-book-theme.readthedocs.io/en/latest/reference.html

html_title = 'Eyes Unstrung' 
html_last_updated_fmt = ""
html_show_copyright = False
html_show_sphinx = True
html_show_sourcelink = False 

html_theme = "pydata_sphinx_theme"
html_theme_options = {
    "navbar_align": "left",
    "article_header_start": [],  ## gets rid of breadcrumbs links
    "github_url": "https://github.com/joeldodson/eyesunstrung",
    "primary_sidebar_end": ["page-toc"],
    "show_nav_level": 2,
    "navigation_depth": 2,
    "show_toc_level": 2,
    "collapse_navigation": False,
    "content_footer_items": [],
    "footer_start": [],
    "footer_end": [],
    "footer_center": ["sphinx-version", "theme-version", "last-updated"],
    "show_version_warning_banner": False,
    # no secondary sidebars for any pages
    "secondary_sidebar_items": {"**": []},
    # trying to get rid of inaccessible color mode switcher
    "navbar_end": ["navbar-icon-links"],
}
