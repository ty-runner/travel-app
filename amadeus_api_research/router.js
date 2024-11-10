const express = require("express");
const router = express.Router();
const amadeus = require("./config");

// Querying hotels by city code
router.get(`/hotels/by-city`, async (req, res) => {
    const { cityCode } = req.query;

    if (!cityCode) {
        return res.status(400).json({ error: "cityCode is required" });
    }

    try {
        // Calling Amadeus API for hotels by city code
        const response = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode,
        });
        console.log(response.body);
        // Responding with the parsed data
        res.json(JSON.parse(response.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Querying hotel offers
router.get(`/hotels`, async (req, res) => {
    const { cityCode } = req.query;
    try {
        const response = await amadeus.shopping.hotelOffers.get({ cityCode });
        res.json(JSON.parse(response.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Querying hotel offers by hotel ID
router.get(`/offers`, async (req, res) => {
    const { hotelId } = req.query;
    try {
        const response = await amadeus.shopping.hotelOffersByHotel.get({ hotelId });
        res.json(JSON.parse(response.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Confirming the offer
router.get(`/offer`, async (req, res) => {
    const { offerId } = req.query;
    try {
        const response = await amadeus.shopping.hotelOffer(offerId).get();
        res.json(JSON.parse(response.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Booking
router.post(`/booking`, async (req, res) => {
    const { offerId } = req.query;
    const { body } = req;
    try {
        const response = await amadeus.booking.hotelBookings.post(
            JSON.stringify({
                data: {
                    offerId,
                    guests: body.guests,
                    payments: body.payments,
                },
            })
        );
        res.json(JSON.parse(response.body));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
