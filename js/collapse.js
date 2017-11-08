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

	/*Carousel*/
	var images = ["img/bakery/carousel-pic1.png", "img/bakery/carousel-pic2.png", "img/bakery/carousel-pic3.png", "img/bakery/carousel-pic2.png", "img/bakery/carousel-pic3.png", "img/bakery/carousel-pic2.png"];
	var imagesElement = $("#bakery-web .image");
	var endArray = images.slice(3, 7);

	//display images function
	function addBakeryContent(arr, el) {
		for(var i = 0; i < arr.length; i++) {
			$(el[i]).attr("src", arr[i]);
		}
	}
	
	//default display
	addBakeryContent(images, imagesElement);

	//click right
	$("#bakery-web .fa-chevron-right").on("click", function() {
		addBakeryContent(endArray, imagesElement);
	});

	//click left
	$("#bakery-web .fa-chevron-left").on("click", function() {
		addBakeryContent(images, imagesElement);
	});


	/*mobile carousel*/
	function addCarContent(img, current) {
		$("#bakery-web .carousel-mobile .image-mobile").attr('src', img[current]);
	}

	var length = images.length - 1;
	var current = 0;

	//display image
	addCarContent(images, current);

	//click right
	$("#bakery-web .carousel-mobile .fa-chevron-right").on("click", function() {
		current = current + 1;
		//update the image
		addCarContent(images, current);

		if( current > length){
			current = 0;
			//update the image
			addCarContent(images, current);
		} 
	});

	//click left
	$("#bakery-web .carousel-mobile .fa-chevron-left").on("click", function() {
		if( current == 0 ){
			current = length;
			//update the image
			addCarContent(images, current);
		} else {
			current = current - 1;
			//update the image
			addCarContent(images, current);;
		}
	});

});
