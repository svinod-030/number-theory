import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { isPrime, getGCDWithSteps, getModularInverse, powerMod } from '../utils/math';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

export default function RSAScreen() {
    const navigation = useNavigation();
    const [p, setP] = useState('61');
    const [q, setQ] = useState('53');
    const [message, setMessage] = useState('42');

    const numP = parseInt(p) || 0;
    const numQ = parseInt(q) || 0;
    const m = parseInt(message) || 0;

    const n = numP * numQ;
    const phi = (numP - 1) * (numQ - 1);

    // Choose e = 17 for demo if p,q are small enough
    const e = 17;
    const { gcd } = getGCDWithSteps(e, phi);
    const eIsValid = e < phi && gcd === 1;

    const d = eIsValid ? getModularInverse(e, phi) : null;

    const c = (eIsValid && m < n) ? powerMod(m, e, n) : null;
    const decrypted = (d !== null && c !== null) ? powerMod(c, d, n) : null;

    const pPrime = isPrime(numP);
    const qPrime = isPrime(numQ);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">RSA Cryptography</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mb-8">
                    <Text className="text-slate-400 text-sm mb-6 leading-6">
                        RSA uses the difficulty of factoring large numbers. It relies on two large primes to generate a public key for encryption and a private key for decryption.
                    </Text>

                    <Text className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">1. Key Generation</Text>
                    <View className="flex-row space-x-4 mb-4">
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-bold mb-2 uppercase">Prime p</Text>
                            <TextInput
                                value={p}
                                onChangeText={setP}
                                keyboardType="numeric"
                                className={`bg-slate-900 text-white p-4 rounded-2xl border ${pPrime ? 'border-slate-800' : 'border-rose-500/50'} text-lg font-bold`}
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-bold mb-2 uppercase">Prime q</Text>
                            <TextInput
                                value={q}
                                onChangeText={setQ}
                                keyboardType="numeric"
                                className={`bg-slate-900 text-white p-4 rounded-2xl border ${qPrime ? 'border-slate-800' : 'border-rose-500/50'} text-lg font-bold`}
                            />
                        </View>
                    </View>

                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8 space-y-4">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-slate-500 text-xs font-bold uppercase">Modulus (n = p×q)</Text>
                            <Text className="text-white font-mono text-lg">{n}</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-slate-500 text-xs font-bold uppercase">Totient (φ = (p-1)(q-1))</Text>
                            <Text className="text-white font-mono text-lg">{phi}</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-slate-500 text-xs font-bold uppercase">Public Exponent (e)</Text>
                                <Text className="text-slate-600 text-[10px]">Must be coprime to φ</Text>
                            </View>
                            <Text className={`font-mono text-lg ${eIsValid ? 'text-emerald-400' : 'text-rose-400'}`}>{e}</Text>
                        </View>
                        {d !== null && (
                            <View className="flex-row justify-between items-center bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20">
                                <View>
                                    <Text className="text-indigo-400 text-xs font-bold uppercase">Private Key (d)</Text>
                                    <Text className="text-indigo-400/60 text-[10px]">Inverse of e mod φ</Text>
                                </View>
                                <Text className="text-white font-mono text-xl font-bold">{d}</Text>
                            </View>
                        )}
                    </View>

                    <Text className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">2. Encryption / Decryption</Text>
                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8">
                        <Text className="text-slate-400 text-xs font-bold mb-2 uppercase">Message (Value m &lt; n)</Text>
                        <TextInput
                            value={message}
                            onChangeText={setMessage}
                            keyboardType="numeric"
                            className="bg-slate-800 text-white p-4 rounded-2xl border border-slate-700 text-lg font-bold mb-6"
                        />

                        {c !== null && (
                            <Animated.View entering={FadeIn} className="space-y-6">
                                <View className="items-center">
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">Encrypted Cipher (c = mᵉ mod n)</Text>
                                    <View className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 w-full items-center">
                                        <Text className="text-emerald-400 text-3xl font-black">{c}</Text>
                                    </View>
                                </View>

                                <View className="items-center">
                                    <View className="bg-slate-800 p-2 rounded-full mb-2">
                                        <Ionicons name="arrow-down" size={20} color="#475569" />
                                    </View>
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">Decrypted Message (cᵈ mod n)</Text>
                                    <View className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 w-full items-center">
                                        <Text className="text-white text-3xl font-black">{decrypted}</Text>
                                    </View>
                                </View>
                            </Animated.View>
                        )}
                    </View>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
