/**
	Tile dashboard

	Hýbání s rozměry dlaždic
	- package: Fotbal.cz
	- author: eSports.cz, s.r.o. - Petr Kysela petr@kysela.biz
*/

(function($, app) {
	'use strict';
	
	app.tileDashboard = {
		selectors: {
			group: '.c-tile-group',
			groupBig: '.c-tilegroup.mod-big',
			item: '.c-tile-item',
			itemSmall: '.c-tile-item.mod-width-2',
			itemLarge: '.c-tile-item.mod-width-4',
			matchTile: '.c-tile-match-content'
		},

		resizeFirstSmallItemInRowOfThree: function () {
			var selector = app.tileDashboard.selectors.itemSmall,
				lastItem = $(selector + ' + ' + selector + ' + ' + selector),
				firstItem = $(lastItem.prev().prev()),
				resizedItem = false,
				isFirstMatchTile = firstItem.find(app.tileDashboard.selectors.matchTile),	
				isLastMatchTile = lastItem.find(app.tileDashboard.selectors.matchTile);	
				
			// pokud je první dlaždice zápasová, zkusit zvětšit poslední
			if ( isFirstMatchTile.length === 0 ) {
				resizedItem = firstItem;
			} else if ( isLastMatchTile.length === 0 ) {
				resizedItem = lastItem;
			} else {
				return false;
			}

			if (resizedItem && resizedItem.length === 1 && $(window).width() < app.breakpoints.medium) {
				resizedItem.addClass('mod-width-4');
			} else {
				resizedItem.removeClass('mod-width-4');
			}
		},

		init: function () {
			app.tileDashboard.resizeFirstSmallItemInRowOfThree();
		},

	}

})(jQuery, app);


$(window).on("load resize",function(e){
    app.tileDashboard.init();
});