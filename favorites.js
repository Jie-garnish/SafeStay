const allListings = [
    {
      id: 1,
      title: "Downtown Studio",
      location: "Raleigh, NC",
      price: 1200,
      safety: 9.3,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 2,
      title: "University Park Apartment",
      location: "Austin, TX",
      price: 1350,
      safety: 9.1,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 3,
      title: "North Hills Private Room",
      location: "Raleigh, NC",
      price: 850,
      safety: 9.5,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 4,
      title: "Modern Midtown Loft",
      location: "Charlotte, NC",
      price: 1600,
      safety: 8.8,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 5,
      title: "Campus View Apartment",
      location: "Durham, NC",
      price: 1450,
      safety: 9.0,
      safetyLabel: "High",
      bedrooms: 2,
      bathrooms: 1
    },
    {
      id: 6,
      title: "Warehouse District Studio",
      location: "Raleigh, NC",
      price: 1275,
      safety: 8.7,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 7,
      title: "West End Shared Home",
      location: "Greensboro, NC",
      price: 725,
      safety: 8.9,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 8,
      title: "City Center Two Bedroom",
      location: "Austin, TX",
      price: 1950,
      safety: 9.2,
      safetyLabel: "High",
      bedrooms: 2,
      bathrooms: 2
    },
    {
      id: 9,
      title: "Quiet Garden Studio",
      location: "Cary, NC",
      price: 1100,
      safety: 9.6,
      safetyLabel: "High",
      bedrooms: 1,
      bathrooms: 1
    }
  ];
  
  const fallbackImage = "/assets/hero-home.jpg";
  const favoritesStorageKey = "safestayFavorites";
  const favoritesGrid = document.querySelector("#favorites-grid");
  const emptyState = document.querySelector("#empty-state");
  const loadingMessage = document.querySelector("#loading-message");
  const menuButton = document.querySelector(".menu-button");
  const mobileNavigation = document.querySelector("#mobile-navigation");
  
  const shieldIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.8" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3 20 6v6c0 5-3.4 8.1-8 9-4.6-.9-8-4-8-9V6Z"></path>
    </svg>
  `;
  
  const bedIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      <path d="M3 18v-7h18v7M3 15h18M6 11V7h5c2 0 3 1.3 3 4"></path>
    </svg>
  `;
  
  const bathIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      <path d="M4 13h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM7 13V6a3 3 0 0 1 6 0"></path>
    </svg>
  `;
  
  const trashIcon = `
    <svg class="remove-icon" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" aria-hidden="true">
      <path d="M4 7h16M9 3h6l1 4H8l1-4ZM7 7l1 14h8l1-14M10 11v6M14 11v6"></path>
    </svg>
  `;
  
  const state = {
    favoriteIds: readFavoriteIds(),
    photos: []
  };
  
  function readFavoriteIds() {
    const storedFavorites = localStorage.getItem(favoritesStorageKey);
  
    if (storedFavorites === null) {
      const starterFavorites = [1, 2, 3, 4, 5, 6];
      localStorage.setItem(
        favoritesStorageKey,
        JSON.stringify(starterFavorites)
      );
      return new Set(starterFavorites);
    }
  
    try {
      return new Set(JSON.parse(storedFavorites));
    } catch {
      return new Set();
    }
  }
  
  function stripHtml(value = "") {
    const temporaryElement = document.createElement("div");
    temporaryElement.innerHTML = value;
    return temporaryElement.textContent?.trim() || "";
  }
  
  function createPhotoCredit(photo) {
    if (!photo) return "";
    const artist = stripHtml(photo.artist) || "Wikimedia contributor";
    const license = stripHtml(photo.license) || "Wikimedia Commons";
    return `${artist} / ${license}`;
  }
  
  function createFavoriteCard(listing, index) {
    const photo =
      state.photos.length > 0
        ? state.photos[index % state.photos.length]
        : null;
  
    const card = document.createElement("article");
    card.className = "favorite-card";
    card.dataset.listingId = String(listing.id);
  
    card.innerHTML = `
      <div class="favorite-image-wrap">
        <img
          class="favorite-image"
          src="${fallbackImage}"
          alt="Interior of ${listing.title}"
          loading="lazy"
        >
  
        <button
          class="heart-button"
          type="button"
          data-remove-id="${listing.id}"
          aria-label="Remove ${listing.title} from saved listings"
        >♥</button>
  
        <a
          class="photo-credit"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          hidden
        ></a>
      </div>
  
      <div class="favorite-body">
        <h2 class="favorite-title">${listing.title}</h2>
        <p class="favorite-location">${listing.location}</p>
  
        <p class="favorite-price">
          <strong>$${listing.price}</strong> / month
        </p>
  
        <p class="favorite-safety">
          ${shieldIcon}
          Safety: ${listing.safetyLabel}
        </p>
  
        <div class="favorite-facts">
          <span>${bedIcon}${listing.bedrooms} Bed</span>
          <span>${bathIcon}${listing.bathrooms} Bath</span>
        </div>
  
        <div class="favorite-actions">
          <a class="view-details" href="details.html?id=${listing.id}">
            View Details
          </a>
  
          <button
            class="remove-button"
            type="button"
            data-remove-id="${listing.id}"
            aria-label="Remove ${listing.title} from saved listings"
          >
            <span class="remove-text">Remove</span>
            ${trashIcon}
          </button>
        </div>
      </div>
    `;
  
    const image = card.querySelector(".favorite-image");
    const creditLink = card.querySelector(".photo-credit");
  
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
  
    return card;
  }
  
  function getSavedListings() {
    return allListings.filter((listing) =>
      state.favoriteIds.has(listing.id)
    );
  }
  
  function renderFavorites() {
    const savedListings = getSavedListings();
    favoritesGrid.replaceChildren();
  
    savedListings.forEach((listing, index) => {
      favoritesGrid.append(createFavoriteCard(listing, index));
    });
  
    emptyState.hidden = savedListings.length !== 0;
  }
  
  function removeFavorite(listingId, card) {
    state.favoriteIds.delete(listingId);
    localStorage.setItem(
      favoritesStorageKey,
      JSON.stringify([...state.favoriteIds])
    );
  
    card?.classList.add("is-removing");
    window.setTimeout(renderFavorites, 180);
  }
  
  async function loadWikimediaPhotos() {
    const endpoint = new URL(
      "https://commons.wikimedia.org/w/api.php"
    );
  
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
            title:
              stripHtml(metadata.ObjectName?.value) ||
              page.title.replace("File:", "")
          };
        })
        .filter((photo) => photo.url)
        .filter((photo) =>
          /apartment|living room|bedroom|dining area|studio interior|loft interior|kitchen/i.test(
            photo.title
          )
        );
    } catch (error) {
      console.warn(
        "Wikimedia photos could not be loaded. Using the local fallback.",
        error
      );
      state.photos = [];
    } finally {
      loadingMessage.hidden = true;
      renderFavorites();
    }
  }
  
  favoritesGrid.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-id]");
    if (!removeButton) return;
  
    const listingId = Number(removeButton.dataset.removeId);
    const card = removeButton.closest(".favorite-card");
    removeFavorite(listingId, card);
  });
  
  menuButton?.addEventListener("click", () => {
    const willOpen = mobileNavigation.hidden;
    mobileNavigation.hidden = !willOpen;
    menuButton.setAttribute("aria-expanded", String(willOpen));
    menuButton.setAttribute(
      "aria-label",
      willOpen ? "Close menu" : "Open menu"
    );
  });
  
  mobileNavigation?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      mobileNavigation.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
  
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileNavigation) {
      mobileNavigation.hidden = true;
      menuButton?.setAttribute("aria-expanded", "false");
    }
  });
  
  renderFavorites();
  loadWikimediaPhotos();