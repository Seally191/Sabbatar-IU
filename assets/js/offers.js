document.addEventListener("DOMContentLoaded", () => {
  const filterGroups = document.querySelectorAll(".filter-buttons");
  const jobCards = document.querySelectorAll(".job-card");

  const activeFilters = {
    location: new Set(["all"]),
    role: new Set(["all"]),
    language: new Set(["all"]) // ✅ NEW
  };

  filterGroups.forEach(group => {
    const filterType = group.dataset.filter;
    const buttons = group.querySelectorAll("button");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (value === "all") {
          activeFilters[filterType].clear();
          activeFilters[filterType].add("all");

          buttons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");

        } else {
          activeFilters[filterType].delete("all");
          group.querySelector('[data-value="all"]').classList.remove("active");

          if (activeFilters[filterType].has(value)) {
            activeFilters[filterType].delete(value);
            button.classList.remove("active");

            if (activeFilters[filterType].size === 0) {
              activeFilters[filterType].add("all");
              group.querySelector('[data-value="all"]').classList.add("active");
            }

          } else {
            activeFilters[filterType].add(value);
            button.classList.add("active");
          }
        }

        applyFilters();
      });
    });
  });

  function applyFilters() {
    jobCards.forEach(card => {
      const cardLocation = card.dataset.location;
      const cardRole = card.dataset.role;
      const cardLanguages = card.dataset.language
        ? card.dataset.language.split(",")
        : [];

      const locationMatch =
        activeFilters.location.has("all") ||
        activeFilters.location.has(cardLocation);

      const roleMatch =
        activeFilters.role.has("all") ||
        activeFilters.role.has(cardRole);

      const languageMatch =
        activeFilters.language.has("all") ||
        cardLanguages.some(lang => activeFilters.language.has(lang));

      if (locationMatch && roleMatch && languageMatch) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    });
  }
});