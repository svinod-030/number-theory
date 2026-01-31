import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getContinuedFraction } from '../utils/math';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function ContinuedFractionScreen() {
    const navigation = useNavigation();
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
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Continued Fractions</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="px-6 pt-6">
                    <View className="flex-row space-x-4 mb-8">
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">Numerator</Text>
                            <TextInput
                                value={numInput}
                                onChangeText={setNumInput}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">Denominator</Text>
                            <TextInput
                                value={denInput}
                                onChangeText={setDenInput}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                    </View>

                    <View className="bg-slate-900 rounded-3xl border border-slate-800 p-8 mb-8 items-center overflow-hidden">
                        <Text className="text-slate-500 text-xs mb-6 uppercase tracking-widest font-bold">Fraction Notation</Text>
                        <View className="bg-slate-950/50 rounded-2xl border border-slate-800/50 w-full overflow-hidden">
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

                        <View className="mt-8 pt-6 border-t border-slate-800 w-full flex-row items-center justify-between">
                            <Text className="text-slate-400 font-bold">List Form:</Text>
                            <Text className="text-sky-400 font-mono text-lg">
                                [{coefficients.join('; ')}]
                            </Text>
                        </View>
                    </View>

                    <Text className="text-slate-500 text-xs mb-4 uppercase tracking-widest font-bold">Expansion steps</Text>
                    <View className="space-y-3 mb-10">
                        {coefficients.map((coeff, i) => (
                            <Animated.View
                                key={i}
                                entering={FadeIn.delay(i * 100)}
                                className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex-row items-center justify-between"
                            >
                                <View className="flex-row items-center">
                                    <View className="w-8 h-8 rounded-full bg-slate-800 items-center justify-center mr-3">
                                        <Text className="text-slate-400 font-bold text-xs">{i}</Text>
                                    </View>
                                    <Text className="text-white font-bold">Coefficient aₖ</Text>
                                </View>
                                <Text className="text-sky-400 text-2xl font-black">{coeff}</Text>
                            </Animated.View>
                        ))}
                    </View>

                    <View className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 mb-12">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="school-outline" size={20} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2">What is this?</Text>
                        </View>
                        <Text className="text-slate-400 text-sm leading-5">
                            Any rational number can be written as a finite continued fraction. This structure is intimately related to the Euclidean algorithm—each coefficient is a quotient from the division steps!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
