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