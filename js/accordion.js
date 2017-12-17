/*Accordion */
app.controller('accordCtrl', function($scope, ) {
	$("#accordPage .accordion .accord-tab").on("click", function() {
		$("#accordPage .accordion .accord-text").addClass("d-none");
		$("#accordPage .accordion .accord-tab").removeClass("a-acc-tab");
		$(this).addClass("a-acc-tab");
		var attrAccord = $(this).attr("id");
		$(attrAccord).removeClass("d-none");
		$(attrAccord + " i").addClass("a-acc-tab");
	});
});