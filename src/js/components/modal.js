/*!
 * modal.js
 */
(function () {
  const isActive = "is-active";
  const isBlocked = "is-blocked";
  const isClosing = "is-closing";
  // const isModalActive = "is-modalActive";
  const isDynamicContent = "js-modal-open--dynamicContent";
  const isAnnouncement = "js-modal-open--announcement";

  const openModal = (modalOpenEl) => {
    modalOpenEl.classList.add(isActive);
    modalOpenEl.setAttribute("aria-expanded", true);

    let modal = null;
    const activeModal = document.querySelector(".js-modal.is-active");

    // Fetched / dynamic content - Official board - Announcement detail
    if (modalOpenEl.classList.contains(isAnnouncement)) {
      modal = document.querySelector("#modal-announcement");
    } else {
      modal = document.querySelector(modalOpenEl.getAttribute("href")) || document.querySelector(modalOpenEl.dataset.target);
    }

    if (activeModal) {
      const activeModalID = activeModal.id;
      const activeModalOpenEl = document.querySelector(`[href='#${activeModalID}']`) || document.querySelector(`[data-target='#${activeModalID}']`);
      activeModalOpenEl.setAttribute("aria-expanded", false);
      activeModal.classList.remove(isActive);
      activeModal.removeAttribute("aria-modal");
    }

    // Dynamic content
    if (modalOpenEl.classList.contains(isDynamicContent)) {
      const title = modal.querySelector(".js-modal-title");
      const body = modal.querySelector(".js-modal-body");

      title && (title.innerHTML = modalOpenEl.textContent);
    }

    modal.classList.add(isActive);
    modal.setAttribute("aria-modal", true);
    modalOpenEl.setAttribute("aria-expanded", true);

    document.body.classList.add(isBlocked);
    // document.body.classList.add(isModalActive);
  };

  const closeModal = (modalOpenEl, modal) => {
    if (modalOpenEl) {
      modalOpenEl.classList.remove(isActive);
      modalOpenEl.setAttribute("aria-expanded", false);
      modalOpenEl.style.pointerEvents = "all";
    }

    if (modal) {
      modal.classList.remove(isActive);
      modal.removeAttribute("aria-modal");
      modalClosingAnimation(modal);

      // Remove YouTube iframe / Stop playing on close
      const youTubeIframe = modal.querySelector("#js-youTubeVideo-container > iframe");
      if (youTubeIframe) {
        youTubeIframe.remove();
      }
    }

    document.body.classList.remove(isBlocked);
    // document.body.classList.remove(isModalActive);
  };

  const modalClosingAnimation = (modal) => {
    modal.classList.add(isClosing);

    if ("AnimationEvent" in window) {
      modal.addEventListener(
        "animationend",
        () => {
          modal.classList.remove(isClosing);
        },
        { once: true }
      );
    } else {
      modal.classList.remove(isClosing);
    }
  };

  // Enable opening Modal
  document.addEventListener("click", (ev) => {
    const openModalEl = ev.target.classList.contains("js-modal-open") ? ev.target : ev.target.closest(".js-modal-open");
    if (openModalEl) {
      ev.preventDefault();
      openModal(openModalEl);
    }
  });

  // Enable closing already active Modal (click)
  document.addEventListener("click", (ev) => {
    if (ev.target.closest(".js-modal-close") || ev.target.classList.contains("js-modal")) {
      const activeOpenModalEl = document.querySelector(".js-modal-open.is-active");
      const activeModal = document.querySelector(".js-modal.is-active");
      closeModal(activeOpenModalEl, activeModal);
    }
  });

  // Enable closing already active Modal (Esc)
  document.addEventListener("keydown", (ev) => {
    const activeOpenModalEl = document.querySelector(".js-modal-open.is-active");
    const activeModal = document.querySelector(".js-modal.is-active");

    if (ev.key === "Escape" && activeModal) {
      closeModal(activeOpenModalEl, activeModal);
    }
  });
})();
