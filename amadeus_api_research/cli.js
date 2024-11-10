const inquirer = require('inquirer');
const axios = require('axios');

const API_URL = 'http://localhost:1338';

// Placeholder for your API functions using the local Express server

const getHotels = async (cityCode) => {
    const response = await axios.get(`${API_URL}/hotels/by-city`, { params: { cityCode } });
    return response.data;
};

const getHotelOffers = async (hotelId) => {
    const response = await axios.get(`${API_URL}/offers`, { params: { hotelId } });
    return response.data;
};

const confirmOffer = async (offerId) => {
    const response = await axios.get(`${API_URL}/offer`, { params: { offerId } });
    return response.data;
};

const bookHotel = async (offerId, guests, payments) => {
    const response = await axios.post(`${API_URL}/booking`, {
        offerId,
        guests,
        payments,
    });
    return response.data;
};

// CLI flow for city search, hotel list, and offer confirmation
const runCLI = async () => {
    try {
        const { keyword } = await inquirer.prompt([
            {
                type: 'input',
                name: 'keyword',
                message: 'Enter a city name to search for:',
            },
        ]);
        const hotels = await getHotels(keyword);
        console.log(hotels);
        if (!hotels || hotels.length === 0) {
            console.log('No hotels found in this city!');
            return;
        }
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
        if (!offers || offers.length === 0) {
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

        // Optional: Book the hotel
        const shouldBook = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'book',
                message: 'Would you like to book this offer?',
            },
        ]);

        if (shouldBook.book) {
            const bookingResponse = await bookHotel(selectedOffer, [{ name: 'John Doe' }], [{ method: 'creditCard' }]);
            console.log(`Booking successful: ${bookingResponse.id}`);
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

runCLI();
