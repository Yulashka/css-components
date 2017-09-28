var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when("/accordion", {
        templateUrl : "accordion.html",
        controller: "accordCtrl"
    })
    .when("/carousel", {
        templateUrl : "carousel.html",
        controller: "carCtrl"
    })
    .when("/collapse", {
        templateUrl : "collapse.html",
        controller: "collapseCtrl"
    })
    .when("/dropdown", {
        templateUrl : "dropdown.html",
        controller: "dropdownCtrl"
    })
    .when("/form", {
        templateUrl : "form.html"
    })
    .when("/modal", {
        templateUrl : "modal.html",
        controller: "modalCtrl"
    });
});
