import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, ZoomIn, Layout, FadeIn } from 'react-native-reanimated';

interface ProjectTool {
    title: string;
    description: string;
    screen: keyof RootStackParamList;
    icon: string;
    accent: string;
}

const ALL_TOOLS: ProjectTool[] = [
    { title: "Sieve of Eratosthenes", description: "Visualize prime finding algorithm", screen: "Sieve", icon: "grid-outline", accent: "#34d399" },
    { title: "Ulam Spiral", description: "Patterns of primes in a square grid", screen: "UlamSpiral", icon: "sync-outline", accent: "#34d399" },
    { title: "Factorization Tree", description: "Unique Prime Factorization", screen: "Factorization", icon: "git-branch-outline", accent: "#34d399" },
    { title: "Goldbach Conjecture", description: "Primes that sum to even numbers", screen: "Goldbach", icon: "flame-outline", accent: "#34d399" },
    { title: "Amicable Numbers", description: "Friendly number pairs", screen: "AmicableNumbers", icon: "heart-outline", accent: "#34d399" },
    { title: "Modular Playground", description: "Interactive modular calculator", screen: "ModularPlayground", icon: "calculator-outline", accent: "#38bdf8" },
    { title: "Modular Inverse", description: "Find modular multiplicative inverses", screen: "ModularInverse", icon: "swap-horizontal-outline", accent: "#38bdf8" },
    { title: "Modular Exponentiation", description: "Fast powers modulo n", screen: "ModularExponentiation", icon: "flash-outline", accent: "#38bdf8" },
    { title: "Modular Table", description: "Multiplication tables mod n", screen: "ModularTable", icon: "grid-outline", accent: "#38bdf8" },
    { title: "Totient Function Φ(n)", description: "Count coprime numbers", screen: "Totient", icon: "pie-chart-outline", accent: "#38bdf8" },
    { title: "Chinese Remainder", description: "Solve systems of congruences", screen: "CRT", icon: "layers-outline", accent: "#38bdf8" },
    { title: "Primitive Roots", description: "Cyclic generators of groups", screen: "PrimitiveRoots", icon: "infinite-outline", accent: "#38bdf8" },
    { title: "Quadratic Reciprocity", description: "Square roots in modular math", screen: "QuadraticReciprocity", icon: "git-merge-outline", accent: "#38bdf8" },
    { title: "Euclidean Algorithm", description: "Step-by-step GCD visualizer", screen: "EuclideanVisualizer", icon: "trending-down-outline", accent: "#fbbf24" },
    { title: "LCM Calculator", description: "Least Common Multiple steps", screen: "LCM", icon: "trending-up-outline", accent: "#fbbf24" },
    { title: "Fibonacci Spiral", description: "Golden ratio and nature's code", screen: "Fibonacci", icon: "infinite-outline", accent: "#fbbf24" },
    { title: "Pascal's Triangle", description: "Combinatorics and patterns", screen: "PascalTriangle", icon: "triangle-outline", accent: "#fbbf24" },
    { title: "Collatz Conjecture", description: "Visualizing the 3n+1 sequence", screen: "Collatz", icon: "stats-chart-outline", accent: "#fbbf24" },
    { title: "Continued Fractions", description: "Approximate real numbers", screen: "ContinuedFraction", icon: "reorder-four-outline", accent: "#fbbf24" },
    { title: "Diophantine Equations", description: "Solve integer linear equations", screen: "Diophantine", icon: "link-outline", accent: "#fbbf24" },
    { title: "Divisors Finder", description: "List all divisors of a number", screen: "Divisors", icon: "list-outline", accent: "#fbbf24" },
    { title: "Partition Theory", description: "Young Diagrams and partitions", screen: "Partition", icon: "apps-outline", accent: "#fbbf24" },
    { title: "RSA Cryptography", description: "Encryption and prime security", screen: "RSA", icon: "lock-closed-outline", accent: "#f43f5e" },
    { title: "Diffie-Hellman", description: "Key exchange protocol", screen: "DiffieHellman", icon: "key-outline", accent: "#f43f5e" },
    { title: "Hashing Algorithms", description: "One-way math functions", screen: "Hashing", icon: "barcode-outline", accent: "#f43f5e" },
    { title: "Digital Signatures", description: "Authentication with math", screen: "DigitalSignature", icon: "create-outline", accent: "#f43f5e" },
    { title: "Perfect Numbers", description: "Sum of divisors equals number", screen: "PerfectNumbers", icon: "star-outline", accent: "#f43f5e" },
    { title: "Legendre Symbol", description: "Quadratic Residues visualizer", screen: "Legendre", icon: "prism-outline", accent: "#f43f5e" },
    { title: "Pythagorean Triples", description: "Generate right triangles with Euclid's formula", screen: "PythagoreanTriples", icon: "triangle-outline", accent: "#fbbf24" },
    { title: "Constructible Polygons", description: "Gauss's Theorem on regular n-gons", screen: "ConstructiblePolygons", icon: "shapes-outline", accent: "#34d399" },
];

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [search, setSearch] = useState('');

    const categories = [
        { title: "Prime Numbers", count: 6, screen: "PrimesCategory", icon: "sparkles-outline", iconColor: "#34d399", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/20" },
        { title: "Modular Arithmetic", count: 9, screen: "ModularCategory", icon: "sync-circle-outline", iconColor: "#38bdf8", bgColor: "bg-sky-500/10", borderColor: "border-sky-500/20" },
        { title: "Divisibility & Algorithms", count: 13, screen: "DivisibilityCategory", icon: "calculator-outline", iconColor: "#fbbf24", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/20" },
        { title: "Applications", count: 4, screen: "ApplicationsCategory", icon: "shield-checkmark-outline", iconColor: "#f43f5e", bgColor: "bg-rose-500/10", borderColor: "border-rose-500/20" }
    ];

    const searchResults = useMemo(() => {
        if (!search.trim()) return [];
        return ALL_TOOLS.filter(t =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 5);
    }, [search]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header Section */}
                <Animated.View entering={FadeInUp.duration(600)} className="flex-row items-center justify-between mb-8">
                    <View className="flex-row items-center">
                        <Animated.View
                            entering={ZoomIn.delay(200).duration(400)}
                            className="bg-slate-900 p-3 rounded-2xl border border-slate-800 mr-4 shadow-2xl"
                        >
                            <Image
                                source={require('../../assets/icon.png')}
                                style={{ width: 48, height: 48, borderRadius: 12 }}
                            />
                        </Animated.View>
                        <View>
                            <Text className="text-2xl font-black text-white tracking-tighter">Number Theory</Text>
                            <Text className="text-slate-500 font-medium text-xs">The Queen of Mathematics</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Glossary')}
                        className="bg-indigo-600/20 px-4 py-2 rounded-xl border border-indigo-500/30 flex-row items-center"
                    >
                        <Ionicons name="library-outline" size={18} color="#818cf8" />
                        <Text className="text-indigo-400 font-bold ml-2 text-xs">Glossary</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Global Search Bar */}
                <Animated.View entering={FadeInUp.delay(300)} className="mb-10 z-50">
                    <View className="bg-slate-900 rounded-2xl border border-slate-800 flex-row items-center px-5 py-3.5 shadow-xl">
                        <Ionicons name="search-outline" size={20} color="#64748b" />
                        <TextInput
                            placeholder="Find a tool or visualizer..."
                            placeholderTextColor="#475569"
                            className="flex-1 ml-4 text-white font-medium"
                            value={search}
                            onChangeText={setSearch}
                        />
                        {search.length > 0 && (
                            <TouchableOpacity onPress={() => setSearch('')}>
                                <Ionicons name="close-circle" size={20} color="#475569" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Search Results Dropdown */}
                    {search.length > 0 && (
                        <Animated.View
                            entering={FadeIn.duration(200)}
                            className="absolute top-16 left-0 right-0 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden"
                        >
                            {searchResults.length > 0 ? searchResults.map((tool, i) => (
                                <TouchableOpacity
                                    key={tool.screen}
                                    onPress={() => {
                                        setSearch('');
                                        navigation.navigate(tool.screen as any);
                                    }}
                                    className={`flex-row items-center p-4 ${i < searchResults.length - 1 ? 'border-b border-slate-800' : ''}`}
                                >
                                    <View style={{ backgroundColor: `${tool.accent}20` }} className="p-2 rounded-lg mr-3">
                                        <Ionicons name={tool.icon as any} size={16} color={tool.accent} />
                                    </View>
                                    <View>
                                        <Text className="text-white font-bold text-sm">{tool.title}</Text>
                                        <Text className="text-slate-500 text-[10px]">{tool.description}</Text>
                                    </View>
                                </TouchableOpacity>
                            )) : (
                                <View className="p-4 items-center">
                                    <Text className="text-slate-500 text-xs">No tools matching "{search}"</Text>
                                </View>
                            )}
                        </Animated.View>
                    )}
                </Animated.View>

                {/* Categories Grid */}
                <Text className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4 ml-1">Learning Hubs</Text>
                <View style={{ gap: 16 }}>
                    {categories.map((category, index) => (
                        <Animated.View
                            key={index}
                            entering={FadeInDown.delay(index * 100 + 500).duration(500)}
                            layout={Layout}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate(category.screen as any)}
                                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex-row items-center shadow-lg active:scale-[0.98]"
                                activeOpacity={0.8}
                            >
                                <View className={`${category.bgColor} p-3.5 rounded-xl mr-4 border ${category.borderColor}`}>
                                    <Ionicons name={category.icon as any} size={28} color={category.iconColor} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-lg font-bold text-white tracking-tight">{category.title}</Text>
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-wider">
                                        {category.count} Concepts
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#334155" />
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Footer Tip */}
                <Animated.View
                    entering={FadeIn.delay(1200)}
                    className="mt-12 p-6 rounded-3xl bg-indigo-600/5 border border-indigo-500/10 items-center"
                >
                    <Ionicons name="bulb-outline" size={24} color="#818cf8" />
                    <Text className="text-slate-400 text-xs text-center mt-3 leading-5">
                        Tip: Use the <Text className="text-indigo-400 font-bold">Search bar</Text> or visit the <Text className="text-indigo-400 font-bold">Glossary</Text> to quickly find specific formulas and definitions.
                    </Text>
                </Animated.View>

                {/* Support & Feedback Section */}
                <Animated.View
                    entering={FadeIn.delay(1000)}
                    className="mt-8 flex-row justify-between"
                >
                    <TouchableOpacity
                        onPress={() => {
                            const pkg = "com.vinodsigadana030.numbertheory";
                            const url = `market://details?id=${pkg}`;
                            const webUrl = `https://play.google.com/store/apps/details?id=${pkg}`;
                            import('react-native').then(({ Linking }) => {
                                Linking.canOpenURL(url).then(supported => {
                                    Linking.openURL(supported ? url : webUrl);
                                });
                            });
                        }}
                        className="flex-1 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex-row items-center justify-center mr-2"
                    >
                        <Ionicons name="star-outline" size={18} color="#fbbf24" />
                        <Text className="text-white font-bold ml-2 text-xs">Rate Us</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            import('react-native').then(({ Linking }) => {
                                Linking.openURL('mailto:scricscore3@gmail.com?subject=Number Theory App Feedback');
                            });
                        }}
                        className="flex-1 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex-row items-center justify-center ml-2"
                    >
                        <Ionicons name="mail-outline" size={18} color="#818cf8" />
                        <Text className="text-white font-bold ml-2 text-xs">Contact Us</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Privacy Policy Link */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                    className="mt-10 mb-4 items-center"
                >
                    <Text className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                        Privacy Policy
                    </Text>
                </TouchableOpacity>

                <View style={{ height: 60 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
