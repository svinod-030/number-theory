import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import { useTranslation, Trans } from 'react-i18next';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

function solvePell(nStr: string): { x: string, y: string, iters: number } | null {
    const n = parseInt(nStr);
    if (isNaN(n) || n <= 0) return null;
    const rootTarget = Math.sqrt(n);
    if (Math.floor(rootTarget) === rootTarget) return null; // Perfect square
    
    const a0 = BigInt(Math.floor(rootTarget));
    const bigN = BigInt(n);
    
    let m = 0n;
    let d = 1n;
    let a = a0;
    
    let h1 = 1n;
    let h2 = 0n;
    
    let k1 = 0n;
    let k2 = 1n;
    
    let h = a0;
    let k = 1n;
    
    let iters = 0;
    while (h * h - bigN * k * k !== 1n && iters < 2000) {
        h2 = h1;
        h1 = h;
        k2 = k1;
        k1 = k;
        
        m = d * a - m;
        d = (bigN - m * m) / d;
        a = (a0 + m) / d;
        
        h = a * h1 + h2;
        k = a * k1 + k2;
        iters++;
    }
    
    if (h * h - bigN * k * k === 1n) {
        return { x: h.toString(), y: k.toString(), iters };
    }
    
    return null;
}

export default function PellsEquationScreen() {
    const { t } = useTranslation();
    const [n, setN] = useState('');
    const [result, setResult] = useState<{ x: string, y: string } | null>(null);
    const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'fail' | 'error'>('idle');

    const calculate = () => {
        Keyboard.dismiss();
        if (!n) return;
        
        const num = parseInt(n);
        if (num > 9999) {
             setTestStatus('error');
             setResult(null);
             return;
        }

        try {
            const sol = solvePell(n);
            if (sol) {
                setResult({ x: sol.x, y: sol.y });
                setTestStatus('success');
            } else {
                setResult(null);
                setTestStatus('fail');
            }
        } catch (e) {
            setResult(null);
            setTestStatus('error');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.pells_equation.title')} />

            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <MathCard
                    index={0}
                    title={t('visualizers.pells_equation.simple_terms_title')}
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.pells_equation.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.pells_equation.simple_terms_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.pells_equation.description')}
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                {t('visualizers.pells_equation.input_n')}
                            </Text>
                            <TextInput
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-lg font-black"
                                keyboardType="number-pad"
                                value={n}
                                onChangeText={(text) => {
                                    const numStr = text.replace(/[^0-9]/g, '');
                                    const parsed = parseInt(numStr);
                                    if (parsed > 10000) {
                                        setN('10000');
                                    } else {
                                        setN(numStr);
                                    }
                                    setTestStatus('idle');
                                    setResult(null);
                                }}
                                placeholderTextColor="#475569"
                                placeholder="..."
                                maxLength={5}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={calculate}
                            disabled={!n}
                            className={`p-4 rounded-2xl items-center flex-row justify-center ${
                                n ? 'bg-indigo-500' : 'bg-slate-800'
                            }`}
                        >
                            <Ionicons name="calculator" size={20} color={n ? 'white' : '#475569'} />
                            <Text className={`font-black ml-2 uppercase tracking-widest text-sm ${
                                n ? 'text-white' : 'text-slate-500'
                            }`}>
                                {t('visualizers.pells_equation.calculate')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MathCard>

                {testStatus !== 'idle' && testStatus !== 'error' && (
                    <Animated.View entering={FadeInUp} exiting={FadeOutDown} className="mt-4">
                        <MathCard index={2}>
                            <View className={`p-6 rounded-2xl border ${
                                testStatus === 'success' 
                                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                                    : 'bg-rose-500/10 border-rose-500/30'
                            }`}>
                                <View className="items-center mb-6">
                                    <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
                                        testStatus === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                                    }`}>
                                        <Ionicons 
                                            name={testStatus === 'success' ? 'checkmark-circle' : 'close-circle'} 
                                            size={40} 
                                            color={testStatus === 'success' ? '#34d399' : '#f43f5e'} 
                                        />
                                    </View>
                                    <Text className="text-white text-xl font-black text-center">
                                        {testStatus === 'success' 
                                            ? t('visualizers.pells_equation.result_success') 
                                            : t('visualizers.pells_equation.result_fail')}
                                    </Text>
                                </View>

                                {testStatus === 'success' && result && (
                                    <View className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                                        <View className="mb-4">
                                            <Text className="text-emerald-400 text-lg font-black text-center" adjustsFontSizeToFit numberOfLines={2}>
                                                {t('visualizers.pells_equation.solution_x', { x: result.x })}
                                            </Text>
                                        </View>
                                        <View className="mb-4">
                                            <Text className="text-sky-400 text-lg font-black text-center" adjustsFontSizeToFit numberOfLines={2}>
                                                {t('visualizers.pells_equation.solution_y', { y: result.y })}
                                            </Text>
                                        </View>
                                        <Text className="text-slate-400 text-sm font-bold text-center mt-2">
                                            {result.x}² - {n} × {result.y}² = 1
                                        </Text>
                                    </View>
                                )}
                            </View>
                            
                            {testStatus === 'success' && result && result.x.length > 8 && (
                                <View className="mt-4 flex-row items-center justify-center">
                                    <Ionicons name="warning-outline" size={16} color="#fbbf24" />
                                    <Text className="text-amber-400 text-xs ml-2">
                                        {t('visualizers.pells_equation.warning')}
                                    </Text>
                                </View>
                            )}
                        </MathCard>
                    </Animated.View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
