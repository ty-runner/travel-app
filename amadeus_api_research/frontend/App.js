import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CitySearch from './components/CitySearch';
import HotelList from './components/HotelList';
import HotelOffers from './components/HotelOffers';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CitySearch" component={CitySearch} options={{ title: 'Search City' }} />
                <Stack.Screen name="Hotels" component={HotelList} options={{ title: 'Hotel List' }} />
                <Stack.Screen name="Offers" component={HotelOffers} options={{ title: 'Hotel Offers' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
