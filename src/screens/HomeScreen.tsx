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
            description: "Spirals, Sieves, and Factorization",
            screen: "PrimesCategory",
            icon: "sparkles-outline",
            color: "text-emerald-400",
            iconColor: "#34d399",
            bgColor: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20",
        },
        {
            title: "Modular Arithmetic",
            description: "Congruences, Totients, and Exponents",
            screen: "ModularCategory",
            icon: "sync-circle-outline",
            color: "text-sky-400",
            iconColor: "#38bdf8",
            bgColor: "bg-sky-500/10",
            borderColor: "border-sky-500/20",
        },
        {
            title: "Divisibility & Algorithms",
            description: "GCD, Fibonacci, and Pascal patterns",
            screen: "DivisibilityCategory",
            icon: "calculator-outline",
            color: "text-amber-400",
            iconColor: "#fbbf24",
            bgColor: "bg-amber-500/10",
            borderColor: "border-amber-500/20",
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
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

                <View style={{ gap: 16 }}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate(category.screen as any)}
                            className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex-row items-center shadow-xl transform active:scale-95 transition-all"
                        >
                            <View className={`${category.bgColor} p-4 rounded-2xl mr-5 border ${category.borderColor}`}>
                                <Ionicons name={category.icon as any} size={32} color={category.iconColor} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xl font-bold text-white mb-1">{category.title}</Text>
                                <Text className="text-slate-400 text-sm leading-5">
                                    {category.description}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="#475569" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
