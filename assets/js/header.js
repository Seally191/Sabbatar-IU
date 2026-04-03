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

        // Close when clicking outside
        document.addEventListener("click", function (e) {
            if (sidebar.style.display !== "flex") return;
            if (!sidebar.contains(e.target) && !newOpenBtn.contains(e.target)) {
                sidebar.style.display = "none";
            }
        });
    }

    // ──────────────── Language Switcher (NEW) ────────────────
    const langLinks = document.querySelectorAll(".language-switcher a");

    langLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetLang = this.getAttribute("lang"); // da / en / no
            let path = window.location.pathname;

            // Remove existing language prefix if present
            path = path.replace(/^\/(en|no)\//, "/");

            // Special case: root "/"
            if (path === "/") path = "/index";

            // Build new path
            let newPath;

            if (targetLang === "da") {
                newPath = path; // Danish = no prefix
            } else {
                newPath = `/${targetLang}${path}`;
            }

            window.location.href = newPath;
        });
    });
}

// Run once immediately
initHeader();

// Re-run after header is injected
document.addEventListener("header-loaded", initHeader);