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

/* Navigation */

$(".fa-bars").on("click", function() {
	$(".dropdown").toggle(".d-none");
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

/*Tab panels*/
var text = $(".tab-text p");

$(".flex-tab a").on('click', function() {
	$(".flex-tab a").removeClass('active');
	$(".tab-text p").addClass('d-none');

	for(var i = 0; i < text.length; i++){
		if( $(this).attr('href') == ( "#" + $(text[i]).attr('id')) ) {
			$(this).addClass('active');
			$(text[i]).removeClass("d-none");
		}
	}
});


/*Accordion*/
var accordText = $(".accord-text");
$(".accordion a").on("click", function() {
	$(".accord-text").addClass("d-none");
	$(".accordion a").removeClass("a-acc-tab");
	$(this).addClass("a-acc-tab");
	var attrAccord = $(this).attr("href");
	$(attrAccord).removeClass("d-none");
});

