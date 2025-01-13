const express = require("express");
const amadeus = require("./config");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Endpoint to fetch a list of cities
app.get("/cities", (req, res) => {
    // NEED TO GET A LIST OF CITIES
    const cities = [
        { code: "NYC", name: "New York City" },
        { code: "LAX", name: "Los Angeles" },
        { code: "MIA", name: "Miami" },
    ];
    res.json(cities);
});


// Endpoint to fetch hotel offers
app.post("/hotel-offers", async (req, res) => {
    const { cityCode, checkInDate, checkOutDate, adults = 1 } = req.body;

    try {
        // Fetch hotels in the specified city
        const hotelsList = await amadeus.referenceData.locations.hotels.byCity.get({ cityCode });

        // Use Promise.all to fetch offers for all hotels concurrently
        const offers = await Promise.all(
            hotelsList.data.map(async (hotel) => {
                try {
                    const pricingResponse = await amadeus.shopping.hotelOffersSearch.get({
                        hotelIds: hotel.hotelId,
                        checkInDate,
                        checkOutDate,
                        adults,
                    });
                    console.log("Pricing Response:", JSON.stringify(pricingResponse.data, null, 2));
                    // Extract offers if they exist
                    if (pricingResponse.data && pricingResponse.data.length > 0) {
                        return pricingResponse.data.map((offer) => ({
                            hotelName: offer.hotel.name || "N/A",
                            location: {
                                latitude: offer.hotel.latitude || "N/A",
                                longitude: offer.hotel.longitude || "N/A",
                            },
                            offerId: offer.offers?.[0]?.id || "N/A",
                            roomType: offer.offers?.[0]?.room?.typeEstimated?.bedType || "N/A",
                            roomDescription: offer.offers?.[0]?.room?.description?.text || "N/A",
                            price: {
                                total: offer.offers?.[0]?.price?.total || "N/A",
                                currency: offer.offers?.[0]?.price?.currency || "N/A",
                            },
                            cancellationPolicy:
                                offer.offers?.[0]?.policies?.cancellations?.[0]?.description?.text ||
                                "N/A",
                        }));
                    }
                } catch (err) {
                    console.error(`Error fetching offers for hotel: ${hotel.name}`, err.message);
                    return [];
                }
            })
        );

        // Flatten the nested arrays of offers
        const flattenedOffers = offers.flat();
        res.json(flattenedOffers);
    } catch (error) {
        console.error("Error fetching hotel offers:", error.message);
        res.status(500).json({ error: "Error fetching hotel offers." });
    }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
