import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import { useTranslation, Trans } from 'react-i18next';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
    let result = 1n;
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) result = (result * base) % mod;
        exp = exp / 2n;
        base = (base * base) % mod;
    }
    return result;
}

export default function FermatPrimalityScreen() {
    const { t } = useTranslation();
    const [p, setP] = useState('');
    const [a, setA] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [testStatus, setTestStatus] = useState<'idle' | 'prime' | 'composite' | 'error'>('idle');

    const runTest = () => {
        Keyboard.dismiss();
        try {
            const pNum = BigInt(p);
            if (pNum <= 1n) {
                 setTestStatus('error');
                 return;
            }
            if (pNum === 2n || pNum === 3n) {
                 setResult('1');
                 setA('2');
                 setTestStatus('prime');
                 return;
            }
            
            let aBig = 2n;
            if (a) {
                aBig = BigInt(a);
            } else {
                const max = pNum - 2n < 10000n ? pNum - 2n : 10000n;
                aBig = BigInt(Math.floor(Math.random() * Number(max))) + 2n;
                setA(aBig.toString());
            }

            if (aBig <= 1n || aBig >= pNum) {
                setTestStatus('error');
                return;
            }

            const evalResult = modPow(aBig, pNum - 1n, pNum);
            setResult(evalResult.toString());
            if (evalResult === 1n) {
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
            <ScreenHeader title={t('tools.fermat_primality.title')} />

            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <MathCard
                    index={0}
                    title={t('visualizers.fermat_primality.simple_terms_title')}
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.fermat_primality.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.fermat_primality.simple_terms_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-emerald-400 font-bold" />,
                                    3: <Text className="text-sky-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.fermat_primality.description')}
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                {t('visualizers.fermat_primality.input_label')}
                            </Text>
                            <TextInput
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-lg font-black"
                                keyboardType="number-pad"
                                value={p}
                                onChangeText={(text) => {
                                    setP(text.replace(/[^0-9]/g, ''));
                                    setTestStatus('idle');
                                    setResult(null);
                                }}
                                placeholderTextColor="#475569"
                                placeholder="..."
                            />
                        </View>

                        <View>
                            <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                {t('visualizers.fermat_primality.base_label')}
                            </Text>
                            <TextInput
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-lg font-black"
                                keyboardType="number-pad"
                                value={a}
                                onChangeText={(text) => {
                                    setA(text.replace(/[^0-9]/g, ''));
                                    setTestStatus('idle');
                                    setResult(null);
                                }}
                                placeholderTextColor="#475569"
                                placeholder="Random if empty..."
                            />
                        </View>

                        <TouchableOpacity
                            onPress={runTest}
                            disabled={!p}
                            className={`p-4 rounded-2xl items-center flex-row justify-center ${
                                p ? 'bg-indigo-500' : 'bg-slate-800'
                            }`}
                        >
                            <Ionicons name="play" size={20} color={p ? 'white' : '#475569'} />
                            <Text className={`font-black ml-2 uppercase tracking-widest text-sm ${
                                p ? 'text-white' : 'text-slate-500'
                            }`}>
                                {t('visualizers.fermat_primality.test_button')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MathCard>

                {testStatus !== 'idle' && testStatus !== 'error' && result && a && p && (
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
                                    <Text className="text-white text-xl font-black text-center">
                                        {testStatus === 'prime' 
                                            ? t('visualizers.fermat_primality.result_prime') 
                                            : t('visualizers.fermat_primality.result_composite')}
                                    </Text>
                                    {testStatus === 'prime' && (
                                        <Text className="text-emerald-400 text-xs text-center mt-2 font-bold px-4">
                                            {t('visualizers.fermat_primality.pseudoprime_warning')}
                                        </Text>
                                    )}
                                </View>

                                <View className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                                    <Text className="text-slate-400 text-xs font-bold uppercase mb-2 text-center">
                                        Equation
                                    </Text>
                                    <View className="flex-row justify-center items-center flex-wrap">
                                        <Text className="text-white text-lg font-black">{a}</Text>
                                        <Text className="text-sky-400 text-xs font-black relative -top-3 left-1">{Number(p) - 1}</Text>
                                        <Text className="text-white text-lg font-black ml-3">≡</Text>
                                        <Text className={`text-lg font-black ml-2 ${testStatus === 'prime' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {result}
                                        </Text>
                                        <Text className="text-slate-400 text-sm font-black ml-2">(mod {p})</Text>
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
