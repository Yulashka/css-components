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

	//if json file has been successfully loaded, call this function
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
		var contentDto = new ContentDTO(images, titles, ratings, prices, description, features, dimensions, stars, thumbnails);
		makeCarousel(contentDto);
	}

	//translate number to ratings stars
	//takes a number and shows that many stars rating to the client
	// @param num - number to translate 
	function translateRating(num) {
		$(".star-rate").removeClass("yellow");
		var starArray = $(".star-rate");
		for(var i = 0; i < num; i++) {
			$(starArray[i]).addClass("yellow");
		}
	}

	//if json file has NOT been successfully loaded, call this function
	function myError(response) {
		console.log("Error: " + response);
	}
	
	//make content for the carousel
	function makeContent(someJson, property) {
		var arr = [];
		for(var i = 0; i < someJson.length; i++) {
			arr.push(someJson[i][property]);	
		}
		return arr;
	}

	//make content for the thumbnails
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
	 //adding conent
	function addContent(content, current) {
		$(".main-img").attr('src', "img/carousel/" + content.images[current]);
		$("#carouselComp #carousel-surf h3").text(content.titles[current]);
		$("#carouselComp .rating .num").text(content.ratings[current]);
		$("#carouselComp .price").text(content.prices[current]);
		$("#carouselComp #text1").text(content.description[current]);
		$("#carouselComp #text2").text(content.features[current]);
		$("#carouselComp #text3").text(content.dimensions[current]);
		translateRating(content.stars[current]);
	}

	// displaying content on a page
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

		//when click on an arrow - slide
		//making slideshow for the carousel
		$("#carousel-surf .fa-long-arrow-left").on("click", function() {
			if( current == 0 ){
				current = length;
				addContent(content, current);
			} else {
				current = current - 1;
				addContent(content, current);
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
	//////////////////////////////   TEAM CAROUSEL   ///////////////////////

	//creating an object for team carousel
	function TeamCarouselContent(teamImages, teamTitles, teamNickname, teamLocation) {
		this.teamImages = teamImages;
		this.teamTitles = teamTitles;
		this.teamNickname = teamNickname; 
		this.teamLocation = teamLocation; 
	}

	/*carousel for team members*/
	$http.get("teamData.json").then(mySuccess2, myError2);

	//Success function
	function mySuccess2(response){
		console.log("Success: " + response.status);
		$scope.content = response.data;
		var objs = response.data;
		var teamImages = makeContent(response.data, "Image"); //new Array(response.data[0].Image);
		var teamTitles = makeContent(response.data, "Title");
		var teamNickname = makeContent(response.data, "Nickname");
		var teamLocation = makeContent(response.data, "Location");
		var teamCarouselContent = new TeamCarouselContent(teamImages, teamTitles, teamNickname, teamLocation);
		makeTeamCarousel(teamCarouselContent);
		makeTeamCarouselMobile(teamCarouselContent);
	}

	//adding content to the team carousel
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

	//displaying content on the team carousel
	function makeTeamCarousel(obj) {
		var current = 0;
		var max = 4;
		addTeamContent(obj, current, max);

		//click right
		//making slideshow
		$(".team .fa-arrow-right").on("click", function() {
			current = 4;
			max = 8;
			addTeamContent(obj, current, max);
		});

		//click left
		//making slideshow
		$(".team .fa-arrow-left").on("click", function() {
			current = 0;
			max = 4;
			addTeamContent(obj, current, max);
			//console.log("Clicked left");
		});
	}

	/*mobile team carousel*/
	function addTeamContentMobile(obj, current, max) {
		var imgs = $("#carouselComp .team .carousel-mobile .team-card .team-pic");
		var titles = $("#carouselComp .team .carousel-mobile .team-card h4");
		var nicknames = $("#carouselComp .team .carousel-mobile .team-card .nickname");
		var locations = $("#carouselComp .team .carousel-mobile .team-card .location");

		for(var i = 0; i < max; i++) {
			$(imgs[i]).attr("src", obj.teamImages[current]);
			$(titles[i]).text(obj.teamTitles[current]);
			$(nicknames[i]).text(obj.teamNickname[current]);
			$(locations[i]).text(obj.teamLocation[current]);
			current++;
		}
	}
	
	//displaying content on the mobile team carousel
	function makeTeamCarouselMobile(obj) {
		var max = 7;
		var current = 0;
		addTeamContentMobile(obj, current, max);

		//click right
		//making slideshow
		$("#carouselComp .team .carousel-mobile .fa-arrow-right").on("click", function() {
			current = current + 1;
			addTeamContentMobile(obj, current, max);
			if( current > max){
				current = 0;
				addTeamContentMobile(obj, current, max);
			} 
		});

		//click left
		//making slideshow
		$("#carouselComp .team .carousel-mobile .fa-arrow-left").on("click", function() {
			if( current == 0 ){
				current = max;
				addTeamContentMobile(obj, current, max);
			} else {
				current = current - 1;
				addTeamContentMobile(obj, current, max);
			}
		});
	}

	//error function for the team carousel json data loading
	function myError2(response) {
		console.log("Error: " + response);
	}
});
