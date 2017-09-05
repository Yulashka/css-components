$(function() {
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

	/*Accordion */
	var accordText = $(".accord-text");
	$(".accordion a").on("click", function() {
		$(".accord-text").addClass("d-none");
		$(".accordion a").removeClass("a-acc-tab");
		$(this).addClass("a-acc-tab");
		var attrAccord = $(this).attr("href");
		$(attrAccord).removeClass("d-none");
	});

	/*Dropdown button*/
	$(".dropdown-btn a").on('click', function() {
		$(".dropdown-text").toggle();
	});


	/*Modal*/
	setTimeout(function(){
	  modal();
	}, 1000);

	function modal(){
		$(".modal").removeClass("d-none");
	  	$(".css-compon").addClass("modal-bg");
	  	$(".submit-btn").on("click", function() {
	  		var email  = $("#email").val();
	  		var name  = $("#name").val();
	  		checkEmail(email);
	  		checkName(name);
	  	});
	}

	$(".modal-btn").on('click', function() {
		$(".modal").addClass("d-none");
		$(".css-compon").removeClass("modal-bg");
	});

	function checkEmail(x) {
		if(x == 0){
			$("#email-message").text("Dont leave it empty");
		} else {
			validate(x);
		}
	}

	function checkName(y) {
		if(y == 0){
			$("#name-message").text("Dont leave it empty");
		} else {
			$("#name-message").text("Valid!");
		}
	}

	function validate(x) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if(!emailReg.test(x)) {
	        $("#email-message").text("Not valid input");
	       
	    } else {
	    	$("#email-message").text("Valid");
	    	messageSucces();
	    }
	}

	function messageSucces(){
		$(".modal-header").addClass('d-none');
		$(".modal-body").addClass('d-none');
		$(".success").removeClass('d-none');
	}

	function messageError(){
		$(".modal-header").addClass('d-none');
		$(".modal-body").addClass('d-none');
		$(".error").removeClass('d-none');
	}

	/*Popover*/
	$(".popover button").on('click', function() {
		$(".pop-text").toggle();
	});

});