import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { powerMod } from '../utils/math';
import Animated, { FadeIn, SlideInLeft, SlideInRight } from 'react-native-reanimated';

export default function DiffieHellmanScreen() {
    const navigation = useNavigation();
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

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Diffie-Hellman</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mb-8">
                    <Text className="text-slate-400 text-sm mb-6 leading-6">
                        Establish a shared secret over an insecure channel using modular exponentiation.
                    </Text>

                    <Text className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">1. Public Parameters</Text>
                    <View className="flex-row space-x-4 mb-8">
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-bold mb-2 uppercase">Prime p</Text>
                            <TextInput
                                value={p}
                                onChangeText={setP}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-400 text-xs font-bold mb-2 uppercase">Base g</Text>
                            <TextInput
                                value={g}
                                onChangeText={setG}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                    </View>

                    <View className="flex-row space-x-4 mb-8">
                        <Animated.View entering={SlideInLeft} className="flex-1 bg-sky-500/5 border border-sky-500/10 p-4 rounded-3xl items-center">
                            <Ionicons name="person-outline" size={24} color="#38bdf8" />
                            <Text className="text-sky-400 text-sm font-bold mt-2">Alice</Text>
                            <View className="w-full mt-4">
                                <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">Secret Key (a)</Text>
                                <TextInput
                                    value={privateA}
                                    onChangeText={setPrivateA}
                                    keyboardType="numeric"
                                    className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 text-center font-bold"
                                />
                                <View className="mt-4 items-center">
                                    <Text className="text-slate-500 text-[10px] uppercase font-bold text-center">Public A = gᵃ mod p</Text>
                                    <Text className="text-xl font-black text-white mt-1">{publicA}</Text>
                                </View>
                            </View>
                        </Animated.View>

                        <Animated.View entering={SlideInRight} className="flex-1 bg-rose-500/5 border border-rose-500/10 p-4 rounded-3xl items-center">
                            <Ionicons name="person-outline" size={24} color="#f43f5e" />
                            <Text className="text-rose-400 text-sm font-bold mt-2">Bob</Text>
                            <View className="w-full mt-4">
                                <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">Secret Key (b)</Text>
                                <TextInput
                                    value={privateB}
                                    onChangeText={setPrivateB}
                                    keyboardType="numeric"
                                    className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 text-center font-bold"
                                />
                                <View className="mt-4 items-center">
                                    <Text className="text-slate-500 text-[10px] uppercase font-bold text-center">Public B = gᵇ mod p</Text>
                                    <Text className="text-xl font-black text-white mt-1">{publicB}</Text>
                                </View>
                            </View>
                        </Animated.View>
                    </View>

                    <Animated.View entering={FadeIn.delay(400)} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 items-center mb-8">
                        <View className="flex-row items-center space-x-8 mb-4">
                            <View className="items-center">
                                <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">Exchange A</Text>
                                <Ionicons name="swap-horizontal" size={20} color="#475569" />
                            </View>
                            <View className="items-center">
                                <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">Exchange B</Text>
                                <Ionicons name="swap-horizontal" size={20} color="#475569" />
                            </View>
                        </View>

                        <View className="flex-row space-x-4 w-full">
                            <View className="flex-1 items-center">
                                <Text className="text-slate-500 text-[10px] font-bold uppercase text-center">Alice computes Bᵃ mod p</Text>
                                <View className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 mt-2 w-full items-center">
                                    <Text className="text-emerald-400 text-2xl font-black">{secretA}</Text>
                                </View>
                            </View>
                            <View className="flex-1 items-center">
                                <Text className="text-slate-500 text-[10px] font-bold uppercase text-center">Bob computes Aᵇ mod p</Text>
                                <View className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 mt-2 w-full items-center">
                                    <Text className="text-emerald-400 text-2xl font-black">{secretB}</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    <View className="bg-emerald-500/20 p-6 rounded-3xl border border-emerald-500/30 items-center mb-12">
                        <Ionicons name="shield-checkmark" size={32} color="#34d399" />
                        <Text className="text-white font-bold text-lg mt-2">Shared Secret Established!</Text>
                        <Text className="text-slate-300 text-sm mt-1">Both now have the secret key: {secretA}</Text>
                    </View>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
