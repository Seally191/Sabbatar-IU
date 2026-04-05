// header.js - Fixed for GitHub Pages (Sabbatar-IU)

function initHeader() {
    const fullPath = window.location.pathname;

    // Detect current language
    let currentLang = 'da';
    if (fullPath.includes('/en/')) currentLang = 'en';
    if (fullPath.includes('/no/')) currentLang = 'no';

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

    // 1. Remove any existing language folder (/en/ or /no/)
    path = path.replace(/^\/(en|no)\//, '/');

    // 2. Make sure we keep the repo name (Sabbatar-IU)
    const repoName = '/Sabbatar-IU';

    if (targetLang === 'da') {
        // Going back to Danish (root)
        window.location.href = repoName + path;
    } else {
        // Going to English or Norwegian
        const cleanPath = (path === '/' || path === '') ? '/index.html' : path;
        window.location.href = `${repoName}/${targetLang}${cleanPath}`;
    }
}

// Run on page load and after dynamic header injection
window.addEventListener('load', initHeader);
document.addEventListener('header-loaded', initHeader);