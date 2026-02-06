import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getContinuedFraction } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function ContinuedFractionScreen() {
    const [numInput, setNumInput] = useState('13');
    const [denInput, setDenInput] = useState('8');

    const a = parseInt(numInput) || 1;
    const b = parseInt(denInput) || 1;

    const coefficients = useMemo(() => getContinuedFraction(a, b), [a, b]);

    const renderNestedFraction = (index: number) => {
        if (index >= coefficients.length - 1) {
            return (
                <View className="items-center px-6 py-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <Text className="text-white text-2xl font-black">{coefficients[index]}</Text>
                </View>
            );
        }

        return (
            <View className="flex-row items-start">
                <View style={{ paddingTop: 26 }}>
                    <Text className="text-white text-xl font-bold mr-3">{coefficients[index]} + </Text>
                </View>
                <View className="flex-1">
                    <View className="items-center border-b border-slate-700 pb-1 mb-2 min-w-[40px]">
                        <Text className="text-sky-400 font-bold text-sm">1</Text>
                    </View>
                    <View>
                        {renderNestedFraction(index + 1)}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Continued Fractions" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="Any rational number can be represented as a finite continued fraction [a₀; a₁, a₂, ...]."
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label="Numerator"
                                value={numInput}
                                onChangeText={setNumInput}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label="Denominator"
                                value={denInput}
                                onChangeText={setDenInput}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View className="mt-4 p-6 bg-slate-900 rounded-2xl border border-slate-800 items-center justify-between flex-row">
                        <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">List Notation</Text>
                        <Text className="text-sky-400 font-mono text-lg font-bold">
                            [{coefficients.join('; ')}]
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    title="Nested Representation"
                >
                    <View className="bg-slate-900/50 rounded-2xl border border-slate-800/50 w-full overflow-hidden">
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ padding: 32 }}
                        >
                            <View className="items-start">
                                {coefficients.length > 0 ? renderNestedFraction(0) : <Text className="text-slate-600 italic">Invalid fraction</Text>}
                            </View>
                        </ScrollView>
                    </View>
                </MathCard>

                <MathCard
                    index={2}
                    title="Coefficient List"
                >
                    <View className="space-y-3">
                        {coefficients.map((coeff, i) => (
                            <Animated.View
                                key={i}
                                entering={FadeIn.delay(i * 100)}
                                className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex-row items-center justify-between"
                            >
                                <View className="flex-row items-center">
                                    <View className="w-8 h-8 rounded-full bg-slate-800 items-center justify-center mr-3 border border-slate-700">
                                        <Text className="text-slate-500 font-bold text-[10px]">{i}</Text>
                                    </View>
                                    <View>
                                        <Text className="text-white font-bold text-xs">Coefficient a{i === 0 ? '₀' : i === 1 ? '₁' : `ₖ`}</Text>
                                    </View>
                                </View>
                                <Text className="text-sky-400 text-2xl font-black">{coeff}</Text>
                            </Animated.View>
                        ))}
                    </View>
                </MathCard>

                <MathCard
                    index={3}
                    title="Connection"
                >
                    <View className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="link-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase font-bold">Euclidean Link</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Continued fractions are the visual manifestation of the Euclidean Algorithm. Each coefficient corresponds to a quotient in the division steps of GCD(numerator, denominator)!
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
