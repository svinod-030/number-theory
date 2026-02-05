import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toyHash } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function HashingScreen() {
    const [input, setInput] = useState('NumberTheory');
    const hash = toyHash(input);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Hashing Algorithms" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="A Hash Function maps data of arbitrary size to a fixed-size value. It is a 'one-way' mathematical process typically used for data integrity."
                >
                    <ThemedInput
                        label="Input Data"
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type something..."
                    />

                    <View className="items-center my-4">
                        <View className="bg-slate-800 p-2 rounded-full">
                            <Ionicons name="chevron-down" size={20} color="#94a3b8" />
                        </View>
                    </View>

                    <Animated.View
                        key={hash}
                        entering={FadeIn}
                        layout={Layout}
                        className="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 items-center shadow-inner"
                    >
                        <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">Hash Result (Hex)</Text>
                        <Text className="text-rose-400 text-2xl font-mono font-black tracking-tight">{hash}</Text>
                    </Animated.View>
                </MathCard>

                <MathCard
                    index={1}
                    title="Key Properties"
                >
                    <View className="space-y-4">
                        <PropertyItem title="Deterministic" desc="Same input always produces the same hash." color="#f43f5e" />
                        <PropertyItem title="Fast" desc="Computing the hash is computationally efficient." color="#f43f5e" />
                        <PropertyItem title="Irreversible" desc="Hard to find the original input from its hash." color="#f43f5e" />
                        <PropertyItem title="Avalanche Effect" desc="Small input changes create drastic hash changes." color="#f43f5e" />
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function PropertyItem({ title, desc, color }: { title: string, desc: string, color: string }) {
    return (
        <View className="flex-row items-start">
            <View style={{ backgroundColor: `${color}20` }} className="p-1 rounded-full mr-3 mt-1" />
            <View className="flex-1">
                <Text className="text-slate-300 text-sm">
                    <Text className="text-white font-bold">{title}:</Text> {desc}
                </Text>
            </View>
        </View>
    );
}
