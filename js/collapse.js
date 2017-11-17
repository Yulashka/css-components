/* Navigation */
app.controller('collapseCtrl', function($scope, ) {
	$("#iconBarBake").unbind().click(function() {
			$("#bakery-web .dropdown").toggle();
	});

	//on resize reveal the collapsed nav
	$(window).resize(function() {
	  	if($(window).width() < 650){
			$("#bakery-web .collapse").addClass("d-none");
			$("#bakery-web .collapsed").removeClass("d-none");
		}else {
			$("#bakery-web .collapse").removeClass("d-none");
			$("#bakery-web .collapsed").addClass("d-none");
		}
	});
});
