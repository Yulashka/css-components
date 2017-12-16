/*Modal*/
app.controller('modalCtrl', function($scope, ) {
	//call modal
	setTimeout(function(){
	  modal();
	}, 1000);
	function modal(){
		$(".modal").removeClass("d-none");
	}

	//close the modal
	$(".modal-btn").on('click', function() {
		$(".modal").addClass("d-none");
	});

	//onclick button to call modal
	$("#modal .button").on('click', function() {
		$(".modal").removeClass("d-none");
	});
	
});