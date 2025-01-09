/**
	Hide empty tabs

	Skrýt taby s prázdným obsahem
	- package: Fotbal.cz
	- author: eSports.cz, s.r.o. - Petr Kysela petr@kysela.biz
*/

(function($, app) {
	'use strict';
	
	app.hideEmptyTab = {
		
		selectors: {
			tabsContainer: '.js-tabs',
			btnContainer: '.tab-group',
			btnSelector: '.tab',
			paneContainer: '.tab-content',
			paneSelector: '.tab-pane'
		},

		init: function() {
			var	$tabs = $(app.hideEmptyTab.selectors.btnSelector),
				hiddenTabs = 0,
				tabsCount = $tabs.length;

			$tabs.each(function(){
				var $tab = $(this);
				$tab.removeClass('active')
				$(app.hideEmptyTab.getTabId($tab)).removeClass('active');
				hiddenTabs += +app.hideEmptyTab.hideTab($tab);
			});	
			
			// Udělat aktivní tab první, který není skrytý
			$tabs.each(function(){
				var $tab = $(this);
				if ($tab.is(':visible')) {
					$tab.addClass('active first-tab');
					$(app.hideEmptyTab.getTabId($tab)).addClass('active');
					return false;
				}
			});

			// Skrýt kontejner, pokud nejsou taby	
			if (tabsCount === hiddenTabs) {
				$(app.hideEmptyTab.selectors.tabsContainer).hide();
			}	
		},

		/**
		* Najde obsah k příslušnému tabu a spočítá elementy v obsahu,
		* pokud žádný nenajde, skryje tab i kontejner obsahu
		*/
		hideTab: function($tab) {
			var tabId = app.hideEmptyTab.getTabId($tab),
				$tabContent = $(tabId),
				tabContentElementSelector = $tabContent.data('tab-content-element'),
				tabContentChildrenCount;

			if (tabContentElementSelector) {
				$tabContent = $(tabId + ' ' + tabContentElementSelector);
			}

			tabContentChildrenCount = $tabContent.children().length;

			if(tabContentChildrenCount === 0) {
				$tab.hide();
				$(tabId).hide();

				return true;
			}	
			
			return false;	
		},

		getTabId: function($tab) {
			return $tab.find('a').attr('href');
		}
	}

})(jQuery, app);

$(function(){
	app.hideEmptyTab.init();
});