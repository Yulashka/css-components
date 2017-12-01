/*Popovers*/
app.controller('popoverCtrl', function($scope, ) {
	$("#popover button").unbind().click(function() {
		$(".pop-text").toggle();
	});
});