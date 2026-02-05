import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function DivisibilityCategoryScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
        {
            title: "Number Theory Toolbox",
            description: "GCD, Primality, Factors, and more utilities.",
            screen: "Toolbox",
            icon: "construct-outline",
        },
        {
            title: "Euclidean Visualizer",
            description: "Learn GCD through geometric tiling.",
            screen: "EuclideanVisualizer",
            icon: "color-fill-outline",
        },
        {
            title: "Collatz Conjecture",
            description: "Visualize the mysterious 3n + 1 sequences.",
            screen: "Collatz",
            icon: "trending-down-outline",
        },
        {
            title: "Pascal's Triangle",
            description: "Explore binomial coefficients and Sierpinski patterns.",
            screen: "PascalTriangle",
            icon: "triangle-outline",
        },
        {
            title: "Fibonacci & Spiral",
            description: "Visualize the Golden Ratio and growth patterns.",
            screen: "Fibonacci",
            icon: "color-wand-outline",
        },
        {
            title: "LCM Visualizer",
            description: "Find the smallest common multiple of two numbers.",
            screen: "LCM",
            icon: "git-commit-outline",
        },
        {
            title: "Perfect & Divisors",
            description: "Explore Perfect, Abundant, and Deficient numbers.",
            screen: "Divisors",
            icon: "layers-outline",
        },
        {
            title: "Continued Fractions",
            description: "Represent numbers as nested fractions and recursive tiles.",
            screen: "ContinuedFraction",
            icon: "list-outline",
        },
        {
            title: "Diophantine Equations",
            description: "Solve equations of the form ax + by = c.",
            screen: "Diophantine",
            icon: "infinite-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Divisibility & Algorithms</Text>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ gap: 16 }}>
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
                                    <Ionicons name={tool.icon as any} size={24} color="#fbbf24" />
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
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
