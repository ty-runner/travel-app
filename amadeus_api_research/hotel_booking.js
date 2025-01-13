const amadeus = require("./config");

async function main() {
    try {
        // 1. Hotel List API to get the list of hotels
        const hotelsList = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode: "NYC",
        });

        // Loop through each hotel in the list and fetch offers
        for (const hotel of hotelsList.data) {
            try {
                console.log(`Fetching offers for hotel: ${hotel.name} (ID: ${hotel.hotelId})`);

                // 2. Hotel Search API to get the price and offer id for each hotel
                const pricingResponse = await amadeus.shopping.hotelOffersSearch.get({
                    hotelIds: hotel.hotelId,
                    adults: 1,
                    checkInDate: "2025-10-10",
                    checkOutDate: "2025-10-12",
                });

                // Check if the response has valid data (i.e., no errors)
                if (pricingResponse && pricingResponse.data && pricingResponse.data.length > 0) {
                    pricingResponse.data.forEach((offer) => {
                        const hotelDetails = offer.hotel;
                        const priceDetails = offer.offers[0].price;
                        const roomDetails = offer.offers[0].room;
                        const policies = offer.offers[0].policies;

                        // Log valid offers
                        console.log("Hotel Name:", hotelDetails.name);
                        console.log("Hotel Location:", `Lat: ${hotelDetails.latitude}, Lon: ${hotelDetails.longitude}`);
                        console.log("Offer ID:", offer.offers[0].id);
                        console.log("Room Type:", roomDetails.typeEstimated.bedType);
                        console.log("Room Description:", roomDetails.description.text);
                        console.log("Price (Total):", priceDetails.total);
                        console.log("Currency:", priceDetails.currency);
                        console.log("Cancellation Policy:", policies.cancellations[0].description.text);
                    });
                } else {
                    console.log(`No offers found for hotel: ${hotel.name}`);
                }
            } catch (error) {
                console.error(`Error fetching offers for hotel: ${hotel.name} (ID: ${hotel.hotelId}):`, error.message);
            }
        }
    } catch (error) {
        console.error("Error fetching hotel list:", error.message);
    }
}

main();




      // Finally, Hotel Booking API to book the offer
      /*const response = await amadeus.booking.hotelBookings.post({
        data: {
          offerId: pricingResponse.data[0].offers[0].id,
          guests: [
            {
              id: 1,
              name: {
                title: "MR",
                firstName: "BOB",
                lastName: "SMITH",
              },
              contact: {
                phone: "+33679278416",
                email: "bob.smith@email.com",
              },
            },
          ],
          payments: [
            {
              id: 1,
              method: "creditCard",
              card: {
                vendorCode: "VI",
                cardNumber: "4151289722471370",
                expiryDate: "2022-08",
              },
            },
          ],
        },
      });*/