import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { searchCities } from '../api/api';

const CitySearch = ({ navigation }) => {
    const [keyword, setKeyword] = useState('');
    const [cities, setCities] = useState([]);

    const handleSearch = async () => {
        const results = await searchCities(keyword);
        setCities(results.data);
    };

    return (
        <View>
            <TextInput
                placeholder="Enter city name"
                value={keyword}
                onChangeText={setKeyword}
                style={{ padding: 10, margin: 10, borderWidth: 1 }}
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={cities}
                keyExtractor={(item) => item.iataCode}
                renderItem={({ item }) => (
                    <Text onPress={() => navigation.navigate('Hotels', { cityCode: item.iataCode })}>
                        {item.name} ({item.iataCode})
                    </Text>
                )}
            />
        </View>
    );
};

export default CitySearch;
