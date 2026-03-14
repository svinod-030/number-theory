import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import { useTranslation, Trans } from 'react-i18next';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

function generateFarey(n: number): { num: number, den: number, val: number }[] {
    const fractions = [
        { num: 0, den: 1, val: 0 },
        { num: 1, den: 1, val: 1 }
    ];
    
    for (let den = 1; den <= n; den++) {
        for (let num = 1; num < den; num++) {
            if (gcd(den, num) === 1) {
                fractions.push({ num, den, val: num / den });
            }
        }
    }
    
    fractions.sort((a, b) => a.val - b.val);
    return fractions;
}

export default function FareySequencesScreen() {
    const { t } = useTranslation();
    const [nStr, setNStr] = useState('');
    const [sequence, setSequence] = useState<{ num: number, den: number }[] | null>(null);

    const calculate = () => {
        Keyboard.dismiss();
        if (!nStr) return;
        
        let num = parseInt(nStr);
        if (isNaN(num) || num < 1) return;
        
        // Limit n to 20 to prevent excessive UI rendering which might lag the app
        if (num > 20) {
            num = 20;
            setNStr('20');
        }
        
        const res = generateFarey(num);
        setSequence(res);
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.farey_sequences.title')} />

            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <MathCard
                    index={0}
                    title={t('visualizers.farey_sequences.simple_terms_title')}
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.farey_sequences.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.farey_sequences.simple_terms_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.farey_sequences.description')}
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                {t('visualizers.farey_sequences.input_n')}
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

                        <View className="flex-row items-center justify-center mb-2">
                            <Ionicons name="warning-outline" size={14} color="#fbbf24" />
                            <Text className="text-amber-400 text-xs ml-2">
                                {t('visualizers.farey_sequences.warning_size')}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={calculate}
                            disabled={!nStr}
                            className={`p-4 rounded-2xl items-center flex-row justify-center ${
                                nStr ? 'bg-indigo-500' : 'bg-slate-800'
                            }`}
                        >
                            <Ionicons name="git-network" size={20} color={nStr ? 'white' : '#475569'} />
                            <Text className={`font-black ml-2 uppercase tracking-widest text-sm ${
                                nStr ? 'text-white' : 'text-slate-500'
                            }`}>
                                {t('visualizers.farey_sequences.calculate')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MathCard>

                {sequence && (
                    <Animated.View entering={FadeInUp} exiting={FadeOutDown} className="mt-4">
                        <MathCard index={2}>
                            <View className="p-5 rounded-2xl border bg-slate-900 border-slate-800">
                                <View className="flex-row justify-between items-center mb-4">
                                    <Text className="text-white text-lg font-black">
                                        F<Text className="text-xs">{nStr}</Text>
                                    </Text>
                                    <View className="bg-indigo-500/20 px-3 py-1 rounded-full">
                                        <Text className="text-indigo-400 text-xs font-bold">
                                            {t('visualizers.farey_sequences.sequence_count', { count: sequence.length })}
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row flex-wrap justify-center mt-2">
                                    {sequence.map((frac, index) => (
                                        <View key={`${frac.num}-${frac.den}-${index}`} className="flex-row items-center m-1">
                                            <View className="items-center justify-center px-1">
                                                <Text className="text-emerald-400 font-black text-base">{frac.num}</Text>
                                                <View className="h-[2px] w-full bg-slate-600 my-[2px] rounded-full" />
                                                <Text className="text-sky-400 font-black text-base">{frac.den}</Text>
                                            </View>
                                            {index < sequence.length - 1 && (
                                                <Text className="text-slate-500 mx-1 font-bold">,</Text>
                                            )}
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
