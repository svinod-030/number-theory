import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { powerMod, isPrime } from '../utils/math';
import Animated, { ZoomIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function ModularExponentiationScreen() {
    const navigation = useNavigation();
    const [base, setBase] = useState('2');
    const [exp, setExp] = useState('10');
    const [mod, setMod] = useState('7');

    const b = parseInt(base) || 0;
    const e = parseInt(exp) || 0;
    const m = parseInt(mod) || 1;

    const result = powerMod(b, e, m);
    const isModPrime = isPrime(m);

    // Fermat's Little Theorem: a^(p-1) ≡ 1 (mod p)
    const canUseFermat = isModPrime && (b % m !== 0);
    const fermatExp = m - 1;
    const fermatResult = powerMod(b, fermatExp, m);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Modular Exponentiation</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8 items-center">
                        <Text className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">The Calculation</Text>
                        <View className="flex-row items-baseline">
                            <Text className="text-4xl font-black text-white">{b}</Text>
                            <Text className="text-xl font-black text-sky-400 mb-4">{e}</Text>
                            <Text className="text-4xl font-black text-white"> mod {m}</Text>
                        </View>
                    </View>

                    <View className="flex-row space-x-2 mb-8">
                        <View className="flex-1">
                            <Text className="text-slate-500 text-[10px] font-bold mb-2 uppercase">Base (a)</Text>
                            <TextInput
                                value={base}
                                onChangeText={setBase}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 font-bold"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-500 text-[10px] font-bold mb-2 uppercase">Exp (k)</Text>
                            <TextInput
                                value={exp}
                                onChangeText={setExp}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 font-bold"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-500 text-[10px] font-bold mb-2 uppercase">Mod (n)</Text>
                            <TextInput
                                value={mod}
                                onChangeText={setMod}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 font-bold"
                            />
                        </View>
                    </View>

                    <Animated.View key={`${b}-${e}-${m}`} entering={ZoomIn} className="mb-8 p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 items-center">
                        <Text className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Result</Text>
                        <Text className="text-6xl font-black text-emerald-400">{result}</Text>
                    </Animated.View>

                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="sparkles-outline" size={20} color="#fbbf24" />
                            <Text className="text-amber-400 font-bold ml-2">Fermat's Little Theorem</Text>
                        </View>
                        {canUseFermat ? (
                            <View>
                                <Text className="text-slate-300 text-sm leading-6 mb-4">
                                    Since <Text className="text-white font-bold">{m}</Text> is prime and does not divide <Text className="text-white font-bold">{b}</Text>, Fermat's Little Theorem states:
                                </Text>
                                <View className="bg-slate-800 p-4 rounded-2xl flex-row items-center justify-center mb-4">
                                    <Text className="text-white font-mono text-lg">{b}</Text>
                                    <View style={{ marginBottom: 12 }}>
                                        <Text className="text-white font-mono text-xs">{m - 1}</Text>
                                    </View>
                                    <Text className="text-white font-mono text-lg"> ≡ 1 (mod {m})</Text>
                                </View>
                                <Text className="text-slate-400 text-xs text-center">
                                    This allows us to reduce large exponents by taking <Text className="text-slate-200">exp mod (p-1)</Text>.
                                </Text>
                            </View>
                        ) : (
                            <Text className="text-slate-500 text-sm italic">
                                Fermat's Little Theorem only applies when the modulus is prime and coprime to the base.
                            </Text>
                        )}
                    </View>

                    <View className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 mb-12">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="flash-outline" size={20} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2">Binary Exponentiation</Text>
                        </View>
                        <Text className="text-slate-400 text-sm leading-6">
                            Standard exponentiation grows too fast for computers. We use <Text className="text-white font-bold">Square-and-Multiply</Text> to calculate results in <Text className="text-white font-bold">O(log k)</Text> time, never handling numbers larger than the square of the modulus.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
