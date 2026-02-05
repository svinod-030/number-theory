import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { solveCRT } from '../utils/math';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

export default function CRTScreen() {
    const navigation = useNavigation();
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
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Chinese Remainder Theorem</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    <Text className="text-slate-400 text-sm mb-6 leading-6">
                        Find a number <Text className="text-white font-bold">x</Text> that satisfies multiple congruences simultaneously.
                    </Text>

                    <View className="mb-8">
                        {inputs.map((input, index) => (
                            <Animated.View
                                key={index}
                                entering={SlideInRight}
                                className="flex-row items-center mb-4 bg-slate-900 p-4 rounded-2xl border border-slate-800"
                            >
                                <View className="flex-1">
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">Remainder (a)</Text>
                                    <TextInput
                                        value={input.a}
                                        onChangeText={(v) => updateInput(index, 'a', v)}
                                        keyboardType="numeric"
                                        placeholder="a"
                                        placeholderTextColor="#475569"
                                        className="text-white font-bold text-lg"
                                    />
                                </View>
                                <Text className="text-slate-600 font-mono mx-4">mod</Text>
                                <View className="flex-1">
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">Modulus (n)</Text>
                                    <TextInput
                                        value={input.n}
                                        onChangeText={(v) => updateInput(index, 'n', v)}
                                        keyboardType="numeric"
                                        placeholder="n"
                                        placeholderTextColor="#475569"
                                        className="text-white font-bold text-lg"
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => removeRow(index)}
                                    className="ml-4 p-2"
                                >
                                    <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
                                </TouchableOpacity>
                            </Animated.View>
                        ))}

                        {inputs.length < 5 && (
                            <TouchableOpacity
                                onPress={addRow}
                                className="flex-row items-center justify-center p-4 rounded-2xl border border-dashed border-slate-800"
                            >
                                <Ionicons name="add" size={20} color="#94a3b8" />
                                <Text className="text-slate-400 ml-2">Add Congruence</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {result ? (
                        <Animated.View entering={FadeIn} key={result.x} className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl items-center mb-8">
                            <Text className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Smallest Positive Solution</Text>
                            <Text className="text-5xl font-black text-emerald-400">x = {result.x}</Text>
                            <Text className="text-slate-400 text-sm mt-2">
                                mod {result.N} ({moduli.join(' × ')})
                            </Text>
                        </Animated.View>
                    ) : (
                        <View className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-3xl items-center mb-8">
                            <Text className="text-rose-400 font-bold">No Unique Solution</Text>
                            <Text className="text-slate-400 text-sm text-center mt-2">
                                Moduli must be pairwise coprime for a unique solution.
                            </Text>
                        </View>
                    )}

                    {result && (
                        <View className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden mb-12">
                            <View className="bg-slate-800/50 p-4">
                                <Text className="text-slate-400 text-xs font-bold uppercase">Solution Steps</Text>
                            </View>
                            {result.steps.map((step, i) => (
                                <View key={i} className="p-4 border-t border-slate-800/50">
                                    <View className="flex-row justify-between mb-2">
                                        <Text className="text-slate-500 text-[10px] font-bold">M{i + 1} = N / n{i + 1}</Text>
                                        <Text className="text-white text-xs font-mono">{step.Mi} = {result.N} / {step.ni}</Text>
                                    </View>
                                    <View className="flex-row justify-between mb-2">
                                        <Text className="text-slate-500 text-[10px] font-bold">y{i + 1} = M{i + 1}⁻¹ mod n{i + 1}</Text>
                                        <Text className="text-sky-400 text-xs font-mono">{step.yi}</Text>
                                    </View>
                                    <Text className="text-slate-400 text-[10px] leading-4 italic">
                                        Contribution: a{i + 1} × M{i + 1} × y{i + 1} = {step.ai} × {step.Mi} × {step.yi} = {step.ai * step.Mi * step.yi}
                                    </Text>
                                </View>
                            ))}
                            <View className="p-4 bg-slate-800/20 border-t border-slate-800">
                                <Text className="text-white text-xs leading-5">
                                    Sum of contributions = {result.steps.reduce((acc, s) => acc + s.ai * s.Mi * s.yi, 0)} {"\n"}
                                    {result.steps.reduce((acc, s) => acc + s.ai * s.Mi * s.yi, 0)} mod {result.N} = <Text className="text-emerald-400 font-bold">{result.x}</Text>
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
