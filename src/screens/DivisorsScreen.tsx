import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getNumberClassification } from '../utils/math';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function DivisorsScreen() {
    const navigation = useNavigation();
    const [input, setInput] = useState('28');

    const n = parseInt(input) || 0;
    const { classification, sum, properDivisors } = getNumberClassification(n);

    const getBadgeColor = () => {
        if (classification === 'Perfect') return 'bg-emerald-500';
        if (classification === 'Abundant') return 'bg-amber-500';
        return 'bg-slate-700';
    };

    const getTextColor = () => {
        if (classification === 'Perfect') return 'text-emerald-400';
        if (classification === 'Abundant') return 'text-amber-400';
        return 'text-slate-400';
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Perfect & Divisors</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="px-6 pt-6">
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-6">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">In Simple Terms</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            A number's <Text className="text-white font-bold">divisors</Text> are the numbers that divide it evenly. Add up all divisors except the number itself — if the sum <Text className="text-emerald-400 font-bold">equals the number</Text>, it's <Text className="text-white font-bold">Perfect</Text>!{"\n"}Example: 28 → divisors 1, 2, 4, 7, 14 → sum = 28. ✓ Only a handful of perfect numbers are known!
                        </Text>
                    </View>

                    <View className="flex-row items-center space-x-4 mb-8">
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">Input Number</Text>
                            <TextInput
                                value={input}
                                onChangeText={setInput}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                                placeholder="e.g. 28"
                            />
                        </View>
                        <Animated.View
                            key={classification}
                            entering={ZoomIn}
                            className={`${getBadgeColor()} mt-4 px-6 py-2 rounded-2xl items-center justify-center min-w-[120px]`}
                        >
                            <Text className="text-white text-xs font-bold uppercase tracking-tighter opacity-80">Type</Text>
                            <Text className="text-white font-black text-lg">{classification}</Text>
                        </Animated.View>
                    </View>

                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8 items-center">
                        <Text className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold text-center">Sum of Proper Divisors</Text>
                        <Text className={`text-5xl font-black mb-4 ${getTextColor()}`}>{sum}</Text>

                        <View className="flex-row flex-wrap justify-center border-t border-slate-800 pt-6 w-full">
                            <Text className="text-slate-500 font-mono text-center px-4 leading-6">
                                {properDivisors.join(' + ')} = {sum}
                            </Text>
                        </View>
                    </View>

                    <Text className="text-slate-500 text-xs mb-4 uppercase tracking-widest font-bold">All Divisors of {n}</Text>
                    <View className="flex-row flex-wrap mb-10">
                        {properDivisors.concat(n).map((d, i) => {
                            const isProper = d < n;
                            return (
                                <Animated.View
                                    key={i}
                                    entering={FadeIn.delay(i * 50)}
                                    className={`mr-3 mb-3 p-4 rounded-2xl border ${isProper ? 'bg-slate-900 border-slate-800' : 'bg-sky-950 border-sky-500/30'}`}
                                    style={{ width: (width - 72) / 3 }}
                                >
                                    <Text className="text-slate-500 text-[10px] uppercase font-bold mb-1">{isProper ? 'Proper' : 'Self'}</Text>
                                    <Text className="text-white text-xl font-bold">{d}</Text>
                                </Animated.View>
                            );
                        })}
                    </View>

                    <View className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 mb-12">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="bulb-outline" size={20} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2">Definition</Text>
                        </View>
                        <View className="space-y-4">
                            <View>
                                <Text className="text-white font-bold mb-1">Perfect</Text>
                                <Text className="text-slate-400 text-sm leading-5">Sum of proper divisors exactly equals the number (e.g. 6 = 1+2+3).</Text>
                            </View>
                            <View className="border-t border-slate-800 pt-4">
                                <Text className="text-white font-bold mb-1">Abundant</Text>
                                <Text className="text-slate-400 text-sm leading-5">Sum of proper divisors is greater than the number.</Text>
                            </View>
                            <View className="border-t border-slate-800 pt-4">
                                <Text className="text-white font-bold mb-1">Deficient</Text>
                                <Text className="text-slate-400 text-sm leading-5">Sum of proper divisors is less than the number.</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
