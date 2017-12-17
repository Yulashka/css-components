/*Progress bar*/
app.controller('progressCtrl', function($scope, ) {
	$("#progressBtn").on('click', function() {
		var elem = document.getElementById("myBar");   
	  	var width = 10;
	  	var id = setInterval(frame, 10);
	  	//update the width of the bar
		function frame() {
			if (width >= 90) {
				clearInterval(id);
			}else {
				width++; 
				elem.style.width = width + '%'; 
				elem.innerHTML = width * 1  + '%';
			}
		}
	});
});

