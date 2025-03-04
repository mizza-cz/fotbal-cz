/*
 * jQuery File Upload Plugin JS Example 8.9.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global $, window */

$(function() {
	'use strict';

	// Initialize the jQuery File Upload widget:
	$('#fileupload').fileupload({
		// Uncomment the following to send cross-domain cookies:
		//xhrFields: {withCredentials: true},
		url: uploadDest,
		previewMaxWidth: 120,
		previewMaxHeight: 120
	});

	// Enable iframe cross-domain access via redirect option:
	$('#fileupload').fileupload(
			'option',
			'redirect',
			window.location.href.replace(
					/\/[^\/]*$/,
					'/cors/result.html?%s'
					)
			);

	$('#fileupload').bind('fileuploadstop', function(e, data) {
		$('#uploadredirect').show();
	});

	$('#fileupload').bind('fileuploadadd', function(e, data) {
		$('#uploadredirect').hide();
	});

	// Load existing files:
	$('#fileupload').addClass('fileupload-processing');
	$.ajax({
		// Uncomment the following to send cross-domain cookies:
		//xhrFields: {withCredentials: true},
		url: $('#fileupload').fileupload('option', 'url'),
		dataType: 'json',
		context: $('#fileupload')[0]
	}).always(function() {
		$(this).removeClass('fileupload-processing');
	}).done(function(result) {
		$(this).fileupload('option', 'done')
				.call(this, $.Event('done'), {result: result});
	});

});
