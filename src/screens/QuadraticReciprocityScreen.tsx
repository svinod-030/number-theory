import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { isPrime, legendreSymbol, jacobiSymbol } from '../utils/math';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

export default function QuadraticReciprocityScreen() {
    const navigation = useNavigation();
    const [numA, setNumA] = useState('3');
    const [numP, setNumP] = useState('13');

    const a = parseInt(numA) || 0;
    const p = parseInt(numP) || 0;

    const pIsPrime = isPrime(p);
    const symbol = pIsPrime ? legendreSymbol(a, p) : jacobiSymbol(a, p);

    // For QR explanation, check if a is also a prime
    const aIsPrime = isPrime(a);
    const qrApplies = pIsPrime && aIsPrime && p % 2 !== 0 && a % 2 !== 0 && a !== p;

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Quadratic Reciprocity</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    <View className="flex-row space-x-4 mb-8">
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs font-bold mb-2 uppercase">Integer (a)</Text>
                            <TextInput
                                value={numA}
                                onChangeText={setNumA}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs font-bold mb-2 uppercase">Modulus (p)</Text>
                            <TextInput
                                value={numP}
                                onChangeText={setNumP}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                    </View>

                    <Animated.View key={`${a}-${p}`} entering={FadeIn} className="mb-8 p-8 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 items-center">
                        <Text className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
                            {pIsPrime ? 'Legendre Symbol (a/p)' : 'Jacobi Symbol (a/n)'}
                        </Text>
                        <View className="flex-row items-center mb-4">
                            <View className="items-center mr-4">
                                <Text className="text-3xl font-mono text-white">({a}/{p}) = </Text>
                            </View>
                            <Text className={`text-6xl font-black ${symbol === 1 ? 'text-emerald-400' : symbol === -1 ? 'text-rose-400' : 'text-slate-500'}`}>
                                {symbol}
                            </Text>
                        </View>
                        <Text className="text-slate-400 text-sm text-center">
                            {symbol === 1
                                ? `${a} is a quadratic residue modulo ${p}`
                                : symbol === -1
                                    ? `${a} is a quadratic non-residue modulo ${p}`
                                    : `${p} divides ${a}`}
                        </Text>
                    </Animated.View>

                    {qrApplies && (
                        <Animated.View entering={SlideInDown} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8">
                            <View className="flex-row items-center mb-4">
                                <Ionicons name="git-compare-outline" size={20} color="#818cf8" />
                                <Text className="text-indigo-400 font-bold ml-2">Law of Reciprocity</Text>
                            </View>
                            <Text className="text-slate-300 text-sm leading-6 mb-4">
                                Since both <Text className="text-white font-bold">{a}</Text> and <Text className="text-white font-bold">{p}</Text> are odd primes, the relationship between ({a}/{p}) and ({p}/{a}) is:
                            </Text>
                            <View className="bg-slate-800 p-4 rounded-2xl items-center mb-4">
                                <Text className="text-white font-mono text-lg font-bold">
                                    ({a}/{p})({p}/{a}) = (-1)
                                    <View style={{ marginBottom: 12 }}>
                                        <Text className="text-white font-mono text-[10px]">({a}-1)({p}-1)/4</Text>
                                    </View>
                                </Text>
                            </View>
                            <Text className="text-slate-400 text-xs leading-5">
                                If either {a} or {p} is ≡ 1 (mod 4), then ({a}/{p}) = ({p}/{a}).{"\n"}
                                If both are ≡ 3 (mod 4), then ({a}/{p}) = -({p}/{a}).
                            </Text>
                        </Animated.View>
                    )}

                    <View className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 mb-12">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="information-circle-outline" size={20} color="#818cf8" />
                            <Text className="text-indigo-400 font-bold ml-2">What is a Quadratic Residue?</Text>
                        </View>
                        <Text className="text-slate-400 text-sm leading-6">
                            An integer <Text className="text-white font-bold">a</Text> is a quadratic residue modulo <Text className="text-white font-bold">p</Text> if there exists some <Text className="text-white font-bold">x</Text> such that:
                            {"\n\n"}
                            <Text className="text-indigo-400 font-mono">x² ≡ a (mod p)</Text>
                            {"\n\n"}
                            The Legendre symbol is a concise way to represent this property. It is fundamental in primality testing and cryptography.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
