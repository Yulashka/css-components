/*form */
app.controller('formCtrl', function($scope, ) {
	
	//declaring variables
	var nameId = "#name-message";
	var emailId = "#email-message";

	/*ontype event*/
	$("#name").keyup(function(){
		$(nameId).removeClass("hidden"); 
		var theValue = $(this).val();
		//checking the value
        checkInput(theValue, nameId);
    });

    $("#email").keyup(function(){
    	$(emailId).removeClass("hidden"); 
		var theValue = $(this).val();
		//checking the value
        checkInput(theValue, emailId);
    });


	//on submit the form
	$("#form .button").on("click", function() {
  		var email  = $("#form #email").val();
  		var name  = $("#form #name").val();
  		var returnEmail = checkInput(email, emailId);
  		var returnName = checkInput(name, nameId);
  		if (!returnEmail) {
  			$(emailId).removeClass("hidden");
  		}

  		if (!returnName) {
  			$(nameId).removeClass("hidden");
  		}

  		if(returnEmail == true && returnName == true) {
  			messageSucces();
  		} else {
  			console.log("Im sorry");
  		}
	});

	//close the message after the form was submitted
	$(".btn").on('click', function() {
		$(".form").removeClass("d-none");
		$(".success").addClass('d-none');
		$(".error").addClass('d-none');
	});


	/*checking if input is valid or not*/
	function checkInput(theValue, theId) {
		if(theValue == 0){
			$(theId).addClass("red");
			$(theId).text("Dont leave it empty");
		}else {
			if( theId == "#email-message" ) {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test(theValue)) {
					$(theId).addClass("red");
			        $(theId).text("Not valid input");
			    } else {
			    	$(theId).text("Valid");
			    	$(theId).removeClass("red");
			    	return true;
			    }
			}else if( theId == "#name-message" )  {
				var textReg = /^[A-Za-z ]+$/;
				if(!textReg.test(theValue)) {
					$(theId).addClass("red");
			        $(theId).text("Not valid input");
				}else {
					$(theId).removeClass("red");
					$(theId).text("Valid");
					return true;
				}
			}
		}
	}

	/*success message on form submit*/
	function messageSucces(){
		$(".form").addClass('d-none');
		$(".success").removeClass('d-none');
		resetForm();
	}

	/*error message on form submit*/
	function messageError(){
		$(".form").addClass('d-none');
		$(".error").removeClass('d-none');
		resetForm();
	}

	//reseting form
	function resetForm() {
		document.getElementById("myFormId").reset();
		$(nameId).addClass("hidden"); 
		$(emailId).addClass("hidden"); 
	}
});