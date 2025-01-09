/**
 * Config/init Select v4 (unused, requires <select> elements)
 */
jQuery(function () {
  function handleData(ev) {
    var select = $(ev.target);
    var data = select.select2("data");
    console.log(data);
    var ids = [];

    $.each(data, function (index, value) {
      ids.push(value.id);
    });

    console.log(ids);
    select.attr("data-value", ids);
  }

  var whisperInit = function () {
    $("[data-whisper-select]").each(function () {
      url = $(this).attr("data-whisper-select");

      $(this).select2({
        language: "cs",
        theme: "bootstrap4",
        minimumInputLength: 2,
        dropdownAutoWidth: true,
        ajax: {
          url: url,
          dataType: "json",
          type: "GET",
          delay: 250,
          data: function (params) {
            var query = {
              term: params.term
            };
            // Query parameter will be ?term=[term]
            return query;
          },
          processResults: function (data) {
            return {
              results: data
            };
          },
          cache: false
        }
        // initSelection: function (element, callback) {
        //   var id = $(element).attr("data-value");
        //   if (id != "") {
        //     $.ajax(url, {
        //       data: { ids: id }, // is converted to the string "ids=[id]"
        //       dataType: "json"
        //     }).done(function (data) {
        //       callback(data[0]);
        //     });
        //   }
        // }
      });

      $(this).on("change", handleData);
    });

    $("[data-whisper-multiselect]").each(function () {
      url = $(this).attr("data-whisper-multiselect");

      $(this).select2({
        language: "cs",
        theme: "bootstrap4",
        minimumInputLength: 2,
        maximumSelectionLength: 5,
        // tags: true,
        multiple: true,
        dropdownAutoWidth: true,
        ajax: {
          url: url,
          dataType: "json",
          type: "GET",
          delay: 250,
          data: function (params) {
            var query = {
              term: params.term
            };
            // Query parameter will be ?term=[term]
            return query;
          },
          processResults: function (data) {
            return {
              results: data
            };
          },
          cache: false
        }
        // initSelection: function (element, callback) {
        //   var ids = $(element).attr("data-value");
        //   if (ids != "") {
        //     $.ajax(url, {
        //       data: { ids: ids },
        //       dataType: "json"
        //     }).done(function (data) {
        //       callback(data);
        //     });
        //   }
        // }
      });

      $(this).on("change", handleData);
    });
  };

  whisperInit();
  $.nette.ext("whisperInit", {
    success: whisperInit
  });
});
