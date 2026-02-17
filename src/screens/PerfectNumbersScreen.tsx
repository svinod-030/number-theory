import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isPerfect } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function PerfectNumbersScreen() {
    const [num, setNum] = useState('28');
    const n = parseInt(num) || 0;
    const { perfect, sum, divisors } = isPerfect(n);

    const classification = sum === n ? 'Perfect' : sum > n ? 'Abundant' : 'Deficient';
    const color = classification === 'Perfect' ? 'text-emerald-400' : classification === 'Abundant' ? 'text-amber-400' : 'text-slate-400';
    const bgColor = classification === 'Perfect' ? 'bg-emerald-500/10' : classification === 'Abundant' ? 'bg-amber-500/10' : 'bg-slate-500/10';
    const borderColor = classification === 'Perfect' ? 'border-emerald-500/20' : classification === 'Abundant' ? 'border-amber-500/20' : 'border-slate-500/20';

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Perfect Numbers" />

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
                            <Ionicons name="bulb-outline" size={18} color="#10b981" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">Numbers That "Add Up"</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Take <Text className="text-white font-bold">6</Text>: its divisors are 1, 2, 3. Add them: 1+2+3 = <Text className="text-emerald-400 font-bold">6</Text>. It equals itself — a <Text className="text-white font-bold">perfect number</Text>!{"\n"}Next one? <Text className="text-emerald-400 font-bold">28</Text> (1+2+4+7+14 = 28). After that, 496, then 8128. They're incredibly rare!
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description="A Perfect Number is a positive integer that is equal to the sum of its proper divisors (excluding itself)."
                >
                    <ThemedInput
                        label="Check Integer"
                        value={num}
                        onChangeText={setNum}
                        keyboardType="numeric"
                        className={`text-center text-3xl font-black ${color}`}
                    />

                    <Animated.View key={n} entering={FadeIn} className={`${bgColor} ${borderColor} border p-8 rounded-2xl items-center`}>
                        <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Classification</Text>
                        <Text className={`text-4xl font-black ${color} mb-4`}>{classification}</Text>

                        <View className="bg-slate-950/40 p-4 rounded-xl w-full">
                            <Text className="text-slate-500 text-[8px] font-bold uppercase mb-2 text-center">Sum Calculation</Text>
                            <Text className="text-white text-center text-xs font-mono leading-5">
                                {divisors.length > 0 ? divisors.join(' + ') : '0'} = <Text className={`${color} font-bold`}>{sum}</Text>
                            </Text>
                        </View>
                    </Animated.View>
                </MathCard>

                <MathCard
                    index={2}
                    title="Number Theory Insights"
                >
                    <View className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-6">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="bulb-outline" size={20} color="#fbbf24" />
                            <Text className="text-amber-400 font-bold ml-2">Mersenne Primes</Text>
                        </View>
                        <Text className="text-slate-300 text-xs leading-5">
                            Euclid discovered that <Text className="text-indigo-400 font-mono">2ᵖ⁻¹(2ᵖ - 1)</Text> is a perfect number whenever <Text className="text-indigo-400 font-mono">2ᵖ - 1</Text> is prime.
                        </Text>
                    </View>

                    <View className="space-y-4">
                        <InfoRow title="Abundant" desc="Sum of divisors exceeds the number (e.g., 12)." color="#fbbf24" />
                        <InfoRow title="Deficient" desc="Sum of divisors is less than the number (e.g., 8)." color="#94a3b8" />
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function InfoRow({ title, desc, color }: { title: string, desc: string, color: string }) {
    return (
        <View className="flex-row items-start">
            <View style={{ backgroundColor: `${color}20` }} className="p-1 rounded-full mr-3 mt-1" />
            <Text className="text-slate-400 text-xs flex-1">
                <Text style={{ color }} className="font-bold">{title}:</Text> {desc}
            </Text>
        </View>
    );
}
