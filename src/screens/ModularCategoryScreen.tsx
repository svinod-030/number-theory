import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import ScreenHeader from '../components/ScreenHeader';
import ToolItem from '../components/ToolItem';

export default function ModularCategoryScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
        {
            title: "Modulus Basics",
            description: "Understand the remainder operator and clock arithmetic.",
            screen: "ModulusBasics",
            icon: "help-circle-outline",
        },
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
        {
            title: "Chinese Remainder Thm",
            description: "Solve systems of congruences x ≡ a (mod n).",
            screen: "CRT",
            icon: "git-branch-outline",
        },
        {
            title: "Legendre Symbol",
            description: "Determine if a number is a quadratic residue mod p.",
            screen: "Legendre",
            icon: "flash-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Modular Arithmetic" />

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
                            accentColor="#38bdf8"
                        />
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
