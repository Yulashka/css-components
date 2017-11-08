/* Navigation */
app.controller('collapseCtrl', function($scope, ) {
	$("#iconBarBake").unbind().click(function() {
			$("#bakery-web .dropdown").toggle();
	});

	$(window).resize(function() {
	  	if($(window).width() < 650){
			$("#bakery-web .collapse").addClass("d-none");
			$("#bakery-web .collapsed").removeClass("d-none");
		}else {
			$("#bakery-web .collapse").removeClass("d-none");
			$("#bakery-web .collapsed").addClass("d-none");
		}
	});

	/*Carousel*/
	var images = ["img/bakery/carousel-pic1.png", "img/bakery/carousel-pic2.png", "img/bakery/carousel-pic3.png", "img/bakery/carousel-pic2.png", "img/bakery/carousel-pic3.png", "img/bakery/carousel-pic1.png"];
	var imagesElement = $("#bakery-web .image");
	var endArray = images.slice(3, 7);

	//display images function
	function addBakeryContent(arr) {
		for(var i = 0; i < arr.length; i++) {
			$(imagesElement[i]).attr("src", arr[i]);
		}
	}
	
	//default display
	addBakeryContent(images);

	//click right
	$("#bakery-web .fa-chevron-right").on("click", function() {
		addBakeryContent(endArray);
	});

	//click left
	$("#bakery-web .fa-chevron-left").on("click", function() {
		addBakeryContent(images);
	});

});
