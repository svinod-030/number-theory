import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { isPrime, getGCDWithSteps, getModularInverse, powerMod } from '../utils/math';
import Animated, { FadeIn } from 'react-native-reanimated';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import { Ionicons } from '@expo/vector-icons';

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

    const e = 17;
    const { gcd } = getGCDWithSteps(e, phi);
    const eIsValid = e < phi && gcd === 1;

    const d = eIsValid ? getModularInverse(e, phi) : null;
    const c = (eIsValid && m < n) ? powerMod(m, e, n) : null;
    const decrypted = (d !== null && c !== null) ? powerMod(c, d, n) : null;

    const pIsPrime = isPrime(numP);
    const qIsPrime = isPrime(numQ);
    const isValid = pIsPrime && qIsPrime && numP !== numQ;

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="RSA Cryptography" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="RSA is an asymmetric cryptographic algorithm that relies on the difficulty of factoring the product of two large prime numbers."
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label="Prime p"
                                value={p}
                                onChangeText={setP}
                                keyboardType="numeric"
                                error={!pIsPrime && p !== ''}
                                helperText={!pIsPrime && p !== '' ? 'Not prime' : 'First prime'}
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label="Prime q"
                                value={q}
                                onChangeText={setQ}
                                keyboardType="numeric"
                                error={(!qIsPrime && q !== '') || (numP === numQ && q !== '')}
                                helperText={!qIsPrime && q !== '' ? 'Not prime' : numP === numQ ? 'Must be different' : 'Second prime'}
                            />
                        </View>
                    </View>

                    <View className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 space-y-4">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Modulus (n = p×q)</Text>
                            <Text className="text-white font-mono text-lg font-bold">{n}</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Totient (φ = (p-1)(q-1))</Text>
                            <Text className="text-white font-mono text-lg font-bold">{phi}</Text>
                        </View>
                        {isValid && d !== null && (
                            <Animated.View entering={FadeIn} className="pt-4 border-t border-slate-900 mt-2">
                                <View className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-indigo-400 text-[10px] font-bold uppercase">Private Key (d)</Text>
                                        <Text className="text-indigo-400/60 text-[8px]">Inverse of {e} mod {phi}</Text>
                                    </View>
                                    <Text className="text-white font-mono text-2xl font-black">{d}</Text>
                                </View>
                            </Animated.View>
                        )}
                    </View>
                </MathCard>

                {isValid && (
                    <MathCard
                        index={1}
                        title="Encryption & Decryption"
                        description="Encryption uses the public exponent (e=17), while decryption uses the private key (d) found above."
                    >
                        <ThemedInput
                            label={`Message (m < ${n})`}
                            value={message}
                            onChangeText={setMessage}
                            keyboardType="numeric"
                            error={m >= n}
                            helperText={m >= n ? `Message must be smaller than ${n}` : 'Raw numeric data'}
                        />

                        {c !== null && m < n && (
                            <Animated.View entering={FadeIn} className="space-y-6 mt-4">
                                <View className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 items-center">
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">Encrypted Cipher (c = mᵉ mod n)</Text>
                                    <Text className="text-emerald-400 text-4xl font-black">{c}</Text>
                                </View>

                                <View className="items-center py-2">
                                    <View className="bg-slate-800 p-2 rounded-full">
                                        <Ionicons name="lock-open-outline" size={20} color="#6366f1" />
                                    </View>
                                </View>

                                <View className="bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/20 items-center">
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">Original Message (m = cᵈ mod n)</Text>
                                    <Text className="text-white text-4xl font-black">{decrypted}</Text>
                                </View>
                            </Animated.View>
                        )}
                    </MathCard>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
