const locationHref = window.location.href;

const pages = {
  subject: {
    default: "/subject-manager/subject",
    spacialPages: "/subject-manager/subject/page"
  }
};

let menuBarOptions = "";
let toolBarOptions = "";

// Set main editor options by pages
if (locationHref.includes(pages.subject.default)) {
  menuBarOptions = "edit table";
  toolBarOptions = "undo redo | bold italic blockquote link | blocks | alignleft aligncenter alignright | numlist bullist";
} else {
  menuBarOptions = "file edit insert view format table tools help";
  toolBarOptions = "undo redo | bold italic blockquote link | blocks | alignleft aligncenter alignright | numlist bullist | outdent indent | pastetext photo gallery embed player match article";
}

const mceEditorsSimple = document.querySelectorAll(".mceEditorSimple");
mceEditorsSimple.forEach((mceEditorSimple) => {
  mceEditorSimple && mceEditorSimple.setAttribute("data-editor", "minorEditor");
});

// YouTube, Facebook embed. media
function updateSocMediaIframe(iframe) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(iframe, "text/html");

  const iframeHTML = dom.body.querySelector("iframe");
  const src = iframeHTML.getAttribute("src");

  iframeHTML.setAttribute("data-src", src);
  iframeHTML.setAttribute("src", "https://www.fotbal.cz/dist/cookie-consent-frame.html");
  iframeHTML.setAttribute("data-cookiecategory", "social");
  iframeHTML.setAttribute("data-placeholder", "");

  return iframeHTML.outerHTML;
}

// Twitter, Instagram, TikTok embed. media (rendered by async 3rd party JS)
function updateSocMediaPost(code) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(code, "text/html");

  const contentHTML = dom.body.querySelector("blockquote");
  const scriptHTML = dom.body.querySelector("script");

  scriptHTML.setAttribute("type", "text/plain");
  scriptHTML.setAttribute("data-cookiecategory", "social");

  const scriptSrc = scriptHTML.getAttribute("src");
  scriptHTML.removeAttribute("src");
  scriptHTML.setAttribute("data-src", scriptSrc);

  return `${contentHTML.outerHTML} ${scriptHTML.outerHTML}`;
}

function insertEmbed() {
  const textarea = document.getElementById("insert-embed-textarea");
  const saveButton = document.getElementById("insert-embed-save");
  let content = "";

  saveButton.addEventListener("click", () => {
    tinymce.get("mainEditor").focus();

    const embed = textarea.value;

    // YouTube, Facebook
    if (embed.includes("iframe")) {
      content = updateSocMediaIframe(embed);
    }

    // Twitter, Instagram, TikTok
    if (embed.includes("blockquote")) {
      content = updateSocMediaPost(embed);
    }

    tinymce.activeEditor.selection.setContent(content);
    $("#insert-embed-wrapper").modal("hide");
  });
}

// Main editor init
tinymce.init({
  selector: "#mainEditor",
  menubar: menuBarOptions || "file edit insert view format table tools help",
  plugins: "preview searchreplace autolink autosave save directionality visualblocks visualchars fullscreen link media template codesample table charmap pagebreak nonbreaking anchor advlist lists wordcount help emoticons code",
  language: "cs",
  browser_spellcheck: true,
  contextmenu: false,
  toolbar: toolBarOptions || "undo redo | bold italic blockquote link | blocks | alignleft aligncenter alignright | numlist bullist | outdent indent | pastetext photo gallery embed player match article",
  extended_valid_elements: "script[src|async|defer|type|charset]",
  entity_encoding: "raw",
  // paste_as_text: true,
  setup: function (editor) {
    // Custom button for Photo insert
    editor.ui.registry.addButton("photo", {
      icon: "image",
      tooltip: "Vložit/upravit obrázek",
      onAction: () => {
        editor.focus();
        fromTinyMce = true;
        $("#photo-picker-wrapper").modal("show");
        $('#photo-picker-wrapper input[name="photoName"]').trigger("focus");
      }
    });

    // Custom button for Gallery insert
    editor.ui.registry.addButton("gallery", {
      icon: "gallery",
      tooltip: "Vložit galerii",
      onAction: () => {
        editor.focus();
        $("#gallery-picker-wrapper").modal("show");
        $('#gallery-picker-wrapper input[name="galleryName"]').trigger("focus");
      }
    });

    // Custom button for Player box insert
    editor.ui.registry.addButton("player", {
      icon: "user",
      tooltip: "Vložit profil hráče",
      onAction: () => {
        editor.focus();
        $("#player-picker-wrapper").modal("show");
        $('#player-picker-wrapper input[name="playerName"]').trigger("focus");
      }
    });

    // Custom button for Match box insert
    editor.ui.registry.addButton("match", {
      icon: "table-cell-select-all",
      tooltip: "Vložit zápas",
      onAction: () => {
        editor.focus();
        $("#match-picker-wrapper").modal("show");
        $('#match-picker-wrapper input[name="matchName"]').trigger("focus");
      }
    });

    // Custom button for Article box insert
    editor.ui.registry.addButton("article", {
      icon: "document-properties",
      tooltip: "Vložit článek",
      onAction: () => {
        editor.focus();
        $("#article-picker-wrapper").modal("show");
        $('#article-picker-wrapper input[name="articleName"]').trigger("focus");
      }
    });

    // Custom button for Soc. media embed insert
    editor.ui.registry.addButton("embed", {
      icon: "code-sample",
      tooltip: "Vložit kód - sociální média",
      onAction: () => {
        $("#insert-embed-wrapper").modal("show");
        $("#insert-embed-wrapper textarea").trigger("focus");
        $("#insert-embed-wrapper textarea").val("");
      }
    });
  }
});

// Minor editor init
tinymce.init({
  selector: '[data-editor="minorEditor"]',
  plugins: "preview searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor advlist lists wordcount help emoticons code",
  language: "cs",
  browser_spellcheck: true,
  contextmenu: false,
  toolbar: "undo redo | bold italic link | blocks | pastetext",
  height: "300",
  entity_encoding: "raw",
  paste_as_text: true
});

if (document.getElementById("mainEditor")) {
  insertEmbed();
}
