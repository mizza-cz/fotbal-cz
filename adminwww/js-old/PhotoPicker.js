function PhotoPicker(searchFieldId, alignFieldId, pickerJsObjectName) {
	this.timeoutTimer = null;

	this.refreshLink = refreshLinkPhoto; // z PhotoPicker.latte

	this.searchFieldId = searchFieldId;
	this.alignFieldId = alignFieldId;

	this.pickerJsObjectName = pickerJsObjectName;

	this.searchTextTmp = '';

	this.Init = function() {
		$('#' + this.searchFieldId).keyup($.proxy(function(event) {
			return this.OnKeyup(event);
		}, this));

		$('#photo-picker-wrapper').on("click", '#' + this.pickerJsObjectName + '-listWrapper ul li a img', $.proxy(function(event) {
			var photo_id = parseInt($(event.target).attr('rel'));
			var align_id = this.GetAlignText();
			var self = $(event.target);
			this.SelectPhotoAndClose(photo_id, align_id, self);
			return false;
		}, this));
	};

	this.SelectPhotoAndClose = function(photo_id, align_id, self) {
		if (fromTinyMce)
			postEdit.InsertPhotoTag(photo_id, align_id);
		else {
			$('#mainPhotoHidden').val(photo_id);
			var img = $('#mainPhotoImg');
			img.attr('src', self.attr('src'));
			img.attr('title', self.attr('title'));
			img.data('big', self.data('big'));
			img.data('text', self.data('text'));
			img.data('size', self.data('size'));
			$('#deleteMainPhoto').show();
			$('#mainPhotoWrapper').show();
		}
		$('#photo-picker-wrapper').modal('hide');
	};

	this.OnKeyup = function() {
		if (this.searchTextTmp == this.GetSearchText())
			return;
		this.OnTextChange();
	};

	this.OnTextChange = function() {
		clearTimeout(this.timeoutTimer);
		this.timeoutTimer = setTimeout($.proxy(function() {
			this.UpdatePhotoList()
		}, this), 150);
	};

	this.UpdatePhotoList = function() {
		var val = this.GetSearchText();

		if (val.length > 2) {
			var link = this.refreshLink.replace('-REPLACE-', val);
			$('#' + this.pickerJsObjectName + '-listWrapper').empty();
			$('#' + this.pickerJsObjectName + '-listWrapper').append('<p>Loading...</p>');
			$.nette.ajax(link);
		} else {
			$('#' + this.pickerJsObjectName + '-listWrapper').empty();
		}
	};

	this.GetSearchText = function() {
		return $('#' + this.searchFieldId).val();
	};

	this.GetAlignText = function() {
		return $('#' + this.alignFieldId).val();
	};

	this.FocusSearchField = function() {
		$('#' + this.searchFieldId).focus();
	}

}

var photoPickerObject = new PhotoPicker(searchFieldIdPhoto, alignFieldIdPhoto, 'photoPickerObject'); // z PhotoPicker.latte

$(function() {
	photoPickerObject.Init();
});
