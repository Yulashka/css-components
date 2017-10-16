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
		$(".wrapper .main-img").attr('src', "img/surfersCo/" + content.images[current]);
		$("#surf-web #carousel-surf h4").text(content.titles[current]);
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
		$("#carousel-surf .fa-chevron-right").on("click", function() {
			current = current + 1;
			addContent(content, current);

			if( current > length){
				current = 0;
				addContent(content, current);
			} 
		});

		$("#carousel-surf .fa-chevron-left").on("click", function() {
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
		$(".team .fa-chevron-right").on("click", function() {
			current = 4;
			max = 8;
			addTeamContent(obj, current, max);
			console.log("Clicked right");
			
		});

		//click left
		$(".team .fa-chevron-left").on("click", function() {
			current = 0;
			max = 4;
			addTeamContent(obj, current, max);
			console.log("Clicked left");
		});
	}


	function myError2(response) {
		console.log("Error: " + response);
	}


		
		
	
});

/* Navigation */
app.controller('collapseCtrl', function($scope, ) {
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
