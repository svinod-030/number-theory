import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { solveLinearDiophantine } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function DiophantineScreen() {
    const [numA, setNumA] = useState('3');
    const [numB, setNumB] = useState('4');
    const [numC, setNumC] = useState('5');

    const a = parseInt(numA) || 0;
    const b = parseInt(numB) || 0;
    const c = parseInt(numC) || 0;

    const result = solveLinearDiophantine(a, b, c);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Diophantine Equations" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="Solve linear equations of the form ax + by = c using the Extended Euclidean Algorithm."
                >
                    <View className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800/50 mb-8 items-center border-dashed">
                        <View className="flex-row items-center">
                            <EquationBox val={a} label="a" />
                            <Text className="text-slate-600 font-black text-2xl mx-2">x</Text>
                            <Text className="text-slate-600 font-black text-2xl mx-2">+</Text>
                            <EquationBox val={b} label="b" />
                            <Text className="text-slate-600 font-black text-2xl mx-2">y</Text>
                            <Text className="text-slate-600 font-black text-2xl mx-2">=</Text>
                            <EquationBox val={c} label="c" />
                        </View>
                    </View>

                    <View className="flex-row space-x-3">
                        <View className="flex-1">
                            <ThemedInput label="a" value={numA} onChangeText={setNumA} keyboardType="numeric" />
                        </View>
                        <View className="flex-1">
                            <ThemedInput label="b" value={numB} onChangeText={setNumB} keyboardType="numeric" />
                        </View>
                        <View className="flex-1">
                            <ThemedInput label="c" value={numC} onChangeText={setNumC} keyboardType="numeric" />
                        </View>
                    </View>
                </MathCard>

                {result ? (
                    result.possible ? (
                        <Animated.View key={`${a}-${b}-${c}`} entering={FadeIn} className="px-1">
                            <MathCard
                                index={1}
                                title="Particular Solution"
                                description="A specific integer solution discovered by the algorithm:"
                            >
                                <View className="flex-row justify-around mb-8 p-6 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                                    <View className="items-center">
                                        <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">x₀ =</Text>
                                        <Text className="text-4xl font-black text-white">{result.x0}</Text>
                                    </View>
                                    <View className="items-center">
                                        <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">y₀ =</Text>
                                        <Text className="text-4xl font-black text-white">{result.y0}</Text>
                                    </View>
                                </View>

                                <View className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                                    <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">General Solutions</Text>
                                    <View className="flex-row items-center justify-between mb-4">
                                        <Text className="text-white font-mono text-lg">x = {result.x0} + {result.stepX}k</Text>
                                        <Text className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">Step X: b/g</Text>
                                    </View>
                                    <View className="flex-row items-center justify-between">
                                        <Text className="text-white font-mono text-lg">y = {result.y0} - {result.stepY}k</Text>
                                        <Text className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">Step Y: a/g</Text>
                                    </View>
                                    <Text className="text-slate-600 text-[10px] mt-6 italic text-center uppercase font-bold tracking-widest">Where k is any integer</Text>
                                </View>
                            </MathCard>
                        </Animated.View>
                    ) : (
                        <View className="mb-6 mx-1 bg-rose-500/10 border border-rose-500/20 p-6 rounded-3xl items-center">
                            <Ionicons name="warning-outline" size={32} color="#f43f5e" />
                            <Text className="text-rose-400 font-black text-xl mt-2">No Solution</Text>
                            <Text className="text-slate-400 text-xs text-center mt-3 leading-5 font-bold">
                                gcd({a}, {b}) is {result.g}. Since {result.g} does not divide {c}, no integer values for x and y exist.
                            </Text>
                        </View>
                    )
                ) : null}

                <MathCard
                    index={2}
                    title="Theory & Help"
                >
                    <View className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="infinite-outline" size={18} color="#fbbf24" />
                            <Text className="text-amber-400 font-bold ml-2 text-xs uppercase font-bold">Historical Context</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Named after the Greek mathematician Diophantus, these equations only seek integer solutions. The linear form is solved using the Extended Euclidean Algorithm, which builds the solution from the remainders of GCD division!
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function EquationBox({ val, label }: { val: number, label: string }) {
    return (
        <View className="items-center bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            <Text className="text-white text-xl font-black">{val}</Text>
            <Text className="text-slate-600 text-[8px] font-bold uppercase">{label}</Text>
        </View>
    );
}
