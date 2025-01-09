/**
 * Config/init Select v3 (used, works on <input> elements)
 */
jQuery(function () {
  var whisperInit = function () {
    $("[data-whisper-select]").each(function () {
      url = $(this).attr("data-whisper-select");

      $(this).select2({
        minimumInputLength: 2,
        dropdownAutoWidth: true,
        ajax: {
          url: url,
          dataType: "json",
          type: "GET",
          quietMillis: 20,
          data: function (term) {
            return { term: term };
          },
          results: function (data) {
            return {
              results: $.map(data, function (item) {
                return { text: item.text, id: item.id };
              })
            };
          }
        },
        initSelection: function (element, callback) {
          var ids = $(element).val();
          if (ids != "") {
            $.ajax(url, {
              data: { ids: ids },
              dataType: "json"
            }).done(function (data) {
              callback(data[0]);
            });
          }
        }
      });
    });

    $("[data-whisper-multiselect]").each(function () {
      url = $(this).attr("data-whisper-multiselect");

      $(this).select2({
        theme: "bootstrap",
        minimumInputLength: 2,
        tags: [],
        dropdownAutoWidth: true,
        ajax: {
          url: url,
          dataType: "json",
          type: "GET",
          quietMillis: 20,
          data: function (term) {
            return { term: term };
          },
          results: function (data) {
            return {
              results: $.map(data, function (item) {
                return { text: item.text, id: item.id };
              })
            };
          }
        },
        initSelection: function (element, callback) {
          var ids = $(element).val();
          if (ids != "") {
            $.ajax(url, {
              data: { ids: ids },
              dataType: "json"
            }).done(function (data) {
              callback(data);
            });
          }
        }
      });
    });
  };

  whisperInit();
  $.nette.ext("whisperInit", {
    success: whisperInit
  });
});
