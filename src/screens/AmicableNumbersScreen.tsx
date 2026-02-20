import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { findAmicablePairs } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function AmicableNumbersScreen() {
    const { t } = useTranslation();
    const [limit, setLimit] = useState('1000');
    const n = Math.min(parseInt(limit) || 0, 10000); // UI limit

    const pairs = findAmicablePairs(n);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('visualizers.amicable.title')} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title={t('visualizers.sieve.in_simple_terms')}
                >
                    <View className="bg-rose-500/5 p-5 rounded-2xl border border-rose-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="heart-outline" size={18} color="#f43f5e" />
                            <Text className="text-rose-400 font-bold ml-2 text-xs uppercase">{t('visualizers.amicable.best_friend_numbers')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.amicable.analogy_desc"
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
                    description={t('visualizers.amicable.description')}
                >
                    <ThemedInput
                        label={t('visualizers.amicable.search_limit')}
                        value={limit}
                        onChangeText={setLimit}
                        keyboardType="numeric"
                        helperText={t('visualizers.amicable.helper_text')}
                    />

                    <View className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 items-center">
                        <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">{t('visualizers.amicable.pairs_found')}</Text>
                        <Text className="text-white text-5xl font-black">{pairs.length}</Text>
                    </View>
                </MathCard>

                {pairs.length > 0 && (
                    <MathCard
                        index={2}
                        title={t('visualizers.amicable.friendly_pairs')}
                        description={t('visualizers.amicable.relationship_desc')}
                    >
                        <View className="space-y-4">
                            {pairs.map((pair, i) => (
                                <Animated.View
                                    key={i}
                                    entering={FadeIn.delay(i * 100)}
                                    className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800"
                                >
                                    <View className="flex-row justify-between items-center mb-4">
                                        <View className="items-center bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                                            <Text className="text-rose-400 font-black text-2xl">{pair[0]}</Text>
                                        </View>
                                        <Ionicons name="swap-horizontal" size={24} color="#f43f5e" />
                                        <View className="items-center bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                                            <Text className="text-rose-400 font-black text-2xl">{pair[1]}</Text>
                                        </View>
                                    </View>
                                    <View className="border-t border-slate-800/50 pt-4 px-2">
                                        <Text className="text-slate-500 text-[10px] text-center italic">
                                            {t('visualizers.amicable.number_a')}: {pair[0]} → {t('visualizers.divisors.sum_label')}: {pair[1]}
                                            {'\n'}
                                            {t('visualizers.amicable.number_b')}: {pair[1]} → {t('visualizers.divisors.sum_label')}: {pair[0]}
                                        </Text>
                                    </View>
                                </Animated.View>
                            ))}
                        </View>
                    </MathCard>
                )}

                <MathCard
                    index={3}
                    title={t('visualizers.amicable.historical_significance')}
                >
                    <View className="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="library-outline" size={20} color="#818cf8" />
                            <Text className="text-indigo-400 font-bold ml-2">{t('visualizers.amicable.fun_fact')}</Text>
                        </View>
                        <Text className="text-slate-300 text-xs leading-5">
                            {t('visualizers.amicable.history_desc')}
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

