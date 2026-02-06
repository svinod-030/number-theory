import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPartitionCount, generatePartitions } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function PartitionScreen() {
    const [num, setNum] = useState('7');
    const n = Math.min(parseInt(num) || 0, 50); // Limit count
    const visualN = Math.min(n, 12); // Limit visualization

    const count = getPartitionCount(n);
    const partitions = generatePartitions(visualN);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Partition Theory" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="In number theory, a partition of a positive integer n is a way of writing n as a sum of positive integers."
                >
                    <ThemedInput
                        label="Number n"
                        value={num}
                        onChangeText={setNum}
                        keyboardType="numeric"
                        helperText="p(n) grows extremely fast!"
                    />

                    <View className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 items-center">
                        <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">Partition Count p({n})</Text>
                        <Text className="text-emerald-400 text-5xl font-black">{count.toLocaleString()}</Text>
                    </View>
                </MathCard>

                {n > 0 && (
                    <MathCard
                        index={1}
                        title={`Visualizing p(${visualN})`}
                        description={`Showing the ${partitions.length} ways to split ${visualN}:`}
                    >
                        <View className="flex-row flex-wrap justify-between">
                            {partitions.map((p, i) => (
                                <Animated.View
                                    key={i}
                                    entering={FadeIn.delay(Math.min(i * 50, 2000))}
                                    className="bg-slate-900 p-3 rounded-xl border border-slate-800 mb-2 w-[48%] items-center"
                                >
                                    <Text className="text-slate-200 text-xs font-mono font-bold">{p.join(' + ')}</Text>
                                </Animated.View>
                            ))}
                        </View>
                        {n > visualN && (
                            <Text className="text-slate-500 text-[10px] mt-4 text-center italic">
                                Visualization limited to n=12 to prevent performance issues.
                            </Text>
                        )}
                    </MathCard>
                )}

                <MathCard
                    index={2}
                    title="Ramanujan & Hardy"
                >
                    <View className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <View className="flex-row items-center mb-4">
                            <Ionicons name="infinite-outline" size={20} color="#10b981" />
                            <Text className="text-emerald-400 font-bold ml-2">Asymptotic Growth</Text>
                        </View>
                        <Text className="text-slate-300 text-xs leading-5">
                            Srinivasa Ramanujan and G.H. Hardy developed an incredible asymptotic formula for p(n). Ramanujan also discovered surprising congruences, like p(5n+4) always being divisible by 5!
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
