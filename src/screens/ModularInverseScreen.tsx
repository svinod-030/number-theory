import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { extendedGCDWithSteps, getModularInverse } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function ModularInverseScreen() {
    const { t } = useTranslation();
    const [numA, setNumA] = useState('3');
    const [numM, setNumM] = useState('11');

    const a = parseInt(numA) || 0;
    const m = parseInt(numM) || 0;

    const inverse = getModularInverse(a, m);
    const { gcd, steps } = extendedGCDWithSteps(a, m);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.modular_inverse.title')} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title={t('visualizers.sieve.in_simple_terms')}
                >
                    <View className="bg-sky-500/5 p-5 rounded-2xl border border-sky-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">{t('visualizers.modular_inverse.analogy_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.modular_inverse.undo_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-sky-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.modular_inverse.description')}
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.modular_inverse.number_label')}
                                value={numA}
                                onChangeText={setNumA}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.modular_inverse.modulus_label')}
                                value={numM}
                                onChangeText={setNumM}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <Animated.View key={`${a}-${m}`} entering={ZoomIn} className="bg-sky-500/10 border border-sky-500/20 p-8 rounded-2xl items-center my-4">
                        <Text className="text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-2">{t('visualizers.modular_inverse.inverse_label')}</Text>
                        {inverse !== null ? (
                            <View className="items-center">
                                <Text className="text-5xl font-black text-sky-400">x = {inverse}</Text>
                                <Text className="text-slate-500 text-[10px] mt-2 text-center uppercase font-bold">
                                    ({a} × {inverse}) mod {m} = 1
                                </Text>
                            </View>
                        ) : (
                            <View className="items-center">
                                <Text className="text-2xl font-black text-rose-400 text-center">{t('visualizers.modular_inverse.no_inverse')}</Text>
                                <Text className="text-slate-500 text-[10px] mt-2 text-center uppercase font-bold">
                                    {t('visualizers.modular_inverse.gcd_req', { a, m, gcd })}
                                </Text>
                            </View>
                        )}
                    </Animated.View>
                </MathCard>

                <MathCard
                    index={2}
                    title={t('visualizers.modular_inverse.extended_euclidean')}
                    description={t('visualizers.modular_inverse.method_desc')}
                >
                    <View className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                        <View className="flex-row bg-slate-800/50 p-3">
                            <Text className="flex-1 text-slate-500 text-[8px] font-bold uppercase">{t('visualizers.modular_inverse.step_col')}</Text>
                            <Text className="flex-[3] text-slate-500 text-[8px] font-bold uppercase text-center">{t('visualizers.modular_inverse.equation_col')}</Text>
                            <Text className="flex-1 text-slate-500 text-[8px] font-bold uppercase text-right">{t('visualizers.modular_inverse.x_coeff_col')}</Text>
                        </View>
                        {steps.map((step, i) => (
                            <View key={i} className={`flex-row p-4 border-t border-slate-800/30 ${i === steps.length - 1 ? 'bg-sky-500/5' : ''}`}>
                                <Text className="flex-1 text-slate-500 font-mono text-[10px]">{i + 1}</Text>
                                <View className="flex-[3]">
                                    <Text className="text-white font-mono text-[10px] text-center">{step.a} = {step.b}×{step.q} + {step.r}</Text>
                                </View>
                                <Text className="flex-1 text-sky-400 font-mono text-[10px] text-right">{step.x}</Text>
                            </View>
                        ))}
                    </View>
                </MathCard>


                <View style={{ height: 40 }} />
            </ScrollView >
        </SafeAreaView >
    );
}
