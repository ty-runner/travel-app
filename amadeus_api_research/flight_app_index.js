var http = require('http'); 
var fs = require('fs'); 
var Amadeus = require('amadeus'); 
var amadeus = new Amadeus({ 
  clientId: process.env["AMADEUS_CLIENT_ID"], 
  clientSecret: process.env["AMADEUS_CLIENT_SECRET"] 
}); 
http.createServer(function (request, response) { 
  if (request.url === "/app") { 
    fs.readFile("html/index.html", function (err, data) { 
      response.writeHead(200, { 
        'Content-Type': 'text/html' 
      }); 
      response.write(data); 
      response.end(); 
    }); 
  } else if (request.url === "/flights") { 
    amadeus.shopping.flightOffersSearch.get({ 
      originLocationCode: 'BOS', 
      destinationLocationCode: 'LON', 
      departureDate: '2020-08-01', 
      adults: '2' 
    }).then(function (data) { 
      response.writeHead(200, { 
        'Content-Type': 'application/json' 
      }); 
      response.write(JSON.stringify(data)); 
      response.end(); 
    }).catch(function (responseError) { 
      response.writeHead(responseError.code, { 
        'Content-Type': 'application/json' 
      }); 
      response.write(JSON.stringify(responseError)); 
      response.end(); 
    }); 
  } else { 
    response.writeHead(404, { 
      'Content-Type': 'text/html' 
    }); 
    response.write('404 error'); 
    response.end(); 
  } 
}).listen(8000); 