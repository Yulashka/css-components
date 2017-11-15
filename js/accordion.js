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

	/*collapse*/
	$("#iconBarApp").unbind().click(function() {
		$("#accordPage .dropdown").toggle();
	});

	//on resize reveal the collapsed nav
	$(window).resize(function() {
	  	if($(window).width() < 650){
			$("#accordPage .collapse").addClass("d-none");
			$("#accordPage .collapsed").removeClass("d-none");
		}else {
			$("#accordPage .collapse").removeClass("d-none");
			$("#accordPage .collapsed").addClass("d-none");
		}
	});
});