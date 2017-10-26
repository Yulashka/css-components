/* Navigation */
app.controller('collapseCtrl', function($scope, ) {
	$("#iconBar").on("click", function() {
		$(".dropdown").toggle();
	});

	$(window).resize(function() {
	  	if($(window).width() < 650){
			$(".collapse").addClass("d-none");
			$(".collapsed").removeClass("d-none");
		}else {
			$(".collapse").removeClass("d-none");
			$(".collapsed").addClass("d-none");
		}
	});
});
