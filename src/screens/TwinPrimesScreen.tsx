import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import { useTranslation, Trans } from 'react-i18next';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

function findTwinPrimes(limit: number) {
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;
    for (let p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i <= limit; i += p) {
                isPrime[i] = false;
            }
        }
    }

    const twinPrimes = [];
    for (let p = 2; p <= limit - 2; p++) {
        if (isPrime[p] && isPrime[p + 2]) {
            twinPrimes.push([p, p + 2]);
        }
    }
    return twinPrimes;
}

export default function TwinPrimesScreen() {
    const { t } = useTranslation();
    const [limitStr, setLimitStr] = useState('1000');
    const [results, setResults] = useState<number[][] | null>(null);

    const handleFind = () => {
        Keyboard.dismiss();
        let limit = parseInt(limitStr);
        if (isNaN(limit) || limit < 2) limit = 1000;
        if (limit > 500000) limit = 500000; // Cap to prevent UI freeze
        setLimitStr(limit.toString());
        
        const twins = findTwinPrimes(limit);
        setResults(twins);
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.twin_primes.title')} />

            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <MathCard
                    index={0}
                    title={t('visualizers.twin_primes.simple_terms_title')}
                >
                    <View className="bg-fuchsia-500/5 p-5 rounded-2xl border border-fuchsia-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="people-outline" size={18} color="#d946ef" />
                            <Text className="text-fuchsia-400 font-bold ml-2 text-xs uppercase">{t('visualizers.twin_primes.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.twin_primes.simple_terms_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-fuchsia-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.twin_primes.description')}
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                {t('visualizers.twin_primes.search_limit')}
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
                                limitStr ? 'bg-fuchsia-500' : 'bg-slate-800'
                            }`}
                        >
                            <Ionicons name="search" size={20} color={limitStr ? 'white' : '#475569'} />
                            <Text className={`font-black ml-2 uppercase tracking-widest text-sm ${
                                limitStr ? 'text-white' : 'text-slate-500'
                            }`}>
                                {t('visualizers.twin_primes.find_button')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MathCard>

                {results !== null && (
                    <Animated.View entering={FadeInUp} exiting={FadeOutDown} className="mt-4">
                        <MathCard index={2}>
                            <View className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex-row items-center justify-between mb-4">
                                <View className="flex-row items-center">
                                    <View className="w-10 h-10 rounded-full bg-fuchsia-500/20 items-center justify-center mr-3">
                                        <Ionicons name="list" size={20} color="#d946ef" />
                                    </View>
                                    <Text className="text-white font-bold">
                                        {t('visualizers.twin_primes.found_count', { count: results.length })}
                                    </Text>
                                </View>
                            </View>

                            <View className="flex-row flex-wrap justify-between">
                                {results.map((pair, index) => (
                                    <View key={index} className="w-[48%] bg-slate-950 py-3 px-2 rounded-xl border border-slate-800/50 flex-col items-center justify-center mb-3">
                                        <Text className="text-slate-500 text-xs font-bold mb-1">
                                            {t('visualizers.twin_primes.pair_format', { p1: pair[0], p2: pair[1] })}
                                        </Text>
                                        <View className="flex-row items-center justify-center space-x-2">
                                            <Text className="text-white text-lg font-black text-fuchsia-400">
                                                {pair[0]}
                                            </Text>
                                            <Text className="text-slate-600 font-bold mx-1">-</Text>
                                            <Text className="text-white text-lg font-black text-fuchsia-400">
                                                {pair[1]}
                                            </Text>
                                        </View>
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
