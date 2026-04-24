window.addEventListener("load", () => {

  // --- Detect language ---
  const lang = document.documentElement.lang || "en";

  // --- Translations ---
  const translations = {
    en: {
      text: "We use third-party services that may set cookies.",
      accept: "Accept",
      reject: "Reject"
    },
    da: {
      text: "Vi bruger tredjepartstjenester, der kan sætte cookies. <a href='../cookiepolitik'>Se cookiepolitik.</a>",
      accept: "Acceptér",
      reject: "Afvis"
    },
    no: {
      text: "Vi bruker tredjepartstjenester som kan sette cookies.",
      accept: "Godta",
      reject: "Avslå"
    }
  };

  // fallback to English if unknown lang
  const t = translations[lang] || translations.en;

  // --- Inject banner ---
  document.body.insertAdjacentHTML("beforeend", `
    <div id="cookie-banner" style="display:none;">
      <div class="cookie-content">
        <p>${t.text}</p>
        <div class="cookie-buttons">
          <button onclick="acceptCookies()">${t.accept}</button>
          <button onclick="rejectCookies()">${t.reject}</button>
        </div>
      </div>
    </div>
  `);

  const banner = document.getElementById("cookie-banner");
  const consent = localStorage.getItem("cookieConsent");

  if (!consent) {
    banner.style.display = "block";
    blockShorts();
  } else if (consent === "accepted") {
    loadYouTubeVideos();
    enableShorts();
  } else {
    blockShorts();
  }
});

// --- Consent actions ---
function acceptCookies() {
  localStorage.setItem("cookieConsent", "accepted");
  document.getElementById("cookie-banner").style.display = "none";

  loadYouTubeVideos();
  enableShorts();
}

function rejectCookies() {
  localStorage.setItem("cookieConsent", "rejected");
  document.getElementById("cookie-banner").style.display = "none";

  blockShorts();
}

// --- Load normal YouTube embeds ---
function loadYouTubeVideos() {
  document.querySelectorAll(".yt-video").forEach(el => {
    const id = el.dataset.id;

    el.innerHTML = `
      <iframe 
        width="640" 
        height="360"
        src="https://www.youtube-nocookie.com/embed/${id}?playlist=${id}&loop=1&controls=0"
        style="border:0;"
        allowfullscreen>
      </iframe>
    `;
  });
}

// --- Shorts behavior ---
function enableShorts() {
  document.querySelectorAll(".video-card").forEach(card => {
    const id = card.dataset.videoId;

    card.classList.remove("blocked");

    card.onclick = () => {
      card.innerHTML = `
        <iframe 
          width="100%" 
          height="100%"
          src="https://www.youtube-nocookie.com/embed/${id}"
          style="border:0;"
          allowfullscreen>
        </iframe>
      `;
    };
  });
}

// --- Block shorts before consent ---
function blockShorts() {
  document.querySelectorAll(".video-card").forEach(card => {
    card.classList.add("blocked");
    card.onclick = null;
  });
}

function openCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    banner.style.display = "block";
  }
}