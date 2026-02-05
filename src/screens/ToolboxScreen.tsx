import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGCDWithSteps, isPrime, getPrimeFactors } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function ToolboxScreen() {
    const [numA, setNumA] = useState('48');
    const [numB, setNumB] = useState('18');
    const [gcdResult, setGcdResult] = useState<{ gcd: number; steps: string[] } | null>(null);

    const [checkNum, setCheckNum] = useState('17');
    const [primeInfo, setPrimeInfo] = useState<{ isPrime: boolean; factors: number[] } | null>(null);

    const handleCalculateGCD = () => {
        const a = parseInt(numA);
        const b = parseInt(numB);
        if (!isNaN(a) && !isNaN(b)) {
            setGcdResult(getGCDWithSteps(a, b));
        }
    };

    const handleCheckPrime = () => {
        const n = parseInt(checkNum);
        if (!isNaN(n)) {
            setPrimeInfo({
                isPrime: isPrime(n),
                factors: getPrimeFactors(n)
            });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Utility Toolbox" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                {/* GCD Section */}
                <MathCard
                    index={0}
                    title="Euclidean Algorithm (GCD)"
                    description="Find the Greatest Common Divisor using the recursive division method."
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label="Number A"
                                value={numA}
                                onChangeText={setNumA}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label="Number B"
                                value={numB}
                                onChangeText={setNumB}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handleCalculateGCD}
                        className="bg-sky-600 p-4 rounded-2xl items-center shadow-lg active:bg-sky-700"
                    >
                        <Text className="text-white font-bold text-lg">Calculate GCD</Text>
                    </TouchableOpacity>

                    {gcdResult && (
                        <Animated.View entering={FadeIn} className="mt-6 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-slate-500 text-xs font-bold uppercase">Resulting GCD</Text>
                                <Text className="text-sky-400 font-mono text-2xl font-black">{gcdResult.gcd}</Text>
                            </View>
                            <Text className="text-slate-600 text-[10px] font-bold uppercase mb-2">Division Steps</Text>
                            {gcdResult.steps.map((step, i) => (
                                <Text key={i} className="text-slate-400 font-mono text-[10px] mb-1.5 leading-4">
                                    {step}
                                </Text>
                            ))}
                        </Animated.View>
                    )}
                </MathCard>

                {/* Primality Section */}
                <MathCard
                    index={1}
                    title="Primality & Factors"
                    description="Check if a number is prime and find its prime factorization."
                >
                    <ThemedInput
                        label="Number to Check"
                        value={checkNum}
                        onChangeText={setCheckNum}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity
                        onPress={handleCheckPrime}
                        className="bg-emerald-600 p-4 rounded-2xl items-center shadow-lg active:bg-emerald-700"
                    >
                        <Text className="text-white font-bold text-lg">Check Primality</Text>
                    </TouchableOpacity>

                    {primeInfo && (
                        <Animated.View entering={FadeIn} className="mt-6 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
                            <View className="flex-row items-center justify-between mb-4">
                                <View>
                                    <Text className="text-slate-500 text-xs font-bold uppercase mb-1">Classification</Text>
                                    <Text className={`font-bold text-xl ${primeInfo.isPrime ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {primeInfo.isPrime ? 'PRIME NUMBER' : 'COMPOSITE'}
                                    </Text>
                                </View>
                                <Ionicons
                                    name={primeInfo.isPrime ? "checkmark-circle" : "close-circle"}
                                    size={32}
                                    color={primeInfo.isPrime ? "#34d399" : "#f43f5e"}
                                />
                            </View>
                            {!primeInfo.isPrime && (
                                <View className="pt-4 border-t border-slate-900">
                                    <Text className="text-slate-600 text-[10px] font-bold uppercase mb-2">Prime Factors</Text>
                                    <Text className="text-white font-mono text-lg font-bold letter-spacing-1">
                                        {primeInfo.factors.join(' × ')}
                                    </Text>
                                </View>
                            )}
                        </Animated.View>
                    )}
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
