import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isPerfect } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function PerfectNumbersScreen() {
    const { t } = useTranslation();
    const [num, setNum] = useState('28');
    const n = parseInt(num) || 0;
    const { perfect, sum, divisors } = isPerfect(n);

    const classification = sum === n ? 'perfect' : sum > n ? 'abundant' : 'deficient';
    const displayClass = t(`visualizers.perfect_numbers.classify_${classification}`);
    const color = classification === 'perfect' ? 'text-emerald-400' : classification === 'abundant' ? 'text-amber-400' : 'text-slate-400';
    const bgColor = classification === 'perfect' ? 'bg-emerald-500/10' : classification === 'abundant' ? 'bg-amber-500/10' : 'bg-slate-500/10';
    const borderColor = classification === 'perfect' ? 'border-emerald-500/20' : classification === 'abundant' ? 'border-amber-500/20' : 'border-slate-500/20';

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('visualizers.perfect_numbers.title')} />

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
                            <Ionicons name="bulb-outline" size={18} color="#10b981" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.perfect_numbers.the_perfect_balance')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.perfect_numbers.analogy_desc"
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
                    description={t('visualizers.perfect_numbers.description')}
                >
                    <ThemedInput
                        label={t('visualizers.perfect_numbers.search_limit')}
                        value={num}
                        onChangeText={setNum}
                        keyboardType="numeric"
                        className={`text-center text-3xl font-black ${color}`}
                    />

                    <Animated.View key={n} entering={FadeIn} className={`${bgColor} ${borderColor} border p-8 rounded-2xl items-center`}>
                        <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">{t('visualizers.perfect_numbers.perfection_found')}</Text>
                        <Text className={`text-4xl font-black ${color} mb-4`}>{displayClass}</Text>

                        <View className="bg-slate-950/40 p-4 rounded-xl w-full">
                            <Text className="text-slate-500 text-[8px] font-bold uppercase mb-2 text-center">{t('visualizers.perfect_numbers.divisors_sum')}</Text>
                            <Text className="text-white text-center text-xs font-mono leading-5">
                                {divisors.length > 0 ? divisors.join(' + ') : '0'} = <Text className={`${color} font-bold`}>{sum}</Text>
                            </Text>
                        </View>
                    </Animated.View>
                </MathCard>

                <MathCard
                    index={2}
                    title={t('visualizers.ulam.mathematical_insight')}
                >
                    <View className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-6">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="bulb-outline" size={20} color="#fbbf24" />
                            <Text className="text-amber-400 font-bold ml-2">{t('visualizers.perfect_numbers.euclids_formula')}</Text>
                        </View>
                        <Text className="text-slate-300 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.perfect_numbers.formula_desc"
                                components={{
                                    1: <Text className="text-indigo-400 font-mono" />
                                }}
                            />
                        </Text>
                    </View>

                    <View className="space-y-4">
                        <InfoRow title={t('visualizers.divisors.abundant_title')} desc={t('visualizers.divisors.abundant_desc')} color="#fbbf24" />
                        <InfoRow title={t('visualizers.divisors.deficient_title')} desc={t('visualizers.divisors.deficient_desc')} color="#94a3b8" />
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}


function InfoRow({ title, desc, color }: { title: string, desc: string, color: string }) {
    return (
        <View className="flex-row items-start">
            <View style={{ backgroundColor: `${color}20` }} className="p-1 rounded-full mr-3 mt-1" />
            <Text className="text-slate-400 text-xs flex-1">
                <Text style={{ color }} className="font-bold">{title}:</Text> {desc}
            </Text>
        </View>
    );
}
