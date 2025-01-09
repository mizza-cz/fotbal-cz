/*!
 * fetchAnnouncement.js
 */
(function () {
  const TEXTS = {
    cs: {
      fetching: "Načítám detail oznámení",
      fetchFailed: "Omluvte chybu, nepodařil se načíst detail oznámení",
      URLannouncement: "URL můžete zkopírovat ručně",
      URLcopy: "Zkopírovat URL",
      URLcopied: "URL zkopírovaná",
      NotSupportedCopy: "Kopírování není povoleno nebo jej váš prohlížeč nepodporuje"
    }
  };

  const fetchData = (fetchButton) => {
    const fetchURL = fetchButton.href;

    const req = new Request(fetchURL, {
      method: "GET"
    });

    fetchButton.style.pointerEvents = "none";

    let container = document.getElementById("modal-content");
    container.innerHTML = "";
    container.insertAdjacentHTML("afterbegin", `<span class="Loader u-mx-auto"></span>`);
    container.insertAdjacentHTML("beforeend", `<p class="u-ta-center u-fs-big u-fw-bold u-mt-24">${TEXTS.cs.fetching}</p>`);

    const actionsSuccess = document.getElementById("modal-actions-success");
    const actionsError = document.getElementById("modal-actions-error");

    actionsSuccess.classList.remove("u-display-flex");
    actionsSuccess.classList.add("u-display-none");
    actionsError.classList.remove("u-display-flex");
    actionsError.classList.add("u-display-none");

    // Button
    let containerURL = document.getElementById("modal-url");
    let containerURLText = containerURL.querySelector("span");
    let containerURLIcon = containerURL.querySelector("svg");

    containerURL.style.pointerEvents = "all";
    containerURLText.innerText = TEXTS.cs.URLcopy;
    containerURLIcon.classList.remove("is-anim");

    const modalDialog = container.closest(".js-modal-dialog");
    modalDialog.classList.remove("is-loaded");

    const checkError = (response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.text();
      } else {
        throw Error(response.status);
      }
    };

    const handleError = (error) => {
      container.innerHTML = "";
      console.warn("Fetch failed:", error.message);
      container && container.insertAdjacentHTML("afterbegin", `<p class="u-ta-center u-fs-big u-fw-bold u-my-24">${TEXTS.cs.fetchFailed}</p>`);
      fetchButton.style.pointerEvents = "all";
      containerURL.dataset.url = "";
      actionsError.classList.remove("u-display-none");
      actionsError.classList.add("u-display-flex");
    };

    const copyToClipboard = (text) => {
      // console.log(navigator);
      // navigator.clipboard.writeText(text);

      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(
          () => {
            // Clipboard successfully set
            containerURLIcon.classList.add("is-anim");
            containerURLText.innerText = TEXTS.cs.URLcopied;
            containerURL.style.pointerEvents = "none";
          },
          () => {
            // Clipboard write failed
          }
        );
      } else {
        if (document.querySelector(".js-copyURL-error")) {
          document.querySelector(".js-copyURL-error").remove();
        }
        container && container.insertAdjacentHTML("beforeend", `<p class="u-ta-center u-fs-big u-fw-bold u-my-24 js-copyURL-error">${TEXTS.cs.NotSupportedCopy}.<br>${TEXTS.cs.URLannouncement}: <a href="${text}">${text}</a></p>`);
      }
    };

    const handleData = (HTML) => {
      container.innerHTML = "";
      modalDialog && modalDialog.classList.add("is-loaded");
      const parser = new DOMParser();
      const doc = parser.parseFromString(HTML, "text/html");
      const announcement = doc.querySelector("#js-announcement");
      container && container.appendChild(announcement);
      fetchButton.style.pointerEvents = "all";
      containerURL.dataset.url = fetchURL;
      actionsSuccess.classList.remove("u-display-none");
      actionsSuccess.classList.add("u-display-flex");
      containerURL.addEventListener("click", () => {
        copyToClipboard(fetchURL);
      });
    };

    fetch(req).then(checkError).then(handleData).catch(handleError);
  };

  document.addEventListener("click", (ev) => {
    const fetchButton = ev.target.classList.contains("js-fetchAnnouncement") ? ev.target : ev.target.closest(".js-fetchAnnouncement");
    if (fetchButton) {
      ev.preventDefault();
      fetchData(fetchButton);
    }
  });
})();
