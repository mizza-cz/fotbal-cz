/**
	Select submit form

	Odeslat formulář při změně hodnoty
	- package: Fotbal.cz
	- author: eSports.cz, s.r.o. - Petr Kysela kysela.biz@gmail.com
*/

(function($, app) {
	'use strict';
	
	app.selectSubmitOnChange = {
		bySelector : function(selector) {
			$(selector).change(function() {
	        	this.form.submit();
	    	});
		},

		init: function() {
			app.selectSubmitOnChange.bySelector('.form-filter select');
		}
	}



})(jQuery, app);

$(window).on("load", function(e){
	app.selectSubmitOnChange.init();
});