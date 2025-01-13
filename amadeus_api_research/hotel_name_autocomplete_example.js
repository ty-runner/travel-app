const amadeus = require("./config");

async function main() {
    try {
      // Hotel name autocomplete for keyword 'PARI' using  HOTEL_GDS category of search
      const response = await amadeus.referenceData.locations.hotel.get({
        keyword: "PARI",
        subType: "HOTEL_GDS",
      });
  
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  main();
