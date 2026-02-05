import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { solveLinearDiophantine } from '../utils/math';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

export default function DiophantineScreen() {
    const navigation = useNavigation();
    const [numA, setNumA] = useState('3');
    const [numB, setNumB] = useState('4');
    const [numC, setNumC] = useState('5');

    const a = parseInt(numA) || 0;
    const b = parseInt(numB) || 0;
    const c = parseInt(numC) || 0;

    const result = solveLinearDiophantine(a, b, c);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Diophantine Equations</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    <View className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mb-8 items-center">
                        <Text className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">The Equation</Text>
                        <Text className="text-4xl font-black text-white">
                            {a}x + {b}y = {c}
                        </Text>
                    </View>

                    <View className="flex-row space-x-4 mb-8">
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-bold mb-2 uppercase">a</Text>
                            <TextInput
                                value={numA}
                                onChangeText={setNumA}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-bold mb-2 uppercase">b</Text>
                            <TextInput
                                value={numB}
                                onChangeText={setNumB}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-bold mb-2 uppercase">c</Text>
                            <TextInput
                                value={numC}
                                onChangeText={setNumC}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                    </View>

                    {result ? (
                        result.possible ? (
                            <Animated.View key={`${a}-${b}-${c}`} entering={FadeIn} className="mb-8 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20">
                                <Text className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4 text-center">Particular Solution</Text>
                                <View className="flex-row justify-around mb-6">
                                    <View className="items-center">
                                        <Text className="text-4xl font-black text-white">x₀ = {result.x0}</Text>
                                    </View>
                                    <View className="items-center">
                                        <Text className="text-4xl font-black text-white">y₀ = {result.y0}</Text>
                                    </View>
                                </View>
                                <View className="bg-slate-900/50 p-4 rounded-2xl">
                                    <Text className="text-slate-400 text-xs font-bold uppercase mb-2">General Solution</Text>
                                    <Text className="text-white font-mono text-lg">
                                        x = {result.x0} + {result.stepX}k {"\n"}
                                        y = {result.y0} - {result.stepY}k
                                    </Text>
                                    <Text className="text-slate-500 text-xs mt-2 italic">(where k is any integer)</Text>
                                </View>
                            </Animated.View>
                        ) : (
                            <View className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-3xl items-center mb-8">
                                <Text className="text-rose-400 font-bold mb-2">No Integer Solution</Text>
                                <Text className="text-slate-400 text-sm text-center">
                                    gcd({a}, {b}) = {result.g}, which does not divide {c}.
                                </Text>
                            </View>
                        )
                    ) : null}

                    <View className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 mb-12">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="help-circle-outline" size={20} color="#fbbf24" />
                            <Text className="text-amber-400 font-bold ml-2">How it works</Text>
                        </View>
                        <Text className="text-slate-400 text-sm leading-6">
                            A linear Diophantine equation has integer solutions if and only if the <Text className="text-white font-bold">greatest common divisor</Text> of a and b divides c.
                            {"\n\n"}
                            We use the <Text className="text-white font-bold">Extended Euclidean Algorithm</Text> to find one specific solution (x₀, y₀), then add multiples of (b/g) and subtract multiples of (a/g) to find all others.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
