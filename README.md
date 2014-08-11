# angular-pagedown

A pagedown editor for angular

## Instructions

1. `bower install angular-pagedown --save`
1. This will install also [pagedown](https://github.com/baminteractive/PageDown) dependencies.
1. Import these files in your HTML
  1. pagedown/Markdown.Converter.js
  1. pagedown/Markdown.Sanitizer.js
  1. pagedown/Markdown.Editor.js
  1. angular-pagedown/angular-pagedown.js
  1. angular-pagedown/angular-pagedown.css
1. Include dependency in your app `angular.module("yourApp", ["ui.pagedown"]);`
1. This package comes with 2 directives:
  1. `<pagedown-editor content="data.content" help="showHelp()"></pagedown-editor>`
  1. `<pagedown-viewer content="data.content"></pagedown-viewer>`
1. That's it!