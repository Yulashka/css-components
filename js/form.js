/*form */
app.controller('formCtrl', function($scope, ) {
	$("#form .submit").on("click", function() {
	  		var email  = $("#form #email").val();
	  		var name  = $("#form #name").val();
	  		checkEmail(email);
	  		checkName(name);
	  	});

	/*button onClick*/
	$(".btn").on('click', function() {
		$(".myForm").addClass("d-none");
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
		$(".header").addClass('d-none');
		$(".form-body").addClass('d-none');
		$(".success").removeClass('d-none');
	}

	/*error mesage on form submit*/
	function messageError(){
		$(".header").addClass('d-none');
		$(".form-body").addClass('d-none');
		$(".error").removeClass('d-none');
	}
});