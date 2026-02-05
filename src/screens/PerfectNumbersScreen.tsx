import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { isPerfect } from '../utils/math';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

export default function PerfectNumbersScreen() {
    const navigation = useNavigation();
    const [num, setNum] = useState('28');
    const n = parseInt(num) || 0;
    const { perfect, sum, divisors } = isPerfect(n);

    const classification = sum === n ? 'Perfect' : sum > n ? 'Abundant' : 'Deficient';
    const color = classification === 'Perfect' ? 'text-emerald-400' : classification === 'Abundant' ? 'text-amber-400' : 'text-slate-400';
    const bgColor = classification === 'Perfect' ? 'bg-emerald-500/10' : classification === 'Abundant' ? 'bg-amber-500/10' : 'bg-slate-500/10';
    const borderColor = classification === 'Perfect' ? 'border-emerald-500/20' : classification === 'Abundant' ? 'border-amber-500/20' : 'border-slate-500/20';

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Perfect Numbers</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mb-8">
                    <Text className="text-slate-400 text-sm mb-6 leading-6">
                        A <Text className="text-white font-bold">Perfect Number</Text> is a positive integer that is equal to the sum of its proper divisors (excluding itself).
                    </Text>

                    <Text className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">Enter a Number</Text>
                    <TextInput
                        value={num}
                        onChangeText={setNum}
                        keyboardType="numeric"
                        className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 text-3xl font-black mb-8 text-center"
                    />

                    <Animated.View key={n} entering={FadeIn} className={`${bgColor} ${borderColor} border p-8 rounded-3xl items-center mb-8`}>
                        <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Classification</Text>
                        <Text className={`text-4xl font-black ${color} mb-4`}>{classification}</Text>
                        <Text className="text-white text-center text-sm leading-6">
                            Sum of proper divisors: <Text className="font-bold">{divisors.join(' + ')} = {sum}</Text>
                        </Text>
                    </Animated.View>

                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="bulb-outline" size={20} color="#fbbf24" />
                            <Text className="text-amber-400 font-bold ml-2">Did you know?</Text>
                        </View>
                        <Text className="text-slate-300 text-sm leading-6">
                            The first few perfect numbers are <Text className="text-white font-bold">6, 28, 496, and 8128</Text>.{"\n\n"}
                            Euclid discovered that <Text className="text-indigo-400 font-mono">2ᵖ⁻¹(2ᵖ - 1)</Text> is an even perfect number whenever <Text className="text-indigo-400 font-mono">2ᵖ - 1</Text> is a Mersenne prime.
                        </Text>
                    </View>

                    <View className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 mb-12">
                        <Text className="text-slate-500 text-xs font-bold uppercase mb-4">Other Categories</Text>
                        <View className="space-y-4">
                            <View>
                                <Text className="text-amber-400 font-bold mb-1">Abundant</Text>
                                <Text className="text-slate-400 text-xs">Sum of divisors is greater than the number (e.g., 12).</Text>
                            </View>
                            <View>
                                <Text className="text-slate-400 font-bold mb-1">Deficient</Text>
                                <Text className="text-slate-500 text-xs">Sum of divisors is less than the number (e.g., 8).</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
