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

        const targetLang = this.getAttribute("lang"); // "en" or "no"
        let path = window.location.pathname;

        // Remove existing language prefix
        path = path.replace(/^\/(en|no)(?=\/|$)/, "");

        // If root, go to index.html
        if (path === "/" || path === "") {
            path = "/index.html";
        }

        // Add language if needed
        if (targetLang === "en" || targetLang === "no") {
            path = `/${targetLang}${path}`;
        }

        window.location.href = path;
    });
});
}

// Run
window.addEventListener("load", initHeader);
document.addEventListener("header-loaded", initHeader);