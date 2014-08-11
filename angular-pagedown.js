// adapted from http://stackoverflow.com/a/20957476/940030
// TODO: create its own repo with pagedown dependencies (so that I can add it through bower)
angular.module("ui.pagedown", [])
.directive("pagedownEditor", function ($compile) {
    var nextId = 0;
    var converter = Markdown.getSanitizingConverter();

    converter.hooks.chain("preBlockGamut", function (text, rbg) {
        return text.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (whole, inner) {
            return "<blockquote>" + rbg(inner) + "</blockquote>\n";
        });
    });
    
    return {
        restrict: "E",
        scope: {
            content: "=",
            help: "&"
        },
        link: function (scope, element, attrs) {

            var editorUniqueId;

            if (attrs.id == null) {
                editorUniqueId = nextId++;
            } else {
                editorUniqueId = attrs.id;
            }

            var newElement = $compile(
                '<div>' +
                     '<div class="wmd-panel">' +
                            '<div id="wmd-button-bar-' + editorUniqueId + '"></div>' +
                            '<textarea class="wmd-input" id="wmd-input-' + editorUniqueId + '" ng-model="content"></textarea>' +
                     '</div>' +
                     '<div id="wmd-preview-' + editorUniqueId + '" class="pagedown-preview wmd-panel wmd-preview"></div>' +
                '</div>')(scope);

            // html() doesn't work
            element.append(newElement);

            var help = angular.isFunction(scope.help) ? scope.help : function () {
                // TODO: allow option for setting this
                alert("There is no help available");
            };

            var editor = new Markdown.Editor(converter, "-" + editorUniqueId, {
                handler: help
            });

            editor.run();
        }
    }
})
.directive("pagedownViewer", function ($compile) {
    var converter = Markdown.getSanitizingConverter();

    return {
        restrict: "E",
        scope: {
            content: "="
        },
        link: function (scope, element, attrs) {

            var run = function run() {
                scope.sanitizedContent = converter.makeHtml(scope.content);
            };

            run();
            scope.$watch("content", run);

            var newElementHtml = "<pre>{{sanitizedContent}}</pre>";
            var newElement = $compile(newElementHtml)(scope);

            element.append(newElement);
        }
    }
});