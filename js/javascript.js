var images = [ "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
var length = images.length - 1;
var current = 0;
$("img").attr('src', "img/" + images[current]);

$(".fa-chevron-right").on("click", function() {
	current = current + 1;
	$("img").attr('src', "img/" + images[current]);

	if( current > length){
		current = 0;
		$("img").attr('src', "img/" + images[current]);
	} 
	
});


$(".fa-chevron-left").on("click", function() {
	if( current == 0 ){
		current = length;
		$("img").attr('src', "img/" + images[current]);
	} else {
		current = current - 1;
		$("img").attr('src', "img/" + images[current]);

	}
	
});