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

	//maximum number is 10
	function getMaxPages() {
		return 10;
	}

	//get the element's id
	$(".pg").on('click', function() {
		var id = $(this).attr("id");
		var action = offsetMap[id];
		applyAction(action);
		displayPages(action);
	});

	//display the elements on the page
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

	//update Dom elements
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
