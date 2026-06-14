const housingListings = [

    {
        title: "Downtown Studio",
        location: "Austin, TX",
        price: 1200,
        propertyType: "studio",
        leaseLength: "3 months",
        bedrooms: 0,
        bathrooms: 1,
        furnished: true,
        pets: "cats",
        moveInDate: "2026-08-01",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
    },
    
    {
        title: "Intern Apartment",
        location: "Greensboro, NC",
        price: 950,
        propertyType: "private room",
        leaseLength: "flexible",
        bedrooms: 1,
        bathrooms: 1,
        furnished: true,
        pets: "small dogs",
        moveInDate: "2026-07-15",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800"
    },
    
    {
        title: "Student Housing",
        location: "Boston, MA",
        price: 800,
        propertyType: "shared room",
        leaseLength: "6 months",
        bedrooms: 2,
        bathrooms: 2,
        furnished: false,
        pets: "no pets",
        moveInDate: "2026-09-01",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    }
    
    ];
    
    function displayListings(listings) {
    
        const container =
            document.getElementById("listings");
    
        container.innerHTML = "";
    
        listings.forEach(listing => {
    
            container.innerHTML += `
    
            <div class="card">
    
                <img src="${listing.image}" alt="${listing.title}">
    
                <div class="card-content">
    
                    <h3>${listing.title}</h3>
    
                    <p><strong>Location:</strong> ${listing.location}</p>
    
                    <p><strong>Price:</strong> $${listing.price}/month</p>
    
                    <p><strong>Property Type:</strong> ${listing.propertyType}</p>
    
                    <p><strong>Lease:</strong> ${listing.leaseLength}</p>
    
                    <p><strong>Bedrooms:</strong> ${listing.bedrooms}</p>
    
                    <p><strong>Bathrooms:</strong> ${listing.bathrooms}</p>
    
                    <p><strong>Furnished:</strong> ${listing.furnished ? "Yes" : "No"}</p>
    
                    <p><strong>Pets:</strong> ${listing.pets}</p>
    
                    <button>View Details</button>
    
                </div>
    
            </div>
            `;
        });
    }
    
    displayListings(housingListings);
    
    document
    .getElementById("filterBtn")
    .addEventListener("click", function() {
    
        let filtered = housingListings;
    
        const minPrice =
            Number(document.getElementById("minPrice").value);
    
        const maxPrice =
            Number(document.getElementById("maxPrice").value);
    
        const propertyType =
            document.getElementById("propertyType").value;
    
        const leaseLength =
            document.getElementById("leaseLength").value;
    
        const bedrooms =
            document.getElementById("bedrooms").value;
    
        const bathrooms =
            document.getElementById("bathrooms").value;
    
        const furnished =
            document.getElementById("furnished").value;
    
        const pets =
            document.getElementById("pets").value;
    
        const moveInDate =
            document.getElementById("moveInDate").value;
    
        if (minPrice) {
            filtered = filtered.filter(
                listing => listing.price >= minPrice
            );
        }
    
        if (maxPrice) {
            filtered = filtered.filter(
                listing => listing.price <= maxPrice
            );
        }
    
        if (propertyType) {
            filtered = filtered.filter(
                listing => listing.propertyType === propertyType
            );
        }
    
        if (leaseLength) {
            filtered = filtered.filter(
                listing => listing.leaseLength === leaseLength
            );
        }
    
        if (bedrooms) {
            filtered = filtered.filter(
                listing => listing.bedrooms == bedrooms
            );
        }
    
        if (bathrooms) {
            filtered = filtered.filter(
                listing => listing.bathrooms == bathrooms
            );
        }
    
        if (furnished === "true") {
            filtered = filtered.filter(
                listing => listing.furnished
            );
        }
    
        if (furnished === "false") {
            filtered = filtered.filter(
                listing => !listing.furnished
            );
        }
    
        if (pets) {
            filtered = filtered.filter(
                listing => listing.pets === pets
            );
        }
    
        if (moveInDate) {
            filtered = filtered.filter(
                listing => listing.moveInDate <= moveInDate
            );
        }
    
        displayListings(filtered);
    
    });