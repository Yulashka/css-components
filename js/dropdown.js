/*Dropdown button*/
app.controller('dropdownCtrl', function($scope, ) {
	/*dropdown function*/
	function clickDrop(el, elText) {
		$(el).unbind().click(function() {
			$(elText).toggle();
		});
	}
	/*up*/
	clickDrop(".dropdown-btn-up", ".dropdown-text-up");
	/*down*/
	clickDrop(".dropdown-btn-down", ".dropdown-text-down");
});