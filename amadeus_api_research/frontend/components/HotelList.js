import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getHotels } from '../api/api';

const HotelList = ({ route, navigation }) => {
    const { cityCode } = route.params;
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            const results = await getHotels(cityCode);
            setHotels(results.data);
        };
        fetchHotels();
    }, [cityCode]);

    return (
        <View>
            <FlatList
                data={hotels}
                keyExtractor={(item) => item.hotelId}
                renderItem={({ item }) => (
                    <Text onPress={() => navigation.navigate('Offers', { hotelId: item.hotelId })}>
                        {item.name} - {item.hotelId}
                    </Text>
                )}
            />
        </View>
    );
};

export default HotelList;
