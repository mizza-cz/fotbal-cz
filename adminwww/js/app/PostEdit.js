/**
 * Sdružuje vlastnosti a metody nutné pro fungování javascriptové mechaniky stránky s editací Postu pro TinyMCE.
 * @type {Object}
 */

var postEdit = {
  /**
   *
   */
  id: undefined,
  /**
   * Udává, jestli je právě zobrazen TinyMCE editor nebo zdrojový kód.
   * @type Boolean
   */
  sourceViewIsActive: false,
  /**
   * Vrací id zdrojového prvku TextArea, nad kterým běží TinyMCE editor.
   * @return {String}
   */
  GetMceSourceTextAreaId: function () {
    return this.id ? this.id : tinymce.activeEditor.id;
  },
  /**
   * Oznaci blok textu jako citaci
   */
  InsertCitation: function () {
    var selectedText = tinymce.activeEditor.selection.getContent();

    if (selectedText != "") tinymce.activeEditor.selection.setContent("[cite " + tinymce.activeEditor.selection.getContent() + "#author " + $("#citeauthor").val() + "#]");

    $("#citation-wrapper").modal("hide");

    return false;
  },
  /**
   * Vlozi video tag dle ID zapasu ci ID sestrihu
   */
  InsertVideo: function () {
    tinymce.activeEditor.selection.setContent("[video " + $("#videoid").val() + "]");

    $("#video-wrapper").modal("hide");

    return false;
  },
  /**
   * Vloží embedovaný kód
   */
  InsertEmbed: function () {
    var data = $("#dataforembed").val();
    var code = "";

    if (data != "") {
      if (data.match(/youtube\.com/)) code = embedManager.createYoutubeEmbed(data);

      if (data.match(/instagram\.com/)) code = embedManager.createInstagramEmbed(data);

      if (data.match(/gfycat\.com/)) code = embedManager.createGfycatEmbed(data);

      if (data.match(/twitter\.com/)) code = embedManager.createTwitterEmbed(data);

      if (data.match(/vine\.co/)) code = embedManager.createVineEmbed(data);

      if (data.match(/tvcom\.cz/)) code = embedManager.createTvcomEmbed(data);
    }

    if (code != "") {
      tinyMCE.activeEditor.execCommand("mceInsertContent", false, code);
    }

    $("#embed-wrapper").modal("hide");

    return false;
  },
  /**
   * Zruší veškeré označení textu v TinyMCE editoru
   */
  DeselectTinyMceText: function () {
    tinymce.activeEditor.selection.collapse();
  },
  /**
   * Do editoru vloží řetězec pro vykreslení profilu hráče
   * @param {Number} playerId
   * @constructor
   */
  InsertPlayerTag: function (playerId) {
    // var name = tinymce.activeEditor.selection.getContent();

    // if (name == "") tinymce.activeEditor.execCommand("mceInsertContent", false, "[playermedailon " + player_id + "]");
    // else tinymce.activeEditor.selection.setContent("[player " + player_id + ' "' + tinymce.activeEditor.selection.getContent() + '"]');
    tinymce.activeEditor.insertContent("[playermedailon " + playerId + "]");
  },
  /**
   * Do editoru vloží řetězec pro vykreslení boxu se zápasem
   * @param {Number} matchId
   * @constructor
   */
  InsertMatchTag: function (matchId) {
    tinymce.activeEditor.insertContent("[match " + matchId + "]");
  },
  /**
   * Do editoru vloží řetězec pro vykreslení boxu s článkem
   * @param {Number} articleId
   * @constructor
   */
  InsertArticleTag: function (articleId) {
    tinymce.activeEditor.insertContent("[article " + articleId + "]");
  },
  /**
   * Do editoru vloží řetězec pro vykreslení galerie
   * @param {Number} galleryId
   * @constructor
   */
  InsertGalleryTag: function (galleryId) {
    // tinymce.activeEditor.execCommand("mceInsertContent", false, "[gallery " + galleryId + "]");
    tinymce.activeEditor.insertContent("[gallery " + galleryId + "]");
  },
  /**
   * Prida tag pro fotku
   * @param {Number} photo_id
   * @param {String} align_id
   * @constructor
   */
  InsertPhotoTag: function (photo_id, align_id) {
    //tinymce.activeEditor.selection.setContent('[photo ' + photo_id + ' ' + align_id + ']');
    tinymce.activeEditor.selection.setContent("[photo " + photo_id + "]");
  },
  /**
   * Vloží a odformátuje text odřádkovaný entrem a odstraní odsazení odstavců.
   * @return {Boolean}
   */
  InsertPlainText: function () {
    var txt = $("#plain-text-wrapper textarea").val();
    var lines = txt.split(/\r\n|\r|\n/);

    txt = "";
    for (var i = 0; i < lines.length; i++) {
      txt += "<p>" + $.trim(lines[i]) + "</p>";
    }

    tinyMCE.activeEditor.execCommand("mceInsertContent", false, txt);

    $("#plain-text-wrapper").modal("hide");

    return false;
  },
  /**
   * Metoda se zavolá při ukládání Postu tlačítkem Uložit. Před odesláním formuláře je
   * aktualizován prvek text Area s obsahem Postu, nad kterým běží editor.
   * @return {Boolean}
   */
  BeforeSave: function () {
    if (!this.sourceViewIsActive) {
      this.UpdateMceSourceTextArea();
    }

    return true;
  },
  /**
   * Zabrani prelozeni diakritiky do entit
   * @param {string} inputText
   * @returns {String}
   */
  RecreateDom: function (inputText) {
    inputText = "<div>" + inputText + "</div>"; //Je to nutné obalit ještě jedním divem.
    var dom = $(inputText); //Rozparsuje html kód a vytvoří dom
    return dom.html();
  },
  /**
   * Updatuje zdrojový prvek TextArea, nad kterým běží TinyMCE Editor aktuálním obsahem editoru.
   */
  UpdateMceSourceTextArea: function () {
    var textAreaSourceId = "#" + this.GetMceSourceTextAreaId();
    tinyMCE.triggerSave(); //Updatuje zdrojový text area aktuálním obsahem editoru
    var text = $(textAreaSourceId).val();
    text = this.RecreateDom(text);
    $(textAreaSourceId).val(text);
  },
  /**
   * Provede přepnutí editoru mezi zobrazením zdrojového kódu a TinyMCE editorem.
   */
  ToggleHtmlView: function () {
    var textAreaSourceId = "#" + this.GetMceSourceTextAreaId();
    var textAreaTineMCEId = textAreaSourceId + "_parent";
    var text = "";
    if (!this.sourceViewIsActive) {
      // Přepnutí z HTML na zobrazení zdrojáku
      this.UpdateMceSourceTextArea();
      $(textAreaTineMCEId).hide();
      $(textAreaSourceId).show();
    } else {
      // Přepnutí ze zobrazení zdrojáku do zobrazení HTML
      text = $(textAreaSourceId).val();
      //tinyMCE.activeEditor.setContent(text);
      this.GetMyEditor().setContent(text);
      this.DeselectTinyMceText();
      $(textAreaTineMCEId).show();
      $(textAreaSourceId).hide();
    }

    this.sourceViewIsActive = !this.sourceViewIsActive;
  },
  /**
   * vráti instanci editoru podle id active
   */
  GetMyEditor: function () {
    var textAreaSourceId = this.GetMceSourceTextAreaId();

    return tinyMCE.get(textAreaSourceId);
  }
};
