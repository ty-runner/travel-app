require("dotenv").config();

async function generateAccessToken() {
    const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
        "grant_type": "client_credentials",
        "client_id": process.env["AMADEUS_CLIENT_ID"],
        "client_secret": process.env["AMADEUS_CLIENT_SECRET"]
    })
    });

    const data = await response.json();
    console.log("Access token:", data);
    return data.access_token;
}

async function getHotels(cityCode, accessToken) {
    const response = await fetch(`https://api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    console.log("Data:", data);
    return data.data; // Returns hotel IDs, names, and locations
}

async function main() {
    const token = await generateAccessToken();  // Wait for token to resolve
    console.log("Access Token:", token);
    
    const hotels = await getHotels("PAR", token);  // Now token is the actual string, not a Promise
    console.log("Hotels:", hotels);
}
main();  