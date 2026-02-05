import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { toyHash } from '../utils/math';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

export default function HashingScreen() {
    const navigation = useNavigation();
    const [input, setInput] = useState('NumberTheory');
    const hash = toyHash(input);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Hashing Algorithms</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mb-8">
                    <Text className="text-slate-400 text-sm mb-6 leading-6">
                        A <Text className="text-white font-bold">Hash Function</Text> maps data of arbitrary size to a fixed-size value. It is a "one-way" mathematical process.
                    </Text>

                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8">
                        <Text className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">Input Data</Text>
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            placeholder="Type something..."
                            placeholderTextColor="#475569"
                            className="bg-slate-800 text-white p-4 rounded-2xl border border-slate-700 text-lg mb-6"
                        />

                        <View className="items-center mb-6">
                            <View className="bg-slate-700 p-2 rounded-full">
                                <Ionicons name="chevron-down" size={20} color="#94a3b8" />
                            </View>
                        </View>

                        <Text className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">Hash Result (Hex)</Text>
                        <Animated.View
                            key={hash}
                            entering={FadeIn}
                            layout={Layout}
                            className="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 items-center"
                        >
                            <Text className="text-rose-400 text-2xl font-mono font-black">{hash}</Text>
                        </Animated.View>
                    </View>

                    <View className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 mb-12">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="shield-outline" size={20} color="#f43f5e" />
                            <Text className="text-rose-400 font-bold ml-2">Key Properties</Text>
                        </View>
                        <View className="space-y-4">
                            <View className="flex-row items-start">
                                <View className="bg-rose-500/20 p-1 rounded-full mr-3 mt-1" />
                                <Text className="text-slate-400 text-sm flex-1"><Text className="text-white font-bold">Deterministic:</Text> Same input always produces the same hash.</Text>
                            </View>
                            <View className="flex-row items-start">
                                <View className="bg-rose-500/20 p-1 rounded-full mr-3 mt-1" />
                                <Text className="text-slate-400 text-sm flex-1"><Text className="text-white font-bold">Fast:</Text> Computing the hash is efficient.</Text>
                            </View>
                            <View className="flex-row items-start">
                                <View className="bg-rose-500/20 p-1 rounded-full mr-3 mt-1" />
                                <Text className="text-slate-400 text-sm flex-1"><Text className="text-white font-bold">Irreversible:</Text> Hard to find the original input from its hash.</Text>
                            </View>
                            <View className="flex-row items-start">
                                <View className="bg-rose-500/20 p-1 rounded-full mr-3 mt-1" />
                                <Text className="text-slate-400 text-sm flex-1"><Text className="text-white font-bold">Avalanche Effect:</Text> A small change in input creates a drastically different hash.</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
