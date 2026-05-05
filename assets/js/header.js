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

        const targetLang = this.getAttribute("lang");
        let path = window.location.pathname;

        // Normalize "/index" or "/index.html" → "/"
        if (path === "/index" || path === "/index.html") {
            path = "/";
        }

        // Remove existing language prefix
        path = path.replace(/^\/(en|no)(?=\/|$)/, "");

        // Add language
        if (targetLang === "en" || targetLang === "no") {
            path = `/${targetLang}${path}`;
        }

        // Clean double slashes
        path = path.replace(/\/+/g, "/");

        window.location.href = path;
    });
});
}

// Run
window.addEventListener("load", initHeader);
document.addEventListener("header-loaded", initHeader);