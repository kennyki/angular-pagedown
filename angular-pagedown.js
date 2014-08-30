// adapted from http://stackoverflow.com/a/20957476/940030
angular.module("ui.pagedown", [])
.directive("pagedownEditor", function ($compile, $timeout) {
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
            showPreview: "@",
            help: "&"
        },
        link: function (scope, element, attrs) {

            var editorUniqueId;

            if (attrs.id == null) {
                editorUniqueId = nextId++;
            } else {
                editorUniqueId = attrs.id;
            }

            var previewHtml = scope.showPreview != false ? '<div id="wmd-preview-' + editorUniqueId + '" class="pagedown-preview wmd-panel wmd-preview"></div>' : '';

            var newElement = $compile(
                '<div>' +
                    '<div class="wmd-panel">' +
                            '<div id="wmd-button-bar-' + editorUniqueId + '"></div>' +
                            '<textarea class="wmd-input" id="wmd-input-' + editorUniqueId + '" ng-model="content"></textarea>' +
                    '</div>' +
                    previewHtml +
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

            var editorElement = angular.element(document.getElementById("wmd-input-" + editorUniqueId));

            editor.hooks.chain("onPreviewRefresh", function() {
                // wire up changes caused by user interaction with the pagedown controls
                // and do within $apply
                $timeout(function() {
                    scope.content = editorElement.val();
                });
            });

            editor.run();
        }
    }
})
.directive("pagedownViewer", function ($compile, $sce) {
    var converter = Markdown.getSanitizingConverter();

    return {
        restrict: "E",
        scope: {
            content: "="
        },
        link: function (scope, element, attrs) {
            var unwatch;
            var run = function run() {
                // stop continuing and watching if scope or the content is unreachable
                if (!scope || (scope.content == undefined || scope.content == null) && unwatch) {
                    unwatch();
                    return;
                }

                scope.sanitizedContent = $sce.trustAsHtml(converter.makeHtml(scope.content));
            };

            unwatch = scope.$watch("content", run);

            run();

            var newElementHtml = "<pre ng-bind-html='sanitizedContent'></pre>";
            var newElement = $compile(newElementHtml)(scope);

            element.append(newElement);
        }
    }
});