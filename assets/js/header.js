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
    const switchers = document.querySelectorAll(".language-switcher");

    switchers.forEach(switcher => {
        switcher.innerHTML = "";

        const flags = [
            { lang: 'da', emoji: '🇩🇰', title: 'Dansk' },
            { lang: 'en', emoji: '🇬🇧', title: 'English' },
            { lang: 'no', emoji: '🇳🇴', title: 'Norsk' }
        ];

        flags.forEach(flag => {
            if (flag.lang === currentLang) return;

            const a = document.createElement('a');
            a.href = "#";
            a.title = flag.title;
            a.innerHTML = flag.emoji;
            a.setAttribute('lang', flag.lang);

            a.addEventListener("click", (e) => {
                e.preventDefault();
                switchToLanguage(flag.lang);
            });

            switcher.appendChild(a);
        });
    });
}

function switchToLanguage(targetLang) {
    let path = window.location.pathname;

    // Remove existing language folder
    path = path.replace(/^\/(en|no)\//, '/');

    // Get the repo name dynamically (e.g. /Sabbatar-IU)
    const parts = path.split('/').filter(Boolean);
    const repoName = parts[0] ? '/' + parts[0] : '';

    if (targetLang === 'da') {
        // Danish version = root
        window.location.href = repoName + (path.replace(repoName, '') || '/');
    } else {
        // English or Norwegian
        let cleanPath = path.replace(repoName, '');
        if (!cleanPath || cleanPath === '/') cleanPath = '/index.html';

        window.location.href = `${repoName}/${targetLang}${cleanPath}`;
    }
}

// Run the script
window.addEventListener('load', initHeader);
document.addEventListener('header-loaded', initHeader);