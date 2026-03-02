document.addEventListener("DOMContentLoaded", () => {
  const filterGroups = document.querySelectorAll(".filter-buttons");
  const jobCards = document.querySelectorAll(".job-card");

  const activeFilters = {
    location: new Set(["all"]),
    role: new Set(["all"])
  };

  filterGroups.forEach(group => {
    const filterType = group.dataset.filter;
    const buttons = group.querySelectorAll("button");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const value = button.dataset.value;

        // If "All" clicked → reset group
        if (value === "all") {
          activeFilters[filterType].clear();
          activeFilters[filterType].add("all");

          buttons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");

        } else {
          // Remove "All" if selecting specific filter
          activeFilters[filterType].delete("all");
          group.querySelector('[data-value="all"]').classList.remove("active");

          // Toggle selection
          if (activeFilters[filterType].has(value)) {
            activeFilters[filterType].delete(value);
            button.classList.remove("active");

            // If none selected → fallback to "All"
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

      const locationMatch =
        activeFilters.location.has("all") ||
        activeFilters.location.has(cardLocation);

      const roleMatch =
        activeFilters.role.has("all") ||
        activeFilters.role.has(cardRole);

      if (locationMatch && roleMatch) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    });
  }
});