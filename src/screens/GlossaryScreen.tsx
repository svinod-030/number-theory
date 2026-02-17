import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, Layout } from 'react-native-reanimated';

interface GlossaryItem {
    term: string;
    definition: string;
    category: 'Primes' | 'Modular' | 'Divisibility' | 'Cryptography' | 'Patterns';
    formula?: string;
}

const GLOSSARY_DATA: GlossaryItem[] = [
    {
        term: "Prime Number",
        definition: "A natural number greater than 1 that has no positive divisors other than 1 and itself.",
        category: "Primes",
        formula: "p > 1, d|p \Rightarrow d \in \{1, p\}",
    },
    {
        term: "Composite Number",
        definition: "A positive integer greater than 1 that has at least one divisor other than 1 and itself.",
        category: "Primes",
    },
    {
        term: "GCD (Greatest Common Divisor)",
        definition: "The largest positive integer that divides each of the integers.",
        category: "Divisibility",
        formula: "\text{gcd}(a, b)",
    },
    {
        term: "LCM (Least Common Multiple)",
        definition: "The smallest positive integer that is divisible by both a and b.",
        category: "Divisibility",
        formula: "\\text{lcm}(a, b) = \\frac{|a \\times b|}{\\text{gcd}(a, b)}",
    },
    {
        term: "Modulus (mod)",
        definition: "An operator that finds the remainder of a number after division by another number.",
        category: "Modular",
        formula: "a \\% n = r",
    },
    {
        term: "Modular Arithmetic",
        definition: "A system of arithmetic for integers, where numbers \"wrap around\" when reaching a certain value, called the modulus.",
        category: "Modular",
        formula: "a \equiv b \pmod{n}",
    },
    {
        term: "Relative Prime (Coprime)",
        definition: "Two integers are coprime if the only positive integer that is a divisor of both of them is 1.",
        category: "Divisibility",
        formula: "\text{gcd}(a, b) = 1",
    },
    {
        term: "Euler's Totient Φ(n)",
        definition: "Counts the positive integers up to n that are relatively prime to n.",
        category: "Modular",
    },
    {
        term: "Fibonacci Sequence",
        definition: "A sequence where each number is the sum of the two preceding ones, starting from 0 and 1.",
        category: "Patterns",
        formula: "F_n = F_{n-1} + F_{n-2}",
    },
    {
        term: "Perfect Number",
        definition: "A positive integer that is equal to the sum of its positive proper divisors.",
        category: "Patterns",
        formula: "\sigma(n) = 2n",
    },
    {
        term: "RSA Cryptography",
        definition: "An asymmetric cryptographic algorithm used for secure data transmission based on the difficulty of factoring primes.",
        category: "Cryptography",
    },
    {
        term: "Congruence",
        definition: "Two integers a and b are said to be congruent modulo n if their difference is divisible by n.",
        category: "Modular",
        formula: "n \mid (a - b)",
    },
    {
        term: "Primitive Root",
        definition: "A generator of the multiplicative group of integers modulo n.",
        category: "Modular",
    },
    {
        term: "Sieve of Eratosthenes",
        definition: "An ancient algorithm for finding all prime numbers up to any given limit.",
        category: "Primes",
    },
    {
        term: "Goldbach's Conjecture",
        definition: "Every even natural number greater than 2 is the sum of two primes.",
        category: "Patterns",
    },
    {
        term: "Diophantine Equation",
        definition: "A polynomial equation, usually with two or more unknowns, such that only the integer solutions are sought.",
        category: "Divisibility",
    },
    {
        term: "Pythagorean Triple",
        definition: "A set of three positive integers a, b, and c, such that a² + b² = c².",
        category: "Patterns",
        formula: "a^2 + b^2 = c^2",
    },
    {
        term: "Constructible Polygon",
        definition: "A regular n-gon that can be constructed using only a ruler and compass. This requires n to be a power of 2 times distinct Fermat primes.",
        category: "Patterns",
    },
];

export default function GlossaryScreen() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = ['All', 'Primes', 'Modular', 'Divisibility', 'Cryptography', 'Patterns'];

    const filteredData = useMemo(() => {
        return GLOSSARY_DATA.filter(item => {
            const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) ||
                item.definition.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = !selectedCategory || selectedCategory === 'All' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        }).sort((a, b) => a.term.localeCompare(b.term));
    }, [search, selectedCategory]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Math Encyclopedia" />

            <View className="px-6 py-4">
                <ThemedInput
                    label="Search Definitions"
                    value={search}
                    onChangeText={setSearch}
                    placeholder="e.g. Prime, RSA, GCD..."
                    icon="search-outline"
                />
            </View>

            <View className="mb-4">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24 }}
                >
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl mr-2 border ${selectedCategory === cat ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-900 border-slate-800'}`}
                        >
                            <Text className={`text-xs font-bold ${selectedCategory === cat ? 'text-white' : 'text-slate-400'}`}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
                showsVerticalScrollIndicator={false}
            >
                {filteredData.map((item, index) => (
                    <Animated.View
                        key={item.term}
                        entering={FadeInDown.delay(index * 50)}
                        layout={Layout}
                        className="bg-slate-900 p-5 rounded-3xl border border-slate-800 mb-4 shadow-sm"
                    >
                        <View className="flex-row justify-between items-start mb-2">
                            <Text className="text-white text-lg font-bold flex-1">{item.term}</Text>
                            <View className="bg-slate-800 px-2 py-1 rounded-lg">
                                <Text className="text-slate-500 text-[8px] font-black uppercase">{item.category}</Text>
                            </View>
                        </View>
                        <Text className="text-slate-400 text-sm leading-5 mb-3">
                            {item.definition}
                        </Text>
                        {item.formula && (
                            <View className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                                <Text className="text-indigo-300 font-mono text-xs">{item.formula}</Text>
                            </View>
                        )}
                    </Animated.View>
                ))}

                {filteredData.length === 0 && (
                    <View className="items-center justify-center py-20">
                        <Ionicons name="search-outline" size={48} color="#334155" />
                        <Text className="text-slate-500 font-bold mt-4">No definitions found</Text>
                    </View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
