import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { solveCRT } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, SlideInRight, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function CRTScreen() {
    const { t } = useTranslation();
    const [inputs, setInputs] = useState([
        { a: '2', n: '3' },
        { a: '3', n: '5' },
        { a: '2', n: '7' }
    ]);

    const updateInput = (index: number, field: 'a' | 'n', value: string) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
    };

    const addRow = () => {
        if (inputs.length < 5) {
            setInputs([...inputs, { a: '', n: '' }]);
        }
    };

    const removeRow = (index: number) => {
        if (inputs.length > 2) {
            const newInputs = inputs.filter((_, i) => i !== index);
            setInputs(newInputs);
        }
    };

    const remainders = inputs.map(i => parseInt(i.a) || 0);
    const moduli = inputs.map(i => parseInt(i.n) || 0);
    const result = solveCRT(remainders, moduli);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.crt.title')} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title={t('visualizers.crt.puzzle_title')}
                >
                    <View className="bg-sky-500/5 p-5 rounded-2xl border border-sky-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">{t('visualizers.crt.puzzle_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.crt.puzzle_desc"
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
                    title={t('visualizers.crt.system_title')}
                    description={t('visualizers.crt.system_desc')}
                >
                    <View className="bg-slate-900/40 rounded-3xl border border-slate-800/60 p-6 shadow-2xl">
                        <View className="flex-row mb-6">
                            {/* Huge Curly Brace Decoration */}
                            <View className="mr-4 justify-center">
                                <Text
                                    className="text-sky-500/30 font-thin"
                                    style={{
                                        fontSize: 100,
                                        lineHeight: 120,
                                        transform: [{ scaleY: inputs.length * 0.8 }, { translateY: -4 }]
                                    }}
                                >
                                    {'{'}
                                </Text>
                            </View>

                            {/* Equations Column */}
                            <View className="flex-1">
                                {inputs.map((input, index) => (
                                    <Animated.View
                                        key={index}
                                        layout={Layout}
                                        entering={SlideInRight.delay(index * 100)}
                                        className="flex-row items-center mb-4 h-14"
                                    >
                                        <Text className="text-white font-black text-lg mr-2 italic">x</Text>
                                        <Text className="text-slate-600 font-mono text-sm mr-3">mod</Text>

                                        {/* Modulo n Input */}
                                        <View className="flex-1 mr-3">
                                            <TextInput
                                                value={input.n}
                                                onChangeText={(v) => updateInput(index, 'n', v)}
                                                keyboardType="numeric"
                                                placeholder="n"
                                                placeholderTextColor="#334155"
                                                className="bg-slate-800/60 p-2 rounded-xl h-11 text-sky-400 font-black text-center text-lg border border-slate-700/30"
                                            />
                                        </View>

                                        <Text className="text-emerald-400 font-black text-lg mr-3">=</Text>

                                        {/* Remainder a Input */}
                                        <View className="flex-1">
                                            <TextInput
                                                value={input.a}
                                                onChangeText={(v) => updateInput(index, 'a', v)}
                                                keyboardType="numeric"
                                                placeholder="a"
                                                placeholderTextColor="#334155"
                                                className="bg-slate-800/60 p-2 rounded-xl h-11 text-white font-black text-center text-lg border border-slate-700/30"
                                            />
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => removeRow(index)}
                                            className="ml-4"
                                        >
                                            <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
                                        </TouchableOpacity>
                                    </Animated.View>
                                ))}

                                {inputs.length < 5 && (
                                    <TouchableOpacity
                                        onPress={addRow}
                                        className="flex-row items-center justify-center p-3 mt-2 rounded-xl border border-dashed border-slate-700/50 active:bg-slate-900"
                                    >
                                        <Ionicons name="add" size={18} color="#94a3b8" />
                                        <Text className="text-slate-500 ml-2 font-black text-[10px] uppercase">{t('visualizers.crt.add_congruence')}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        {result ? (
                            <Animated.View key={result.x} entering={FadeIn} className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl items-center">
                                <View className="flex-row items-baseline">
                                    <Text className="text-emerald-400 text-lg font-bold mr-3 italic">x ≡</Text>
                                    <Text className="text-5xl font-black text-emerald-400">{result.x}</Text>
                                </View>
                                <Text className="text-slate-500 text-[10px] mt-4 font-black uppercase tracking-[2px]">
                                    (mod {result.N})
                                </Text>
                            </Animated.View>
                        ) : (
                            <View className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl items-center">
                                <Text className="text-rose-400 font-bold uppercase text-xs">{t('visualizers.crt.no_solution')}</Text>
                                <Text className="text-slate-500 text-[10px] text-center mt-2 font-bold leading-4">
                                    {t('visualizers.crt.moduli_coprime')}
                                </Text>
                            </View>
                        )}
                    </View>
                </MathCard>

                {result && (
                    <MathCard
                        index={2}
                        title={t('visualizers.crt.steps_title')}
                        description={t('visualizers.crt.steps_desc')}
                    >
                        <View className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                            {/* Header Row */}
                            <View className="flex-row bg-slate-900/50 p-3 border-b border-slate-800">
                                <Text className="flex-1 text-slate-500 text-[9px] font-black uppercase">{t('visualizers.crt.mod_col')}</Text>
                                <Text className="flex-1 text-slate-500 text-[9px] font-black uppercase">{t('visualizers.crt.m_col')}</Text>
                                <Text className="flex-1 text-slate-500 text-[9px] font-black uppercase">{t('visualizers.crt.y_col')}</Text>
                                <Text className="flex-1 text-slate-500 text-[9px] font-black uppercase text-right">{t('visualizers.crt.term_col')}</Text>
                            </View>

                            {result.steps.map((step, i) => (
                                <View key={i} className="flex-row p-4 border-b border-slate-800/50 items-center">
                                    <Text className="flex-1 text-sky-400 font-bold text-xs">{step.ni}</Text>
                                    <Text className="flex-1 text-slate-300 text-xs">{step.Mi}</Text>
                                    <Text className="flex-1 text-slate-300 text-xs">{step.yi}</Text>
                                    <Text className="flex-1 text-emerald-400 font-black text-xs text-right">{step.term}</Text>
                                </View>
                            ))}

                            <View className="p-5 bg-emerald-500/5">
                                <Text className="text-slate-400 text-[10px] uppercase font-bold mb-3 text-center">
                                    {t('visualizers.crt.final_comp')}
                                </Text>
                                <View className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                    <Text className="text-slate-300 text-[11px] font-mono text-center">
                                        x = Σ(aᵢMᵢyᵢ) mod N{"\n"}
                                        x = ({result.steps.map(s => s.term).join(' + ')}) mod {result.N}{"\n"}
                                        <Text className="text-emerald-400 font-bold">x = {result.x}</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </MathCard>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
