// header.js - Robust version for GitHub Pages

function initHeader() {
    const path = window.location.pathname;

    // Detect current language
    let currentLang = 'da';
    if (path.includes('/en/')) currentLang = 'en';
    if (path.includes('/no/')) currentLang = 'no';

    // ──────────────── Sidebar ────────────────
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

        const targetLang = this.getAttribute("lang");
        let path = window.location.pathname;

        // Extract project root
        const match = path.match(/^\/([^\/]+)(\/.*)?$/);
        const project = match[1];
        let rest = match[2] || "/";

        // Remove existing language
        rest = rest.replace(/^\/(en|no)(\/|$)/, "/");

        // Default to index.html if empty
        if (rest === "/") {
            rest = "/index.html";
        }

        // Add new language
        if (targetLang !== "da") {
            rest = `/${targetLang}${rest}`;
        }

        const newPath = `/${project}${rest}`;

        window.location.href = newPath + window.location.search + window.location.hash;
    });
});
}

// Run the script
window.addEventListener('load', initHeader);
document.addEventListener('header-loaded', initHeader);