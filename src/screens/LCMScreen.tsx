import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getGCDWithSteps, getLCM } from '../utils/math';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function LCMScreen() {
    const navigation = useNavigation();
    const [numA, setNumA] = useState('4');
    const [numB, setNumB] = useState('6');
    const [lcm, setLcm] = useState(12);

    const handleCalculate = () => {
        const a = parseInt(numA);
        const b = parseInt(numB);
        if (!isNaN(a) && !isNaN(b)) {
            setLcm(getLCM(a, b));
        }
    };

    const multiplesA = Array.from({ length: 15 }, (_, i) => parseInt(numA) * (i + 1));
    const multiplesB = Array.from({ length: 15 }, (_, i) => parseInt(numB) * (i + 1));

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">LCM Visualizer</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="px-6">
                <View className="mb-8">
                    <Text className="text-slate-400 text-sm mb-4">
                        Least Common Multiple is the smallest positive integer that is divisible by both numbers.
                    </Text>

                    <View className="flex-row space-x-4 mb-4">
                        <TextInput
                            value={numA}
                            onChangeText={setNumA}
                            keyboardType="numeric"
                            className="flex-1 bg-slate-900 text-white p-4 rounded-xl border border-slate-800"
                            placeholder="A"
                        />
                        <TextInput
                            value={numB}
                            onChangeText={setNumB}
                            keyboardType="numeric"
                            className="flex-1 bg-slate-900 text-white p-4 rounded-xl border border-slate-800"
                            placeholder="B"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleCalculate}
                        className="bg-sky-600 p-4 rounded-xl items-center"
                    >
                        <Text className="text-white font-bold text-lg">Calculate LCM</Text>
                    </TouchableOpacity>
                </View>

                {lcm > 0 && (
                    <Animated.View
                        entering={FadeInUp}
                        className="bg-slate-900 p-6 rounded-3xl border border-sky-900/50 mb-8 items-center"
                    >
                        <Text className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-bold">The LCM is</Text>
                        <Text className="text-5xl font-black text-sky-400">{lcm}</Text>
                    </Animated.View>
                )}

                <View className="space-y-6 pb-12">
                    <View>
                        <Text className="text-sky-400 font-bold mb-3">Multiples of {numA}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                            {multiplesA.map((m, i) => (
                                <View
                                    key={i}
                                    className={`w-12 h-12 rounded-lg items-center justify-center mr-2 border ${m === lcm ? 'bg-sky-600 border-sky-400' : 'bg-slate-900 border-slate-800'
                                        }`}
                                >
                                    <Text className="text-white font-bold">{m}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View>
                        <Text className="text-sky-400 font-bold mb-3">Multiples of {numB}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                            {multiplesB.map((m, i) => (
                                <View
                                    key={i}
                                    className={`w-12 h-12 rounded-lg items-center justify-center mr-2 border ${m === lcm ? 'bg-sky-600 border-sky-400' : 'bg-slate-900 border-slate-800'
                                        }`}
                                >
                                    <Text className="text-white font-bold">{m}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                        <Text className="text-white font-bold mb-2">The Relationship</Text>
                        <Text className="text-slate-400 text-sm leading-5">
                            LCM(a, b) = |a × b| / GCD(a, b).
                            {!isNaN(parseInt(numA)) && !isNaN(parseInt(numB)) && (
                                <Text> For {numA} and {numB}, GCD is {getGCDWithSteps(parseInt(numA), parseInt(numB)).gcd}.</Text>
                            )}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
