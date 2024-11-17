const express = require("express");
const router = express.Router();
const amadeus = require("./config");

// Querying hotels by city code WORKS
router.get(`/hotels/by-city`, async (req, res) => {
  const { cityCode } = req.query;

  if (!cityCode) {
      return res.status(400).json({ error: "cityCode is required" });
  }

  try {
      // Fetching hotel data from Amadeus API
      const response = await amadeus.referenceData.locations.hotels.byCity.get({ cityCode });
      const hotels = JSON.parse(response.body).data;
      res.json(hotels);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Querying hotel offers NOT USED
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
  let { hotelId } = req.query;

  // Handle input formats
  if (typeof hotelId === 'string') {
      hotelId = hotelId.split(','); // Convert comma-separated string to an array
  }

  console.log("Hotel IDs:", hotelId); // Log the hotelId array

  try {
      // Log the input format before making the API request
      const queryParams = {
          hotelIds: hotelId
      };

      console.log("Request Params:", queryParams); // Log the request parameters

      // Send the correct API request format
      const response = await amadeus.shopping.hotelOffers.get({hotelIDs: hotelId, adults: 1});
      console.log("Response:", response.body);
      
      res.json(response.body); // Send the response back as JSON
  } catch (err) {
      console.error("Error:", err);
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
