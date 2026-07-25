/*
  SafeStay homepage JavaScript

  This file:
  1. Loads a hero image from Wikimedia Commons.
  2. Displays the image attribution.
  3. Controls the mobile menu.
  4. Controls the search panel.
  5. Sends homepage searches to listings.html.
*/

/* ================================
   REMOVE HTML FROM API TEXT
================================ */

const removeHtml = (value) => {
    const temporaryElement = document.createElement("div");
  
    temporaryElement.innerHTML = value;
  
    return temporaryElement.textContent.trim();
  };
  
  /* ================================
     LOAD HERO IMAGE
  ================================ */
  
  const loadHeroImage = async () => {
    const heroImage = document.querySelector("#hero-image");
    const heroCredit = document.querySelector("#hero-credit");
  
    if (!heroImage) {
      return;
    }
  
    const apiUrl = "https://commons.wikimedia.org/w/api.php";
  
    const parameters = new URLSearchParams({
      action: "query",
      format: "json",
      origin: "*",
  
      generator: "search",
      gsrsearch:
        "modern furnished apartment interior living room filetype:bitmap",
      gsrnamespace: "6",
      gsrlimit: "12",
  
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1800"
    });
  
    try {
      const response = await fetch(`${apiUrl}?${parameters.toString()}`);
  
      if (!response.ok) {
        throw new Error(
          `Wikimedia request failed with status ${response.status}`
        );
      }
  
      const data = await response.json();
  
      const images = Object.values(data.query?.pages || {});
  
      /*
        Only keep images that have thumbnail URLs.
        This also removes SVG files from the results.
      */
  
      const availableImages = images.filter((image) => {
        const imageInformation = image.imageinfo?.[0];
  
        if (!imageInformation?.thumburl) {
          return false;
        }
  
        const thumbnailUrl = imageInformation.thumburl.toLowerCase();
  
        return !thumbnailUrl.endsWith(".svg");
      });
  
      if (availableImages.length === 0) {
        throw new Error("No suitable hero images were found.");
      }
  
      /*
        Select one of the first few relevant results.
  
        sessionStorage keeps the same image while the user moves
        between pages during the same browser session.
      */
  
      let selectedIndex = Number(
        sessionStorage.getItem("safeStayHeroImageIndex")
      );
  
      if (
        !Number.isInteger(selectedIndex) ||
        selectedIndex < 0 ||
        selectedIndex >= availableImages.length
      ) {
        selectedIndex = Math.floor(
          Math.random() * Math.min(availableImages.length, 5)
        );
  
        sessionStorage.setItem(
          "safeStayHeroImageIndex",
          String(selectedIndex)
        );
      }
  
      const selectedImage = availableImages[selectedIndex];
      const imageInformation = selectedImage.imageinfo[0];
      const metadata = imageInformation.extmetadata || {};
      const imageUrl = imageInformation.thumburl;
  
      /*
        Replace the --hero-photo CSS variable.
        The gradient defined in CSS remains on top of the image.
      */
  
      heroImage.style.setProperty(
        "--hero-photo",
        `url("${imageUrl}")`
      );
  
      /*
        Create an accessible description from the Wikimedia filename.
      */
  
      const accessibleImageName = selectedImage.title
        .replace(/^File:/i, "")
        .replace(/\.[^.]+$/, "")
        .replaceAll("_", " ");
  
      heroImage.setAttribute(
        "aria-label",
        accessibleImageName
      );
  
      /*
        Add the photographer and license underneath the image.
      */
  
      if (heroCredit) {
        const artist = removeHtml(
          metadata.Artist?.value ||
            metadata.Credit?.value ||
            "Wikimedia Commons contributor"
        );
  
        const license = removeHtml(
          metadata.LicenseShortName?.value ||
            metadata.UsageTerms?.value ||
            "Open license"
        );
  
        heroCredit.textContent = `Photo: ${artist} · ${license}`;
  
        heroCredit.href =
          imageInformation.descriptionurl ||
          `https://commons.wikimedia.org/wiki/${encodeURIComponent(
            selectedImage.title
          )}`;
  
        heroCredit.hidden = false;
      }
    } catch (error) {
      /*
        If the API is unavailable, CSS continues to show:
        ./assets/hero-home.jpg
      */
  
      console.warn(
        "The Wikimedia hero image could not be loaded. " +
          "The local fallback image will be used.",
        error
      );
  
      if (heroCredit) {
        heroCredit.hidden = true;
      }
    }
  };
  
  /* ================================
     INITIALIZE HOMEPAGE
  ================================ */
  
  const initializeHomepage = () => {
    const menuButton = document.querySelector(".menu-button");
    const mobileNavigation = document.querySelector(
      "#mobile-navigation"
    );
  
    const searchButton = document.querySelector(".icon-button");
    const searchPanel = document.querySelector("#search-panel");
    const searchInput = document.querySelector("#site-search");
    const searchForm = document.querySelector(".search-form");
  
    /*
      Start loading the hero image.
    */
  
    loadHeroImage();
  
    /* ================================
       MOBILE MENU FUNCTIONS
    ================================ */
  
    const closeMenu = () => {
      if (!menuButton || !mobileNavigation) {
        return;
      }
  
      mobileNavigation.hidden = true;
  
      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );
  
      menuButton.setAttribute(
        "aria-label",
        "Open menu"
      );
    };
  
    const closeSearch = () => {
      if (!searchPanel) {
        return;
      }
  
      searchPanel.hidden = true;
    };
  
    /*
      Open and close the mobile navigation.
    */
  
    menuButton?.addEventListener("click", () => {
      if (!mobileNavigation) {
        return;
      }
  
      const willOpen = mobileNavigation.hidden;
  
      mobileNavigation.hidden = !willOpen;
  
      menuButton.setAttribute(
        "aria-expanded",
        String(willOpen)
      );
  
      menuButton.setAttribute(
        "aria-label",
        willOpen ? "Close menu" : "Open menu"
      );
  
      if (willOpen) {
        closeSearch();
      }
    });
  
    /*
      Open and close the search panel.
    */
  
    searchButton?.addEventListener("click", () => {
      if (!searchPanel) {
        return;
      }
  
      const willOpen = searchPanel.hidden;
  
      searchPanel.hidden = !willOpen;
  
      if (willOpen) {
        closeMenu();
        searchInput?.focus();
      }
    });
  
    /*
      Close the mobile menu after the user selects a link.
    */
  
    mobileNavigation?.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closeMenu();
      }
    });
  
    /* ================================
       HOMEPAGE SEARCH
    ================================ */
  
    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const searchTerm = searchInput?.value.trim();
  
      if (!searchTerm) {
        searchInput?.focus();
        return;
      }
  
      /*
        Send the search term to the listings page.
  
        Example:
        listings.html?search=apartment
      */
  
      const parameters = new URLSearchParams({
        search: searchTerm
      });
  
      window.location.href =
        `listings.html?${parameters.toString()}`;
    });
  
    /* ================================
       KEYBOARD INTERACTIONS
    ================================ */
  
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        closeSearch();
      }
    });
  
    /*
      Close the search panel if the user clicks outside it.
    */
  
    document.addEventListener("click", (event) => {
      const target = event.target;
  
      if (!(target instanceof Node)) {
        return;
      }
  
      if (
        searchPanel &&
        searchButton &&
        !searchPanel.hidden &&
        !searchPanel.contains(target) &&
        !searchButton.contains(target)
      ) {
        closeSearch();
      }
    });
  
    /*
      Close the mobile menu when the screen becomes desktop size.
    */
  
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  };
  
  /* ================================
     RUN AFTER HTML LOADS
  ================================ */
  
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeHomepage
    );
  } else {
    initializeHomepage();
  }

  