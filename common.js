//Form validation for registration.

$(document).ready(function() {
	//e.preventDefault();
    $('#submit_btn').click(function(e) {
		
    	var date_purchased = $('#date_purchased').val(),
    		email = $('#email').val(),
    		
    		dateValid = true;
    		emailValid = true;
    		//checkRequiredField();	
    		if (checkRequiredField() === false) {
    			
    			e.preventDefault();
    			
    			if (validateEmail(email.trim())) {
					
					if ($('#email').hasClass('error-border')) {
				
						$('.error_field').html('');
						$('#email').removeClass('error-border');
					}
					
				}
				if (parseDate(date_purchased)) {
					
					if ($('#date_purchased').hasClass('error-border')) {
						$('#date_errors').html('');
						$('#date_purchased').removeClass('error-border');
						
					}
					
				}
				preventInjection();
				
    		
    		} else {
				if (! parseDate(date_purchased)) {
				
					$('#date_errors').html('Invalid Date, please follow MM/DD/YYYY format.<br>');
					$('#date_purchased').addClass('error-border');
					dateValid =  false;
					e.preventDefault();

				} else {	
					$('#date_errors').html('');
				}
				
				if( !validateEmail(email.trim()) || email.trim() === '') { 
				
					$('.error_field').html('Invalid Email, please follow example@.com format');
					
					$('#email').addClass('error-border');
					emailValid =  false;
					e.preventDefault();
				} else {
					$('.error_field').html('');
				
				};  
				if (emailValid && dateValid) {
					
					preventInjection();
					$('#register_form').submit();
				}
		
				
				

				
				
		
		}
    });
});


/*
* Prevent JS injection
*/
function preventInjection() {
	$(":input").each(function(){

		if ($.trim($(this).val()).indexOf('<script') > -1){
	
			alert('input invalid Data');

			return false;
		}
	});
}


/*
* Check Required Field
*/
function checkRequiredField() {
	var isValid = true;
	$('.required').each(function(index, value) {
		if ($.trim($(this).val()) == '') {

			isValid = false;
			$(this).css('border', '1px solid red');
		 
		} else {
			$(this).css('border', '');
	
		}
	
	});

	return isValid;
}

/*
* Check date validation
*/
function parseDate(txtDate) {
	var day = txtDate.substring(3, 5),
		month = txtDate.substring(0, 2),
		year = txtDate.substring(6, 10);

	if (jQuery.isNumeric(day) && jQuery.isNumeric(month) && jQuery.isNumeric(year)) {
		if (day > 0 && day <= 31 && month > 0 && month <= 12  && year > 1900) {
			return true;
		}
	}
	return false;
}

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}