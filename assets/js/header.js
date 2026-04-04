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

            path = path.replace(/\/index\.html$/, "");
            path = path.replace(/\.html$/, "");

            path = path.replace(/^\/(en|no)(\/|$)/, "/");

            if (!path.startsWith("/")) path = "/" + path;

            if (path === "/") path = "/index";

            let newPath;

            if (targetLang === "da") {
                newPath = path;
            } else {
                newPath = `/${targetLang}${path}`;
            }

            newPath += ".html";

            window.location.href = newPath;
        });
    });
}

// 
initHeader();
document.addEventListener("header-loaded", initHeader);