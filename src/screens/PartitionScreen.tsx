import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPartitionCount, generatePartitions } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function PartitionScreen() {
    const { t } = useTranslation();
    const [num, setNum] = useState('7');
    const n = Math.min(parseInt(num) || 0, 50); // Limit count
    const visualN = Math.min(n, 12); // Limit visualization

    const count = getPartitionCount(n);
    const partitions = generatePartitions(visualN);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('visualizers.partition.title')} />

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
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.partition.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.partition.simple_terms_desc"
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
                    description={t('visualizers.partition.description')}
                >
                    <ThemedInput
                        label={t('visualizers.partition.input_label')}
                        value={num}
                        onChangeText={setNum}
                        keyboardType="numeric"
                        helperText={t('visualizers.partition.helper_text')}
                    />

                    <View className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 items-center">
                        <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">{t('visualizers.partition.count_label', { n })}</Text>
                        <Text className="text-emerald-400 text-5xl font-black">{count.toLocaleString()}</Text>
                    </View>
                </MathCard>

                {n > 0 && (
                    <MathCard
                        index={2}
                        title={t('visualizers.partition.visual_title', { n: visualN })}
                        description={t('visualizers.partition.visual_desc', { count: partitions.length, n: visualN })}
                    >
                        <View className="flex-row flex-wrap justify-between">
                            {partitions.map((p, i) => (
                                <Animated.View
                                    key={i}
                                    entering={FadeIn.delay(Math.min(i * 50, 2000))}
                                    className="bg-slate-900 p-3 rounded-xl border border-slate-800 mb-2 w-[48%] items-center"
                                >
                                    <Text className="text-slate-200 text-xs font-mono font-bold">{p.join(' + ')}</Text>
                                </Animated.View>
                            ))}
                        </View>
                        {n > visualN && (
                            <Text className="text-slate-500 text-[10px] mt-4 text-center italic">
                                {t('visualizers.partition.limit_text')}
                            </Text>
                        )}
                    </MathCard>
                )}

                <MathCard
                    index={3}
                    title={t('visualizers.partition.ramanujan_title')}
                >
                    <View className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="infinite-outline" size={20} color="#10b981" />
                            <Text className="text-emerald-400 font-bold ml-2">{t('visualizers.partition.growth_title')}</Text>
                        </View>
                        <Text className="text-slate-300 text-xs leading-5">
                            {t('visualizers.partition.growth_desc')}
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
