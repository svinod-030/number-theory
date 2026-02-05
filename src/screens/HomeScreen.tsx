import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';

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
        },
        {
            title: "Applications",
            description: "RSA, Diffie-Hellman, and Security",
            screen: "ApplicationsCategory",
            icon: "shield-checkmark-outline",
            color: "text-rose-400",
            iconColor: "#f43f5e",
            bgColor: "bg-rose-500/10",
            borderColor: "border-rose-500/20",
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View entering={FadeInUp.duration(600)} className="flex-row items-center mb-10">
                    <Animated.View
                        entering={ZoomIn.delay(200).duration(400)}
                        className="bg-slate-900 p-3 rounded-2xl border border-slate-800 mr-4 shadow-2xl"
                    >
                        <Image
                            source={require('../../assets/icon.png')}
                            style={{ width: 56, height: 56, borderRadius: 14 }}
                        />
                    </Animated.View>
                    <View>
                        <Text className="text-3xl font-black text-white tracking-tighter">Number Theory</Text>
                        <Text className="text-slate-500 font-medium text-sm">The Queen of Mathematics</Text>
                    </View>
                </Animated.View>

                <View style={{ gap: 20 }}>
                    {categories.map((category, index) => (
                        <Animated.View
                            key={index}
                            entering={FadeInDown.delay(index * 100 + 400).duration(500)}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate(category.screen as any)}
                                className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex-row items-center shadow-2xl active:scale-[0.97] transition-all"
                                activeOpacity={0.85}
                            >
                                <View className={`${category.bgColor} p-4 rounded-2xl mr-5 border ${category.borderColor}`}>
                                    <Ionicons name={category.icon as any} size={32} color={category.iconColor} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-xl font-bold text-white mb-1 tracking-tight">{category.title}</Text>
                                    <Text className="text-slate-400 text-sm leading-5">
                                        {category.description}
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={24} color="#475569" />
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                <View style={{ height: 60 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
