import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isPrime, legendreSymbol, jacobiSymbol } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function QuadraticReciprocityScreen() {
    const { t } = useTranslation();
    const [numA, setNumA] = useState('3');
    const [numP, setNumP] = useState('13');

    const a = parseInt(numA) || 0;
    const p = parseInt(numP) || 0;

    const pIsPrime = isPrime(p);
    const symbol = pIsPrime ? legendreSymbol(a, p) : jacobiSymbol(a, p);
    const aIsPrime = isPrime(a);
    const qrApplies = pIsPrime && aIsPrime && p % 2 !== 0 && a % 2 !== 0 && a !== p;

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.quadratic_reciprocity.title')} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title={t('visualizers.sieve.in_simple_terms')}
                >
                    <View className="bg-indigo-500/5 p-5 rounded-2xl border border-indigo-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#818cf8" />
                            <Text className="text-indigo-400 font-bold ml-2 text-xs uppercase">{t('visualizers.quadratic_reciprocity.analogy_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.quadratic_reciprocity.analogy_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-indigo-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.quadratic_reciprocity.description')}
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.quadratic_reciprocity.int_label')}
                                value={numA}
                                onChangeText={setNumA}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.quadratic_reciprocity.mod_label')}
                                value={numP}
                                onChangeText={setNumP}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <Animated.View
                        key={`${a}-${p}`}
                        entering={FadeIn}
                        className="p-8 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 items-center justify-center"
                    >
                        <Text className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            {pIsPrime ? t('visualizers.quadratic_reciprocity.legendre_title') : t('visualizers.quadratic_reciprocity.jacobi_title')}
                        </Text>
                        <View className="flex-row items-center mb-2">
                            <Text className="text-3xl font-mono text-slate-500">(</Text>
                            <View className="items-center mx-2">
                                <Text className="text-white text-xl font-bold">{a}</Text>
                                <View className="h-[1px] bg-slate-700 w-full my-1" />
                                <Text className="text-white text-xl font-bold">{p}</Text>
                            </View>
                            <Text className="text-3xl font-mono text-slate-500">)</Text>
                            <Text className="text-2xl font-bold text-slate-500 mx-4">=</Text>
                            <Text className={`text-6xl font-black ${symbol === 1 ? 'text-emerald-400' : symbol === -1 ? 'text-rose-400' : 'text-slate-500'}`}>
                                {symbol}
                            </Text>
                        </View>
                        <Text className={`text-[10px] font-bold uppercase mt-2 ${symbol === 1 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {symbol === 1 ? t('visualizers.quadratic_reciprocity.residue_label') : symbol === -1 ? t('visualizers.quadratic_reciprocity.non_residue_label') : t('visualizers.quadratic_reciprocity.not_coprime_label')}
                        </Text>
                    </Animated.View>
                </MathCard>

                {qrApplies && (
                    <Animated.View entering={SlideInDown} className="px-1">
                        <MathCard
                            index={2}
                            title={t('visualizers.quadratic_reciprocity.reciprocity_title')}
                            description={t('visualizers.quadratic_reciprocity.reciprocity_desc', { a, p })}
                        >
                            <View className="bg-slate-900 p-6 rounded-2xl border border-slate-800 items-center">
                                <Text className="text-white font-mono text-lg font-bold mb-4">
                                    (q/p) × (p/q) = (-1)<Text className="text-[10px]"> (p-1)(q-1)/4</Text>
                                </Text>
                                <View className="h-[1px] bg-slate-800 w-full mb-4" />
                                <Text className="text-slate-400 text-xs leading-5 text-center px-4 italic">
                                    {a % 4 === 1 || p % 4 === 1
                                        ? t('visualizers.quadratic_reciprocity.if_mod4_1', { a, p })
                                        : t('visualizers.quadratic_reciprocity.if_mod4_3', { a, p })
                                    }
                                </Text>
                            </View>
                        </MathCard>
                    </Animated.View>
                )}

                <MathCard
                    index={3}
                    title={t('visualizers.quadratic_reciprocity.meaning_title')}
                >
                    <View className="bg-indigo-500/5 p-5 rounded-2xl border border-indigo-500/10">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#818cf8" />
                            <Text className="text-indigo-400 font-bold ml-2 text-xs uppercase font-bold">{t('visualizers.quadratic_reciprocity.meaning_title')}</Text>
                        </View>
                        <Text className="text-slate-300 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.quadratic_reciprocity.meaning_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-indigo-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
