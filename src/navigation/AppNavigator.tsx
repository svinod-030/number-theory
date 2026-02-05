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
import TotientScreen from '../screens/TotientScreen';
import DivisorsScreen from '../screens/DivisorsScreen';
import PrimitiveRootsScreen from '../screens/PrimitiveRootsScreen';
import ContinuedFractionScreen from '../screens/ContinuedFractionScreen';
import ModularExponentiationScreen from '../screens/ModularExponentiationScreen';
import ModularInverseScreen from '../screens/ModularInverseScreen';
import PrimesCategoryScreen from '../screens/PrimesCategoryScreen';
import ModularCategoryScreen from '../screens/ModularCategoryScreen';
import DivisibilityCategoryScreen from '../screens/DivisibilityCategoryScreen';

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
                <Stack.Screen name="Totient" component={TotientScreen} />
                <Stack.Screen name="Divisors" component={DivisorsScreen} />
                <Stack.Screen name="PrimitiveRoots" component={PrimitiveRootsScreen} />
                <Stack.Screen name="ContinuedFraction" component={ContinuedFractionScreen} />
                <Stack.Screen name="ModularInverse" component={ModularInverseScreen} />
                <Stack.Screen name="ModularExponentiation" component={ModularExponentiationScreen} />
                <Stack.Screen name="PrimesCategory" component={PrimesCategoryScreen} />
                <Stack.Screen name="ModularCategory" component={ModularCategoryScreen} />
                <Stack.Screen name="DivisibilityCategory" component={DivisibilityCategoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
