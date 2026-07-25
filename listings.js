const listings = [
    {
      id: 1,
      title: "Downtown Studio",
      location: "Raleigh, NC",
      price: 1200,
      safety: 9.3,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Studio",
      leaseLength: "3-6 months",
      furnished: true,
      petPolicy: "Pets allowed",
      moveInDate: "2026-08-01"
    },
    {
      id: 2,
      title: "University Park Apartment",
      location: "Austin, TX",
      price: 1350,
      safety: 9.1,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Apartment",
      leaseLength: "6-12 months",
      furnished: true,
      petPolicy: "Cats only",
      moveInDate: "2026-08-15"
    },
    {
      id: 3,
      title: "North Hills Private Room",
      location: "Raleigh, NC",
      price: 850,
      safety: 9.5,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Private Room",
      leaseLength: "1-3 months",
      furnished: true,
      petPolicy: "No pets",
      moveInDate: "2026-07-28"
    },
    {
      id: 4,
      title: "Modern Midtown Loft",
      location: "Charlotte, NC",
      price: 1600,
      safety: 8.8,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Apartment",
      leaseLength: "3-6 months",
      furnished: true,
      petPolicy: "Pets allowed",
      moveInDate: "2026-09-01"
    },
    {
      id: 5,
      title: "Campus View Apartment",
      location: "Durham, NC",
      price: 1450,
      safety: 9.0,
      safetyLabel: "High",
      bedrooms: 2,
      bathrooms: 1,
      propertyType: "Apartment",
      leaseLength: "6-12 months",
      furnished: false,
      petPolicy: "Cats only",
      moveInDate: "2026-08-20"
    },
    {
      id: 6,
      title: "Warehouse District Studio",
      location: "Raleigh, NC",
      price: 1275,
      safety: 8.7,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Studio",
      leaseLength: "1-3 months",
      furnished: true,
      petPolicy: "No pets",
      moveInDate: "2026-08-05"
    },
    {
      id: 7,
      title: "West End Shared Home",
      location: "Greensboro, NC",
      price: 725,
      safety: 8.9,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Private Room",
      leaseLength: "3-6 months",
      furnished: true,
      petPolicy: "Pets allowed",
      moveInDate: "2026-07-30"
    },
    {
      id: 8,
      title: "City Center Two Bedroom",
      location: "Austin, TX",
      price: 1950,
      safety: 9.2,
      safetyLabel: "High",
      bedrooms: 2,
      bathrooms: 2,
      propertyType: "Apartment",
      leaseLength: "6-12 months",
      furnished: false,
      petPolicy: "Pets allowed",
      moveInDate: "2026-09-10"
    },
    {
      id: 9,
      title: "Quiet Garden Studio",
      location: "Cary, NC",
      price: 1100,
      safety: 9.6,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Studio",
      leaseLength: "3-6 months",
      furnished: true,
      petPolicy: "No pets",
      moveInDate: "2026-08-12"
    }
  ];
  
  const savedFavorites = JSON.parse(
    localStorage.getItem("safestayFavorites") || "[]"
  );
  
  const state = {
    visibleListings: [...listings],
    photos: [],
    favorites: new Set(savedFavorites)
  };
  
  const grid = document.querySelector("#listings-grid");
  const count = document.querySelector("#result-count");
  const loadingMessage = document.querySelector("#loading-message");
  const emptyState = document.querySelector("#empty-state");
  const filterForm = document.querySelector("#filter-form");
  const filterPanel = document.querySelector("#filters");
  const filterToggle = document.querySelector(".filter-toggle");
  const filterClose = document.querySelector(".filter-close");
  const sortSelects = document.querySelectorAll(".sort-select");
  const menuButton = document.querySelector(".menu-button");
  const mobileNavigation = document.querySelector("#mobile-navigation");
  const searchButton = document.querySelector(".search-button");
  
  const fallbackImage = "/assets/hero-home.jpg";
  
  const shieldIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true">
      <path d="M12 3 20 6v6c0 5-3.4 8.1-8 9-4.6-.9-8-4-8-9V6Z"></path>
    </svg>
  `;
  
  const bedIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true">
      <path d="M3 18v-7h18v7M3 15h18M6 11V7h5c2 0 3 1.3 3 4"></path>
    </svg>
  `;
  
  const bathIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true">
      <path d="M4 13h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM7 13V6a3 3 0 0 1 6 0"></path>
    </svg>
  `;
  
  function stripHtml(value = "") {
    const element = document.createElement("div");
    element.innerHTML = value;
    return element.textContent?.trim() || "";
  }
  
  function createPhotoCredit(photo) {
    if (!photo) return "";
  
    const artist = stripHtml(photo.artist) || "Wikimedia contributor";
    const license = stripHtml(photo.license) || "Wikimedia Commons";
    return `${artist} / ${license}`;
  }
  
  function createListingCard(listing, index) {
    const photo =
      state.photos.length > 0
        ? state.photos[index % state.photos.length]
        : null;
  
    const isSaved = state.favorites.has(listing.id);
    const article = document.createElement("article");
    article.className = "listing-card";
  
    article.innerHTML = `
      <div class="listing-image-wrap">
        <img
          class="listing-image"
          src="${fallbackImage}"
          alt="Interior of ${listing.title}"
          loading="lazy"
        >
  
        <button
          class="favorite-button ${isSaved ? "is-saved" : ""}"
          type="button"
          data-favorite-id="${listing.id}"
          aria-label="${isSaved ? "Remove from saved listings" : "Save listing"}"
          aria-pressed="${isSaved}"
        >${isSaved ? "♥" : "♡"}</button>
  
        <a
          class="photo-credit"
          target="_blank"
          rel="noopener noreferrer"
          hidden
        ></a>
      </div>
  
      <div class="listing-body">
        <h2 class="listing-title">${listing.title}</h2>
        <p class="listing-location">${listing.location}</p>
  
        <p class="listing-price">
          <strong>$${listing.price}</strong> / month
        </p>
  
        <p class="listing-safety">
          ${shieldIcon}
          Safety: ${listing.safetyLabel}
        </p>
  
        <div class="listing-facts">
          <span>${bedIcon}${listing.bedrooms} Bed</span>
          <span>${bathIcon}${listing.bathrooms} Bath</span>
        </div>
  
        <a class="view-details" href="details.html?id=${listing.id}">
          View Details
        </a>
      </div>
    `;
  
    const image = article.querySelector(".listing-image");
    const creditLink = article.querySelector(".photo-credit");
  
    if (photo) {
      image.src = photo.url;
      image.alt = photo.title || `Interior of ${listing.title}`;
  
      const credit = createPhotoCredit(photo);
      creditLink.textContent = credit;
      creditLink.title = credit;
      creditLink.href = photo.pageUrl;
      creditLink.hidden = false;
    }
  
    image.addEventListener(
      "error",
      () => {
        image.src = fallbackImage;
        creditLink.hidden = true;
      },
      { once: true }
    );
  
    return article;
  }
  
  function renderListings() {
    grid.replaceChildren();
    count.textContent = String(state.visibleListings.length);
    emptyState.hidden = state.visibleListings.length !== 0;
  
    state.visibleListings.forEach((listing, index) => {
      grid.append(createListingCard(listing, index));
    });
  }
  
  function sortListings(sortValue) {
    const sorted = [...state.visibleListings];
  
    if (sortValue === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortValue === "safety-desc") {
      sorted.sort((a, b) => b.safety - a.safety);
    } else {
      sorted.sort((a, b) => a.price - b.price);
    }
  
    state.visibleListings = sorted;
    renderListings();
  }
  
  function applyFilters() {
    const values = new FormData(filterForm);
    const minimumBudget = Number(values.get("minimumBudget")) || 0;
    const maximumBudget = Number(values.get("maximumBudget")) || Infinity;
    const propertyType = values.get("propertyType");
    const leaseLength = values.get("leaseLength");
    const bedrooms = values.get("bedrooms");
    const bathrooms = values.get("bathrooms");
    const furnished = values.get("furnished");
    const petPolicy = values.get("petPolicy");
    const moveInDate = values.get("moveInDate");
  
    state.visibleListings = listings.filter((listing) => {
      return (
        listing.price >= minimumBudget &&
        listing.price <= maximumBudget &&
        (!propertyType || listing.propertyType === propertyType) &&
        (!leaseLength || listing.leaseLength === leaseLength) &&
        (!bedrooms || listing.bedrooms === Number(bedrooms)) &&
        (!bathrooms || listing.bathrooms === Number(bathrooms)) &&
        (!furnished || listing.furnished === (furnished === "true")) &&
        (!petPolicy || listing.petPolicy === petPolicy) &&
        (!moveInDate || listing.moveInDate >= moveInDate)
      );
    });
  
    const selectedSort =
      document.querySelector(".sort-select")?.value || "price-asc";
  
    sortListings(selectedSort);
  }
  
  function openFilters() {
    filterPanel.classList.add("is-open");
    filterToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  
  function closeFilters() {
    filterPanel.classList.remove("is-open");
    filterToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  
  async function loadWikimediaPhotos() {
    const endpoint = new URL("https://commons.wikimedia.org/w/api.php");
  
    endpoint.search = new URLSearchParams({
      action: "query",
      format: "json",
      generator: "search",
      gsrsearch: "modern apartment interior filetype:bitmap",
      gsrnamespace: "6",
      gsrlimit: "18",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "700",
      iiextmetadatafilter:
        "Artist|LicenseShortName|LicenseUrl|ObjectName",
      origin: "*"
    });
  
    try {
      const response = await fetch(endpoint);
  
      if (!response.ok) {
        throw new Error(`Image request failed: ${response.status}`);
      }
  
      const data = await response.json();
      const pages = Object.values(data.query?.pages || {});
  
      state.photos = pages
        .sort((a, b) => (a.index || 0) - (b.index || 0))
        .map((page) => {
          const info = page.imageinfo?.[0];
          const metadata = info?.extmetadata || {};
  
          return {
            url: info?.thumburl || info?.url,
            pageUrl:
              info?.descriptionurl ||
              "https://commons.wikimedia.org/",
            artist: metadata.Artist?.value,
            license: metadata.LicenseShortName?.value,
            licenseUrl: metadata.LicenseUrl?.value,
            title:
              stripHtml(metadata.ObjectName?.value) ||
              page.title.replace("File:", "")
          };
        })
        .filter((photo) => photo.url)
        .filter((photo) => {
          return /apartment|living room|bedroom|dining area|sauna room|studio interior|loft interior|kitchen/i.test(
            photo.title
          );
        })
        .slice(0, listings.length);
    } catch (error) {
      console.warn(
        "Wikimedia images could not be loaded. Using the local fallback.",
        error
      );
      state.photos = [];
    } finally {
      loadingMessage.hidden = true;
      renderListings();
    }
  }
  
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilters();
    closeFilters();
  });
  
  filterForm.addEventListener("reset", () => {
    window.requestAnimationFrame(() => {
      state.visibleListings = [...listings];
      sortListings("price-asc");
    });
  });
  
  sortSelects.forEach((select) => {
    select.addEventListener("change", (event) => {
      sortSelects.forEach((otherSelect) => {
        otherSelect.value = event.target.value;
      });
  
      sortListings(event.target.value);
    });
  });
  
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-favorite-id]");
    if (!button) return;
  
    const listingId = Number(button.dataset.favoriteId);
  
    if (state.favorites.has(listingId)) {
      state.favorites.delete(listingId);
    } else {
      state.favorites.add(listingId);
    }
  
    localStorage.setItem(
      "safestayFavorites",
      JSON.stringify([...state.favorites])
    );
  
    renderListings();
  });
  
  filterToggle.addEventListener("click", openFilters);
  filterClose.addEventListener("click", closeFilters);
  
  menuButton.addEventListener("click", () => {
    const willOpen = mobileNavigation.hidden;
    mobileNavigation.hidden = !willOpen;
    menuButton.setAttribute("aria-expanded", String(willOpen));
    menuButton.setAttribute(
      "aria-label",
      willOpen ? "Close menu" : "Open menu"
    );
  });
  
  searchButton.addEventListener("click", () => {
    const firstBudgetField = filterForm.elements.minimumBudget;
    firstBudgetField.focus();
    firstBudgetField.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeFilters();
      mobileNavigation.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
  
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeFilters();
      mobileNavigation.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
  
  loadWikimediaPhotos();