import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGoldbachPartitions } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function GoldbachScreen() {
    const [num, setNum] = useState('28');
    const n = parseInt(num) || 0;

    const isEven = n > 2 && n % 2 === 0;
    const partitions = getGoldbachPartitions(n);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Goldbach's Conjecture" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title="In Simple Terms"
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">The Big Idea</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Pick <Text className="text-white font-bold">any even number</Text> bigger than 2. You can always write it as the <Text className="text-emerald-400 font-bold">sum of two prime numbers</Text>. For example:{"\n"}• 20 = 3 + 17{"\n"}• 20 = 7 + 13{"\n"}Nobody has ever found an exception, yet nobody can prove it works for <Text className="text-white font-bold">every</Text> even number!
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description="Christian Goldbach conjectured that every even natural number greater than 2 is the sum of two prime numbers."
                >
                    <ThemedInput
                        label="Enter Even Number (>2)"
                        value={num}
                        onChangeText={setNum}
                        keyboardType="numeric"
                        error={!isEven && num !== ''}
                        helperText={!isEven && num !== '' ? 'Must be an even number > 2' : 'Visualize prime sums'}
                    />

                    {isEven && (
                        <Animated.View
                            key={n}
                            entering={FadeIn}
                            layout={Layout}
                            className="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20 items-center"
                        >
                            <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">Prime Partitions found</Text>
                            <Text className="text-white text-5xl font-black mb-1">{partitions.length}</Text>
                            <Text className="text-indigo-400 text-xs font-bold uppercase">Goldbach Pairs</Text>
                        </Animated.View>
                    )}
                </MathCard>

                {isEven && partitions.length > 0 && (
                    <MathCard
                        index={2}
                        title="Visualizing the Pairs"
                        description={`The number ${n} can be expressed in the following ways:`}
                    >
                        <View className="space-y-4">
                            {partitions.map(([p1, p2], i) => (
                                <Animated.View
                                    key={`${p1}-${p2}`}
                                    entering={FadeIn.delay(i * 100)}
                                    className="flex-row items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800"
                                >
                                    <View className="flex-row items-center flex-1 justify-center">
                                        <PrimeBox val={p1} color="sky" />
                                        <Text className="mx-4 text-slate-500 font-bold">+</Text>
                                        <PrimeBox val={p2} color="indigo" />
                                    </View>
                                    <View className="w-12 items-center">
                                        <Text className="text-slate-600 font-mono text-xs">=</Text>
                                        <Text className="text-white font-black">{n}</Text>
                                    </View>
                                </Animated.View>
                            ))}
                        </View>
                    </MathCard>
                )}

                <MathCard
                    index={3}
                    title="History & Status"
                >
                    <View className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="medal-outline" size={20} color="#fbbf24" />
                            <Text className="text-amber-400 font-bold ml-2">Unsolved Mystery</Text>
                        </View>
                        <Text className="text-slate-300 text-xs leading-5">
                            Despite being one of the oldest and best-known unsolved problems in number theory, it remains unproven for all numbers. It has been verified for all integers up to 4 × 10¹⁸!
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function PrimeBox({ val, color }: { val: number, color: 'sky' | 'indigo' }) {
    const bgColor = color === 'sky' ? 'bg-sky-500/20' : 'bg-indigo-500/20';
    const textColor = color === 'sky' ? 'text-sky-400' : 'text-indigo-400';
    const borderColor = color === 'sky' ? 'border-sky-500/30' : 'border-indigo-500/30';

    return (
        <View className={`${bgColor} ${borderColor} border px-4 py-2 rounded-xl min-w-[60px] items-center`}>
            <Text className={`${textColor} font-black text-lg`}>{val}</Text>
            <Text className={`${textColor} text-[8px] uppercase font-bold`}>Prime</Text>
        </View>
    );
}
