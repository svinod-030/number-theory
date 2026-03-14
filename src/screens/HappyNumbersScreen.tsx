import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import { useTranslation, Trans } from 'react-i18next';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

function traceHappy(n: number): { isHappy: boolean, steps: { calculation: string, result: number }[] } | null {
    if (n <= 0) return null;
    let current = n;
    const seen = new Set<number>();
    const steps = [];
    
    let iters = 0;
    while (current !== 1 && !seen.has(current) && iters < 100) {
        seen.add(current);
        const digits = current.toString().split('').map(Number);
        
        const sum = digits.reduce((acc, val) => acc + val * val, 0);
        const calculation = digits.map(d => `${d}²`).join(' + ');
        
        steps.push({ calculation, result: sum });
        current = sum;
        iters++;
    }

    // Add exactly one step if the number was 1 to begin with
    if (n === 1 && steps.length === 0) {
        steps.push({ calculation: '1²', result: 1 });
    } else if (current !== 1 && seen.has(current)) {
        // Find the cycle
        const digits = current.toString().split('').map(Number);
        const sum = digits.reduce((acc, val) => acc + val * val, 0);
        const calculation = digits.map(d => `${d}²`).join(' + ');
        steps.push({ calculation, result: sum });
    }
    
    return {
        isHappy: current === 1,
        steps
    };
}

export default function HappyNumbersScreen() {
    const { t } = useTranslation();
    const [nStr, setNStr] = useState('');
    const [result, setResult] = useState<{ n: number, isHappy: boolean, steps: { calculation: string, result: number }[] } | null>(null);

    const calculate = () => {
        Keyboard.dismiss();
        if (!nStr) return;
        
        const num = parseInt(nStr);
        if (isNaN(num) || num <= 0) return;
        
        const res = traceHappy(num);
        if (res) {
            setResult({ n: num, ...res });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.happy_numbers.title')} />

            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <MathCard
                    index={0}
                    title={t('visualizers.happy_numbers.simple_terms_title')}
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.happy_numbers.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.happy_numbers.simple_terms_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-emerald-400 font-bold" />,
                                    3: <Text className="text-rose-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.happy_numbers.description')}
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                {t('visualizers.happy_numbers.input_n')}
                            </Text>
                            <TextInput
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-lg font-black"
                                keyboardType="number-pad"
                                value={nStr}
                                onChangeText={(text) => {
                                    setNStr(text.replace(/[^0-9]/g, ''));
                                    setResult(null);
                                }}
                                placeholderTextColor="#475569"
                                placeholder="..."
                                maxLength={10}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={calculate}
                            disabled={!nStr}
                            className={`p-4 rounded-2xl items-center flex-row justify-center ${
                                nStr ? 'bg-indigo-500' : 'bg-slate-800'
                            }`}
                        >
                            <Ionicons name="git-commit" size={20} color={nStr ? 'white' : '#475569'} />
                            <Text className={`font-black ml-2 uppercase tracking-widest text-sm ${
                                nStr ? 'text-white' : 'text-slate-500'
                            }`}>
                                {t('visualizers.happy_numbers.calculate')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MathCard>

                {result && (
                    <Animated.View entering={FadeInUp} exiting={FadeOutDown} className="mt-4">
                        <MathCard index={2}>
                            <View className={`p-6 rounded-2xl border ${
                                result.isHappy 
                                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                                    : 'bg-rose-500/10 border-rose-500/30'
                            }`}>
                                <View className="items-center mb-6">
                                    <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
                                        result.isHappy ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                                    }`}>
                                        <Ionicons 
                                            name={result.isHappy ? 'happy-outline' : 'sad-outline'} 
                                            size={40} 
                                            color={result.isHappy ? '#34d399' : '#f43f5e'} 
                                        />
                                    </View>
                                    <Text className="text-white text-xl font-black text-center">
                                        {result.isHappy 
                                            ? t('visualizers.happy_numbers.result_happy', { n: result.n }) 
                                            : t('visualizers.happy_numbers.result_sad', { n: result.n })}
                                    </Text>
                                </View>

                                <View className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                                    {result.steps.map((step, idx) => (
                                        <View key={idx} className="flex-row items-center border-b border-slate-800/50 py-3 last:border-b-0">
                                            <View className="bg-indigo-500/10 w-6 h-6 rounded-full items-center justify-center mr-3">
                                                <Text className="text-indigo-400 text-[10px] font-bold">{idx + 1}</Text>
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-slate-400 text-sm font-bold font-mono">
                                                    {step.calculation}
                                                </Text>
                                            </View>
                                            <View className="flex-row items-center pl-2">
                                                <Text className="text-slate-600 text-lg mr-2">→</Text>
                                                <Text className={`text-lg font-black ${
                                                    idx === result.steps.length - 1 
                                                        ? (result.isHappy ? 'text-emerald-400' : 'text-rose-400')
                                                        : 'text-white'
                                                }`}>
                                                    {step.result}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
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
