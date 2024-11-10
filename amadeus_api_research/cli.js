const inquirer = require('inquirer');
const axios = require('axios');

// Placeholder for your API functions (they need to be implemented based on your backend)
const searchCities = async (keyword) => {
    // Replace with your actual API request for searching cities
    const response = await axios.get(`https://api.example.com/cities?search=${keyword}`);
    return response.data;
};

const getHotels = async (cityCode) => {
    // Replace with your actual API request for getting hotels in a city
    const response = await axios.get(`https://api.example.com/hotels?cityCode=${cityCode}`);
    return response.data;
};

const getHotelOffers = async (hotelId) => {
    // Replace with your actual API request for getting hotel offers
    const response = await axios.get(`https://api.example.com/hotelOffers?hotelId=${hotelId}`);
    return response.data;
};

const confirmOffer = async (offerId) => {
    // Replace with your actual API request to confirm an offer
    const response = await axios.post(`https://api.example.com/confirmOffer`, { offerId });
    return response.data;
};

// CLI flow for city search, hotel list, and offer confirmation
const runCLI = async () => {
    // Step 1: Search for cities
    const { keyword } = await inquirer.prompt([
        {
            type: 'input',
            name: 'keyword',
            message: 'Enter a city name to search for:',
        },
    ]);

    const cities = await searchCities(keyword);
    if (cities.length === 0) {
        console.log('No cities found!');
        return;
    }

    // Step 2: List cities and let user select one
    const { selectedCity } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedCity',
            message: 'Select a city:',
            choices: cities.map((city) => ({
                name: `${city.name} (${city.iataCode})`,
                value: city.iataCode,
            })),
        },
    ]);

    // Step 3: Get hotels in the selected city
    const hotels = await getHotels(selectedCity);
    if (hotels.length === 0) {
        console.log('No hotels found in this city!');
        return;
    }

    // Step 4: List hotels and let user select one
    const { selectedHotel } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedHotel',
            message: 'Select a hotel:',
            choices: hotels.map((hotel) => ({
                name: `${hotel.name} (Hotel ID: ${hotel.hotelId})`,
                value: hotel.hotelId,
            })),
        },
    ]);

    // Step 5: Get hotel offers for the selected hotel
    const offers = await getHotelOffers(selectedHotel);
    if (offers.length === 0) {
        console.log('No offers available for this hotel!');
        return;
    }

    // Step 6: List offers and let user select one to confirm
    const { selectedOffer } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedOffer',
            message: 'Select an offer to confirm:',
            choices: offers.map((offer) => ({
                name: `${offer.room.description.text} - Price: ${offer.price.total} ${offer.price.currency}`,
                value: offer.id,
            })),
        },
    ]);

    // Step 7: Confirm the selected offer
    const confirmation = await confirmOffer(selectedOffer);
    console.log(`Offer confirmed: ${confirmation.id}`);
};

// Start the CLI flow
runCLI().catch((err) => console.error(err));
