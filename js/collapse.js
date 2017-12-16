/* Navigation */
app.controller('collapseCtrl', function($scope, ) {
	$("#iconCollapse").unbind().click(function() {
		$("#collapseComp .dropdown").toggle();
	});
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

	//onclick button collapse/uncollapse navigation
	$("#collBtn").unbind().click(function() {
		if( $("#collapseComp .collapsed").hasClass("d-none") ) {
			$("#collapseComp .collapse").addClass("d-none");
			$("#collapseComp .collapsed").removeClass("d-none");
			
		}else {
			$("#collapseComp .collapse").removeClass("d-none");
			$("#collapseComp .collapsed").addClass("d-none");
		}
	});
});

