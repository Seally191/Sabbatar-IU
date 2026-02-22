// header.js

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

        // Optional: close sidebar when clicking outside (very user-friendly)
        document.addEventListener("click", function closeOutside(e) {
            if (sidebar.style.display !== "flex") return;
            if (!sidebar.contains(e.target) && !newOpenBtn.contains(e.target)) {
                sidebar.style.display = "none";
            }
        }, { once: false }); // we keep this one
    }

    // ──────────────── Language dropdowns ────────────────
    const dropdownButtons = document.querySelectorAll(".dropbtn");

    dropdownButtons.forEach(button => {
        // Clean previous listeners if any
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener("click", function (event) {
            event.stopPropagation();

            const dropdown = this.nextElementSibling;

            // Close all other dropdowns
            document.querySelectorAll(".dropdown-content").forEach(menu => {
                if (menu !== dropdown) menu.classList.remove("show");
            });

            dropdown.classList.toggle("show");
        });
    });

    // Close all dropdowns when clicking anywhere outside
    const outsideClickHandler = function () {
        document.querySelectorAll(".dropdown-content").forEach(menu => {
            menu.classList.remove("show");
        });
    };

    // Remove old listener if exists, then add fresh one
    document.removeEventListener("click", outsideClickHandler);
    document.addEventListener("click", outsideClickHandler);
}

// Run once immediately — covers static header case
initHeader();

// Listen for the signal that the header was just inserted
document.addEventListener("header-loaded", initHeader);