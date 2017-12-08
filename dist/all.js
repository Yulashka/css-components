var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when("/accordion", {
        templateUrl : "accordion.html",
        controller: "accordCtrl"
    })
    .when("/carousel", {
        templateUrl : "carousel.html",
        controller: "carCtrl"
    })
    .when("/collapse", {
        templateUrl : "collapse.html",
        controller: "collapseCtrl"
    })
    .when("/dropdown", {
        templateUrl : "dropdown.html",
        controller: "dropdownCtrl"
    })
    .when("/form", {
        templateUrl : "form.html",
        controller: "formCtrl"
    })
    .when("/modal", {
        templateUrl : "modal.html",
        controller: "modalCtrl"
    })
    .when("/scroll", {
        templateUrl : "scroll.html",
        controller: "scrollCtrl"
    })
    .when("/pagination", {
        templateUrl : "pagination.html",
        controller: "paginationCtrl"
    })
    .when("/progress", {
        templateUrl : "progress.html",
        controller: "progressCtrl"
    })
    .when("/tabs", {
        templateUrl : "tabs.html",
        controller: "tabsCtrl"
    })
    .when("/top", {
        templateUrl : "top.html",
        controller: "topCtrl"
    });
});

/*Accordion */
app.controller('accordCtrl', function($scope, ) {
	$("#accordPage .accordion .accord-tab").on("click", function() {
		$("#accordPage .accord-text").addClass("d-none");
		$("#accordPage .accordion .accord-tab").removeClass("a-acc-tab");
		$(this).addClass("a-acc-tab");
		var attrAccord = $(this).attr("id");
		$(attrAccord).removeClass("d-none");
		$(attrAccord + " i").addClass("a-acc-tab");
	});

	/*accordion mobile*/
	$("#accordPage .accordion-mobile .accord-tab").on("click", function() {
		$("#accordPage .accordion-mobile .accord-text").addClass("d-none");
		$("#accordPage .accordion-mobile .accord-tab").removeClass("a-acc-tab");
		$(this).addClass("a-acc-tab");
		var attrAccord = $(this).attr("id");
		$(attrAccord).removeClass("d-none");
		$(attrAccord + " i").addClass("a-acc-tab");
	});
});
/*Carousel*/
//creating an object for surf-carousel for the further use
function ContentDTO(images, titles, ratings, prices, description, features, dimensions, stars) {
	this.images= images;
	this.titles=titles;
	this.ratings=ratings; 
	this.prices=prices; 
	this.description= description;
	this.features= features; 
	this.dimensions = dimensions; 
	this.stars =stars;
}

app.controller('carCtrl', function($scope, $http) {
	$http.get("carouselData.json").then(mySuccess, myError);

	function mySuccess(response){
		console.log("Success: " + response.status);
		$scope.content = response.data;
		var images = makeContent(response.data, "Image"); //new Array(response.data[0].Image);
		var titles = makeContent(response.data, "Title");
		var ratings = makeContent(response.data, "Rating");
		var prices = makeContent(response.data, "Price");
		var description = makeContent(response.data, "Description");
		var features = makeContent(response.data, "Features");
		var dimensions = makeContent(response.data, "Dimensions");
		var stars = makeContent(response.data, "Stars");
		var thumbnails = makeContent(response.data, "Thumbnails");
		makeThumbnails(thumbnails);
		//console.log(stars);
		var contentDto = new ContentDTO(images, titles, ratings, prices, description, features, dimensions, stars, thumbnails);
		//console.log(contentDto);
		makeCarousel(contentDto);
	}

	//translate number to ratings stars
	//takes a number and shows that many stars rating to the client
	// @param num - number to translate 
	function translateRating(num) {
		$(".star-rate").removeClass("prime-color");
		var starArray = $(".star-rate");
		for(var i = 0; i < num; i++) {
			$(starArray[i]).addClass("prime-color");
		}
	}

	function myError(response) {
		console.log("Error: " + response);
	}
	
	function makeContent(someJson, property) {
		var arr = [];
		for(var i = 0; i < someJson.length; i++) {
			arr.push(someJson[i][property]);
			//console.log(someJson[i][property]);		
		}
		return arr;
	}

	function makeThumbnails(pics) {
		var stuf = $(".thumbnails img");
		for(var x = 0; x < pics.length; x++) {
			$(stuf[x]).attr("src", pics[x][x] );
		}
	}

	/**
	 * Adds two numbers
	 * @param {Number} a 
	 * @param {Number} b
	 * @return {Number} sum
	 */
	function addContent(content, current) {
		$(".main-img").attr('src', "img/surfersCo/" + content.images[current]);
		$("#surf-web #carousel-surf h3").text(content.titles[current]);
		$("#surf-web .rating .num").text(content.ratings[current]);
		$("#surf-web .price").text(content.prices[current]);
		$("#surf-web #text1").text(content.description[current]);
		$("#surf-web #text2").text(content.features[current]);
		$("#surf-web #text3").text(content.dimensions[current]);
		translateRating(content.stars[current]);
	}

	function makeCarousel(content){
		var length = content.images.length - 1;
		var current = 0;
		addContent(content, current);
		$("#carousel-surf .fa-long-arrow-right").on("click", function() {
			current = current + 1;
			addContent(content, current);

			if( current > length){
				current = 0;
				addContent(content, current);
			} 
		});

		$("#carousel-surf .fa-long-arrow-left").on("click", function() {
			if( current == 0 ){
				current = length;
				addContent(content, current);
			} else {
				current = current - 1;
				addContent(content, current);
			}
		});
		/*Navigation*/
		$("#iconBar").on("click", function() {
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
		//tabs
		var text = $(".surf-tab-text p");
		$(".surf-tab a").on('click', function() {
			$(".surf-tab a").removeClass('tab-active');
			$(".surf-tab-text p").addClass('d-none');

			for(var i = 0; i < text.length; i++){
				if( $(this).attr('data-href') == ( "#" + $(text[i]).attr('id')) ) {
					$(this).addClass('tab-active');
					$(text[i]).removeClass("d-none");
				}
			}
		});
	}

	//creating an object for team carousel
	function TeamCarouselContent(teamImages, teamTitles, teamNickname, teamLocation) {
		this.teamImages = teamImages;
		this.teamTitles = teamTitles;
		this.teamNickname = teamNickname; 
		this.teamLocation = teamLocation; 
	}

	/*carousel for team members*/
	$http.get("teamData.json").then(mySuccess2, myError2);

	function mySuccess2(response){
		console.log("Success: " + response.status);
		$scope.content = response.data;
		var objs = response.data;
		var teamImages = makeContent(response.data, "Image"); //new Array(response.data[0].Image);
		var teamTitles = makeContent(response.data, "Title");
		var teamNickname = makeContent(response.data, "Nickname");
		var teamLocation = makeContent(response.data, "Location");
		//console.log(teamImages);
		var teamCarouselContent = new TeamCarouselContent(teamImages, teamTitles, teamNickname, teamLocation);
		//console.log(teamCarouselContent);
		makeTeamCarousel(teamCarouselContent);
		makeTeamCarouselMobile(teamCarouselContent);
	}


	function addTeamContent(obj, current, max) {
		/*console.log(obj.teamImages[current]);*/
		var imgs = $(".team-card .team-pic");
		var titles = $(".team-card h4");
		var nicknames = $(".team-card .nickname");
		var locations = $(".team-card .location");

		for(var i = 0; i < max; i++) {
			$(imgs[i]).attr("src", obj.teamImages[current]);
			$(titles[i]).text(obj.teamTitles[current]);
			$(nicknames[i]).text(obj.teamNickname[current]);
			$(locations[i]).text(obj.teamLocation[current]);
			current++;
		}
	}


	function makeTeamCarousel(obj) {
		var current = 0;
		var max = 4;
		addTeamContent(obj, current, max);

		//click right
		$(".team .fa-arrow-right").on("click", function() {
			current = 4;
			max = 8;
			addTeamContent(obj, current, max);
			//console.log("Clicked right");
			
		});

		//click left
		$(".team .fa-arrow-left").on("click", function() {
			current = 0;
			max = 4;
			addTeamContent(obj, current, max);
			//console.log("Clicked left");
		});
	}

	/*mobile carousel*/
	function addTeamContentMobile(obj, current, max) {
		var imgs = $("#surf-web .team .carousel-mobile .team-card .team-pic");
		var titles = $("#surf-web .team .carousel-mobile .team-card h4");
		var nicknames = $("#surf-web .team .carousel-mobile .team-card .nickname");
		var locations = $("#surf-web .team .carousel-mobile .team-card .location");

		for(var i = 0; i < max; i++) {
			$(imgs[i]).attr("src", obj.teamImages[current]);
			$(titles[i]).text(obj.teamTitles[current]);
			$(nicknames[i]).text(obj.teamNickname[current]);
			$(locations[i]).text(obj.teamLocation[current]);
			current++;
		}
	}
	
	function makeTeamCarouselMobile(obj) {
		var max = 7;
		var current = 0;
		addTeamContentMobile(obj, current, max);
		$("#surf-web .team .carousel-mobile .fa-arrow-right").on("click", function() {
			current = current + 1;
			addTeamContentMobile(obj, current, max);
			if( current > max){
				current = 0;
				addTeamContentMobile(obj, current, max);
			} 
		});

		$("#surf-web .team .carousel-mobile .fa-arrow-left").on("click", function() {
			if( current == 0 ){
				current = max;
				addTeamContentMobile(obj, current, max);
			} else {
				current = current - 1;
				addTeamContentMobile(obj, current, max);
			}
		});
	}

	function myError2(response) {
		console.log("Error: " + response);
	}
});


	


/* Navigation */
/*app.controller('collapseCtrl', function($scope, ) {
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
});*/





/*Pagination*/
/*app.controller('pagination2Ctrl', function($scope, ) {
	var Pages = [-1, 0, 1, 2, 3];
	$(function() {*/
	/*Another aproach to building a pagination*/
		/*var offsetMap = {
			"back": -1, 
			"prevprev": -2, 
			"prev": -1, 
			"cur": 0, 
			"next": 1, 
			"nextnext": 2, 
			"forward": 1
		}
		var min = 0;
		var Ids = ["#prevprev", "#prev", "#cur", "#next", "#nextnext"];
		var currentPage = 2;
		var max = getMaxPages();
		displayPages();
		function getMaxPages() {
			return 10;
		}
		$(".pg").on('click', function() {
			var id = $(this).attr("id");
			var action = offsetMap[id];
			applyAction(action);
			displayPages(action);
		});
		function displayPages(action) {
			fixDomElements();
			for(var i = 0; i < Ids.length; i++) {
				if(Pages[i] > 0 && Pages[i] <= max) {
					$(Ids[i]).text(Pages[i]);
					$(Ids[i]).show();
				} else {
					$(Ids[i]).hide();
					if(i == currentPage) {
						// Update current
						currentPage = currentPage + action;
					}
				}
			}
		}
		function fixDomElements(){
			if(Pages[min] === -1) {
				$("#back").hide();
			} else {
				$("#back").show();
			}

			if(Pages[2] === max) {
				$("#forward").hide();
			} else {
				$("#forward").show();
			}
			$(".pg").removeClass("active-pg2");
			$(Ids[currentPage]).addClass("active-pg2");
		}
		function applyAction(action) {*/
			// check if action is valid
			/*for(var i = 0; i < Pages.length; i++) {
				Pages[i] = Pages[i] + action;
			}
		}
	});
});*/

/*Progress bar*/
app.controller('progressCtrl', function($scope, ) {
	console.log("Progress bar is in a process of developing!");
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

/* Navigation */
app.controller('collapseCtrl', function($scope, ) {
	$("#iconCollapse").unbind().click(function() {
		$("#collapseComp .dropdown").toggle();
	});
	console.log("Mutherfucker");
	//on resize reveal the collapsed nav
	$(window).resize(function() {
	  	if($(window).width() < 650){
			$("#collapseComp .collapse").addClass("d-none");
			$("#collapseComp .collapsed").removeClass("d-none");
		}else {
			$("#collapseComp .collapse").removeClass("d-none");
			$("#collapseComp .collapsed").addClass("d-none");
		}
	});
});


/*Dropdown button*/
app.controller('dropdownCtrl', function($scope, ) {
	/*dropdown function*/
	function clickDrop(el, elText) {
		$(el).unbind().click(function() {
			$(elText).toggle();
		});
	}
	/*up*/
	clickDrop(".dropdown-btn-up", ".dropdown-text-up");
	/*down*/
	clickDrop(".dropdown-btn-down", ".dropdown-text-down");
});
/*form */
app.controller('formCtrl', function($scope, ) {
	$("#form .submit").on("click", function() {
	  		var email  = $("#form #email").val();
	  		var name  = $("#form #name").val();
	  		checkEmail(email);
	  		checkName(name);
	  	});

	/*button onClick*/
	$(".btn").on('click', function() {
		$(".myForm").addClass("d-none");
	});

	/*checking email input*/
	function checkEmail(x) {
		if(x == 0){
			$("#email-message").text("Dont leave it empty");
		} else {
			validate(x);
		}
	}

	/*checking name input*/
	function checkName(y) {
		if(y == 0){
			$("#name-message").text("Dont leave it empty");
		} else {
			$("#name-message").text("Valid!");
		}
	}

	/*validating the input*/
	function validate(x) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if(!emailReg.test(x)) {
	        $("#email-message").text("Not valid input");
	       
	    } else {
	    	$("#email-message").text("Valid");
	    	messageSucces();
	    }
	}

	/*success mesage on form submit*/
	function messageSucces(){
		$(".header").addClass('d-none');
		$(".form-body").addClass('d-none');
		$(".success").removeClass('d-none');
	}

	/*error mesage on form submit*/
	function messageError(){
		$(".header").addClass('d-none');
		$(".form-body").addClass('d-none');
		$(".error").removeClass('d-none');
	}
});
/*Modal*/
app.controller('modalCtrl', function($scope, ) {
	setTimeout(function(){
	  modal();
	}, 1000);
	function modal(){
		
		$(".modal").removeClass("d-none");
	  	$(".submit-btn").on("click", function() {
	  		var email  = $("#email").val();
	  		var name  = $("#name").val();
	  		checkEmail(email);
	  		checkName(name);
	  	});
	}

	$(".modal-btn").on('click', function() {
		$(".modal").addClass("d-none");
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
});
app.controller('paginationCtrl', function($scope, ) {
	var Pages = [-1, 0, 1, 2, 3];
	/*Another aproach to building a pagination*/
	var offsetMap = {
		"back": -1, 
		"prevprev": -2, 
		"prev": -1,
		"cur": 0, 
		"next": 1, 
		"nextnext": 2, 
		"forward": 1
	}

	var min = 0;
	var Ids = ["#prevprev", "#prev", "#cur", "#next", "#nextnext"];
	var currentPage = 2;
	var max = getMaxPages();

	displayPages();

	function getMaxPages() {
		return 10;
	}

	$(".pg").on('click', function() {
		var id = $(this).attr("id");
		var action = offsetMap[id];
		applyAction(action);
		displayPages(action);
	});

	function displayPages(action) {
		fixDomElements();
		for(var i = 0; i < Ids.length; i++) {
			if(Pages[i] > 0 && Pages[i] <= max) {
				$(Ids[i]).text(Pages[i]);
				$(Ids[i]).show();
			} else {
				$(Ids[i]).hide();
				if(i == currentPage) {
					// Update current
					currentPage = currentPage + action;
				}
			}
		}
	}

	function fixDomElements(){
		if(Pages[min] === -1) {
			$("#back").addClass("disable");
		} else {
			$("#back").removeClass("disable");
		}

		if(Pages[2] === max) {
			$("#forward").addClass("disable");
		} else {
			$("#forward").removeClass("disable");
		}

		$(".pg").removeClass("active-pg2");
		$(Ids[currentPage]).addClass("active-pg2");
		var textDemo = $(Ids[currentPage]).text();
		$("#demo").text("Number " + textDemo);
	}

	function applyAction(action) {
		// check if action is valid
		for(var i = 0; i < Pages.length; i++) {
			Pages[i] = Pages[i] + action;
		}
	}
});

/*Scrollspy*/
//scroll on click
app.controller('scrollCtrl', function($scope, ) {
	$(".scroll-nav a").on('click', function(e) {
		var attr = $(this).attr("data-href");
		var pos = $(attr).offset().top;
		// 40 is the height of the outer Sidenav button
		var navHeight = $(".scroll-nav").innerHeight() + 40;
		var sum = pos - navHeight;
		//animate onclick
		$("html, body").animate({
	      scrollTop: sum
	    }, 1000, "swing" );
	    e.preventDefault();
	});

	// update menu highlight
	$(window).on('scroll', function() {
		var navHeight = $(".scroll-nav").outerHeight();
		// 40 is the height of the outer Sidenav button
		var scrollie = $(window).scrollTop() + navHeight + 41;
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
});

/*Tabs*/
app.controller('tabsCtrl', function($scope, ) {
	var text = $(".tab-text p");
	$(".flex-tab a").on('click', function() {
		$(".flex-tab a").removeClass('active');
		$(".tab-text p").addClass('d-none');

		for(var i = 0; i < text.length; i++){
			if( $(this).attr('data-href') == ( "#" + $(text[i]).attr('id')) ) {
				$(this).addClass('active');
				$(text[i]).removeClass("d-none");
			}
		}
	});
});

/*Top*/
app.controller('topCtrl', function($scope, ) {
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