# angular-pagedown

A pagedown editor for AngularJS. View this [Plunker](http://plnkr.co/edit/1Vxo5UfYpHQdjhWatimU) for demo.

## Instructions

1. `bower install angular-pagedown --save`
1. This will install also [pagedown](https://github.com/baminteractive/PageDown) dependencies.
1. Import these files in your HTML
  1. pagedown/Markdown.Converter.js
  1. pagedown/Markdown.Sanitizer.js
  1. pagedown/Markdown.Extra.js
  1. pagedown/Markdown.Editor.js
  1. angular-pagedown/angular-pagedown.js
  1. angular-pagedown/angular-pagedown.css
1. Include dependency in your app `angular.module("yourApp", ["ui.pagedown"]);`

This package comes with 2 directives:

## Editor

```html
<pagedown-editor content="data.content"></pagedown-editor>
```

Options:

#### content

1. A parent scope variable. 
1. *String; Mandatory*

#### show-preview

1. Should a live preview be displayed. 
1. *Boolean; Default to true*

#### help

1. An expression to invoke upon clicking the help (?) button. 
1. *Expression; Default to open http://daringfireball.net/projects/markdown/syntax in new window*
1. Example: `<pagedown-editor content="data.content" help="showSomeHelp()"></pagedown-editor>`

#### insert-image

1. An expression to invoke upon clicking the "Insert Image" button. 
1. *Expression; Default to null*
1. Example: `<pagedown-editor content="data.content" insert-image="promptImageUrl()"></pagedown-editor>`
  1. The parent scope function `promptImageUrl` must return either:
    1. A string of image URL.
    1. A promise resolved with a string of image URL.

## Viewer

```html
<pagedown-viewer content="data.content"></pagedown-viewer>
```

## TODO
1. Grunt setup to minify files.
1. Extend PageDown editor to allow override of hyper link insertion.
