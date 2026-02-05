import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { extendedGCDWithSteps, getModularInverse } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

export default function ModularInverseScreen() {
    const [numA, setNumA] = useState('3');
    const [numM, setNumM] = useState('11');

    const a = parseInt(numA) || 0;
    const m = parseInt(numM) || 0;

    const inverse = getModularInverse(a, m);
    const { gcd, steps } = extendedGCDWithSteps(a, m);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Modular Inverse" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="Find an integer x such that ax ≡ 1 (mod m). This is the modular equivalent of division."
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label="Number (a)"
                                value={numA}
                                onChangeText={setNumA}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label="Modulus (m)"
                                value={numM}
                                onChangeText={setNumM}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <Animated.View key={`${a}-${m}`} entering={ZoomIn} className="bg-sky-500/10 border border-sky-500/20 p-8 rounded-2xl items-center my-4">
                        <Text className="text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-2">Multiplicative Inverse</Text>
                        {inverse !== null ? (
                            <View className="items-center">
                                <Text className="text-5xl font-black text-sky-400">x = {inverse}</Text>
                                <Text className="text-slate-500 text-[10px] mt-2 text-center uppercase font-bold">
                                    ({a} × {inverse}) mod {m} = 1
                                </Text>
                            </View>
                        ) : (
                            <View className="items-center">
                                <Text className="text-2xl font-black text-rose-400 text-center">NO INVERSE</Text>
                                <Text className="text-slate-500 text-[10px] mt-2 text-center uppercase font-bold">
                                    GCD({a}, {m}) = {gcd} (MUST BE 1)
                                </Text>
                            </View>
                        )}
                    </Animated.View>
                </MathCard>

                <MathCard
                    index={1}
                    title="Extended Euclidean Method"
                    description="The steps taken to find the inverse using the reverse substitution of the Euclidean Algorithm."
                >
                    <View className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                        <View className="flex-row bg-slate-800/50 p-3">
                            <Text className="flex-1 text-slate-500 text-[8px] font-bold uppercase">Step</Text>
                            <Text className="flex-[3] text-slate-500 text-[8px] font-bold uppercase text-center">Equation</Text>
                            <Text className="flex-1 text-slate-500 text-[8px] font-bold uppercase text-right">x Coeff</Text>
                        </View>
                        {steps.map((step, i) => (
                            <View key={i} className={`flex-row p-4 border-t border-slate-800/30 ${i === steps.length - 1 ? 'bg-sky-500/5' : ''}`}>
                                <Text className="flex-1 text-slate-500 font-mono text-[10px]">{i + 1}</Text>
                                <View className="flex-[3]">
                                    <Text className="text-white font-mono text-[10px] text-center">{step.a} = {step.b}×{step.q} + {step.r}</Text>
                                </View>
                                <Text className="flex-1 text-sky-400 font-mono text-[10px] text-right">{step.x}</Text>
                            </View>
                        ))}
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
