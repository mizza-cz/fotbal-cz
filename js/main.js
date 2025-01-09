var adjustMenu, initMagnificPopup, initNetteAjax, initRWDimageMaps, initSelect, initTableSort, selectpickerDefaults;

adjustMenu = function() {
    var col, menu, screenWidth, scroll, top;
    col = $("#js-col-right");
    if (col[0]) {
        top = col.offset().top;
        scroll = $(window).scrollTop();
        screenWidth = $(window).width();
        menu = $("#js-nav-left");
        if (screenWidth >= 750) {
            if (scroll > top) {
                return menu.css("top", "0px");
            } else {
                return menu.css("top", (top - scroll) + "px");
            }
        } else {
            return menu.css("top", top + "px");
        }
    }
};

selectpickerDefaults = {
    mobile: true,
    style: 'mod-white',
    title: null,
    noneSelectedText: '----'
};

initSelect = function() {
    $("select").selectpicker(selectpickerDefaults);
    $(".form-select").selectpicker(selectpickerDefaults);
    return $(".dropdown-toggle").selectpicker(selectpickerDefaults);
};

initNetteAjax = function() {
    $.nette.init();
    return $('#ajax-spinner').html('<div class="loader"></div><span class="loader-title">Probíhá načítání</span>');
};

initTableSort = function() {
    tsorter.create('tsorter-tournament-stats-0');
    tsorter.create('tsorter-tournament-tournament-1');
    return tsorter.create('tsorter-tournament-table-2');
};

initMagnificPopup = function() {
    return $(".magnific-popup").magnificPopup({
        type: 'image'
    });
};

initRWDimageMaps = function() {
    if ($("img.usemap").length) {
        return $("img.usemap").rwdImageMaps();
    }
};

(function($) {
    return $(window).on("load scroll resize", function() {
        return adjustMenu();
    });
})(jQuery);

(function($) {
    return $(window).on("load", function() {
        initSelect();
        // initNetteAjax();
        initTableSort();
        initMagnificPopup();
        return initRWDimageMaps();
    });
})(jQuery);