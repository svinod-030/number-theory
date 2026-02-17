import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { powerMod, isPrime } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function DiffieHellmanScreen() {
    const [p, setP] = useState('23');
    const [g, setG] = useState('5');
    const [privateA, setPrivateA] = useState('6');
    const [privateB, setPrivateB] = useState('15');

    const numP = parseInt(p) || 1;
    const numG = parseInt(g) || 1;
    const numPrivateA = parseInt(privateA) || 0;
    const numPrivateB = parseInt(privateB) || 0;

    const publicA = powerMod(numG, numPrivateA, numP);
    const publicB = powerMod(numG, numPrivateB, numP);

    const secretA = powerMod(publicB, numPrivateA, numP);
    const secretB = powerMod(publicA, numPrivateB, numP);

    const pIsPrime = isPrime(numP);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Diffie-Hellman Key Exchange" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title="In Simple Terms"
                >
                    <View className="bg-rose-500/5 p-5 rounded-2xl border border-rose-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#f43f5e" />
                            <Text className="text-rose-400 font-bold ml-2 text-xs uppercase">The Paint-Mixing Trick</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Alice and Bob each pick a <Text className="text-white font-bold">secret color</Text>. They mix it with a shared <Text className="text-rose-400 font-bold">public color</Text> and swap the mixtures. Each then adds their secret again — both end up with the <Text className="text-white font-bold">same final color</Text>, but an eavesdropper can't unmix to find the secrets!{"\n"}In math, "mixing" is modular exponentiation, and "unmixing" is the discrete logarithm problem — believed to be incredibly hard.
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description="Establish a shared secret over an insecure channel using modular exponentiation. Alice and Bob never share their secret keys."
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label="Public Prime p"
                                value={p}
                                onChangeText={setP}
                                keyboardType="numeric"
                                error={!pIsPrime && p !== ''}
                                helperText={!pIsPrime && p !== '' ? 'Should be prime' : 'Common modulus'}
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label="Public Base g"
                                value={g}
                                onChangeText={setG}
                                keyboardType="numeric"
                                helperText="Generator value"
                            />
                        </View>
                    </View>
                </MathCard>

                <View className="flex-row space-x-4 mb-4">
                    <View className="flex-1">
                        <Animated.View
                            entering={SlideInLeft}
                            className="bg-sky-500/5 border border-sky-500/10 p-5 rounded-3xl items-center"
                        >
                            <Ionicons name="person" size={24} color="#38bdf8" />
                            <Text className="text-sky-400 text-xs font-bold mt-2 uppercase">Alice</Text>
                            <View className="w-full mt-4">
                                <ThemedInput
                                    label="Secret a"
                                    value={privateA}
                                    onChangeText={setPrivateA}
                                    keyboardType="numeric"
                                    className="text-center"
                                />
                                <View className="mt-2 items-center bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                                    <Text className="text-slate-500 text-[8px] uppercase font-bold text-center mb-1">Public A = gᵃ mod p</Text>
                                    <Text className="text-xl font-black text-white">{publicA}</Text>
                                </View>
                            </View>
                        </Animated.View>
                    </View>

                    <View className="flex-1">
                        <Animated.View
                            entering={SlideInRight}
                            className="bg-rose-500/5 border border-rose-500/10 p-5 rounded-3xl items-center"
                        >
                            <Ionicons name="person" size={24} color="#f43f5e" />
                            <Text className="text-rose-400 text-xs font-bold mt-2 uppercase">Bob</Text>
                            <View className="w-full mt-4">
                                <ThemedInput
                                    label="Secret b"
                                    value={privateB}
                                    onChangeText={setPrivateB}
                                    keyboardType="numeric"
                                    className="text-center"
                                />
                                <View className="mt-2 items-center bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                                    <Text className="text-slate-500 text-[8px] uppercase font-bold text-center mb-1">Public B = gᵇ mod p</Text>
                                    <Text className="text-xl font-black text-white">{publicB}</Text>
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                </View>

                <MathCard
                    index={2}
                    title="The Computed Secret"
                    description="Alice takes Bob's public key (B) and computes Bᵃ mod p. Bob takes Alice's public key (A) and computes Aᵇ mod p."
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1 bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 items-center">
                            <Text className="text-slate-500 text-[8px] font-bold uppercase mb-2 text-center">Alice computes Bᵃ mod p</Text>
                            <Text className="text-emerald-400 text-3xl font-black">{secretA}</Text>
                        </View>
                        <View className="flex-1 bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 items-center">
                            <Text className="text-slate-500 text-[8px] font-bold uppercase mb-2 text-center">Bob computes Aᵇ mod p</Text>
                            <Text className="text-emerald-400 text-3xl font-black">{secretB}</Text>
                        </View>
                    </View>

                    {secretA === secretB && (
                        <Animated.View entering={FadeIn} className="mt-6 bg-emerald-500/20 p-5 rounded-2xl border border-emerald-500/30 items-center">
                            <View className="flex-row items-center">
                                <Ionicons name="shield-checkmark" size={24} color="#34d399" />
                                <Text className="text-white font-bold ml-2">Shared Secret Match!</Text>
                            </View>
                            <Text className="text-slate-300 text-[10px] mt-1">Both now have the identical secret key: {secretA}</Text>
                        </Animated.View>
                    )}
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
