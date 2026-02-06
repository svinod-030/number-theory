import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import ScreenHeader from '../components/ScreenHeader';
import ToolItem from '../components/ToolItem';

export default function PrimesCategoryScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
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
        {
            title: "Factor Tree",
            description: "Visualize the Fundamental Theorem of Arithmetic.",
            screen: "Factorization",
            icon: "git-branch-outline",
        },
        {
            title: "Quadratic Reciprocity",
            description: "Check if a number is a quadratic residue mod p.",
            screen: "QuadraticReciprocity",
            icon: "infinite-outline",
        },
        {
            title: "Goldbach's Conjecture",
            description: "Visualize even numbers as sums of two primes.",
            screen: "Goldbach",
            icon: "medal-outline",
        },
        {
            title: "Amicable Numbers",
            description: "Find pairs of numbers with matching divisor sums.",
            screen: "AmicableNumbers",
            icon: "heart-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Prime Numbers" />

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
                            accentColor="#34d399"
                        />
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
