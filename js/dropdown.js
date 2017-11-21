/*Dropdown button*/
app.controller('dropdownCtrl', function($scope, ) {
	/*dropdown function*/
	function clickDrop(el, elText) {
		$(el).unbind().click(function() {
			$(elText).toggle();
		});
	}
	/*up*/
	clickDrop(".dropdown-btn-up .button-drop-up", ".dropdown-text-up");
	/*down*/
	clickDrop(".dropdown-btn-down .button-drop-down", ".dropdown-text-down");
});