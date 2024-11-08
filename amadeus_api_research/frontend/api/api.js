import axios from 'axios';

// Base URL of your Express server
const BASE_URL = 'http://localhost:3000/api';

export const searchCities = async (keyword) => {
    const response = await axios.get(`${BASE_URL}/search`, { params: { keyword } });
    return response.data;
};

export const getHotels = async (cityCode) => {
    const response = await axios.get(`${BASE_URL}/hotels`, { params: { cityCode } });
    return response.data;
};

export const getHotelOffers = async (hotelId) => {
    const response = await axios.get(`${BASE_URL}/offers`, { params: { hotelId } });
    return response.data;
};

export const confirmOffer = async (offerId) => {
    const response = await axios.get(`${BASE_URL}/offer`, { params: { offerId } });
    return response.data;
};

export const bookHotel = async (offerId, bookingData) => {
    const response = await axios.post(`${BASE_URL}/booking`, bookingData, { params: { offerId } });
    return response.data;
};
