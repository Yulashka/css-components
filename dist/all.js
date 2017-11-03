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
        templateUrl : "form.html"
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
    .when("/popover", {
        templateUrl : "popover.html",
        controller: "popoverCtrl"
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

/*Carousel*/
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
		$(".star-rate").removeClass("dark-yellow");
		var starArray = $(".star-rate");
		for(var i = 0; i < num; i++) {
			$(starArray[i]).addClass("dark-yellow");
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

	//navigation dropdown toggle
	$("#iconBar-surf").unbind().click(function() {
		$("#surf-web .dropdown").toggle();
	});

	//on resize hide/show collapsed nav
	$(window).resize(function() {
	  	if($(window).width() < 650){
			$("#surf-web .collapse").addClass("display-none");
			$("#surf-web .collapsed").removeClass("display-none");
			$("#surf-web nav").addClass("display-none");
		}else {
			$("#surf-web .collapse ").removeClass("display-none");
			$("#surf-web .collapsed").addClass("display-none");
			$("#surf-web nav").removeClass("display-none");
		}
	});
});

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

/* Navigation */
app.controller('collapseCtrl', function($scope, ) {
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
});

/*Dropdown button*/
app.controller('dropdownCtrl', function($scope, ) {
	$(".dropdown-btn .button-drop").on('click', function() {
		$(".dropdown-text").toggle();
	});
});

/*Modal*/
app.controller('modalCtrl', function($scope, ) {
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
});

/*Scrollspy*/
//scroll on click
app.controller('scrollCtrl', function($scope, ) {
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
});

/*Pagination*/
app.controller('paginationCtrl', function($scope, ) {
	var Pages = [-1, 0, 1, 2, 3];
	$(function() {
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
		function applyAction(action) {
			// check if action is valid
			for(var i = 0; i < Pages.length; i++) {
				Pages[i] = Pages[i] + action;
			}
		}
	});
});

/*Popovers*/
app.controller('popoverCtrl', function($scope, ) {
	$(".popover button").on('click', function() {
		$(".pop-text").toggle();
	});
});

/*Progress bar*/
app.controller('progressCtrl', function($scope, ) {
	console.log("Progress bar is in a process of developing!");
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
});


var Pages = [-1, 0, 1, 2, 3];

$(function() {
	

	

	

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

	
var Pages = [-1, 0, 1, 2, 3];
$(function() {
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

	function applyAction(action) {
		// check if action is valid
		for(var i = 0; i < Pages.length; i++) {
			Pages[i] = Pages[i] + action;
		}
	}
});