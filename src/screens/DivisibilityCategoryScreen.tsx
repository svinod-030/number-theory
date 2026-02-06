import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import ScreenHeader from '../components/ScreenHeader';
import ToolItem from '../components/ToolItem';

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
        {
            title: "Perfect Numbers",
            description: "Explore numbers equal to the sum of their divisors.",
            screen: "PerfectNumbers",
            icon: "star-outline",
        },
        {
            title: "Partition Theory",
            description: "Visualize ways to split an integer into positive sums.",
            screen: "Partition",
            icon: "apps-outline",
        },
        {
            title: "Pythagorean Triples",
            description: "Generate right triangles using Euclid's formula.",
            screen: "PythagoreanTriples",
            icon: "triangle-outline",
        },
        {
            title: "Constructible Polygons",
            description: "Gauss's Theorem on construction with ruler & compass.",
            screen: "ConstructiblePolygons",
            icon: "shapes-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Divisibility & Algorithms" />

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
                            accentColor="#fbbf24"
                        />
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
