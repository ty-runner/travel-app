import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch list of cities from the backend
        axios
            .get("http://localhost:5000/cities")
            .then((response) => {
                setCities(response.data);
            })
            .catch((err) => console.error("Error fetching cities:", err));
    }, []);

    const handleSearch = () => {
        if (!selectedCity || !checkInDate || !checkOutDate) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");

        // Fetch hotel offers based on user input
        axios
            .post("http://localhost:5000/hotel-offers", {
                cityCode: selectedCity,
                checkInDate,
                checkOutDate,
            })
            .then((response) => {
                setOffers(response.data);
            })
            .catch((err) => {
                console.error("Error fetching offers:", err);
                setError("Failed to fetch offers. Please try again.");
            });
    };

    return (
        <div>
            <h1>Hotel Offers</h1>

            {/* City Selection */}
            <div>
                <label>Select City:</label>
                <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                    <option value="">--Select--</option>
                    {cities.map((city) => (
                        <option key={city.code} value={city.code}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Date Inputs */}
            <div>
                <label>Check-In Date:</label>
                <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                />
            </div>
            <div>
                <label>Check-Out Date:</label>
                <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                />
            </div>

            {/* Search Button */}
            <button onClick={handleSearch}>Search Offers</button>

            {/* Error Display */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Offers Display */}
            <div>
                <h2>Offers</h2>
                {offers.length === 0 && <p>No offers available. Try another search.</p>}
                {offers.map((offer, index) => (
                    <div key={index} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
                        <h3>{offer.hotelName || "Unknown Hotel"}</h3>
                        <p>Location: {offer.location?.latitude}, {offer.location?.longitude}</p>
                        <p>Price: {offer.price?.total || "N/A"} {offer.price?.currency || ""}</p>
                        <p>Room: {offer.roomType || "N/A"}</p>
                        <p>Description: {offer.roomDescription || "N/A"}</p>
                        <p>Cancellation: {offer.cancellationPolicy || "N/A"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
