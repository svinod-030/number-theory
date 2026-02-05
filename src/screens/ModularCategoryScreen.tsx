import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ModularCategoryScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
        {
            title: "Modular Playground",
            description: "Visualize multiplication orbits in modular arithmetic.",
            screen: "ModularPlayground",
            icon: "color-palette-outline",
        },
        {
            title: "Modular Table",
            description: "Explore the (i * j) mod n multiplication grid.",
            screen: "ModularTable",
            icon: "grid-outline",
        },
        {
            title: "Euler's Totient (φ)",
            description: "Count numbers that share no common factors.",
            screen: "Totient",
            icon: "pie-chart-outline",
        },
        {
            title: "Primitive Roots",
            description: "Find generators and cyclic powers in modular groups.",
            screen: "PrimitiveRoots",
            icon: "refresh-circle-outline",
        },
        {
            title: "Modular Inverse",
            description: "Find x such that ax ≡ 1 (mod m) using Extended GCD.",
            screen: "ModularInverse",
            icon: "key-outline",
        },
        {
            title: "Fermat & Exponents",
            description: "Efficiently calculate large powers modulo n.",
            screen: "ModularExponentiation",
            icon: "flash-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Modular Arithmetic</Text>
            </View>

            <ScrollView className="flex-1 px-6 py-8">
                <View className="space-y-4">
                    {tools.map((tool, index) => (
                        <Animated.View
                            key={index}
                            entering={FadeInDown.delay(index * 100)}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate(tool.screen as any)}
                                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex-row items-center shadow-lg"
                            >
                                <View className="bg-slate-800 p-3 rounded-xl mr-4">
                                    <Ionicons name={tool.icon as any} size={24} color="#38bdf8" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-lg font-bold text-white mb-1">{tool.title}</Text>
                                    <Text className="text-slate-400 text-sm leading-5">{tool.description}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#475569" />
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
