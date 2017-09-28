/*Accordion */
app.controller('accordCtrl', function($scope, ) {
	$(".accordion .accord-tab").on("click", function() {
		$(".accord-text").addClass("d-none");
		$(".accordion .accord-tab").removeClass("a-acc-tab");
		$(this).addClass("a-acc-tab");
		var attrAccord = $(this).attr("id");
		$(attrAccord).removeClass("d-none");
	});
});

app.controller('carCtrl', function($scope, ) {
	/*Carousel*/
	var images = [ "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
	var length = images.length - 1;
	var current = 0;
	$(".wrapper img").attr('src', "img/" + images[current]);
	$(".fa-chevron-right").on("click", function() {
		current = current + 1;
		$(".wrapper img").attr('src', "img/" + images[current]);

		if( current > length){
			current = 0;
			$(".wrapper img").attr('src', "img/" + images[current]);
		} 
	});

	$(".fa-chevron-left").on("click", function() {
		if( current == 0 ){
			current = length;
			$(".wrapper img").attr('src', "img/" + images[current]);
		} else {
			current = current - 1;
			$(".wrapper img").attr('src', "img/" + images[current]);
		}
	});
});

