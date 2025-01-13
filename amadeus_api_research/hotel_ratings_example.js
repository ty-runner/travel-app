const amadeus = require("./config");

async function main() {
    try {
      // Hotel name autocomplete for keyword 'PARI' using  HOTEL_GDS category of search
      const response = await amadeus.eReputation.hotelSentiments.get({
        hotelIds: "ADNYCCTB",
      });
  
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  main();
