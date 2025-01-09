/**
	Select toggle element 

	Zobrazování elementů na základě výběru možnosti v selectu
	- package: Fotbal.cz
	- author: eSports.cz, s.r.o. - Michal Kobelka michalkobelka@gmail.com
*/

(function($, app) {
	'use strict';
	
	app.toggleSelect = function(selectorShow, selectorHide) {
		if (selectorShow != "") {
			$("." + selectorHide).hide();
			$("." + selectorShow).show();
		}
	}

})(jQuery, app);