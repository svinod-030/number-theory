import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { legendreSymbol, isPrime } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function LegendreScreen() {
    const [aStr, setAStr] = useState('2');
    const [pStr, setPStr] = useState('7');

    const a = parseInt(aStr) || 0;
    const p = parseInt(pStr) || 2;
    const isPPrime = isPrime(p) && p > 2;

    const result = isPPrime ? legendreSymbol(a, p) : 0;

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Legendre Symbol" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title="In Simple Terms"
                >
                    <View className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#fbbf24" />
                            <Text className="text-amber-400 font-bold ml-2 text-xs uppercase">Is It a Hidden Square?</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            In mod 7, is there a number whose square gives 2?  Try 3: <Text className="text-amber-400 font-bold">3² = 9 ≡ 2 (mod 7)</Text> ✓{"\n"}The Legendre symbol (a/p) answers <Text className="text-white font-bold">"does x² ≡ a (mod p) have a solution?"</Text> — it returns 1 (yes), -1 (no), or 0 (a is divisible by p).
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description="The Legendre symbol (a/p) is a function that indicates whether 'a' is a quadratic residue modulo 'p'."
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label="Integer a"
                                value={aStr}
                                onChangeText={setAStr}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label="Odd Prime p"
                                value={pStr}
                                onChangeText={setPStr}
                                keyboardType="numeric"
                                error={!isPPrime && pStr !== ''}
                            />
                        </View>
                    </View>

                    <Animated.View
                        key={`${a}-${p}`}
                        entering={ZoomIn}
                        className="bg-amber-500/10 p-8 rounded-2xl border border-amber-500/20 items-center"
                    >
                        <View className="flex-row items-center mb-4">
                            <Text className="text-slate-500 text-3xl font-mono">(</Text>
                            <View className="items-center mx-2">
                                <Text className="text-white text-xl font-bold">{a}</Text>
                                <View className="h-[1px] bg-slate-700 w-full my-1" />
                                <Text className="text-white text-xl font-bold">{p}</Text>
                            </View>
                            <Text className="text-slate-500 text-3xl font-mono">)</Text>
                            <Text className="text-amber-400 text-4xl font-black ml-4">= {result}</Text>
                        </View>

                        <Text className={`font-bold mt-2 uppercase text-[10px] ${result === 1 ? 'text-emerald-400' : result === -1 ? 'text-rose-400' : 'text-slate-500'}`}>
                            {result === 1 ? 'Quadratic Residue' : result === -1 ? 'Quadratic Non-Residue' : 'Divisible by p'}
                        </Text>
                    </Animated.View>
                </MathCard>

                <MathCard
                    index={2}
                    title="Legend & Meaning"
                >
                    <View className="space-y-4">
                        <LegendRow val="1" desc="'a' is a square modulo 'p' (x² ≡ a mod p exists)" color="#34d399" />
                        <LegendRow val="-1" desc="'a' is NOT a square modulo 'p'" color="#f43f5e" />
                        <LegendRow val="0" desc="'a' is a multiple of 'p'" color="#94a3b8" />
                    </View>
                </MathCard>

                <MathCard
                    index={3}
                    title="Euler's Criterion"
                >
                    <View className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="flash-outline" size={20} color="#fbbf24" />
                            <Text className="text-amber-400 font-bold ml-2">Quick Calculation</Text>
                        </View>
                        <Text className="text-slate-300 text-xs leading-5">
                            Legendre symbols can be calculated using Euler's criterion:{"\n"}
                            <Text className="text-white font-mono">(a/p) ≡ a^((p-1)/2) mod p</Text>{"\n\n"}
                            This is the method used by this tool!
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function LegendRow({ val, desc, color }: { val: string, desc: string, color: string }) {
    return (
        <View className="flex-row items-start">
            <View style={{ backgroundColor: color }} className="w-8 h-8 rounded-lg items-center justify-center mr-3 mt-1">
                <Text className="text-slate-950 font-black">{val}</Text>
            </View>
            <Text className="text-slate-400 text-sm flex-1">{desc}</Text>
        </View>
    );
}
