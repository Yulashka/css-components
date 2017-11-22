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
        templateUrl : "form.html",
        controller: "formCtrl"
    })
    .when("/modal", {
        templateUrl : "modal.html",
        controller: "modalCtrl"
    })
    .when("/scroll", {
        templateUrl : "scroll.html",
        controller: "scrollCtrl"
    })
    .when("/pagination", {
        templateUrl : "pagination.html",
        controller: "paginationCtrl"
    })
    .when("/popover", {
        templateUrl : "popover.html",
        controller: "popoverCtrl"
    })
    .when("/progress", {
        templateUrl : "progress.html",
        controller: "progressCtrl"
    })
    .when("/tabs", {
        templateUrl : "tabs.html",
        controller: "tabsCtrl"
    })
    .when("/top", {
        templateUrl : "top.html",
        controller: "topCtrl"
    });
});
