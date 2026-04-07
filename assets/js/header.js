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

            const targetLang = this.getAttribute("lang"); // "da", "en", "no"
            let path = window.location.pathname;

            // Get project root (/Sabbatar-IU)
            const match = path.match(/^\/([^\/]+)(\/.*)?$/);
            const project = match[1];
            let rest = match[2] || "/";

            // Remove existing language (/en or /no)
            rest = rest.replace(/^\/(en|no)(?=\/|$)/, "");

            // Ensure valid path
            if (rest === "/") rest = "/index.html";

            // Add language only if en or no
            if (targetLang === "en" || targetLang === "no") {
                rest = `/${targetLang}${rest}`;
            }

            const newPath = `/${project}${rest}`;

            window.location.href = newPath;
        });
    });
}

// Run
window.addEventListener("load", initHeader);
document.addEventListener("header-loaded", initHeader);