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
			console.log("Clicked right");
			
		});

		//click left
		$(".team .fa-arrow-left").on("click", function() {
			current = 0;
			max = 4;
			addTeamContent(obj, current, max);
			console.log("Clicked left");
		});
	}


	function myError2(response) {
		console.log("Error: " + response);
	}

	
	$("#iconBar-surf").unbind().click(function() {
		$("#surf-web .dropdown").toggle();
	});

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
