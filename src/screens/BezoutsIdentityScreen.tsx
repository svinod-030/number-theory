import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import { useTranslation, Trans } from 'react-i18next';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

function extendedGCD(a: number, b: number): { gcd: number, x: number, y: number } {
    let old_r = a;
    let r = b;
    let old_s = 1;
    let s = 0;
    let old_t = 0;
    let t = 1;
    
    while (r !== 0) {
        const quotient = Math.floor(old_r / r);
        
        const temp_r = r;
        r = old_r - quotient * r;
        old_r = temp_r;
        
        const temp_s = s;
        s = old_s - quotient * s;
        old_s = temp_s;
        
        const temp_t = t;
        t = old_t - quotient * t;
        old_t = temp_t;
    }
    
    // In some cases GCD can be negative if a or b are negative, but we deal with positive magnitudes here
    return { gcd: Math.abs(old_r), x: old_s, y: old_t };
}

export default function BezoutsIdentityScreen() {
    const { t } = useTranslation();
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [result, setResult] = useState<{ gcd: number, x: number, y: number } | null>(null);

    const calculate = () => {
        Keyboard.dismiss();
        if (!a || !b) return;
        
        const numA = parseInt(a);
        const numB = parseInt(b);
        
        if (isNaN(numA) || isNaN(numB) || numA <= 0 || numB <= 0) return;
        
        const res = extendedGCD(numA, numB);
        setResult(res);
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.bezouts_identity.title')} />

            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <MathCard
                    index={0}
                    title={t('visualizers.bezouts_identity.simple_terms_title')}
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.bezouts_identity.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.bezouts_identity.simple_terms_desc"
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
                    description={t('visualizers.bezouts_identity.description')}
                >
                    <View className="space-y-4">
                        <View className="flex-row space-x-4">
                            <View className="flex-1 mr-2">
                                <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                    {t('visualizers.bezouts_identity.input_a')}
                                </Text>
                                <TextInput
                                    className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-lg font-black"
                                    keyboardType="number-pad"
                                    value={a}
                                    onChangeText={(text) => {
                                        setA(text.replace(/[^0-9]/g, ''));
                                        setResult(null);
                                    }}
                                    placeholderTextColor="#475569"
                                    placeholder="a"
                                    maxLength={8}
                                />
                            </View>
                            <View className="flex-1 ml-2">
                                <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
                                    {t('visualizers.bezouts_identity.input_b')}
                                </Text>
                                <TextInput
                                    className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-lg font-black"
                                    keyboardType="number-pad"
                                    value={b}
                                    onChangeText={(text) => {
                                        setB(text.replace(/[^0-9]/g, ''));
                                        setResult(null);
                                    }}
                                    placeholderTextColor="#475569"
                                    placeholder="b"
                                    maxLength={8}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={calculate}
                            disabled={!a || !b}
                            className={`p-4 rounded-2xl items-center flex-row justify-center mt-4 ${
                                a && b ? 'bg-indigo-500' : 'bg-slate-800'
                            }`}
                        >
                            <Ionicons name="calculator" size={20} color={a && b ? 'white' : '#475569'} />
                            <Text className={`font-black ml-2 uppercase tracking-widest text-sm ${
                                a && b ? 'text-white' : 'text-slate-500'
                            }`}>
                                {t('visualizers.bezouts_identity.calculate')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MathCard>

                {result && (
                    <Animated.View entering={FadeInUp} exiting={FadeOutDown} className="mt-4">
                        <MathCard index={2}>
                            <View className="p-6 rounded-2xl border bg-indigo-500/10 border-indigo-500/30">
                                <View className="items-center mb-6">
                                    <View className="w-16 h-16 rounded-full items-center justify-center mb-4 bg-indigo-500/20">
                                        <Text className="text-indigo-400 font-black text-2xl">=</Text>
                                    </View>
                                    <Text className="text-white text-xl font-black text-center mb-1">
                                        {t('visualizers.bezouts_identity.result_gcd', { gcd: result.gcd })}
                                    </Text>
                                </View>

                                <View className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-4 items-center">
                                    <View className="flex-row items-baseline mb-2 flex-wrap justify-center">
                                        <Text className="text-white text-xl font-black">{a}</Text>
                                        <Text className="text-emerald-400 text-xl font-black mx-1">({result.x})</Text>
                                        <Text className="text-white text-xl font-black mx-2">+</Text>
                                        <Text className="text-white text-xl font-black">{b}</Text>
                                        <Text className="text-sky-400 text-xl font-black mx-1">({result.y})</Text>
                                        <Text className="text-white text-xl font-black mx-2">=</Text>
                                        <Text className="text-indigo-400 text-xl font-black">{result.gcd}</Text>
                                    </View>
                                    <Text className="text-slate-400 text-xs font-bold text-center mt-2">
                                        {t('visualizers.bezouts_identity.equation', { a, b, x: result.x, y: result.y, gcd: result.gcd })}
                                    </Text>
                                </View>

                                <View className="flex-row justify-around mt-2">
                                    <View className="items-center bg-emerald-500/10 px-6 py-3 rounded-xl border border-emerald-500/20">
                                        <Text className="text-emerald-400 text-lg font-black">{t('visualizers.bezouts_identity.coefficient_x', { x: result.x })}</Text>
                                    </View>
                                    <View className="items-center bg-sky-500/10 px-6 py-3 rounded-xl border border-sky-500/20">
                                        <Text className="text-sky-400 text-lg font-black">{t('visualizers.bezouts_identity.coefficient_y', { y: result.y })}</Text>
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
