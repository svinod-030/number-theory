import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import { useTranslation, Trans } from 'react-i18next';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

export default function WilsonsTheoremScreen() {
    const { t } = useTranslation();
    const [n, setN] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [factOut, setFactOut] = useState<string | null>(null);
    const [testStatus, setTestStatus] = useState<'idle' | 'prime' | 'composite' | 'error'>('idle');

    const calculateWilson = () => {
        Keyboard.dismiss();
        try {
            const num = BigInt(n);
            if (num <= 1n) {
                setTestStatus('error');
                return;
            }

            // Calculate (n-1)! mod n
            // Since (n-1)! grows extremely fast, we can calculate each multiplication mod n
            // However, to show the factorial value if n <= 20, we can compute it if small.
            let factValue = 1n;
            let modResult = 1n;
            
            for (let i = 2n; i < num; i++) {
                modResult = (modResult * i) % num;
                if (num <= 21n) {
                    factValue = factValue * i;
                }
            }

            if (num <= 21n) {
                // Formatting large numbers with exponential if too large, but up to 20! is within JS limits if stringified
                setFactOut(factValue.toString());
            } else {
                setFactOut('Too large to show');
            }

            setResult(modResult.toString());

            // Wilson's Theorem: (n-1)! ≡ -1 (mod n) 
            // In positive modulo, -1 mod n is n - 1
            if (modResult === num - 1n) {
                setTestStatus('prime');
            } else {
                setTestStatus('composite');
            }

        } catch (e) {
            setTestStatus('error');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.wilsons_theorem.title')} />

            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <MathCard
                    index={0}
                    title={t('visualizers.wilsons_theorem.simple_terms_title')}
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.wilsons_theorem.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.wilsons_theorem.simple_terms_desc"
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
                    description={t('visualizers.wilsons_theorem.description')}
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                {t('visualizers.wilsons_theorem.input_n')}
                            </Text>
                            <TextInput
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-lg font-black"
                                keyboardType="number-pad"
                                value={n}
                                onChangeText={(text) => {
                                    setN(text.replace(/[^0-9]/g, ''));
                                    setTestStatus('idle');
                                    setResult(null);
                                    setFactOut(null);
                                }}
                                placeholderTextColor="#475569"
                                placeholder="..."
                                maxLength={3}
                            />
                        </View>

                        <Text className="text-amber-400/80 text-[10px] font-bold px-2 mt-1">
                            {t('visualizers.wilsons_theorem.warning')}
                        </Text>

                        <TouchableOpacity
                            onPress={calculateWilson}
                            disabled={!n}
                            className={`p-4 rounded-2xl items-center flex-row justify-center mt-2 ${
                                n ? 'bg-indigo-500' : 'bg-slate-800'
                            }`}
                        >
                            <Ionicons name="calculator" size={20} color={n ? 'white' : '#475569'} />
                            <Text className={`font-black ml-2 uppercase tracking-widest text-sm ${
                                n ? 'text-white' : 'text-slate-500'
                            }`}>
                                {t('visualizers.wilsons_theorem.calculate_button')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MathCard>

                {testStatus !== 'idle' && testStatus !== 'error' && result && factOut && n && (
                    <Animated.View entering={FadeInUp} exiting={FadeOutDown} className="mt-4">
                        <MathCard index={2}>
                            <View className={`p-6 rounded-2xl border ${
                                testStatus === 'prime' 
                                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                                    : 'bg-rose-500/10 border-rose-500/30'
                            }`}>
                                <View className="items-center mb-6">
                                    <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
                                        testStatus === 'prime' ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                                    }`}>
                                        <Ionicons 
                                            name={testStatus === 'prime' ? 'checkmark-circle' : 'close-circle'} 
                                            size={40} 
                                            color={testStatus === 'prime' ? '#34d399' : '#f43f5e'} 
                                        />
                                    </View>
                                    <Text className="text-white text-xl font-black text-center mb-1">
                                        {testStatus === 'prime' 
                                            ? t('visualizers.wilsons_theorem.result_prime', { pMinus1: Number(n) - 1 }) 
                                            : t('visualizers.wilsons_theorem.result_composite', { rem: result })}
                                    </Text>
                                    {BigInt(n) <= 21n && (
                                         <Text className="text-slate-400 text-sm font-bold text-center mt-2">
                                            {t('visualizers.wilsons_theorem.factorial_calc', { n, factOut })}
                                         </Text>
                                    )}
                                </View>

                                <View className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                                    <View className="flex-row justify-center items-center flex-wrap">
                                        <Text className="text-white text-lg font-black">({n}-1)!</Text>
                                        <Text className="text-white text-lg font-black ml-3">≡</Text>
                                        <Text className={`text-lg font-black ml-2 ${testStatus === 'prime' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {result}
                                        </Text>
                                        <Text className="text-slate-400 text-sm font-black ml-2">(mod {n})</Text>
                                    </View>
                                </View>
                            </View>
                        </MathCard>
                    </Animated.View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
