$(function () {
  $.datepicker.regional["cs"] = {
    closeText: "Hotovo",
    prevText: "Předchozí",
    nextText: "Další",
    currentText: "Dnes",
    monthNames: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
    monthNamesShort: ["Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čec", "Srp", "Zář", "Říj", "Lis", "Pro"],
    dayNames: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
    dayNamesShort: ["Ned", "Pon", "Úte", "Stř", "Čtv", "Pát", "Sob"],
    dayNamesMin: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
    weekHeader: "Tý",
    dateFormat: "dd.mm.yy",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ""
  };
  $.datepicker.setDefaults($.datepicker.regional["cs"]);
  $.timepicker.regional["cs"] = {
    currentText: "Nyní",
    closeText: "Hotovo",
    amNames: ["AM", "A"],
    pmNames: ["PM", "P"],
    timeFormat: "HH:mm:ss",
    timeSuffix: "",
    timeOnlyTitle: "Vyberte čas",
    timeText: "Čas",
    hourText: "Hodina",
    minuteText: "Minuta",
    secondText: "Sekunda",
    millisecText: "Milisekunda",
    microsecText: "Mikrosekunda",
    timezoneText: "Časová zóna",
    isRTL: false
  };
  $.timepicker.setDefaults($.timepicker.regional["cs"]);
  var myControl = {
    create: function (tp_inst, obj, unit, val, min, max, step) {
      $('<input class="ui-timepicker-input" value="' + val + '" style="width:50%">')
        .appendTo(obj)
        .spinner({
          min: min,
          max: max,
          step: step,
          change: function (e, ui) {
            // key events
            // don't call if api was used and not key press
            if (e.originalEvent !== undefined) tp_inst._onTimeChange();
            tp_inst._onSelectHandler();
          },
          spin: function (e, ui) {
            // spin events
            tp_inst.control.value(tp_inst, obj, unit, ui.value);
            tp_inst._onTimeChange();
            tp_inst._onSelectHandler();
          }
        });
      return obj;
    },
    options: function (tp_inst, obj, unit, opts, val) {
      if (typeof opts == "string" && val !== undefined) return obj.find(".ui-timepicker-input").spinner(opts, val);
      return obj.find(".ui-timepicker-input").spinner(opts);
    },
    value: function (tp_inst, obj, unit, val) {
      if (val !== undefined) return obj.find(".ui-timepicker-input").spinner("value", val);
      return obj.find(".ui-timepicker-input").spinner("value");
    }
  };
  $.timepicker.setDefaults({ controlType: myControl });
  $("#content a#saveandback").on("click", function () {
    if ($(this).hasClass("callPostBeforeSave") && typeof postEdit != "undefined") postEdit.BeforeSave();
    $('#content input[name="save"]').trigger("click");
    return false;
  });
  var makeDateInput = function (object) {
    object.dateinput({
      datetime: {
        dateFormat: "d.m.yy",
        timeFormat: "H:mm:ss",
        options: {
          changeYear: true
        }
      },
      "datetime-local": {
        dateFormat: "d.m.yy",
        timeFormat: "H:mm:ss"
      },
      date: {
        dateFormat: "d.m.yy"
      },
      month: {
        dateFormat: "MM yy"
      },
      week: {
        dateFormat: "w. 'week of' yy"
      },
      time: {
        timeFormat: "H:mm:ss"
      }
    });
  };

  var createColorBox = function (color, name, after) {
    var box =
      " <div style='width: 16px; height: 16px; display: inline-block; vertical-align: -4px; \
					border: 1px solid black; background-color: " +
      color +
      "'></div>";
    return "<div style='display: inline-block;'><span style='line-height: 8px'>" + name + "</span>" + box + "</div>";
  };
  $.fn.colorize = function () {
    this.each(function () {
      var element = $(this);
      var colorBox = createColorBox(element.attr("data-hex-color"), element.html());
      element.html(colorBox);
    });
  };
  var jsControls = function () {
    $("select.select2:not(.select2-offscreen)").select2();
    makeDateInput($("input[data-dateinput-type]"));
    $("input.daterange").dateRange();
    $("#content .multipleSelectCheckboxes").multipleSelect({
      width: "100%",
      position: "top",
      placeholder: "vyberte team",
      selectAllText: "vybrat vše",
      allSelected: "vybráno vše",
      countSelected: "vybráno # z % záznamů"
    });

    //$('select.select2.select2-color').select2({
    //	formatSelection: function (data) {
    //		var colors = $.parseJSON(this.element.attr('data-colors'));
    //		var color = colors[data.id];
    //
    //		return createColorBox(color, data.text);
    //	}
    //});

    $("[data-hex-color]").colorize();
  };
  jsControls();
  $.nette.ext("jsControls", {
    success: jsControls
  });
  $.nette.init();
  $("#content").on("change", "input.change-submit, select.change-submit", function (e) {
    $(this).closest("form").submit();
  });
  $("#content").on("change", "input.change-ajax-submit, select.change-ajax-submit", function (e) {
    var self = $(this);
    var form = self.closest("form");
    form.netteAjax(e);
  });
  $("#content").on("change", "input.change-ajax-submit-click, select.change-ajax-submit-click", function (e) {
    var self = $(this);
    var form = self.closest("form");
    form.find("input[type=submit]").trigger("click");
  });
  $("[custom-confirm]").on("click", function () {
    var self = $(this);
    var message = self.attr("custom-confirm");
    return confirm(message);
  });

  $("#content").on("click", "a.ajax-click", function (e) {
    var self = $(this);
    var form = self.closest("form");
    form.netteAjax(e);
  });

  /**
   * Modul Admin:Article:Article:edit
   */
  $(document).on("click", "#content a.opencloseBlock", function () {
    var self = $(this);
    var target = self.next("#content div.openableBlock");

    if (self.hasClass("closed")) {
      target.slideDown(function () {
        self.text(self.data("texthide"));
      });
    } else {
      target.slideUp(function () {
        self.text(self.data("textshow"));
      });
    }

    self.toggleClass("closed");

    return false;
  });

  //	$('#content .changePageSlug').click(function () {
  //		$('#content .changePageSlugMenu').each(function () {
  //			$(this).toggleClass('hidden');
  //		});
  //
  //		$('#newSlugName').text($('#content .slugNameInput').val());
  //
  //		return false;
  //	});

  //	$('#ajaxPageSlug').click(function () {
  //		$.nette.ajax($(this).attr('href').replace('REPLACE_AJAX_SLUG', $('.postNameForSlug').val()));
  //
  //		return false;
  //	});

  $(".grido tr.forPageMove")
    .on("mouseenter", function () {
      $(".pageMoveIconsWrapper", $(this)).css({ visibility: "visible" });
    })
    .on("mouseleave", function () {
      $(".pageMoveIconsWrapper", $(this)).css({ visibility: "hidden" });
    });
  //
  //	$('#content .rotateTitleCheckbox').click(function () {
  //		var self = $(this);
  //
  //		if (self.prop('checked') === true) {
  //			$('#content .alternativeItem .defaultAlternativeCheckbox').each(function () {
  //				var selfAll = $(this);
  //				selfAll.prop('checked', false);
  //			});
  //		}
  //	});
  //
  //	$('#content').on('click', '.alternativeItem .defaultAlternativeCheckbox', function () {
  //		var self = $(this);
  //
  //		if (self.prop('checked') === true)
  //			$('#content .rotateTitleCheckbox').prop('checked', false);
  //
  //		$('#content .alternativeItem .defaultAlternativeCheckbox').each(function () {
  //			var selfAll = $(this);
  //
  //			if (self.attr('id') == selfAll.attr('id'))
  //				return true;
  //
  //			selfAll.prop('checked', false);
  //		});
  //	});
  //
  $("#content input[data-tags]").each(function () {
    var self = $(this);
    var data = self.attr("data-tags");
    var object = { theme: "bootstrap4", tags: data.split(","), tokenSeparators: [","] };
    if (self.hasClass("onlyonevalue")) object["maximumSelectionSize"] = 1;
    self.select2(object);
  });

  $("#content .clubSelect").on("change", function () {
    var self = $(this);
    var url = self.attr("data-ajaxUrl");
    var newUrl = url.replace("CLUBTEAMSREPLACE", self.val());
    $.nette.ajax(newUrl);
  });

  var activateAddingToAnotherInput = function (sourceSelector, destinationSelector, buttonSelector) {
    $("#content").on("click", buttonSelector, function () {
      var values = $(sourceSelector).val();
      if (typeof values === "string") {
        values = [values];
      }

      var targetSB = $(destinationSelector);
      var result = targetSB.select2("val");

      var destinationOptions = $.map($(destinationSelector).children("option"), function (item) {
        return item.value;
      });

      $(sourceSelector)
        .children()
        .each(function () {
          var self = $(this);
          var value = self.attr("value");
          var text = self.text();
          if (value === "") {
            return;
          }

          if ($.inArray(value, values) > -1) {
            if ($.inArray(value, result) == -1) {
              result.push(value);

              if ($.inArray(value, destinationOptions) === -1) {
                var option = $(document.createElement("option"));
                option.attr("value", value);
                option.text(text);
                targetSB.append(option);
              }
            }
          }
        });

      targetSB.select2("val", result).trigger("change");

      return false;
    });
  };

  /**
   * Admin:Atricle:Article:edit
   */
  activateAddingToAnotherInput("#clubAndTeams", "#content select.clubSelectFinal", "#addClubTeam");

  /**
   * Admin:Subject:Subject:functionary
   */
  $.each($('#grid [data-toggle="tooltip"]'), function () {
    $('[data-toggle="tooltip"]').tooltip({ tooltipClass: "custom-tooltip-styling" });
  });

  //	activateAddingToAnotherInput('select.chosenCompetition', 'select.selectedCompetitions', 'a.addCompetition');
  //
  //
  //	var formChanged = false;
  //	$('.widget-content').on('change', 'input, textarea, select', function () {
  //		formChanged = true;
  //		$('.widget-content').off('change', 'input, textarea, select');
  //	});
  //
  //	$('#sidebar a[href!="#"], .nav-tabs a, #user-nav a, #breadcrumb a, a[name="back"], a[name="editor-delete"]').click(function () {
  //		if (formChanged) {
  //			return confirm('Formulář obsahuje neuložená data, opravdu chcete stránku opustit ?');
  //		}
  //	});
  //
  $("body")
    .on("mousemove", "img.zoomable", function (event) {
      var div = $("#editorZoom");
      var img = $("#editorZoomImg");
      var span = $("#editorZoomText");
      var source = $(this);
      img.hide();
      div.css("left", event.pageX + 64);
      div.css("top", event.pageY - div.outerWidth() / 2);
      span.text(source.data("text") + " / " + source.data("size"));
      img.attr("src", "/min.php?file=" + source.data("big") + "&w=400&h=400");
      img.show();
      div.show();
    })
    .on("mouseout", function () {
      $("#editorZoom").hide();
    });

  /**
   * Admin:Article:edit
   */
  $(document).on("click", "#addMainPhoto", function () {
    fromTinyMce = false;
    $("#photo-picker-wrapper").modal("show");
    photoPickerObject.FocusSearchField();
    return false;
  });

  /**
   * Admin:Article:edit
   */
  $(document).on("click", "#deleteMainPhoto", function () {
    $("#mainPhotoHidden").removeAttr("value");
    $("#deleteMainPhoto").hide();
    $("#mainPhotoWrapper").hide();
    return false;
  });

  //
  //	$('#content .topstoryUpdate').change(function () {
  //		var self = $(this);
  //		var url = self.attr('data-url');
  //		var newUrl = url.replace('REPLACEID', self.val());
  //		gritterMsg('Změna topstory byla odeslána.');
  //		$.get(newUrl, function () {
  //			gritterMsg('Změna topstory byla uložena.');
  //		});
  //	});
  //
  //	var gritterMsg = function (text) {
  //		$.gritter.add({
  //			time: 2000,
  //			title: 'Zpráva',
  //			text: text,
  //			sticky: false
  //		});
  //	}
  //
  //	// Pridani mm:ss masky na textovy input
  //	$('.time-input').timeInput();
  //
  //	$("input:checkbox.winning").click(function () {
  //		if ($(this).prop('checked') == true) {
  //			$("input:checkbox.winning").prop("checked", false);
  //			$(this).prop("checked", true);
  //		}else{
  //			$(this).prop("checked", false);
  //		}
  //	});
  //
  //	// Rozsireni datepicker filteru o denni posun (zpet | dnes | dalsi)
  //	dateSwitcher();
  //
  //	$.nette.ext('dateSwitcher', {
  //		success: dateSwitcher
  //	});

  var randomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  var createReplaceFunction = function (callback) {
    return function () {
      var text = $("#replaceMe").html();
      text = text.replace(/replacelabel/gi, "label");
      text = text.replace(/replaceinput/gi, "input");
      text = text.replace(/replaceid/gi, "new" + randomString(8));
      var html = $(text);
      if (callback !== undefined) {
        html = callback(html);
      }
      $("#alternativeItemsWrapper").append(html);
      return false;
    };
  };

  $("#addAlternativeName").on("click", createReplaceFunction());

  $("#addClubName").on(
    "click",
    createReplaceFunction(function (html) {
      makeDateInput(html.find("[data-dateinput-type]"));
      return html;
    })
  );

  $("#content").on("click", ".alternativeItem .deleteAlternativeName", function () {
    var self = $(this);
    self.closest("#content .alternativeItem").remove();

    return false;
  });

  Nette.toggle = function (id, visible) {
    var elem = document.getElementsByClassName(id);
    if (elem) {
      if (jQuery) {
        visible ? $(elem).show() : $(elem).hide();
      } else {
        elem.style.display = visible ? "" : "none";
      }
    }
  };
});
