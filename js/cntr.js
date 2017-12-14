/*Home Page - SIDE NAV*/
app.controller('mainCtrl', function($scope) {
	/* Set the width of the side navigation to 250px */
	$(".openbtn").on("click", function() {
		document.getElementById("mySidenav").style.width = "250px";
	});

	/* Set the width of the side navigation to 0  */
	$(".closebtn").on("click", function() {
		document.getElementById("mySidenav").style.width = "0";
	});
});

function openNav() {
	document.getElementById("mySidenav").style.width = "0";
};