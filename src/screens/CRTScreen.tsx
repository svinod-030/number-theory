import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { solveCRT } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, SlideInRight, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function CRTScreen() {
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
            <ScreenHeader title="Chinese Remainder Theorem" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="Solve systems of simultaneous congruences. Find x such that x ≡ aᵢ (mod nᵢ) for all i."
                >
                    <View className="mb-4">
                        {inputs.map((input, index) => (
                            <Animated.View
                                key={index}
                                layout={Layout}
                                entering={SlideInRight.delay(index * 100)}
                                className="flex-row items-center mb-4 bg-slate-900 p-4 rounded-2xl border border-slate-800"
                            >
                                <View className="flex-1">
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">x ≡</Text>
                                    <ThemedInput
                                        label=""
                                        value={input.a}
                                        onChangeText={(v) => updateInput(index, 'a', v)}
                                        keyboardType="numeric"
                                        placeholder="a"
                                        className="bg-transparent p-0 border-0 h-8"
                                    />
                                </View>
                                <Text className="text-slate-600 font-mono mx-4 mt-2">mod</Text>
                                <View className="flex-1">
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">n</Text>
                                    <ThemedInput
                                        label=""
                                        value={input.n}
                                        onChangeText={(v) => updateInput(index, 'n', v)}
                                        keyboardType="numeric"
                                        placeholder="n"
                                        className="bg-transparent p-0 border-0 h-8"
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => removeRow(index)}
                                    className="ml-2 pt-2"
                                >
                                    <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
                                </TouchableOpacity>
                            </Animated.View>
                        ))}

                        {inputs.length < 5 && (
                            <TouchableOpacity
                                onPress={addRow}
                                className="flex-row items-center justify-center p-4 rounded-2xl border border-dashed border-slate-800 active:bg-slate-900"
                            >
                                <Ionicons name="add" size={20} color="#94a3b8" />
                                <Text className="text-slate-400 ml-2 font-bold text-xs uppercase">Add Modulo</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {result ? (
                        <Animated.View key={result.x} entering={FadeIn} className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl items-center">
                            <Text className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2">Solution Found</Text>
                            <Text className="text-4xl font-black text-emerald-400">x = {result.x}</Text>
                            <Text className="text-slate-500 text-[10px] mt-2 font-bold">
                                mod {result.N} ({moduli.join(' × ')})
                            </Text>
                        </Animated.View>
                    ) : (
                        <View className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl items-center">
                            <Text className="text-rose-400 font-bold uppercase text-xs">No Unique Solution</Text>
                            <Text className="text-slate-500 text-[10px] text-center mt-2 font-bold leading-4">
                                Moduli must be pairwise coprime (GCD = 1) for this algorithm to yield a unique result.
                            </Text>
                        </View>
                    )}
                </MathCard>

                {result && (
                    <MathCard
                        index={1}
                        title="Algorithm Steps"
                        description="Using the Gaussian construction method:"
                    >
                        <View className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                            {result.steps.map((step, i) => (
                                <View key={i} className="p-5 border-t border-slate-800 first:border-t-0">
                                    <View className="flex-row justify-between mb-3">
                                        <Text className="text-slate-500 text-[10px] font-bold uppercase">Modular Part {i + 1}</Text>
                                        <Text className="text-sky-400 text-xs font-black">n = {step.ni}</Text>
                                    </View>
                                    <View className="flex-row justify-between mb-2">
                                        <Text className="text-slate-600 text-[10px]">Mᵢ = N / nᵢ</Text>
                                        <Text className="text-slate-300 text-[10px] font-bold">{step.Mi}</Text>
                                    </View>
                                    <View className="flex-row justify-between mb-2">
                                        <Text className="text-slate-600 text-[10px]">yᵢ = Mᵢ⁻¹ mod nᵢ</Text>
                                        <Text className="text-slate-300 text-[10px] font-bold">{step.yi}</Text>
                                    </View>
                                    <View className="mt-2 pt-2 border-t border-slate-800/50 flex-row justify-between">
                                        <Text className="text-slate-400 text-[10px] font-bold">Product (aᵢMᵢyᵢ)</Text>
                                        <Text className="text-emerald-400 text-xs font-black">{step.ai * step.Mi * step.yi}</Text>
                                    </View>
                                </View>
                            ))}
                            <View className="p-5 bg-emerald-500/5 border-t border-emerald-500/20">
                                <Text className="text-slate-400 text-[10px] uppercase font-bold text-center leading-5">
                                    Sum of Products mod N{"\n"}
                                    <Text className="text-emerald-400 text-sm font-black">{result.steps.reduce((acc, s) => acc + s.ai * s.Mi * s.yi, 0)} mod {result.N} = {result.x}</Text>
                                </Text>
                            </View>
                        </View>
                    </MathCard>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
