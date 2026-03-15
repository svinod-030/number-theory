import "../../global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettingsStore } from '../store/useSettingsStore';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
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
import SequencesCategoryScreen from '../screens/SequencesCategoryScreen';
import EquationsCategoryScreen from '../screens/EquationsCategoryScreen';
import CRTScreen from '../screens/CRTScreen';
import DiophantineScreen from '../screens/DiophantineScreen';
import QuadraticReciprocityScreen from '../screens/QuadraticReciprocityScreen';
import ApplicationsCategoryScreen from '../screens/ApplicationsCategoryScreen';
import DiffieHellmanScreen from '../screens/DiffieHellmanScreen';
import RSAScreen from '../screens/RSAScreen';
import DigitalSignatureScreen from '../screens/DigitalSignatureScreen';
import HashingScreen from '../screens/HashingScreen';
import PerfectNumbersScreen from '../screens/PerfectNumbersScreen';
import GoldbachScreen from '../screens/GoldbachScreen';
import AmicableNumbersScreen from '../screens/AmicableNumbersScreen';
import PartitionScreen from '../screens/PartitionScreen';
import LegendreScreen from '../screens/LegendreScreen';
import ConstructiblePolygonsScreen from "../screens/ConstructiblePolygonsScreen";
import GlossaryScreen from "../screens/GlossaryScreen";
import PythagoreanTriplesScreen from "../screens/PythagoreanTriplesScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import ModulusBasicsScreen from "../screens/ModulusBasicsScreen";
import LanguageSelectionScreen from "../screens/LanguageSelectionScreen";
import FermatPrimalityScreen from "../screens/FermatPrimalityScreen";
import CarmichaelNumbersScreen from "../screens/CarmichaelNumbersScreen";
import TwinPrimesScreen from "../screens/TwinPrimesScreen";
import FermatsLittleTheoremScreen from "../screens/FermatsLittleTheoremScreen";
import WilsonsTheoremScreen from "../screens/WilsonsTheoremScreen";
import MobiusFunctionScreen from "../screens/MobiusFunctionScreen";
import LiouvilleFunctionScreen from "../screens/LiouvilleFunctionScreen";
import PellsEquationScreen from "../screens/PellsEquationScreen";
import BezoutsIdentityScreen from "../screens/BezoutsIdentityScreen";
import FareySequencesScreen from "../screens/FareySequencesScreen";
import LucasNumbersScreen from "../screens/LucasNumbersScreen";
import HappyNumbersScreen from "../screens/HappyNumbersScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'HomeTab') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }
                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#818cf8',
                tabBarInactiveTintColor: '#64748b',
                tabBarStyle: {
                    backgroundColor: '#0f172a',
                    borderTopColor: '#1e293b',
                    paddingBottom: 8 + insets.bottom,
                    paddingTop: 8,
                    height: 64 + insets.bottom,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: 'bold',
                },
            })}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{ tabBarLabel: t('common.home') }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ tabBarLabel: t('common.settings') }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const isFirstLaunch = useSettingsStore(state => state.isFirstLaunch);
    const hasHydrated = useSettingsStore(state => state._hasHydrated);
    const language = useSettingsStore(state => state.language);
    const { i18n } = useTranslation();

    React.useEffect(() => {
        if (hasHydrated && language) {
            i18n.changeLanguage(language);
        }
    }, [hasHydrated, language]);

    if (!hasHydrated) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isFirstLaunch ? "LanguageSelection" : "Home"}
                screenOptions={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                }}
            >
                <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
                <Stack.Screen name="Home" component={TabNavigator} />
                <Stack.Screen name="ModulusBasics" component={ModulusBasicsScreen} />
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
                <Stack.Screen name="SequencesCategory" component={SequencesCategoryScreen} />
                <Stack.Screen name="EquationsCategory" component={EquationsCategoryScreen} />
                <Stack.Screen name="CRT" component={CRTScreen} />
                <Stack.Screen name="QuadraticReciprocity" component={QuadraticReciprocityScreen} />
                <Stack.Screen name="Diophantine" component={DiophantineScreen} />
                <Stack.Screen name="ApplicationsCategory" component={ApplicationsCategoryScreen} />
                <Stack.Screen name="RSA" component={RSAScreen} />
                <Stack.Screen name="DiffieHellman" component={DiffieHellmanScreen} />
                <Stack.Screen name="PerfectNumbers" component={PerfectNumbersScreen} />
                <Stack.Screen name="Hashing" component={HashingScreen} />
                <Stack.Screen name="DigitalSignature" component={DigitalSignatureScreen} />
                <Stack.Screen name="Goldbach" component={GoldbachScreen} />
                <Stack.Screen name="AmicableNumbers" component={AmicableNumbersScreen} />
                <Stack.Screen name="Partition" component={PartitionScreen} />
                <Stack.Screen name="Legendre" component={LegendreScreen} />
                <Stack.Screen name="Glossary" component={GlossaryScreen} />
                <Stack.Screen name="PythagoreanTriples" component={PythagoreanTriplesScreen} />
                <Stack.Screen name="ConstructiblePolygons" component={ConstructiblePolygonsScreen} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
                <Stack.Screen name="FermatPrimality" component={FermatPrimalityScreen} />
                <Stack.Screen name="CarmichaelNumbers" component={CarmichaelNumbersScreen} />
                <Stack.Screen name="TwinPrimes" component={TwinPrimesScreen} />
                <Stack.Screen name="FermatsLittleTheorem" component={FermatsLittleTheoremScreen} />
                <Stack.Screen name="WilsonsTheorem" component={WilsonsTheoremScreen} />
                <Stack.Screen name="MobiusFunction" component={MobiusFunctionScreen} />
                <Stack.Screen name="LiouvilleFunction" component={LiouvilleFunctionScreen} />
                <Stack.Screen name="PellsEquation" component={PellsEquationScreen} />
                <Stack.Screen name="BezoutsIdentity" component={BezoutsIdentityScreen} />
                <Stack.Screen name="FareySequences" component={FareySequencesScreen} />
                <Stack.Screen name="LucasNumbers" component={LucasNumbersScreen} />
                <Stack.Screen name="HappyNumbers" component={HappyNumbersScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
