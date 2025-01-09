/**
 * Funkcionalita kopírovacího buttonu, replikuje hodnoty inputů a select2 elementů do stejných elemntů z ostatních skupin
 * Created by mk on 17.7.15.
 */

/*jslint browser: true*/
/*global $, jQuery*/

$(function () {
	'use strict';
	$('.copy-button').on('click', function () {
		var parentGroup = $(this).closest('.replicate-group');
		var siblings = parentGroup.siblings('[class*="replicate"]');

		var findReplicantClass = function (element) {
			var classList = element.attr('class').split(/\s+/);
			var regEx = /^replicate/;
			var ret = '';
			$.each(classList, function (index, item) {
				if (regEx.test(item)) {
					ret = item;
				}
			});
			return ret;
		};

		$.each(parentGroup.find('[class*="replicate"]'), function (k, v) {
			var replicant = $(this);
			var replicantClass = findReplicantClass(replicant);

			if (replicantClass === '') {
				return;
			}

			$.each(siblings, function () {
				var replicated = $(this).find('.' + replicantClass);

				if(replicant.hasClass('select2-offscreen')){
					replicated.select2("data", replicant.select2("data"));
				} else {
					replicated.val(replicant.val());
				}

			});
		});
	});
});