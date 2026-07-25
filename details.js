const propertyListings = [
    {
      id: 1,
      title: "Downtown Studio",
      location: "Raleigh, NC",
      price: 1200,
      safety: 9.3,
      safetyLabel: "Safe Neighbourhood",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Studio",
      displayType: "Entire Studio",
      area: 520,
      leaseLength: "3 Months",
      furnished: true,
      petPolicy: "Small Dogs",
      moveInDate: "2026-08-01",
      utilitiesIncluded: true,
      amenities: [
        "Wi-Fi",
        "Air Conditioning",
        "In-Unit Laundry",
        "Gym",
        "Balcony",
        "Elevator",
        "Security Camera"
      ]
    },
    {
      id: 2,
      title: "University Park Apartment",
      location: "Austin, TX",
      price: 1350,
      safety: 9.1,
      safetyLabel: "Safe Neighbourhood",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Apartment",
      displayType: "Entire Apartment",
      area: 680,
      leaseLength: "6 Months",
      furnished: true,
      petPolicy: "Cats Only",
      moveInDate: "2026-08-15",
      utilitiesIncluded: true,
      amenities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Gym"]
    },
    {
      id: 3,
      title: "North Hills Private Room",
      location: "Raleigh, NC",
      price: 850,
      safety: 9.5,
      safetyLabel: "Very Safe Neighbourhood",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Private Room",
      displayType: "Private Room",
      area: 310,
      leaseLength: "3 Months",
      furnished: true,
      petPolicy: "No Pets",
      moveInDate: "2026-07-28",
      utilitiesIncluded: true,
      amenities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Kitchen"]
    },
    {
      id: 4,
      title: "Modern Midtown Loft",
      location: "Charlotte, NC",
      price: 1600,
      safety: 8.8,
      safetyLabel: "Safe Neighbourhood",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Apartment",
      displayType: "Entire Loft",
      area: 760,
      leaseLength: "3 Months",
      furnished: true,
      petPolicy: "Pets Allowed",
      moveInDate: "2026-09-01",
      utilitiesIncluded: false,
      amenities: ["Wi-Fi", "Air Conditioning", "In-Unit Laundry", "Gym", "Elevator"]
    },
    {
      id: 5,
      title: "Campus View Apartment",
      location: "Durham, NC",
      price: 1450,
      safety: 9.0,
      safetyLabel: "Safe Neighbourhood",
      bedrooms: 2,
      bathrooms: 1,
      propertyType: "Apartment",
      displayType: "Entire Apartment",
      area: 890,
      leaseLength: "6 Months",
      furnished: false,
      petPolicy: "Cats Only",
      moveInDate: "2026-08-20",
      utilitiesIncluded: false,
      amenities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Balcony"]
    },
    {
      id: 6,
      title: "Warehouse District Studio",
      location: "Raleigh, NC",
      price: 1275,
      safety: 8.7,
      safetyLabel: "Safe Neighbourhood",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Studio",
      displayType: "Entire Studio",
      area: 545,
      leaseLength: "3 Months",
      furnished: true,
      petPolicy: "No Pets",
      moveInDate: "2026-08-05",
      utilitiesIncluded: true,
      amenities: ["Wi-Fi", "Air Conditioning", "In-Unit Laundry", "Elevator"]
    },
    {
      id: 7,
      title: "West End Shared Home",
      location: "Greensboro, NC",
      price: 725,
      safety: 8.9,
      safetyLabel: "Safe Neighbourhood",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Private Room",
      displayType: "Private Room",
      area: 285,
      leaseLength: "3 Months",
      furnished: true,
      petPolicy: "Pets Allowed",
      moveInDate: "2026-07-30",
      utilitiesIncluded: true,
      amenities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Backyard"]
    },
    {
      id: 8,
      title: "City Center Two Bedroom",
      location: "Austin, TX",
      price: 1950,
      safety: 9.2,
      safetyLabel: "Safe Neighbourhood",
      bedrooms: 2,
      bathrooms: 2,
      propertyType: "Apartment",
      displayType: "Entire Apartment",
      area: 1080,
      leaseLength: "6 Months",
      furnished: false,
      petPolicy: "Pets Allowed",
      moveInDate: "2026-09-10",
      utilitiesIncluded: false,
      amenities: ["Wi-Fi", "Air Conditioning", "In-Unit Laundry", "Gym", "Pool", "Elevator"]
    },
    {
      id: 9,
      title: "Quiet Garden Studio",
      location: "Cary, NC",
      price: 1100,
      safety: 9.6,
      safetyLabel: "Very Safe Neighbourhood",
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Studio",
      displayType: "Entire Studio",
      area: 495,
      leaseLength: "3 Months",
      furnished: true,
      petPolicy: "No Pets",
      moveInDate: "2026-08-12",
      utilitiesIncluded: true,
      amenities: ["Wi-Fi", "Air Conditioning", "Laundry", "Parking", "Garden"]
    }
  ];
  
  const pageParameters = new URLSearchParams(window.location.search);
  const requestedId = Number(pageParameters.get("id")) || 1;
  const currentProperty =
    propertyListings.find((property) => property.id === requestedId) ||
    propertyListings[0];
  
  const getElement = (selector) => document.querySelector(selector);
  
  function formatDate(dateValue) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(`${dateValue}T12:00:00`));
  }
  
  function setText(selector, value) {
    const element = getElement(selector);
    if (element) element.textContent = value;
  }
  
  function renderProperty(property) {
    document.title = `${property.title} | SafeStay`;
  
    setText("#property-title", property.title);
    setText("#property-location", property.location);
    setText("#property-price", `$${property.price}`);
    setText("#safety-score", property.safety.toFixed(1));
    setText("#safety-label", property.safetyLabel);
    setText("#fact-type", property.displayType);
    setText("#fact-bedrooms", property.bedrooms);
    setText("#fact-bathrooms", property.bathrooms);
    setText("#fact-area", property.area);
    setText("#info-type", property.propertyType);
    setText("#info-lease", property.leaseLength);
    setText("#info-furnished", property.furnished ? "Yes" : "No");
    setText("#info-move-in", formatDate(property.moveInDate));
    setText("#info-pets", property.petPolicy);
    setText("#info-utilities", property.utilitiesIncluded ? "Yes" : "No");
  
    const amenitiesList = getElement("#amenities-list");
    if (amenitiesList) {
      amenitiesList.replaceChildren(
        ...property.amenities.map((amenityName) => {
          const amenity = document.createElement("span");
          amenity.className = "amenity";
          amenity.textContent = amenityName;
          return amenity;
        })
      );
    }
  }
  
  function stripHtml(value = "") {
    const temporaryElement = document.createElement("div");
    temporaryElement.innerHTML = value;
    return temporaryElement.textContent?.trim() || "";
  }
  
  async function loadPropertyPhoto(property) {
    const propertyImage = getElement("#property-image");
    const photoCredit = getElement("#photo-credit");
  
    if (!propertyImage) return;
  
    const endpoint = "https://commons.wikimedia.org/w/api.php";
    const searchTerms =
      property.propertyType === "Private Room"
        ? "modern furnished bedroom interior filetype:bitmap"
        : "modern apartment interior living room filetype:bitmap";
  
    const parameters = new URLSearchParams({
      action: "query",
      format: "json",
      origin: "*",
      generator: "search",
      gsrsearch: searchTerms,
      gsrnamespace: "6",
      gsrlimit: "15",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1800"
    });
  
    try {
      const response = await fetch(`${endpoint}?${parameters}`);
      if (!response.ok) throw new Error("Photo request failed.");
  
      const data = await response.json();
      const results = Object.values(data.query?.pages || {})
        .sort((a, b) => (a.index || 0) - (b.index || 0))
        .filter((page) => page.imageinfo?.[0]?.thumburl)
        .filter((page) => {
          const metadata = page.imageinfo?.[0]?.extmetadata || {};
          const title =
            stripHtml(metadata.ObjectName?.value) ||
            page.title.replace(/^File:/i, "");
  
          return /apartment|living room|bedroom|dining area|studio interior|loft interior|kitchen|modern interior/i.test(
            title
          );
        });
  
      if (!results.length) throw new Error("No property photos were found.");
  
      const selectedPhoto = results[(property.id - 1) % results.length];
      const imageInformation = selectedPhoto.imageinfo[0];
      const metadata = imageInformation.extmetadata || {};
  
      propertyImage.src = imageInformation.thumburl;
      propertyImage.alt = stripHtml(
        metadata.ImageDescription?.value ||
        `Interior of ${property.title}`
      );
  
      if (photoCredit) {
        const artist = stripHtml(
          metadata.Artist?.value || "Wikimedia Commons contributor"
        );
        const license = stripHtml(
          metadata.LicenseShortName?.value || "Open license"
        );
  
        photoCredit.textContent = `Photo: ${artist} · ${license}`;
        photoCredit.href = imageInformation.descriptionurl;
        photoCredit.hidden = false;
      }
    } catch (error) {
      console.warn("Using the local fallback property image.", error);
      propertyImage.src = "/assets/hero-home.jpg";
      if (photoCredit) photoCredit.hidden = true;
    }
  }
  
  function initializeFavoriteButton(property) {
    const saveButton = getElement("#save-button");
    if (!saveButton) return;
  
    const storedFavorites = JSON.parse(
      localStorage.getItem("safestayFavorites") || "[]"
    );
    const favorites = new Set(storedFavorites);
  
    function updateButton() {
      const isSaved = favorites.has(property.id);
      const heart = saveButton.querySelector(".heart");
      const label = saveButton.querySelector(".save-label");
  
      saveButton.classList.toggle("is-saved", isSaved);
      saveButton.setAttribute("aria-pressed", String(isSaved));
      if (heart) heart.textContent = isSaved ? "♥" : "♡";
      if (label) label.textContent = isSaved ? "Saved" : "Save Listing";
    }
  
    saveButton.addEventListener("click", () => {
      if (favorites.has(property.id)) {
        favorites.delete(property.id);
      } else {
        favorites.add(property.id);
      }
  
      localStorage.setItem(
        "safestayFavorites",
        JSON.stringify([...favorites])
      );
      updateButton();
    });
  
    updateButton();
  }
  
  function initializeContactDialog(property) {
    const contactButton = getElement("#contact-button");
    const contactDialog = getElement("#contact-dialog");
    const closeButton = getElement(".dialog-close");
    const contactForm = getElement("#contact-form");
    const formStatus = getElement("#form-status");
    const message = contactForm?.elements.namedItem("message");
  
    if (!contactButton || !contactDialog) return;
  
    contactButton.addEventListener("click", () => {
      if (message instanceof HTMLTextAreaElement && !message.value) {
        message.value =
          `Hi, I am interested in ${property.title} in ${property.location}. ` +
          "Is it still available?";
      }
      contactDialog.showModal();
    });
  
    closeButton?.addEventListener("click", () => contactDialog.close());
  
    contactDialog.addEventListener("click", (event) => {
      if (event.target === contactDialog) contactDialog.close();
    });
  
    contactForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (formStatus) {
        formStatus.textContent =
          "Your message has been prepared. This demo does not send email.";
      }
      contactForm.reset();
    });
  }
  
  function initializeMobileNavigation() {
    const menuButton = getElement(".menu-button");
    const mobileNavigation = getElement("#mobile-navigation");
  
    if (!menuButton || !mobileNavigation) return;
  
    menuButton.addEventListener("click", () => {
      const willOpen = mobileNavigation.hidden;
      mobileNavigation.hidden = !willOpen;
      menuButton.setAttribute("aria-expanded", String(willOpen));
      menuButton.setAttribute(
        "aria-label",
        willOpen ? "Close menu" : "Open menu"
      );
    });
  
    mobileNavigation.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        mobileNavigation.hidden = true;
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mobileNavigation.hidden = true;
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }
  
  function initializeDetailsPage() {
    renderProperty(currentProperty);
    loadPropertyPhoto(currentProperty);
    initializeFavoriteButton(currentProperty);
    initializeContactDialog(currentProperty);
    initializeMobileNavigation();
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDetailsPage);
  } else {
    initializeDetailsPage();
  }