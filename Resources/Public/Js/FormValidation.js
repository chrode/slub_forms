jQuery(document).ready(function() {

	var formid = getCookie('sf_form');

	if (formid) {
		showForm(formid);
	}

	$('.slub-category-list ul ul li').click(function() {

		$(this).find('input:radio').click(function() {
			formid = $(this).val();
		});

		showForm(formid);

    });

	$('.slub-forms-back2select').click(function() {
		formID = $(this).parents('.slub-forms-form').attr('id').split('-');
		hideForm(formID[3]);
		$('.slub-form-tree').fadeIn();
		$('.slub-form-intro').show();
	});

	$('.anonymize-form').click(function() {

        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {

            $(this).parents('.slub-forms-fieldset').find('input[type=text].sender-name')
                .val('anonym')
                .prop('disabled', true);
            $(this).parents('.slub-forms-fieldset').find('input[type=email].sender-email')
                .val('anonym@slub-dresden.de')
                .prop('disabled', true);
            $(this).parents('.slub-forms-fieldset').find('input[type=number].userid')
                .val('0')
                .prop('disabled', true);

			var editcode =  $('input[name="tx_slubforms_sf[newEmail][editcode]"]');
			var hiddenInput = $('<input/>',{type:'hidden',id:'anonymous',name:'tx_slubforms_sf[anonymous]',value:editcode.val()});
			hiddenInput.appendTo($(this).parents('.slub-forms-fieldset'));

        } else {

            $(this).parents('.slub-forms-fieldset').find('input').each(function () {

                $(this).prop('disabled', false);

				if (this.id == 'anonymous') {

					$(this).detach();

				}

            });

        }

    });

	disableAllHiddenForms();

	if ($('.slub-forms-form').length == 1 || $('.tx-slub-forms .confirmation').length>0) {
		$('.slub-form-intro').hide();
	}
});

/**
 * Hide all forms
 *
 * @return void
 */
function hideAllForms() {
	$('.slub-forms-form').addClass('hide'); // hide all forms

    disableAllHiddenForms();
}

/**
 * Disable all hidden forms
 *
 * @return void
 */
function disableAllHiddenForms() {

	$('.slub-forms-form.hide .slub-forms-fieldset').find('input').prop('disabled', true);
	$('.slub-forms-form.hide .slub-forms-fieldset').find('textarea').prop('disabled', true);
	$('.slub-forms-form.hide .slub-forms-fieldset').find('select').prop('disabled', true);

}

/**
 * Show a form
 *
 * @param	integer	uid: uid of the element
 * @return	void
 */
function showForm(uid) {

	// make sure the given uid exists
	if (!$('#slub-form-select-' + uid)[0]) {
		setCookie('sf_form', '');
		return;
	}

    // initially hide all forms
	hideAllForms();

    // show only form with given uid
	$('#slub-forms-form-' + uid).removeClass('hide');

    // enable all fields of this form
	$('#slub-forms-form-' + uid).find('input').prop('disabled', false);
	$('#slub-forms-form-' + uid).find('textarea').prop('disabled', false);
	$('#slub-forms-form-' + uid).find('select').prop('disabled', false);

	setCookie('sf_form', uid);

	$('.slub-form-tree input:radio').each(function() {
		$(this).prop('checked', false);
	});

	$('#slub-form-select-' + uid).prop('checked', true);

	$('.slub-form-tree').css({'margin-bottom':'-400px'}).fadeOut(700,function() {
		$('.slub-form-tree').css({'margin-bottom':'20px'});
	});

	$('.slub-form-intro').hide();
}

/**
 * Hides a form
 *
 * @param	integer	uid: uid of the element
 * @return	void
 */
function hideForm(uid) {
	$('#slub-forms-form-' + uid).addClass('hide'); // hide current field

    disableAllHiddenForms();
	setCookie('sf_form', '');
}

/**
 * Set a cookie value
 *
 * @param	string	name: The key of the value
 * @param	mixed	value: The value to save
 *
 * @return	void
 */
function setCookie(cname, cvalue) {
	var d = new Date();
	d.setTime(d.getTime() + (60*60*1000));
	var expires = "expires="+d.toUTCString();
	//alert('set cookie: ' + cname + "=" + cvalue + "; path=/; " + expires)
	document.cookie = cname + "=" + cvalue + "; path=/; " + expires;
};
/**
 * Read Cookie
 *
 * @params string name: cookie name
 * @return mixed: the cookie value
 */
function getCookie(name) {
	var results = document.cookie.match("(^|;) ?"+name+"=([^;]*)(;|$)");
	if (results) {
		return results[2];
	} else {
		return null;
	}
}

/**
 * Delete file from input field
 *
 * @param	string	name: The key of the value
 *
 * @return	void
 */
function deleteFile(id) {

	$('#delete-file-' + id[0].id).hide();

	id.val('');

};
/**
 * Delete file from input field
 *
 * @param	string	name: The key of the value
 *
 * @return	void
 */
function fileSelect(e){

	//console.log(e.target.id);

	$('#delete-file-'+ e.target.id).removeClass('hide')
	$('#delete-file-'+ e.target.id).show();

}

/**
 * Form Validation Extras
 *
 */

//~ jQuery.validator.setDefaults({
  //~ debug: true,
  //~ success: "valid"
//~ });

$( "#slubForm" ).validate({
    errorElement: "span",
    errorClass: "error",
    messages: {
        "tx_slubforms_sf[field][41][86]" : "Bitte den Betreff ausfüllen",
        "tx_slubforms_sf[field][90][1]" : "Bitte den Vor- und Nachnamen eintagen",
        "tx_slubforms_sf[field][90][2]" : "Bitte eine E-Mail-Adresse eintragen",
        "tx_slubforms_sf[field][90][29]" : "Bitte die Benutzernummer eintragen",
        "tx_slubforms_sf[field][46][91]" : "Bitte ein Anliegen auswählen",
        "tx_slubforms_sf[field][7][25]" : "Bitte ihre Mitteilung eintragen",
    },
	 //submitHandler: function (form) { // for demo
	 //
		//alert('valid form submitted'); // for demo
	 //
		//return false; // for demo
	 //}

	submitHandler: function(form) {

		function updateTime() {

			$('#slubForm [type="submit"]').val($('#slubForm [type="submit"]').val() + ' >');

		}

		updateTime();

		setInterval(updateTime, 1000); // 5 * 1000 miliseconds

		$('[type="submit"]').prop("disabled", true);

		form.submit();
	}

});

$.validator.addMethod('filesize', function(value, element, param) {
	// value = file name
	// element = element to validate (<input>)
	// param = size (en bytes)
	return this.optional(element) || (element.files[0].size <= param)
});
