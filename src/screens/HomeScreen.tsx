import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const categories = [
        {
            title: "Prime Numbers",
            icon: "sparkles-outline",
            color: "text-emerald-400",
            tools: [
                {
                    title: "Ulam Spiral",
                    description: "Visualize prime distributions in a square spiral.",
                    screen: "UlamSpiral",
                    icon: "apps-outline",
                },
                {
                    title: "Sieve of Eratosthenes",
                    description: "Step-by-step visualization of prime discovery.",
                    screen: "Sieve",
                    icon: "grid-outline",
                },
            ]
        },
        {
            title: "Modular Arithmetic",
            icon: "sync-circle-outline",
            color: "text-sky-400",
            tools: [
                {
                    title: "Modular Playground",
                    description: "Visualize multiplication orbits in modular arithmetic.",
                    screen: "ModularPlayground",
                    icon: "color-palette-outline",
                },
            ]
        },
        {
            title: "Divisibility & Algorithms",
            icon: "calculator-outline",
            color: "text-amber-400",
            tools: [
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
            ]
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScrollView className="px-6 py-8">
                <View className="flex-row items-center mb-10">
                    <View className="bg-slate-900 p-3 rounded-2xl border border-slate-800 mr-4 shadow-xl">
                        <Image
                            source={require('../../assets/icon.png')}
                            style={{ width: 48, height: 48, borderRadius: 12 }}
                        />
                    </View>
                    <View>
                        <Text className="text-3xl font-bold text-white tracking-tight">Number Theory</Text>
                        <Text className="text-slate-400 text-sm">The Queen of Mathematics</Text>
                    </View>
                </View>

                {categories.map((category, catIndex) => (
                    <View key={catIndex} className="mb-8">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name={category.icon as any} size={20} className={category.color} />
                            <Text className={`text-lg font-bold ml-2 ${category.color}`}>
                                {category.title}
                            </Text>
                        </View>

                        <View className="space-y-4">
                            {category.tools.map((tool, toolIndex) => (
                                <TouchableOpacity
                                    key={toolIndex}
                                    onPress={() => navigation.navigate(tool.screen as any)}
                                    className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex-row items-center shadow-lg transform active:scale-95 transition-all"
                                >
                                    <View className="bg-slate-800 p-3 rounded-xl mr-4">
                                        <Ionicons name={tool.icon as any} size={24} color="white" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-lg font-bold text-white mb-1">{tool.title}</Text>
                                        <Text className="text-slate-400 text-sm leading-5">{tool.description}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="#475569" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
