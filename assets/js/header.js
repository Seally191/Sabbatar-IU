// header.js - Fixed for GitHub Pages + multiple languages

function initHeader() {
    const currentPath = window.location.pathname;

    // Detect current language
    let currentLang = 'da';
    if (currentPath.includes('/en/')) currentLang = 'en';
    if (currentPath.includes('/no/')) currentLang = 'no';

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
            if (flag.lang === currentLang) return; // don't show current language

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

    // Remove existing language folder (/en/ or /no/)
    path = path.replace(/^\/(en|no)\//, '/');

    // Remove repo name if it's duplicated (GitHub Pages issue)
    const repoName = '/Sabbatar-IU';
    if (path.startsWith(repoName + repoName)) {
        path = path.replace(repoName + repoName, repoName);
    }

    if (targetLang === 'da') {
        // Danish = root
        window.location.href = path || '/';
    } else {
        // English or Norwegian
        const cleanPath = path === '/' || path === '' ? '/index.html' : path;
        window.location.href = `/${targetLang}${cleanPath}`;
    }
}

// Run header logic
window.addEventListener('load', initHeader);
document.addEventListener('header-loaded', initHeader);