async function getHotels(cityCode) {
    const response = await fetch(`https://api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer YOUR_ACCESS_TOKEN`
      }
    });
    const data = await response.json();
    return data.data; // Returns hotel IDs, names, and locations
  }
  