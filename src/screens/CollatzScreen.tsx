import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polyline, Circle } from 'react-native-svg';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const CANVAS_WIDTH = WINDOW_WIDTH - 48;
const CANVAS_HEIGHT = 180;

export default function CollatzScreen() {
    const [inputNum, setInputNum] = useState('27');
    const [isCalculated, setIsCalculated] = useState(true);

    const sequenceData = useMemo(() => {
        let n = parseInt(inputNum);
        if (isNaN(n) || n <= 0) return null;

        const seq = [n];
        while (n !== 1 && seq.length < 500) {
            if (n % 2 === 0) n = n / 2;
            else n = 3 * n + 1;
            seq.push(n);
        }

        const maxVal = Math.max(...seq);
        const steps = seq.length - 1;

        const points = seq.map((val, i) => {
            const x = steps === 0 ? CANVAS_WIDTH / 2 : (i / steps) * CANVAS_WIDTH;
            const y = CANVAS_HEIGHT - (val / maxVal) * (CANVAS_HEIGHT - 30) - 15;
            return `${x},${y}`;
        }).join(' ');

        return { seq, maxVal, steps, points, startVal: parseInt(inputNum) };
    }, [inputNum]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Collatz Conjecture" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="The simplest impossible problem. Start with n: if even, divide by 2; if odd, multiply by 3 and add 1."
                >
                    <View className="flex-row items-end space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label="Starting Number (n)"
                                value={inputNum}
                                onChangeText={setInputNum}
                                keyboardType="numeric"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsCalculated(true)}
                            className="bg-sky-500 p-4 rounded-2xl mb-6 shadow-lg shadow-sky-500/20 active:opacity-80"
                        >
                            <Ionicons name="play" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {isCalculated && sequenceData && (
                        <Animated.View entering={FadeIn} key={sequenceData.startVal} className="space-y-6">
                            <View className="bg-slate-900 p-4 rounded-3xl border border-slate-800 overflow-hidden mt-2">
                                <Svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
                                    <Polyline
                                        points={sequenceData.points}
                                        fill="none"
                                        stroke="#38bdf8"
                                        strokeWidth="2.5"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    />
                                    <Circle cx="0" cy={CANVAS_HEIGHT - (sequenceData.startVal / sequenceData.maxVal) * (CANVAS_HEIGHT - 30) - 15} r="5" fill="#fbbf24" stroke="#451a03" strokeWidth="1" />
                                    <Circle cx={CANVAS_WIDTH} cy={CANVAS_HEIGHT - 15} r="5" fill="#10b981" stroke="#064e3b" strokeWidth="1" />
                                </Svg>
                                <View className="flex-row justify-between mt-3 px-1">
                                    <Text className="text-slate-600 text-[8px] font-black uppercase tracking-widest">Start: {sequenceData.startVal}</Text>
                                    <Text className="text-slate-600 text-[8px] font-black uppercase tracking-widest">Target: 1</Text>
                                </View>
                            </View>

                            <View className="flex-row space-x-3">
                                <View className="flex-1 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50 items-center">
                                    <Text className="text-slate-500 text-[8px] font-black uppercase mb-1 tracking-widest">Total Steps</Text>
                                    <Text className="text-white text-2xl font-black">{sequenceData.steps}</Text>
                                </View>
                                <View className="flex-1 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50 items-center">
                                    <Text className="text-slate-500 text-[8px] font-black uppercase mb-1 tracking-widest">Peak Height</Text>
                                    <Text className="text-amber-400 text-2xl font-black">{sequenceData.maxVal}</Text>
                                </View>
                            </View>
                        </Animated.View>
                    )}
                </MathCard>

                {isCalculated && sequenceData && (
                    <MathCard index={1} title="The Journey" description="Every number tested so far eventually reaches the 4-2-1 loop.">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
                            <View className="flex-row items-center space-x-2">
                                {sequenceData.seq.map((val, i) => (
                                    <React.Fragment key={i}>
                                        <View className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
                                            <Text className="text-sky-300 font-black text-xs">{val}</Text>
                                        </View>
                                        {i < sequenceData.seq.length - 1 && (
                                            <Ionicons name="chevron-forward" size={12} color="#334155" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </View>
                        </ScrollView>
                    </MathCard>
                )}

                <MathCard
                    index={2}
                    title="The Mystery"
                >
                    <View className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="help-circle-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase font-bold">Unsolved since 1937</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Also called the "Hailstone sequence" because numbers rise and fall like hailstones in a cloud before hitting the ground (1). Mathematician Paul Erdős said, "Mathematics may not be ready for such problems."
                        </Text>
                    </View>
                </MathCard>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
