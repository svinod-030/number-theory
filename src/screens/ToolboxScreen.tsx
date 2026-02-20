import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGCDWithSteps, isPrime, getPrimeFactors } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

export default function ToolboxScreen() {
    const { t } = useTranslation();
    const [numA, setNumA] = useState('48');
    const [numB, setNumB] = useState('18');
    const [gcdResult, setGcdResult] = useState<{ gcd: number; steps: string[]; errorKey?: string } | null>(null);

    const [checkNum, setCheckNum] = useState('17');
    const [primeInfo, setPrimeInfo] = useState<{ isPrime: boolean; factors: number[] } | null>(null);

    const handleCalculateGCD = () => {
        const result = getGCDWithSteps(parseInt(numA), parseInt(numB));
        setGcdResult(result);
    };

    const handleCheckPrime = () => {
        const n = parseInt(checkNum);
        setPrimeInfo({
            isPrime: isPrime(n),
            factors: getPrimeFactors(n)
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.toolbox.header_title')} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 24 }}
                showsVerticalScrollIndicator={false}
            >
                {/* GCD Section */}
                <MathCard
                    index={0}
                    title={t('tools.toolbox.gcd_title')}
                    description={t('tools.toolbox.gcd_desc')}
                >
                    <View className="flex-row space-x-4 mb-6">
                        <View className="flex-1">
                            <ThemedInput
                                label={t('tools.toolbox.label_a')}
                                value={numA}
                                onChangeText={setNumA}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label={t('tools.toolbox.label_b')}
                                value={numB}
                                onChangeText={setNumB}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handleCalculateGCD}
                        className="bg-sky-600 p-4 rounded-2xl items-center shadow-lg active:bg-sky-700"
                    >
                        <Text className="text-white font-bold text-lg">{t('tools.toolbox.calculate_gcd')}</Text>
                    </TouchableOpacity>

                    {gcdResult && (
                        <Animated.View entering={FadeIn} className="mt-6 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
                            {gcdResult.errorKey ? (
                                <Text className="text-rose-400 font-bold">{t(gcdResult.errorKey)}</Text>
                            ) : (
                                <>
                                    <View className="flex-row justify-between items-center mb-4">
                                        <Text className="text-slate-500 text-xs font-bold uppercase">{t('tools.toolbox.result_gcd')}</Text>
                                        <Text className="text-sky-400 font-mono text-3xl font-black">{gcdResult.gcd}</Text>
                                    </View>
                                    <Text className="text-slate-600 text-[10px] font-bold uppercase mb-2">{t('tools.toolbox.division_steps')}</Text>
                                    {gcdResult.steps.map((step, i) => (
                                        <Text key={i} className="text-slate-400 font-mono text-xs mb-1">
                                            {step}
                                        </Text>
                                    ))}
                                </>
                            )}
                        </Animated.View>
                    )}
                </MathCard>

                {/* Primality Section */}
                <MathCard
                    index={1}
                    title={t('tools.toolbox.primality_title')}
                    description={t('tools.toolbox.primality_desc')}
                >
                    <ThemedInput
                        label={t('tools.toolbox.label_check')}
                        value={checkNum}
                        onChangeText={setCheckNum}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity
                        onPress={handleCheckPrime}
                        className="bg-emerald-600 p-4 rounded-2xl items-center shadow-lg mt-6 active:bg-emerald-700"
                    >
                        <Text className="text-white font-bold text-lg">{t('tools.toolbox.check_primality')}</Text>
                    </TouchableOpacity>

                    {primeInfo && (
                        <Animated.View entering={FadeIn} className="mt-6 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
                            <View className="flex-row items-center justify-between mb-4">
                                <View>
                                    <Text className="text-slate-500 text-xs font-bold uppercase mb-1">{t('tools.toolbox.classification')}</Text>
                                    <Text className={`font-bold text-xl ${primeInfo.isPrime ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {primeInfo.isPrime ? t('tools.toolbox.prime_number') : t('tools.toolbox.composite')}
                                    </Text>
                                </View>
                                <Ionicons
                                    name={primeInfo.isPrime ? "shield-checkmark" : "apps"}
                                    size={32}
                                    color={primeInfo.isPrime ? "#34d399" : "#f43f5e"}
                                />
                            </View>
                            {!primeInfo.isPrime && primeInfo.factors.length > 0 && (
                                <View className="pt-4 mt-4 border-t border-slate-900">
                                    <Text className="text-slate-600 text-[10px] font-bold uppercase mb-2">{t('tools.toolbox.prime_factors')}</Text>
                                    <Text className="text-white font-mono text-lg font-bold">
                                        {primeInfo.factors.join(' × ')}
                                    </Text>
                                </View>
                            )}
                        </Animated.View>
                    )}
                </MathCard>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
