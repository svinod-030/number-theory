import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import { useTranslation, Trans } from 'react-i18next';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

// Helper function to get prime factors
function getPrimeFactors(n: number): number[] {
    const factors: number[] = [];
    let d = 2;
    while (n > 1) {
        while (n % d === 0) {
            factors.push(d);
            n /= d;
        }
        d++;
        if (d * d > n) {
            if (n > 1) {
                factors.push(n);
            }
            break;
        }
    }
    return factors;
}

export default function MobiusFunctionScreen() {
    const { t } = useTranslation();
    const [n, setN] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [factors, setFactors] = useState<number[]>([]);
    const [hasSquareFactor, setHasSquareFactor] = useState(false);

    const calculateMobius = () => {
        Keyboard.dismiss();
        try {
            const num = parseInt(n, 10);
            if (isNaN(num) || num <= 0) return;

            if (num === 1) {
                setResult(1);
                setFactors([]);
                setHasSquareFactor(false);
                return;
            }

            const primeFactors = getPrimeFactors(num);
            setFactors(primeFactors);

            // Check for duplicate prime factors
            const uniqueFactors = new Set(primeFactors);
            if (uniqueFactors.size !== primeFactors.length) {
                setHasSquareFactor(true);
                setResult(0);
                return;
            }

            setHasSquareFactor(false);
            if (primeFactors.length % 2 === 0) {
                setResult(1);
            } else {
                setResult(-1);
            }
        } catch (e) {
            // handle error if needed
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.mobius_function.title')} />

            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <MathCard
                    index={0}
                    title={t('visualizers.mobius_function.simple_terms_title')}
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.mobius_function.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.mobius_function.simple_terms_desc"
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
                    description={t('visualizers.mobius_function.description')}
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                {t('visualizers.mobius_function.input_n')}
                            </Text>
                            <TextInput
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-lg font-black"
                                keyboardType="number-pad"
                                value={n}
                                onChangeText={(text) => {
                                    setN(text.replace(/[^0-9]/g, ''));
                                    setResult(null);
                                    setFactors([]);
                                }}
                                placeholderTextColor="#475569"
                                placeholder="..."
                                maxLength={10}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={calculateMobius}
                            disabled={!n}
                            className={`p-4 rounded-2xl items-center flex-row justify-center mt-2 ${
                                n ? 'bg-indigo-500' : 'bg-slate-800'
                            }`}
                        >
                            <Ionicons name="calculator" size={20} color={n ? 'white' : '#475569'} />
                            <Text className={`font-black ml-2 uppercase tracking-widest text-sm ${
                                n ? 'text-white' : 'text-slate-500'
                            }`}>
                                {t('visualizers.mobius_function.calculate')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MathCard>

                {result !== null && (
                    <Animated.View entering={FadeInUp} exiting={FadeOutDown} className="mt-4">
                        <MathCard index={2}>
                            <View className={`p-6 rounded-2xl border ${
                                result === 1 
                                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                                    : result === -1 
                                        ? 'bg-sky-500/10 border-sky-500/30'
                                        : 'bg-rose-500/10 border-rose-500/30'
                            }`}>
                                <View className="items-center mb-6">
                                    <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
                                        result === 1 ? 'bg-emerald-500/20' : result === -1 ? 'bg-sky-500/20' : 'bg-rose-500/20'
                                    }`}>
                                        <Text className={`text-3xl font-black ${
                                            result === 1 ? 'text-emerald-400' : result === -1 ? 'text-sky-400' : 'text-rose-400'
                                        }`}>
                                            {result}
                                        </Text>
                                    </View>
                                    <Text className="text-white text-xl font-black text-center mb-1">
                                        {result === 0 
                                            ? t('visualizers.mobius_function.result_zero', { n }) 
                                            : result === 1 
                                                ? t('visualizers.mobius_function.result_one', { n }) 
                                                : t('visualizers.mobius_function.result_neg_one', { n })
                                        }
                                    </Text>
                                </View>

                                {factors.length > 0 && (
                                    <View className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                                        <Text className="text-slate-400 text-xs font-bold uppercase mb-2 text-center">
                                            {t('visualizers.mobius_function.prime_factors')}
                                        </Text>
                                        <View className="flex-row justify-center items-center flex-wrap">
                                            <Text className="text-white text-lg font-black leading-relaxed text-center">
                                                {n} = {factors.join(' × ')}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </MathCard>
                    </Animated.View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
