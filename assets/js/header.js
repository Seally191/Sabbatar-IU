// header.js

function loadHeaderAndInit() {
    // ── Detect base path (works on GitHub Pages + local) ──
    const pathParts = location.pathname.split('/').filter(part => part.length > 0);
    let base = '/';

    // Heuristic: if first path segment looks like a repo name (not a content folder)
    if (pathParts.length > 0) {
        const firstSegment = pathParts[0];
        // Skip if it looks like your content/language folders
        const contentFolders = ['dk', 'en', 'assets', 'Articles', 'img', 'js'];
        if (!contentFolders.includes(firstSegment)) {
            base = `/${firstSegment}/`;
        }
    }

    // Build the correct URL to header-dk.html
    const headerUrl = base + 'dk/header-dk.html';

    // ── Fetch the header ──
    fetch(headerUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Header fetch failed: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            const container = document.getElementById('header-container');
            if (container) {
                container.innerHTML = html;
                // Signal that header is loaded → initHeader() will run
                document.dispatchEvent(new Event('header-loaded'));
            }
        })
        .catch(err => {
            console.error("Failed to load header:", err);
            const container = document.getElementById('header-container');
            if (container) {
                container.innerHTML = '<div style="color: #d00; padding: 1rem; background: #fee;">' +
                                     'Header failed to load – check console (F12)</div>';
            }
        });
}

// ──────────────── Header initialization logic (runs after fetch or immediately) ────────────────
function initHeader() {
    // ──────────────── Sidebar (burger menu) ────────────────
    const sidebar   = document.querySelector(".sidebar");
    const openBtn   = document.getElementById("openSidebar");
    const closeBtn  = document.getElementById("closeSidebar");

    if (sidebar && openBtn && closeBtn) {
        // Remove any old listeners to prevent duplicates on re-init
        const newOpenBtn = openBtn.cloneNode(true);
        openBtn.parentNode.replaceChild(newOpenBtn, openBtn);

        newOpenBtn.addEventListener("click", () => {
            sidebar.style.display = "flex";
        });

        closeBtn.addEventListener("click", () => {
            sidebar.style.display = "none";
        });

        // Optional: close sidebar when clicking outside
        document.addEventListener("click", function closeOutside(e) {
            if (sidebar.style.display !== "flex") return;
            if (!sidebar.contains(e.target) && !newOpenBtn.contains(e.target)) {
                sidebar.style.display = "none";
            }
        }, { once: false });
    }

    // ──────────────── Language dropdowns ────────────────
    const dropdownButtons = document.querySelectorAll(".dropbtn");

    dropdownButtons.forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener("click", function (event) {
            event.stopPropagation();

            const dropdown = this.nextElementSibling;

            document.querySelectorAll(".dropdown-content").forEach(menu => {
                if (menu !== dropdown) menu.classList.remove("show");
            });

            dropdown.classList.toggle("show");
        });
    });

    const outsideClickHandler = function () {
        document.querySelectorAll(".dropdown-content").forEach(menu => {
            menu.classList.remove("show");
        });
    };

    document.removeEventListener("click", outsideClickHandler);
    document.addEventListener("click", outsideClickHandler);
}

// ── Run immediately (in case header is already static in the page) ──
initHeader();

// ── Also run when dynamic header is inserted ──
document.addEventListener("header-loaded", initHeader);

// ── Start loading the header right away ──
loadHeaderAndInit();