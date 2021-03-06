/*Scrollspy*/
//scroll on click
app.controller('scrollCtrl', function($scope, ) {
	$("#scroll a").on('click', function(e) {
		var attr = $(this).attr("data-href");
		var pos = $(attr).offset().top;
		// 40 is the height of the outer Sidenav button
		var navHeight = $(".scroll-nav").innerHeight() + 65;
		var sum = pos - navHeight;
		//animate onclick
		$("html, body").animate({
	      scrollTop: sum
	    }, 1000, "swing" );
	    e.preventDefault();
	});

	// update the menu by highlighting the nav a
	$(window).on('scroll', function() {
		var navHeight = $(".scroll-nav").outerHeight();
		// 40 is the height of the outer Sidenav button
		var scrollie = $(window).scrollTop() + navHeight + 66;
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
