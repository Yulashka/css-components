/*Tabs*/
app.controller('tabsCtrl', function($scope, ) {
	var text = $(".tab-text p");
	$(".flex-tab a").on('click', function() {
		$(".flex-tab a").removeClass('active');
		$(".tab-text p").addClass('d-none');
		//finding tab
		for(var i = 0; i < text.length; i++){
			if( $(this).attr('data-href') == ( "#" + $(text[i]).attr('id')) ) {
				$(this).addClass('active');
				$(text[i]).removeClass("d-none");
			}
		}
	});
});
