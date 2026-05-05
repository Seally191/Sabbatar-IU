// header.js — ONLY handles sidebar + language flags

function initHeader() {

// ──────────────── Sidebar ────────────────
const sidebar = document.querySelector(".sidebar");
const openBtn = document.getElementById("openSidebar");
const closeBtn = document.getElementById("closeSidebar");

if (sidebar && openBtn && closeBtn) {

    openBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        sidebar.style.display = "none";
    });

    document.addEventListener("click", (e) => {
        if (
            sidebar.style.display === "flex" &&
            !sidebar.contains(e.target) &&
            !openBtn.contains(e.target)
        ) {
            sidebar.style.display = "none";
        }
    });
}

    // ──────────────── Language Switcher (FLAGS ONLY) ────────────────
const langLinks = document.querySelectorAll(".language-switcher a");

langLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetLang = this.getAttribute("lang"); // "en", "no", or "da"
        let path = window.location.pathname;

        // Normalize index → root
        if (path === "/index" || path === "/index.html") {
            path = "/";
        }

        // Extract current language if present
        const langMatch = path.match(/^\/(en|no)(\/|$)/);
        let currentLang = langMatch ? langMatch[1] : null;

        // Remove current language from path
        if (currentLang) {
            path = path.replace(`/${currentLang}`, "") || "/";
        }

        // Normalize again
        if (path === "") path = "/";

        // Build new path
        let newPath;

        if (targetLang === "da") {
            // Danish = no prefix
            newPath = path;
        } else {
            newPath = `/${targetLang}${path}`;
        }

        window.location.href = newPath;
    });
});
}

// Run
window.addEventListener("load", initHeader);
document.addEventListener("header-loaded", initHeader);