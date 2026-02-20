import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toyHash } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function HashingScreen() {
    const { t } = useTranslation();
    const [input, setInput] = useState('NumberTheory');
    const hash = toyHash(input);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('visualizers.hashing.title')} />

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
                            <Ionicons name="bulb-outline" size={18} color="#f43f5e" />
                            <Text className="text-rose-400 font-bold ml-2 text-xs uppercase">{t('visualizers.hashing.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.hashing.simple_terms_desc"
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
                    description={t('visualizers.hashing.description')}
                >
                    <ThemedInput
                        label={t('visualizers.hashing.input_label')}
                        value={input}
                        onChangeText={setInput}
                        placeholder={t('visualizers.hashing.placeholder')}
                    />

                    <View className="items-center my-4">
                        <View className="bg-slate-800 p-2 rounded-full">
                            <Ionicons name="chevron-down" size={20} color="#94a3b8" />
                        </View>
                    </View>

                    <Animated.View
                        key={hash}
                        entering={FadeIn}
                        layout={Layout}
                        className="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 items-center shadow-inner"
                    >
                        <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">{t('visualizers.hashing.result_label')}</Text>
                        <Text className="text-rose-400 text-2xl font-mono font-black tracking-tight">{hash}</Text>
                    </Animated.View>
                </MathCard>

                <MathCard
                    index={2}
                    title={t('visualizers.hashing.properties_title')}
                >
                    <View className="space-y-4">
                        <PropertyItem title={t('visualizers.hashing.deterministic_title')} desc={t('visualizers.hashing.deterministic_desc')} color="#f43f5e" />
                        <PropertyItem title={t('visualizers.hashing.fast_title')} desc={t('visualizers.hashing.fast_desc')} color="#f43f5e" />
                        <PropertyItem title={t('visualizers.hashing.irreversible_title')} desc={t('visualizers.hashing.irreversible_desc')} color="#f43f5e" />
                        <PropertyItem title={t('visualizers.hashing.avalanche_title')} desc={t('visualizers.hashing.avalanche_desc')} color="#f43f5e" />
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function PropertyItem({ title, desc, color }: { title: string, desc: string, color: string }) {
    return (
        <View className="flex-row items-start">
            <View style={{ backgroundColor: `${color}20` }} className="p-1 rounded-full mr-3 mt-1" />
            <View className="flex-1">
                <Text className="text-slate-300 text-sm">
                    <Text className="text-white font-bold">{title}:</Text> {desc}
                </Text>
            </View>
        </View>
    );
}
