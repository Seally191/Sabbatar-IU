// header.js
function initHeader() {

    // ──────────────── Sidebar (burger menu) ────────────────
    const sidebar = document.querySelector(".sidebar");
    const openBtn = document.getElementById("openSidebar");
    const closeBtn = document.getElementById("closeSidebar");

    if (sidebar && openBtn && closeBtn) {

        // Prevent duplicate listeners
        const newOpenBtn = openBtn.cloneNode(true);
        openBtn.parentNode.replaceChild(newOpenBtn, openBtn);

        newOpenBtn.addEventListener("click", () => {
            sidebar.style.display = "flex";
        });

        closeBtn.addEventListener("click", () => {
            sidebar.style.display = "none";
        });

        document.addEventListener("click", function (e) {
            if (sidebar.style.display !== "flex") return;

            if (!sidebar.contains(e.target) && !newOpenBtn.contains(e.target)) {
                sidebar.style.display = "none";
            }
        });
    }

    // ──────────────── Language Switcher (FIXED) ────────────────
    const langLinks = document.querySelectorAll(".language-switcher a");

    langLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetLang = this.getAttribute("lang");
            let path = window.location.pathname;

            // Remove existing language prefix (/en/ or /no/)
            path = path.replace(/^\/(en|no)\//, "/");

            // Handle edge case: "/en" or "/no"
            path = path.replace(/^\/(en|no)$/, "/");

            // Add new language (except default "da")
            if (targetLang !== "da") {
                path = `/${targetLang}${path}`;
            }

            // Preserve query string and hash (important!)
            const query = window.location.search;
            const hash = window.location.hash;

            window.location.href = path + query + hash;
        });
    });
}

// Init on load
initHeader();

// Re-init if header is dynamically reloaded
document.addEventListener("header-loaded", initHeader);