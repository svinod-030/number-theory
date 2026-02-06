import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { findAmicablePairs } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function AmicableNumbersScreen() {
    const [limit, setLimit] = useState('1500');
    const nLimit = parseInt(limit) || 0;

    const pairs = findAmicablePairs(nLimit);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Amicable Numbers" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="Two numbers are 'Amicable' if the sum of the proper divisors of one is equal to the other, and vice versa."
                >
                    <ThemedInput
                        label="Search Limit"
                        value={limit}
                        onChangeText={setLimit}
                        keyboardType="numeric"
                        helperText="Search for pairs up to this number"
                    />

                    <View className="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20 items-center">
                        <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">Pairs Found</Text>
                        <Text className="text-rose-400 text-5xl font-black">{pairs.length}</Text>
                    </View>
                </MathCard>

                {pairs.length > 0 && (
                    <MathCard
                        index={1}
                        title="The Friendly Pairs"
                        description="These numbers share a special 'amicable' relationship through their divisors."
                    >
                        <View className="space-y-4">
                            {pairs.map(([n1, n2], i) => (
                                <Animated.View
                                    key={`${n1}-${n2}`}
                                    entering={FadeIn.delay(i * 150)}
                                    className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex-row items-center justify-between"
                                >
                                    <View className="items-center flex-1">
                                        <Text className="text-white text-2xl font-black">{n1}</Text>
                                        <Text className="text-slate-500 text-[8px] uppercase font-bold">Number A</Text>
                                    </View>

                                    <View className="px-6">
                                        <Ionicons name="swap-horizontal" size={24} color="#f43f5e" />
                                    </View>

                                    <View className="items-center flex-1">
                                        <Text className="text-white text-2xl font-black">{n2}</Text>
                                        <Text className="text-slate-500 text-[8px] uppercase font-bold">Number B</Text>
                                    </View>
                                </Animated.View>
                            ))}
                        </View>
                    </MathCard>
                )}

                <MathCard
                    index={2}
                    title="Fun Fact"
                >
                    <View className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="heart-outline" size={20} color="#f43f5e" />
                            <Text className="text-rose-400 font-bold ml-2">Historical Significance</Text>
                        </View>
                        <Text className="text-slate-300 text-xs leading-5">
                            The pair (220, 284) was known to Pythagoreans. Ancient Greeks believed these numbers were symbols of friendship. Fermat and Descartes later discovered more pairs, and Euler found over 60!
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
