// header.js - Clean & Reliable for GitHub Pages

function initHeader() {

    // ──────────────── Sidebar (Burger Menu) ────────────────
    const sidebar = document.querySelector(".sidebar");
    const openBtn = document.getElementById("openSidebar");
    const closeBtn = document.getElementById("closeSidebar");

    if (sidebar && openBtn && closeBtn) {
        const newOpenBtn = openBtn.cloneNode(true);
        openBtn.parentNode.replaceChild(newOpenBtn, openBtn);

        newOpenBtn.addEventListener("click", () => sidebar.style.display = "flex");
        closeBtn.addEventListener("click", () => sidebar.style.display = "none");

        document.addEventListener("click", (e) => {
            if (sidebar.style.display === "flex" && 
                !sidebar.contains(e.target) && 
                !newOpenBtn.contains(e.target)) {
                sidebar.style.display = "none";
            }
        });
    }

    // ──────────────── Language Switcher ────────────────
    const langLinks = document.querySelectorAll(".language-switcher a");

    langLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetLang = this.getAttribute("lang");   // "en" or "no"
            let path = window.location.pathname;

            // 1. Remove any existing language folder (/en/ or /no/)
            path = path.replace(/^\/(en|no)\//, "/");

            // 2. Add the new language (except for Danish)
            if (targetLang !== "da") {
                path = `/${targetLang}${path}`;
            }

            // 3. Make sure /Sabbatar-IU is always present
            if (!path.startsWith('/Sabbatar-IU')) {
                path = '/Sabbatar-IU' + (path === '/' ? '' : path);
            }

            // Final redirect
            window.location.href = path + window.location.search + window.location.hash;
        });
    });
}

// Run on load + after header is injected
window.addEventListener('load', initHeader);
document.addEventListener('header-loaded', initHeader);