// config.js
require("dotenv").config();
const Amadeus = require("amadeus");

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

module.exports = amadeus;
