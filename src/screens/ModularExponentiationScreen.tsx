import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { powerMod, isPrime } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { ZoomIn, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function ModularExponentiationScreen() {
    const { t } = useTranslation();
    const [base, setBase] = useState('2');
    const [exp, setExp] = useState('10');
    const [mod, setMod] = useState('7');

    const b = parseInt(base) || 0;
    const e = parseInt(exp) || 0;
    const m = parseInt(mod) || 1;

    const result = powerMod(b, e, m);
    const isModPrime = isPrime(m);

    const canUseFermat = isModPrime && (b % m !== 0);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.modular_exponentiation.title')} />

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
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">{t('visualizers.modular_exponentiation.the_shortcut')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.modular_exponentiation.shortcut_desc"
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
                    description={t('visualizers.modular_exponentiation.description')}
                >
                    <View className="flex-row space-x-2">
                        <View className="flex-[1.5]">
                            <ThemedInput label={t('visualizers.modular_exponentiation.base_label')} value={base} onChangeText={setBase} keyboardType="numeric" />
                        </View>
                        <View className="flex-1">
                            <ThemedInput label={t('visualizers.modular_exponentiation.exp_label')} value={exp} onChangeText={setExp} keyboardType="numeric" />
                        </View>
                        <View className="flex-[1.5]">
                            <ThemedInput label={t('visualizers.modular_exponentiation.mod_label')} value={mod} onChangeText={setMod} keyboardType="numeric" />
                        </View>
                    </View>

                    <Animated.View key={`${b}-${e}-${m}`} entering={ZoomIn} className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl items-center my-4">
                        <Text className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2">{t('visualizers.modular_exponentiation.result_label')}</Text>
                        <Text className="text-6xl font-black text-emerald-400">{result}</Text>
                        <Text className="text-slate-500 text-[10px] mt-4 uppercase font-bold text-center">
                            {b}^{e} mod {m} ≡ {result}
                        </Text>
                    </Animated.View>
                </MathCard>

                {canUseFermat && (
                    <MathCard
                        index={2}
                        title={t('visualizers.modular_exponentiation.fermat_little')}
                        description={t('visualizers.modular_exponentiation.fermat_desc')}
                    >
                        <Animated.View entering={FadeIn} className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20">
                            <View className="flex-row items-center mb-4">
                                <Ionicons name="sparkles" size={16} color="#fbbf24" />
                                <Text className="text-amber-400 font-bold ml-2 text-xs uppercase">{t('visualizers.modular_exponentiation.power_reduction')}</Text>
                            </View>
                            <Text className="text-slate-300 text-xs mb-4 leading-5">
                                <Trans
                                    i18nKey="visualizers.modular_exponentiation.fermat_theorem_desc"
                                    components={{
                                        1: <Text className="text-white font-bold" />,
                                        2: <Text className="text-white font-mono" />
                                    }}
                                />
                            </Text>
                            <View className="bg-slate-950/50 p-4 rounded-xl items-center">
                                <Text className="text-white font-mono text-sm">{b}^{m - 1} ≡ 1 (mod {m})</Text>
                            </View>
                        </Animated.View>
                    </MathCard>
                )}

                <MathCard
                    index={3}
                    title={t('visualizers.modular_exponentiation.algorithm_efficiency')}
                >
                    <View className="flex-row items-center space-x-3">
                        <View className="bg-sky-500/20 p-2 rounded-lg">
                            <Ionicons name="speedometer-outline" size={20} color="#38bdf8" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white font-bold text-sm">{t('visualizers.modular_exponentiation.binary_exp')}</Text>
                            <Text className="text-slate-500 text-[10px] mt-0.5">{t('visualizers.modular_exponentiation.binary_exp_desc')}</Text>
                        </View>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

