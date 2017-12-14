/*form */
app.controller('formCtrl', function($scope, ) {
	//reseting form
	function resetForm() {
		document.getElementById("myFormId").reset();
	}

	$("#form .button").on("click", function() {
	  		var email  = $("#form #email").val();
	  		var name  = $("#form #name").val();
	  		checkEmail(email);
	  		checkName(name);
	  	});

	/*button onClick*/
	$(".btn").on('click', function() {
		$(".form").removeClass("d-none");
		$(".success").addClass('d-none');
		$(".error").addClass('d-none');
	});

	/*checking email input*/
	function checkEmail(x) {
		if(x == 0){
			$("#email-message").text("Dont leave it empty");
		} else {
			validate(x);
		}
	}

	/*checking name input*/
	function checkName(y) {
		if(y == 0){
			$("#name-message").text("Dont leave it empty");
		} else {
			$("#name-message").text("Valid!");
		}
	}

	/*validating the input*/
	function validate(x) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if(!emailReg.test(x)) {
	        $("#email-message").text("Not valid input");
	       
	    } else {
	    	$("#email-message").text("Valid");
	    	messageSucces();
	    }
	}

	/*success mesage on form submit*/
	function messageSucces(){
		$(".form").addClass('d-none');
		$(".success").removeClass('d-none');
		resetForm();
	}

	/*error mesage on form submit*/
	function messageError(){
		$(".form").addClass('d-none');
		$(".error").removeClass('d-none');
		resetForm();
	}
});