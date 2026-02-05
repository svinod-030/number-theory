import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ApplicationsCategoryScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
        {
            title: "RSA Cryptography",
            description: "How large primes secure data transmission.",
            screen: "RSA",
            icon: "lock-closed-outline",
            color: "#f43f5e",
        },
        {
            title: "Diffie-Hellman",
            description: "Secure key exchange using modular exponentiation.",
            screen: "DiffieHellman",
            icon: "key-outline",
            color: "#f43f5e",
        },
        {
            title: "Hashing Algorithms",
            description: "One-way functions used for data integrity.",
            screen: "Hashing",
            icon: "finger-print-outline",
            color: "#f43f5e",
        },
        {
            title: "Digital Signatures",
            description: "Verify identity and authenticity with cryptography.",
            screen: "DigitalSignature",
            icon: "document-text-outline",
            color: "#f43f5e",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Applications</Text>
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
                                    <Ionicons name={tool.icon as any} size={24} color={tool.color} />
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
