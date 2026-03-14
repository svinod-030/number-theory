import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import { useTranslation, Trans } from 'react-i18next';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

function findCarmichaelNumbers(limit: number) {
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;
    const primes = [];
    for (let p = 2; p <= limit; p++) {
        if (isPrime[p]) {
            primes.push(p);
            for (let i = p * p; i <= limit; i += p) {
                isPrime[i] = false;
            }
        }
    }

    const results = [];
    for (let n = 2; n <= limit; n++) {
        if (isPrime[n]) continue;
        
        let isSquareFree = true;
        let pFactors = [];
        let temp = n;
        for (const p of primes) {
            if (p * p > temp) break;
            if (temp % p === 0) {
                pFactors.push(p);
                temp /= p;
                if (temp % p === 0) {
                    isSquareFree = false;
                    break;
                }
            }
        }
        if (temp > 1) pFactors.push(temp);

        if (!isSquareFree) continue;

        let isCarmichael = true;
        for (const p of pFactors) {
            if ((n - 1) % (p - 1) !== 0) {
                isCarmichael = false;
                break;
            }
        }

        if (isCarmichael && pFactors.length >= 3) {
            results.push({ n, factors: pFactors });
        }
    }
    return results;
}

export default function CarmichaelNumbersScreen() {
    const { t } = useTranslation();
    const [limitStr, setLimitStr] = useState('10000');
    const [results, setResults] = useState<{n: number, factors: number[]}[] | null>(null);

    const handleFind = () => {
        Keyboard.dismiss();
        let limit = parseInt(limitStr);
        if (isNaN(limit) || limit < 2) limit = 10000;
        if (limit > 100000) limit = 100000; // Cap to prevent crashing
        setLimitStr(limit.toString());
        
        const carmichaels = findCarmichaelNumbers(limit);
        setResults(carmichaels);
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.carmichael_numbers.title')} />

            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <MathCard
                    index={0}
                    title={t('visualizers.carmichael_numbers.simple_terms_title')}
                >
                    <View className="bg-rose-500/5 p-5 rounded-2xl border border-rose-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="alert-circle-outline" size={18} color="#f43f5e" />
                            <Text className="text-rose-400 font-bold ml-2 text-xs uppercase">{t('visualizers.carmichael_numbers.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.carmichael_numbers.simple_terms_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-rose-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.carmichael_numbers.description')}
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                {t('visualizers.carmichael_numbers.search_limit')}
                            </Text>
                            <TextInput
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-lg font-black"
                                keyboardType="number-pad"
                                value={limitStr}
                                onChangeText={(text) => {
                                    setLimitStr(text.replace(/[^0-9]/g, ''));
                                    setResults(null);
                                }}
                                placeholderTextColor="#475569"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleFind}
                            disabled={!limitStr}
                            className={`p-4 rounded-2xl items-center flex-row justify-center ${
                                limitStr ? 'bg-rose-500' : 'bg-slate-800'
                            }`}
                        >
                            <Ionicons name="search" size={20} color={limitStr ? 'white' : '#475569'} />
                            <Text className={`font-black ml-2 uppercase tracking-widest text-sm ${
                                limitStr ? 'text-white' : 'text-slate-500'
                            }`}>
                                {t('visualizers.carmichael_numbers.find_button')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MathCard>

                {results !== null && (
                    <Animated.View entering={FadeInUp} exiting={FadeOutDown} className="mt-4">
                        <MathCard index={2}>
                            <View className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex-row items-center justify-between mb-4">
                                <View className="flex-row items-center">
                                    <View className="w-10 h-10 rounded-full bg-sky-500/20 items-center justify-center mr-3">
                                        <Ionicons name="list" size={20} color="#38bdf8" />
                                    </View>
                                    <Text className="text-white font-bold">
                                        {t('visualizers.carmichael_numbers.found_count', { count: results.length })}
                                    </Text>
                                </View>
                            </View>

                            <View className="space-y-3">
                                {results.map((item, index) => (
                                    <View key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800/50 flex-row items-center justify-between">
                                        <Text className="text-white text-xl font-black text-rose-400 w-24">
                                            {item.n}
                                        </Text>
                                        <View className="flex-1 pr-2 border-r border-slate-800 mr-4">
                                            <Text className="text-slate-500 text-[10px] uppercase font-bold mb-1">
                                                {t('visualizers.carmichael_numbers.factors_label')}
                                            </Text>
                                            <View className="flex-row flex-wrap">
                                                {item.factors.map((f, i) => (
                                                    <View key={i} className="flex-row items-center">
                                                        <Text className="text-slate-300 font-bold">{f}</Text>
                                                        {i < item.factors.length - 1 && (
                                                            <Text className="text-slate-600 mx-1">×</Text>
                                                        )}
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                        <Ionicons name="warning-outline" size={20} color="#f43f5e" />
                                    </View>
                                ))}
                            </View>
                        </MathCard>
                    </Animated.View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
