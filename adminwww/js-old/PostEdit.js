/**
 * Sdružuje vlastnosti a metody nutné pro fungování javascriptové mechaniky stránky s editací Postu pro TinyMCE.
 * @type {Object}
 */

var postEdit = {
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
		return tinymce.activeEditor.id;
	},
	/**
	 * Nastaví instanci TinyMCE Editoru
	 */
	SetupTinyMCE: function () {

		tinyMCE.init({
			paste_auto_cleanup_on_paste: true,
			paste_remove_styles: true,
			paste_remove_styles_if_webkit: true,
			paste_strip_class_attributes: "all",
			paste_remove_spans: true,
			valid_children: "+body[style]",
			add_form_submit_trigger: false, // volame sami BeforeSave na formu postu
			mode: "specific_textareas",
			language: "cs",
			editor_selector: "mceEditor",
			height: 550,
			theme: "advanced",
			extended_valid_elements: "span[style|class]",
			plugins: "spellchecker, paste, lists",
			content_css: "/adminwww/css/customTinyMceContent.css",
			theme_advanced_toolbar_align: "left",
			theme_advanced_toolbar_location: "top",
			theme_advanced_buttons1: "bold,italic,underline,|,justifyleft,justifycenter,justifyright,formatselect,styleselect",
			theme_advanced_buttons2: "spellchecker,|,bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,anchor|,|,forecolor,insertdate,inserttime,|,spellchecker,advhr,removeformat,|,sub,sup,|,charmap,|,esPhoto,esPlainText,esPlayer,esCitation,esEmbed,esVideo",
			theme_advanced_buttons3: "",
			theme_simple_toolbar_location: "top",
			style_formats : [
                {title : 'Události kola', selector : 'ol', classes : "highlight-list"},
                /*{title : 'Red text', inline : 'span', styles : {color : '#ff0000'}},
                {title : 'Red header', block : 'h1', styles : {color : '#ff0000'}},
                {title : 'Example 1', inline : 'span', classes : 'example1'},
                {title : 'Example 2', inline : 'span', classes : 'example2'},
                {title : 'Table styles'},
                {title : 'Table row 1', selector : 'tr', classes : 'tablerow1'}*/
            ],
         //    formats : {
         //        custom_format : {block : 'h1', attributes : {title : "Header"}, styles : {color : 'red'}}
        	// },
			setup: function (ed) {
				// Zapne tlačítko spellcheckeru
				ed.onInit.add(function (ed) {
					setTimeout(function () {
						tinyMCE.activeEditor.controlManager.setActive('spellchecker', true);
						tinymce.execCommand('mceSpellCheck', true);
					}, 1);
				});

				// Přidání tlačítka pro výběr fotky
				ed.addButton('esPhoto', {
					title: 'Výběr fotky',
					image: '/adminwww/img/TinyMCE_custom_button_images.png',
					onclick: function () {
						ed.focus();
						fromTinyMce = true;
						$('#photo-picker-wrapper').modal('show');
						photoPickerObject.FocusSearchField();
					}
				});

				// Přidání tlačítka označení hráče
				ed.addButton('esPlayer', {
					title: 'Označit jméno hráče',
					image: '/adminwww/img/TinyMCE_custom_button_player.png',
					onclick: function () {
						ed.focus();
						$('#player-picker-wrapper').modal('show');
						var selectedText = ed.selection.getContent({format: 'text'});
						playerPickerObject.SetSearchText(selectedText);
						playerPickerObject.FocusSearchField();
					}
				});

				// Přidání tlačítka vložení textu z ČTK
				ed.addButton('esPlainText', {
					title: 'Vložit a odformátovat text z ČTK',
					image: '/adminwww/img/TinyMCE_custom_button_unformat_plain_text.png',
					onclick: function () {
						ed.focus();
						$('#plain-text-wrapper').modal('show');
						$('#plain-text-wrapper textarea').focus();
					}
				});

				// Přidání tlačítka vložení citace
				ed.addButton('esCitation', {
					title: 'Označit citaci',
					image: '/adminwww/img/TinyMCE_custom_button_citation.png',
					onclick: function () {
						ed.focus();
						$('#citation-wrapper').modal('show');
						$('#citation-wrapper select').focus();
					}
				});

				// Přidání tlačítka vložení embedu
				ed.addButton('esEmbed', {
					title: 'Vložení embedu',
					image: '/adminwww/img/TinyMCE_custom_button_embed.png',
					onclick: function () {
						ed.focus();
						$('#embed-wrapper').modal('show');
						$('#embed-wrapper input[type="text"]').focus();
					}
				});

				// Přidání tlačítka vložení videa
				ed.addButton('esVideo', {
					title: 'Vložení videa',
					image: '/adminwww/img/TinyMCE_custom_button_video.png',
					onclick: function () {
						ed.focus();
						$('#video-wrapper').modal('show');
						$('#video-wrapper input[type="text"]').focus();
					}
				});
			}
		});

	},
	/**
	 * Oznaci blok textu jako citaci
	 */
	InsertCitation: function () {
		var selectedText = tinymce.activeEditor.selection.getContent();

		if (selectedText != '')
			tinymce.activeEditor.selection.setContent('[cite ' + $('#citetype').val() + ' ' + tinymce.activeEditor.selection.getContent() + ']');

		$('#citation-wrapper').modal('hide');

		return false;
	},
	/**
	 * Vlozi video tag dle ID zapasu ci ID sestrihu
	 */
	InsertVideo: function () {
		tinymce.activeEditor.selection.setContent('[video ' + $('#videoid').val() + ']');

		$('#video-wrapper').modal('hide');

		return false;
	},
	/**
	 * Vloží embedovaný kód
	 */
	InsertEmbed: function () {
		var data = $('#dataforembed').val();
		var code = '';

		if (data != '') {
			if (data.match(/youtube\.com/))
				code = embedManager.createYoutubeEmbed(data);

			if (data.match(/instagram\.com/))
				code = embedManager.createInstagramEmbed(data);

			if (data.match(/gfycat\.com/))
				code = embedManager.createGfycatEmbed(data);

			if (data.match(/twitter\.com/))
				code = embedManager.createTwitterEmbed(data);

			if (data.match(/vine\.co/))
				code = embedManager.createVineEmbed(data);
		}

		if (code != '') {
			tinyMCE.activeEditor.execCommand(
					'mceInsertContent',
					false,
					code
					);
		}

		$('#embed-wrapper').modal('hide');

		return false;
	},
	/**
	 * Zruší veškeré označení textu v TinyMCE editoru
	 */
	DeselectTinyMceText: function () {
		tinymce.activeEditor.selection.collapse();
	},
	/**
	 * Označený text v editoru obalí do tagu hráče
	 * @param {Number} player_id
	 * @constructor
	 */
	InsertPlayerTag: function (player_id) {
		var name = tinymce.activeEditor.selection.getContent();

		if (name == '')
			tinymce.activeEditor.execCommand('mceInsertContent', false, '[playermedailon ' + player_id + ']');
		else
			tinymce.activeEditor.selection.setContent('[player ' + player_id + ' "' + tinymce.activeEditor.selection.getContent() + '"]');
	},
	/**
	 * Prida tag pro fotku
	 * @param {Number} photo_id
	 * @param {String} align_id
	 * @constructor
	 */
	InsertPhotoTag: function (photo_id, align_id) {
		//tinymce.activeEditor.selection.setContent('[photo ' + photo_id + ' ' + align_id + ']');
		tinymce.activeEditor.selection.setContent('[photo ' + photo_id + ']');
	},
	/**
	 * Vloží a odformátuje text odřádkovaný entrem a odstraní odsazení odstavců.
	 * @return {Boolean}
	 */
	InsertPlainText: function () {
		var txt = $('#plain-text-wrapper textarea').val();
		var lines = txt.split(/\r\n|\r|\n/);

		txt = '';
		for (var i = 0; i < lines.length; i++) {
			txt += '<p>' + $.trim(lines[i]) + '</p>';
		}

		tinyMCE.activeEditor.execCommand(
				'mceInsertContent',
				false,
				txt
				);

		$('#plain-text-wrapper').modal('hide');

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
		inputText = '<div>' + inputText + '</div>'; //Je to nutné obalit ještě jedním divem.
		var dom = $(inputText);	//Rozparsuje html kód a vytvoří dom
		return dom.html();
	},
	/**
	 * Updatuje zdrojový prvek TextArea, nad kterým běží TinyMCE Editor aktuálním obsahem editoru.
	 */
	UpdateMceSourceTextArea: function () {
		var textAreaSourceId = '#' + this.GetMceSourceTextAreaId();
		tinyMCE.triggerSave();	//Updatuje zdrojový text area aktuálním obsahem editoru
		var text = $(textAreaSourceId).val();
		text = this.RecreateDom(text);
		$(textAreaSourceId).val(text);
	},
	/**
	 * Provede přepnutí editoru mezi zobrazením zdrojového kódu a TinyMCE editorem.
	 */
	ToggleHtmlView: function () {
		var textAreaSourceId = '#' + this.GetMceSourceTextAreaId();
		var textAreaTineMCEId = textAreaSourceId + '_parent';
		var text = '';
		if (!this.sourceViewIsActive) {
			// Přepnutí z HTML na zobrazení zdrojáku
			this.UpdateMceSourceTextArea();
			$(textAreaTineMCEId).hide();
			$(textAreaSourceId).show();
		} else {
			// Přepnutí ze zobrazení zdrojáku do zobrazení HTML
			text = $(textAreaSourceId).val();
			tinyMCE.activeEditor.setContent(text);
			this.DeselectTinyMceText();
			$(textAreaTineMCEId).show();
			$(textAreaSourceId).hide();
		}

		this.sourceViewIsActive = !this.sourceViewIsActive;
	},
};
