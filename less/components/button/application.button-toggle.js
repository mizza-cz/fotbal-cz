/**
	Toggle element 

	Skrýt/zobrazit element dle selectoru
	- package: Fotbal.cz
	- author: eSports.cz, s.r.o. - Petr Kysela petr@kysela.biz
*/

(function($, app) {
	'use strict';
	
	app.toggleElem = function(btn, selector, direction) {
		var btn = $(btn),
			btnInGroup,
			icon = $(btn.find('i')[0]),
			value = $(btn.find('span')[0]),
			element = $(selector),
			invert = (direction === undefined) ? false : true,
			isActive =  btn.hasClass('active');

		if ( isActive ) {
			btn.removeClass('active');
			btn.addClass('disabled');
			icon.removeClass('rotate-45');
			value.text(btn.data('text-open'));
			element.each(function(){
				if (invert) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});

			if ( btn.data('toogle-group-selector') ) {
				$(btn.data('toogle-group-selector')).each(function(){
					btnInGroup = $(this);
					btnInGroup.removeClass('active');
					btnInGroup.addClass('disabled');
					$(btnInGroup.find('i')[0]).removeClass('rotate-45');
					$(btnInGroup.find('span')[0]).text(btnInGroup.data('text-open'));
				});
			}

		} else {
			btn.addClass('active');
			btn.removeClass('disabled');
			icon.addClass('rotate-45');
			value.text(btn.data('text-close'));
			element.each(function(){
				if (invert) {
					$(this).hide();
				} else {
					$(this).show();
				}
			});

			if ( btn.data('toogle-group-selector') ) {
				$(btn.data('toogle-group-selector')).each(function(){
					btnInGroup = $(this);
					btnInGroup.addClass('active');
					btnInGroup.removeClass('disabled');
					$(btnInGroup.find('i')[0]).addClass('rotate-45');
					$(btnInGroup.find('span')[0]).text(btnInGroup.data('text-close'));
				});
			}
		}	

	},

	app.toggleElemOnly = function(btn, selector) {
		$(selector).toggle();
	}

})(jQuery, app);