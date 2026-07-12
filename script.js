// =====================================================
// SafeStay JavaScript
// Supports:
// index.html
// listings.html
// details.html
// favorites.html
// =====================================================


// ===============================
// HOUSING DATA
// ===============================

const housingListings = [

    {
        id: 1,
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
        safety: "High",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
    },


    {
        id: 2,
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
        safety: "Very High",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800"
    },


    {
        id: 3,
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
        safety: "Medium",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    }

];



// ===============================
// DISPLAY LISTINGS
// ===============================

function displayListings(listings) {


    const container =
        document.getElementById("listings");


    if (!container) return;


    container.innerHTML = "";


    listings.forEach(listing => {


        container.innerHTML += `


        <div class="listing-card">


            <img src="${listing.image}" 
            alt="${listing.title}">


            <div class="listing-info">


                <h3>
                ${listing.title}
                </h3>


                <p class="location">
                ${listing.location}
                </p>


                <p class="price">
                $${listing.price}/month
                </p>


                <div class="tags">

                    <span class="tag">
                    ${listing.propertyType}
                    </span>


                    <span class="tag">
                    ${listing.leaseLength}
                    </span>


                    <span class="tag">
                    Safety: ${listing.safety}
                    </span>

                </div>



                <br>


                <button 
                class="primary-btn"
                onclick="viewDetails(${listing.id})">

                View Details

                </button>



                <button 
                class="favorite-btn"
                onclick="saveFavorite(${listing.id})">

                ♡ Save

                </button>


            </div>


        </div>


        `;


    });

}



// Load listings when page opens

displayListings(housingListings);





// ===============================
// FILTER FUNCTION
// ===============================


const filterButton =
document.getElementById("filterBtn");



if(filterButton){


filterButton.addEventListener(
"click",
function(){


let filtered =
housingListings;



const minPrice =
Number(
document.getElementById("minPrice").value
);



const maxPrice =
Number(
document.getElementById("maxPrice").value
);



const propertyType =
document.getElementById("propertyType").value;



const leaseLength =
document.getElementById("leaseLength").value;



if(minPrice){

filtered =
filtered.filter(
listing =>
listing.price >= minPrice
);

}



if(maxPrice){

filtered =
filtered.filter(
listing =>
listing.price <= maxPrice
);

}



if(propertyType){

filtered =
filtered.filter(
listing =>
listing.propertyType === propertyType
);

}



if(leaseLength){

filtered =
filtered.filter(
listing =>
listing.leaseLength === leaseLength
);

}



displayListings(filtered);



});


}






// ===============================
// VIEW DETAILS PAGE
// ===============================


function viewDetails(id){


localStorage.setItem(
"selectedListing",
id
);



window.location.href =
"details.html";


}






// ===============================
// SAVE FAVORITES
// ===============================


function saveFavorite(id){


let favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];



const listing =
housingListings.find(
item =>
item.id === id
);



const exists =
favorites.some(
item =>
item.id === id
);



if(!exists){


favorites.push(listing);


localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);


alert(
"Saved to favorites ❤️"
);


}

else{


alert(
"Already saved!"
);


}


}







// ===============================
// DETAILS PAGE
// ===============================


function displayDetails(){


const container =
document.getElementById("details");



if(!container) return;



const id =
Number(
localStorage.getItem(
"selectedListing"
)
);



const listing =
housingListings.find(
item =>
item.id === id
);



if(!listing) return;



container.innerHTML = `


<img 
src="${listing.image}">



<h1>
${listing.title}
</h1>



<p>
📍 ${listing.location}
</p>



<h2>
$${listing.price}/month
</h2>



<p>
Property Type:
${listing.propertyType}
</p>



<p>
Lease:
${listing.leaseLength}
</p>



<p>
Bedrooms:
${listing.bedrooms}
</p>



<p>
Bathrooms:
${listing.bathrooms}
</p>



<p>
Furniture:
${listing.furnished ? "Included" : "Not Included"}
</p>



<p>
Pets:
${listing.pets}
</p>



<div class="safety-score">

<h3>
Safety Score:
${listing.safety}
</h3>

</div>



<button
class="favorite-btn"
onclick="saveFavorite(${listing.id})">

♡ Save

</button>


`;

}


displayDetails();






// ===============================
// FAVORITES PAGE
// ===============================


function displayFavorites(){


const container =
document.getElementById("favorites");



if(!container) return;



const favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];



container.innerHTML="";



if(favorites.length === 0){


container.innerHTML = `

<div class="empty-state">

<h2>
No saved housing yet
</h2>

<p>
Start saving listings you like!
</p>


</div>

`;


return;


}





favorites.forEach(listing => {



container.innerHTML += `


<div class="saved-card">


<img 
src="${listing.image}">



<div class="saved-info">


<h3>
${listing.title}
</h3>


<p>
${listing.location}
</p>


<p>
$${listing.price}/month
</p>



<button
class="remove-btn"
onclick="removeFavorite(${listing.id})">

Remove

</button>



</div>


</div>



`;



});


}



displayFavorites();






// ===============================
// REMOVE FAVORITES
// ===============================


function removeFavorite(id){


let favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];



favorites =
favorites.filter(
item =>
item.id !== id
);



localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);



displayFavorites();


}