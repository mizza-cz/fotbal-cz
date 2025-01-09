function ArticlePicker(searchFieldId, pickerJsObjectName) {
  this.timeoutTimer = null;

  this.position = 1;

  this.refreshLink = refreshArticleLink; // z ArticlePicker.latte

  this.searchFieldId = searchFieldId;

  this.pickerJsObjectName = pickerJsObjectName;

  this.searchTextTmp = "";

  this.suffixesToRemove = ["ovi", "ova", "ovu", "ovo", "ovým", "ově", "a", "e", "u"];

  this.Init = function () {
    //Klávesa "šipka dolů" ve vyhledávacím poli
    $("#" + this.searchFieldId).keydown(
      $.proxy(function (event) {
        return this.OnKeydown(event);
      }, this)
    );

    //Klávesa "šipka nahoru" ve vyhledávacím poli
    $("#" + this.searchFieldId).keyup(
      $.proxy(function (event) {
        return this.OnKeyup(event);
      }, this)
    );

    //Kliknutí na hráče v seznamu nalezených
    $("#article-picker-wrapper").on(
      "click",
      "#" + this.pickerJsObjectName + "-listWrapper ul li a",
      $.proxy(function (event) {
        var article_id = parseInt($(event.target).attr("rel"));
        this.SelectArticleAndClose(article_id);
        return false;
      }, this)
    );
  };

  this.SelectArticleAndClose = function (article_id) {
    postEdit.InsertArticleTag(article_id);
    $("#article-picker-wrapper").modal("hide");
  };

  this.OnKeyup = function () {
    if (this.searchTextTmp == this.GetSearchText()) return;
    this.OnTextChange();
  };

  this.OnTextChange = function () {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = setTimeout(
      $.proxy(function () {
        this.UpdateArticleList();
      }, this),
      150
    );
  };

  this.MoveSelectionDown = function () {
    var current = $(".article-picker ul li.selected");
    var next = current.next();
    if (next.length > 0) {
      current.removeClass("selected");
      next.addClass("selected");
      this.position++;
    }
  };

  this.MoveSelectionUp = function () {
    var current = $(".article-picker ul li.selected");
    var prev = current.prev();
    if (prev.length > 0) {
      current.removeClass("selected");
      prev.addClass("selected");
      this.position++;
    }
  };

  this.ChooseSelectedArticle = function () {
    var current = $(".article-picker ul li.selected a");
    if (current.length > 0) {
      var article_id = parseInt(current.attr("rel"));
      this.SelectArticleAndClose(article_id);
    }
  };

  this.OnKeydown = function (e) {
    this.searchTextTmp = this.GetSearchText();
    if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13) {
      if (e.keyCode == 40) this.MoveSelectionDown();
      if (e.keyCode == 38) this.MoveSelectionUp();
      if (e.keyCode == 13) this.ChooseSelectedArticle();
      e.cancelBubble = true;
      return false;
    }
    return true;
  };

  this.UpdateArticleList = function () {
    var val = this.GetSearchText();

    if (val.length > 2) {
      var link = this.refreshLink.replace("-REPLACE-", val);
      $("#" + this.pickerJsObjectName + "-listWrapper").empty();
      $("#" + this.pickerJsObjectName + "-listWrapper").append("<p>Hledám..</p>");
      $.nette.ajax(link);
    } else {
      $("#" + this.pickerJsObjectName + "-listWrapper").empty();
    }
  };

  this.GetSearchText = function () {
    return $("#" + this.searchFieldId).val();
  };

  this.EndsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  this.TrimSuffix = function (text) {
    for (var i = 0; i < this.suffixesToRemove.length; i++) {
      if (this.EndsWith(text, this.suffixesToRemove[i])) {
        return text.substr(0, text.length - this.suffixesToRemove[i].length);
      }
    }

    return text;
  };

  this.SmartTextChange = function (text) {
    var output = [];
    var elements = text.split(" ");
    $.each(
      elements,
      $.proxy(function (index, value) {
        var textElement = this.TrimSuffix($.trim(value));
        if (textElement.length > 0) {
          output.push(textElement);
        }
      }, this)
    );

    return output.join(" ");
  };

  this.SetSearchText = function (text) {
    var oldText = $("#" + this.searchFieldId).val();
    $("#" + this.searchFieldId).val(this.SmartTextChange(text));

    if (oldText != text) this.OnTextChange();
  };

  this.FocusSearchField = function () {
    $("#" + this.searchFieldId).focus();
  };
}

var articlePickerObject = new ArticlePicker(searchFieldArticleId, "articlePickerObject"); // z ArticlePicker.latte

$(function () {
  articlePickerObject.Init();
});
