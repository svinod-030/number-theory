import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, Layout } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

interface GlossaryItem {
    key: string;
    category: 'primes' | 'modular' | 'divisibility' | 'cryptography' | 'patterns';
    formula?: string;
}

const GLOSSARY_DATA: GlossaryItem[] = [
    { key: "prime_number", category: "primes", formula: "p > 1, d|p \\Rightarrow d \\in \\{1, p\\}" },
    { key: "composite_number", category: "primes" },
    { key: "gcd", category: "divisibility", formula: "\\text{gcd}(a, b)" },
    { key: "lcm", category: "divisibility", formula: "\\text{lcm}(a, b) = \\frac{|a \\times b|}{\\text{gcd}(a, b)}" },
    { key: "modulus", category: "modular", formula: "a \\% n = r" },
    { key: "modular_arithmetic", category: "modular", formula: "a \\equiv b \\pmod{n}" },
    { key: "relative_prime", category: "divisibility", formula: "\\text{gcd}(a, b) = 1" },
    { key: "euler_totient", category: "modular" },
    { key: "fibonacci_sequence", category: "patterns", formula: "F_n = F_{n-1} + F_{n-2}" },
    { key: "perfect_number", category: "patterns", formula: "\\sigma(n) = 2n" },
    { key: "rsa_cryptography", category: "cryptography" },
    { key: "congruence", category: "modular", formula: "n \\mid (a - b)" },
    { key: "primitive_root", category: "modular" },
    { key: "sieve_of_eratosthenes", category: "primes" },
    { key: "goldbach_conjecture", category: "patterns" },
    { key: "diophantine_equation", category: "divisibility" },
    { key: "pythagorean_triple", category: "patterns", formula: "a^2 + b^2 = c^2" },
    { key: "constructible_polygon", category: "patterns" },
];

export default function GlossaryScreen() {
    const { t, i18n } = useTranslation();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = ['all', 'primes', 'modular', 'divisibility', 'cryptography', 'patterns'];

    const filteredData = useMemo(() => {
        return GLOSSARY_DATA.filter(item => {
            const term = t(`glossary.items.${item.key}.term`);
            const definition = t(`glossary.items.${item.key}.definition`);

            const matchesSearch = term.toLowerCase().includes(search.toLowerCase()) ||
                definition.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = !selectedCategory || selectedCategory === 'all' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        }).sort((a, b) => {
            const termA = t(`glossary.items.${a.key}.term`);
            const termB = t(`glossary.items.${b.key}.term`);
            return termA.localeCompare(termB);
        });
    }, [search, selectedCategory, i18n.language]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('glossary.header_title')} />

            <View className="px-6 py-4">
                <ThemedInput
                    label={t('glossary.search_label')}
                    value={search}
                    onChangeText={setSearch}
                    placeholder={t('glossary.search_placeholder')}
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
                                {t(`glossary.categories.${cat}`)}
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
                        key={item.key}
                        entering={FadeInDown.delay(index * 50)}
                        layout={Layout}
                        className="bg-slate-900 p-5 rounded-3xl border border-slate-800 mb-4 shadow-sm"
                    >
                        <View className="flex-row justify-between items-start mb-2">
                            <Text className="text-white text-lg font-bold flex-1">{t(`glossary.items.${item.key}.term`)}</Text>
                            <View className="bg-slate-800 px-2 py-1 rounded-lg">
                                <Text className="text-slate-500 text-[8px] font-black uppercase">{t(`glossary.categories.${item.category}`)}</Text>
                            </View>
                        </View>
                        <Text className="text-slate-400 text-sm leading-5 mb-3">
                            {t(`glossary.items.${item.key}.definition`)}
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
                        <Text className="text-slate-500 font-bold mt-4">{t('glossary.no_results')}</Text>
                    </View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
