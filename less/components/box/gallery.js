(function ($) {
  $(document).ready(function () {
    var galleryOptions;
    if (typeof esgalleryOptions !== "undefined" && esgalleryOptions !== null) {
      galleryOptions = esgalleryOptions;
    } else {
      galleryOptions = {
        onReady: false,
        path: "img/esgallery/",
        container: "esgallery",
        containerOverlay: "esgallery-overlay",
        sprite: "sprite",
        htmlOpenLink: "esgallery-open",
        htmlCloseLink: "esgallery-close",
        social: false,
        summary: false,
        showLink: "#show-link",
        showLinkCopy: "Kopírovat odkaz",
        controlSlideshow: true,
        controlCaption: false,
        controlPlaylist: true,
        controlFullImage: true,
        controlTitle: false
      };
    }
    $("#media-list").esgallery(galleryOptions);
  });
})(jQuery);
