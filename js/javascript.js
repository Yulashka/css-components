
var Pages = [-1, 0, 1, 2, 3];

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

	/*Scrollspy*/
	//scroll on click
	$(".scroll-nav a").on('click', function(e) {
		var attr = $(this).attr("data-href");
		var pos = $(attr).offset().top;
		var navHeight = $(".scroll-nav").innerHeight();
		var sum = pos - navHeight;
		//animate onclick
		$("html, body").animate({
	      scrollTop: sum
	    }, 1000, "swing" );
	    e.preventDefault();
	});

	$(window).on('scroll', function() {
		var navHeight = $(".scroll-nav").outerHeight();
		var scrollie = $(window).scrollTop() + navHeight + 1;
		var rows = $(".scroll-body .row");
		for(var i = 0; i < rows.length;  i++){
			//console.log(i);
			var startPos = $(rows[i]).offset().top;
			var rowHeight = $(rows[i]).innerHeight();
			var endPos = startPos + rowHeight;
			if( (endPos >= scrollie) && (scrollie >= startPos) ) {
				var currentAttr = $(rows[i]).attr("id");
				currentAttr = "#" + currentAttr; 
				$(".scroll-nav a").removeClass("active-scroll");
				$("a[data-href =" + "'" + currentAttr + "'" + "]").addClass("active-scroll");
			}
		}	
	});

	
	/*Pagination*/
	var pagesData = [];
	pagesData.length = 10;
	var currentPage = 1;
	//display current number
	$("#current").text(currentPage);

	//display current text
	$("#demo").text("foo #" + currentPage);

	if(currentPage < pagesData.length){
		//display next button 
		$("#nextNumber").removeClass("d-none");

		//display maximum number
		$("#max").text(pagesData.length);
		$("#max").removeClass("d-none");

		//display next page number
		$("#next").text(currentPage + 1);
		$("#next").removeClass("d-none");

		//click next
		$("#next").on("click", function() {
			$(".pagination a").removeClass("active-pg");
			$(this).addClass("active-pg");
			var nextText = $(this).text();
			$("#demo").text("foo #" + nextText);
			if( $("#next").text() < pagesData.length) {
				$("#max").removeClass("d-none");
			}
			
		});

		//click current
		$("#current").on("click", function() {
			$(".pagination a").removeClass("active-pg");
			$(this).addClass("active-pg");
			$("#demo").text("foo #" + currentPage);
		});

		//click max
		$("#max").on("click", function() {
			currentPage = $(this).text();
			$("#current").text(currentPage);
			$("#next").addClass("d-none");
			$("#max").addClass("d-none");
			$("#demo").text("foo #" + currentPage);
			$(".pagination a").removeClass("active-pg");
			$("#current").addClass("active-pg");
			$("#prevNumber").removeClass("d-none");
			$("#nextNumber").addClass("d-none");
			$("#min").removeClass("d-none");
		});

		//click min button
		$("#min").on("click", function() {
			currentPage = 1;
			//display current number
			$("#current").text(currentPage);
			//display current text
			$("#demo").text("foo #" + currentPage);
			$("#prevNumber").addClass("d-none");
			//hide min
			$("#min").addClass("d-none");
			//display next number
			$("#next").text(currentPage + 1);
			$("#next").removeClass("d-none");
			//display next number btn
			$("#nextNumber").removeClass("d-none");
		});


		//click next number button
		$("#nextNumber").on("click", function() {
			currentPage = currentPage + 1;
			//check if current page number is greater then 1
			if(currentPage > 1){
				//display the previous button
				$("#prevNumber").removeClass("d-none");
				$("#min").removeClass("d-none");
				
			}
			$("#current").text(currentPage);
			$("#demo").text("foo #" + currentPage);
			$("#next").text(currentPage + 1);
			$(".pagination a").removeClass("active-pg");
			$("#current").addClass("active-pg");
			if( $("#next").text() == pagesData.length) {
				$("#max").addClass("d-none");
			}else if( $("#current").text() == pagesData.length){
				$("#next").addClass("d-none");
				$("#nextNumber").addClass("d-none");
			}

		});

		//click previous number button
		$("#prevNumber").on("click", function() {
			currentPage = currentPage - 1;
			$("#current").text(currentPage);
			$("#demo").text("foo #" + currentPage);
			$("#next").text(currentPage + 1);
			$(".pagination a").removeClass("active-pg");
			$("#current").addClass("active-pg");
			if(currentPage == 1){
				$("#prevNumber").addClass("d-none");
				$("#min").addClass("d-none");
			}
			if(currentPage < pagesData.length){
				$("#nextNumber").removeClass("d-none");
				$("#next").removeClass("d-none");
				$("#max").removeClass("d-none");

			}
		});
	}

	/*scroll-top button*/
	var scrollTopButton = $(".scroll-top");

	$(window).scroll(function() {
		var scrollTopPosition = $(this).scrollTop();
		if(scrollTopPosition > 400){
			$(scrollTopButton).removeClass("d-none");
		} else {
			$(scrollTopButton).addClass("d-none");
		}
	}); 

	//scroll up on click
	$(scrollTopButton).on('click', function() {
		//animate onclick
		$("html, body").animate({
	      scrollTop: 0
	    }, 1000, "swing" );
	});



});   


/*Home Page - SIDE NAV*/
	/* Set the width of the side navigation to 250px */
	function openNav() {
	    document.getElementById("mySidenav").style.width = "250px";
	}

	/* Set the width of the side navigation to 0 */
	function closeNav() {
	    document.getElementById("mySidenav").style.width = "0";
	}

	