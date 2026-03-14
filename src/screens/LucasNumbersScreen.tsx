import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import { useTranslation, Trans } from 'react-i18next';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

function generateLucas(n: number): number[] {
    if (n <= 0) return [];
    const seq = [2];
    if (n >= 2) seq.push(1);
    for (let i = 2; i < n; i++) {
        seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
}

export default function LucasNumbersScreen() {
    const { t } = useTranslation();
    const [nStr, setNStr] = useState('');
    const [sequence, setSequence] = useState<number[] | null>(null);

    const calculate = () => {
        Keyboard.dismiss();
        if (!nStr) return;
        
        // Limit n to 50 to avoid running into Number.MAX_SAFE_INTEGER issues and lagging
        let num = parseInt(nStr);
        if (isNaN(num) || num < 1) return;
        
        if (num > 50) {
            num = 50;
            setNStr('50');
        }
        
        const res = generateLucas(num);
        setSequence(res);
    };

    let ratio: number | null = null;
    if (sequence && sequence.length >= 2) {
        ratio = sequence[sequence.length - 1] / sequence[sequence.length - 2];
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.lucas_numbers.title')} />

            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <MathCard
                    index={0}
                    title={t('visualizers.lucas_numbers.simple_terms_title')}
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.lucas_numbers.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.lucas_numbers.simple_terms_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.lucas_numbers.description')}
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                {t('visualizers.lucas_numbers.input_n')}
                            </Text>
                            <TextInput
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-lg font-black"
                                keyboardType="number-pad"
                                value={nStr}
                                onChangeText={(text) => {
                                    setNStr(text.replace(/[^0-9]/g, ''));
                                    setSequence(null);
                                }}
                                placeholderTextColor="#475569"
                                placeholder="..."
                                maxLength={2}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={calculate}
                            disabled={!nStr}
                            className={`p-4 rounded-2xl items-center flex-row justify-center ${
                                nStr ? 'bg-indigo-500' : 'bg-slate-800'
                            }`}
                        >
                            <Ionicons name="calculator" size={20} color={nStr ? 'white' : '#475569'} />
                            <Text className={`font-black ml-2 uppercase tracking-widest text-sm ${
                                nStr ? 'text-white' : 'text-slate-500'
                            }`}>
                                {t('visualizers.lucas_numbers.calculate')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MathCard>

                {sequence && (
                    <Animated.View entering={FadeInUp} exiting={FadeOutDown} className="mt-4">
                        <MathCard index={2}>
                            <View className="p-6 rounded-2xl border bg-slate-900 border-slate-800">
                                <View className="flex-row items-center mb-4">
                                    <View className="bg-indigo-500/20 px-3 py-1 rounded-full">
                                        <Text className="text-indigo-400 text-xs font-bold uppercase">
                                            n = {sequence.length}
                                        </Text>
                                    </View>
                                </View>

                                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                                    <View className="flex-row items-center">
                                        {sequence.map((num, idx) => (
                                            <View key={idx} className="flex-row items-center">
                                                <View className="items-center justify-center bg-slate-800 px-4 py-3 rounded-xl border border-slate-700 min-w-[50px]">
                                                    <Text className="text-white text-lg font-black">{num}</Text>
                                                    <Text className="text-slate-500 text-[10px] font-bold mt-1 uppercase">L{idx}</Text>
                                                </View>
                                                {idx < sequence.length - 1 && (
                                                    <Ionicons name="arrow-forward" size={16} color="#475569" className="mx-2" />
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>

                                {ratio !== null && (
                                    <View className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 items-center">
                                        <Ionicons name="analytics" size={24} color="#34d399" className="mb-2" />
                                        <Text className="text-emerald-400 font-bold text-center text-lg mb-1">
                                            {t('visualizers.lucas_numbers.ratio_label', { ratio: ratio.toFixed(6) })}
                                        </Text>
                                        <Text className="text-emerald-500/80 text-xs text-center">
                                            {t('visualizers.lucas_numbers.golden_ratio_note')}
                                        </Text>
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
