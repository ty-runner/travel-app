require("dotenv").config();
const Amadeus = require('amadeus');
const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getHotels(amadeus, cityCode) {
    try {
        const response = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode: cityCode, // City IATA code
            radius: 5, // Search radius in kilometers or miles
            radiusUnit: 'KM', // Distance unit KM or MILE
            ratings: '4,5' // Filter by hotel ratings, this means only look into 4 and 5 star hotels
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching hotel offers:", error);
    }
}

async function main() {
    const amadeus = new Amadeus({
        clientId: process.env.AMADEUS_CLIENT_ID,
        clientSecret: process.env.AMADEUS_CLIENT_SECRET
    });
    r1.question("Enter city code: ", async (cityCode) => {
        await getHotels(amadeus, cityCode);
        r1.close();
    });
}
main();  