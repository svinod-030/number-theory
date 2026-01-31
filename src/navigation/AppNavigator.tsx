import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ModularPlaygroundScreen from '../screens/ModularPlaygroundScreen';
import ToolboxScreen from '../screens/ToolboxScreen';
import UlamSpiralScreen from '../screens/UlamSpiralScreen';
import { RootStackParamList } from '../types/navigation';
import SieveScreen from '../screens/SieveScreen';
import EuclideanVisualizerScreen from '../screens/EuclideanVisualizerScreen';
import FactorizationScreen from '../screens/FactorizationScreen';
import LCMScreen from '../screens/LCMScreen';
import CollatzScreen from '../screens/CollatzScreen';
import ModularTableScreen from '../screens/ModularTableScreen';
import PascalTriangleScreen from '../screens/PascalTriangleScreen';
import FibonacciScreen from '../screens/FibonacciScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ModularPlayground" component={ModularPlaygroundScreen} />
                <Stack.Screen name="Toolbox" component={ToolboxScreen} />
                <Stack.Screen name="UlamSpiral" component={UlamSpiralScreen} />
                <Stack.Screen name="Sieve" component={SieveScreen} />
                <Stack.Screen name="EuclideanVisualizer" component={EuclideanVisualizerScreen} />
                <Stack.Screen name="ModularTable" component={ModularTableScreen} />
                <Stack.Screen name="Collatz" component={CollatzScreen} />
                <Stack.Screen name="Factorization" component={FactorizationScreen} />
                <Stack.Screen name="LCM" component={LCMScreen} />
                <Stack.Screen name="PascalTriangle" component={PascalTriangleScreen} />
                <Stack.Screen name="Fibonacci" component={FibonacciScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
