import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { getHotelOffers, confirmOffer } from '../api/api';

const HotelOffers = ({ route, navigation }) => {
    const { hotelId } = route.params;
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchOffers = async () => {
            const results = await getHotelOffers(hotelId);
            setOffers(results.data);
        };
        fetchOffers();
    }, [hotelId]);

    const handleConfirm = async (offerId) => {
        const confirmation = await confirmOffer(offerId);
        alert(`Offer confirmed: ${confirmation.id}`);
    };

    return (
        <View>
            <FlatList
                data={offers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.room.description.text}</Text>
                        <Text>Price: {item.price.total} {item.price.currency}</Text>
                        <Button title="Confirm" onPress={() => handleConfirm(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

export default HotelOffers;
