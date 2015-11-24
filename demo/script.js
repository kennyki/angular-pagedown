angular.module("myApp", ["ui.pagedown"])

.controller("myController", function($scope, $window, $q) {
  
  $scope.data = {
    content: "Wee *wang* **wang**!",
    placeholder: "Enter something here.."
  };
  
  $scope.showSomeHelp = function showSomeHelp() {
    // this is what the default will do
    $window.open("http://daringfireball.net/projects/markdown/syntax", "_blank");
  };
  
  $scope.insertImage = function insertImage() {
    var deferred = $q.defer();
    
    // or you can return a string straightaway
    deferred.resolve("http://www.discoposse.com/wp-content/uploads/2014/08/test-all-the-things.jpg");
    
    return deferred.promise;
  };
  
});