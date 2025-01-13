const amadeus = require("./config"); // Assuming config includes the Bearer token

async function fetchCities() {
  try {
    // Fetching cities with a keyword (e.g., 'New')
    const response = await amadeus.referenceData.locations.cities.get({
      keyword: "New"  // You can change the keyword based on your needs
    });

    console.log("Cities:", response.data);

  } catch (err) {
    console.error("Error fetching cities:", err);
  }
}

// Calling the function to fetch cities
fetchCities();
