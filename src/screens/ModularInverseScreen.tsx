import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { extendedGCDWithSteps, getModularInverse } from '../utils/math';
import Animated, { FadeIn, ZoomIn, FadeOut } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function ModularInverseScreen() {
    const navigation = useNavigation();
    const [numA, setNumA] = useState('3');
    const [numM, setNumM] = useState('11');

    const a = parseInt(numA) || 0;
    const m = parseInt(numM) || 0;

    const inverse = getModularInverse(a, m);
    const { gcd, x, steps } = extendedGCDWithSteps(a, m);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Modular Inverse</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8 items-center">
                        <Text className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">The Equation</Text>
                        <View className="flex-row items-baseline">
                            <Text className="text-4xl font-black text-white">{a}x ≡ 1 (mod {m})</Text>
                        </View>
                    </View>

                    <View className="flex-row space-x-4 mb-8">
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs font-bold mb-2 uppercase">Number (a)</Text>
                            <TextInput
                                value={numA}
                                onChangeText={setNumA}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-bold mb-2 uppercase">Modulus (m)</Text>
                            <TextInput
                                value={numM}
                                onChangeText={setNumM}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                    </View>

                    <Animated.View key={`${a}-${m}`} entering={ZoomIn} className="mb-8 p-6 rounded-3xl bg-sky-500/10 border border-sky-500/20 items-center">
                        <Text className="text-sky-400 text-xs font-bold uppercase tracking-widest mb-2">Multiplicative Inverse</Text>
                        {inverse !== null ? (
                            <View className="items-center">
                                <Text className="text-5xl font-black text-sky-400">x = {inverse}</Text>
                                <Text className="text-slate-400 text-sm mt-2 text-center">
                                    Since ({a} × {inverse}) mod {m} = 1
                                </Text>
                            </View>
                        ) : (
                            <View className="items-center">
                                <Text className="text-2xl font-black text-rose-400 text-center">No Inverse Exists</Text>
                                <Text className="text-slate-400 text-sm mt-2 text-center">
                                    GCD({a}, {m}) = {gcd}. They must be coprime.
                                </Text>
                            </View>
                        )}
                    </Animated.View>

                    <Text className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">Extended Euclidean Method</Text>
                    <View className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden mb-8">
                        <View className="flex-row bg-slate-800/50 p-4">
                            <Text className="flex-1 text-slate-400 text-[10px] font-bold uppercase">Step</Text>
                            <Text className="flex-[2] text-slate-400 text-[10px] font-bold uppercase text-center">Equation</Text>
                            <Text className="flex-1 text-slate-400 text-[10px] font-bold uppercase text-right">Coefficient</Text>
                        </View>
                        {steps.map((step, i) => (
                            <View key={i} className={`flex-row p-4 border-t border-slate-800/50 ${i === steps.length - 1 ? 'bg-sky-500/5' : ''}`}>
                                <Text className="flex-1 text-slate-500 font-mono text-xs">{i + 1}</Text>
                                <View className="flex-[2]">
                                    <Text className="text-white font-mono text-xs text-center">{step.a} = {step.b}×{step.q} + {step.r}</Text>
                                </View>
                                <Text className="flex-1 text-sky-400 font-mono text-xs text-right">x = {step.x}</Text>
                            </View>
                        ))}
                    </View>

                    <View className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 mb-12">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="information-circle-outline" size={20} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2">What is a Modular Inverse?</Text>
                        </View>
                        <Text className="text-slate-400 text-sm leading-6">
                            An integer <Text className="text-white font-bold">x</Text> is the modular multiplicative inverse of <Text className="text-white font-bold">a</Text> modulo <Text className="text-white font-bold">m</Text> if:
                            {"\n\n"}
                            <Text className="text-sky-400 font-mono">ax ≡ 1 (mod m)</Text>
                            {"\n\n"}
                            It only exists if <Text className="text-white font-bold">a</Text> and <Text className="text-white font-bold">m</Text> are coprime (i.e., <Text className="font-bold">gcd(a, m) = 1</Text>).
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
