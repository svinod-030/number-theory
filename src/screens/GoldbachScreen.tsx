import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGoldbachPartitions } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function GoldbachScreen() {
    const { t } = useTranslation();
    const [num, setNum] = useState('28');
    const n = parseInt(num) || 0;

    const isEven = n > 2 && n % 2 === 0;
    const partitions = getGoldbachPartitions(n);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.goldbach.title')} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title={t('visualizers.sieve.in_simple_terms')}
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.goldbach.big_idea')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.goldbach.big_idea_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-emerald-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.goldbach.description')}
                >
                    <ThemedInput
                        label={t('visualizers.goldbach.input_label')}
                        value={num}
                        onChangeText={setNum}
                        keyboardType="numeric"
                        error={!isEven && num !== ''}
                        helperText={!isEven && num !== '' ? t('visualizers.goldbach.error_invalid') : t('visualizers.goldbach.helper_text')}
                    />

                    {isEven && (
                        <Animated.View
                            key={n}
                            entering={FadeIn}
                            layout={Layout}
                            className="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20 items-center"
                        >
                            <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">{t('visualizers.goldbach.partitions_found')}</Text>
                            <Text className="text-white text-5xl font-black mb-1">{partitions.length}</Text>
                            <Text className="text-indigo-400 text-xs font-bold uppercase">{t('visualizers.goldbach.goldbach_pairs')}</Text>
                        </Animated.View>
                    )}
                </MathCard>

                {isEven && partitions.length > 0 && (
                    <MathCard
                        index={2}
                        title={t('visualizers.goldbach.visualizing_pairs')}
                        description={t('visualizers.goldbach.expressed_in_ways', { n: n })}
                    >
                        <View className="space-y-4">
                            {partitions.map(([p1, p2], i) => (
                                <Animated.View
                                    key={`${p1}-${p2}`}
                                    entering={FadeIn.delay(i * 100)}
                                    className="flex-row items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800"
                                >
                                    <View className="flex-row items-center flex-1 justify-center">
                                        <PrimeBox val={p1} color="sky" label={t('visualizers.goldbach.prime_label')} />
                                        <Text className="mx-4 text-slate-500 font-bold">+</Text>
                                        <PrimeBox val={p2} color="indigo" label={t('visualizers.goldbach.prime_label')} />
                                    </View>
                                    <View className="w-12 items-center">
                                        <Text className="text-slate-600 font-mono text-xs">=</Text>
                                        <Text className="text-white font-black">{n}</Text>
                                    </View>
                                </Animated.View>
                            ))}
                        </View>
                    </MathCard>
                )}

                <MathCard
                    index={3}
                    title={t('visualizers.goldbach.history_status')}
                >
                    <View className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="medal-outline" size={20} color="#fbbf24" />
                            <Text className="text-amber-400 font-bold ml-2">{t('visualizers.goldbach.unsolved_mystery')}</Text>
                        </View>
                        <Text className="text-slate-300 text-xs leading-5">
                            {t('visualizers.goldbach.mystery_desc')}
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function PrimeBox({ val, color, label }: { val: number, color: 'sky' | 'indigo', label: string }) {
    const bgColor = color === 'sky' ? 'bg-sky-500/20' : 'bg-indigo-500/20';
    const textColor = color === 'sky' ? 'text-sky-400' : 'text-indigo-400';
    const borderColor = color === 'sky' ? 'border-sky-500/30' : 'border-indigo-500/30';

    return (
        <View className={`${bgColor} ${borderColor} border px-4 py-2 rounded-xl min-w-[60px] items-center`}>
            <Text className={`${textColor} font-black text-lg`}>{val}</Text>
            <Text className={`${textColor} text-[8px] uppercase font-bold`}>{label}</Text>
        </View>
    );
}
