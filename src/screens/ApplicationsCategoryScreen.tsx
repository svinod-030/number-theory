import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import ScreenHeader from '../components/ScreenHeader';
import ToolItem from '../components/ToolItem';

export default function ApplicationsCategoryScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
        {
            title: "RSA Cryptography",
            description: "How large primes secure data transmission.",
            screen: "RSA",
            icon: "lock-closed-outline",
        },
        {
            title: "Diffie-Hellman",
            description: "Secure key exchange using modular exponentiation.",
            screen: "DiffieHellman",
            icon: "key-outline",
        },
        {
            title: "Hashing Algorithms",
            description: "One-way functions used for data integrity.",
            screen: "Hashing",
            icon: "finger-print-outline",
        },
        {
            title: "Digital Signatures",
            description: "Verify identity and authenticity with cryptography.",
            screen: "DigitalSignature",
            icon: "document-text-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Applications" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ gap: 16 }}>
                    {tools.map((tool, index) => (
                        <ToolItem
                            key={index}
                            index={index}
                            title={tool.title}
                            description={tool.description}
                            icon={tool.icon}
                            onPress={() => navigation.navigate(tool.screen as any)}
                            accentColor="#f43f5e"
                        />
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
