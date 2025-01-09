(function () {
    const EXPIRATION_TIME = 30 * 86400000; // expiracia 30 dni
    const cssKeys = {
        cookie: 'privacyAccepted',
        active: 'is-active',
    };

    const modal = document.querySelector('.cookie-modal');
    const btn = document.querySelector('.cookie-btn');

    const setExpiration = () => {
        // ziskame aktualny datum
        const now = new Date();
        // nastavime dobu expiracie
        const expiration = now.getTime() + EXPIRATION_TIME;
        now.setTime(expiration);
        // nastavime platnost cookies
        document.cookie = `${cssKeys.cookie}=1; path=/; domain=.fotbal.cz; expires=${now.toGMTString()}`;
    };

    const handleClick = (e) => {
        // zabranime presmerovanie
        e.preventDefault();
        // skryjeme modal
        modal.classList.remove(cssKeys.active);
        // nastavime cookies
        setExpiration();
    };

    const toggle = () => {
        // vyprsala cookie?
        const expired = document.cookie.search(`${cssKeys.cookie}=1`) < 0;
        // ak ano, zobrazime modal
        if (expired) {
            modal.classList.add(cssKeys.active);
        }
    };

    window.addEventListener('DOMContentLoaded', () => {
        // zobrazime/skryjeme modal
        toggle();
        // pridame click listenere na tlacitko modalu
        btn.addEventListener('click', handleClick);
    });
})();
