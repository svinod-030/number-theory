import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polyline, Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const CANVAS_WIDTH = WINDOW_WIDTH - 48;
const CANVAS_HEIGHT = 200;

export default function CollatzScreen() {
    const navigation = useNavigation();
    const [inputNum, setInputNum] = useState('27');
    const [isCalculated, setIsCalculated] = useState(false);

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

        // Map to SVG coordinates
        const points = seq.map((val, i) => {
            const x = steps === 0 ? CANVAS_WIDTH / 2 : (i / steps) * CANVAS_WIDTH;
            const y = CANVAS_HEIGHT - (val / maxVal) * (CANVAS_HEIGHT - 20) - 10;
            return `${x},${y}`;
        }).join(' ');

        return { seq, maxVal, steps, points };
    }, [inputNum]);

    const handleRun = () => {
        if (sequenceData) setIsCalculated(true);
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Collatz Conjecture</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    <View className="mb-8">
                        <Text className="text-slate-500 text-xs font-bold mb-2 uppercase">Starting Number (n)</Text>
                        <View className="flex-row space-x-3">
                            <TextInput
                                value={inputNum}
                                onChangeText={setInputNum}
                                keyboardType="numeric"
                                className="flex-1 bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                            <TouchableOpacity
                                onPress={handleRun}
                                className="bg-sky-600 px-6 rounded-2xl items-center justify-center shadow-lg shadow-sky-500/20"
                            >
                                <Ionicons name="play" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {isCalculated && sequenceData && (
                        <View className="space-y-6">
                            <Animated.View entering={FadeIn} className="bg-slate-900 p-4 rounded-3xl border border-slate-800 overflow-hidden">
                                <Svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
                                    <Polyline
                                        points={sequenceData.points}
                                        fill="none"
                                        stroke="#38bdf8"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />
                                    {/* Circles at start and end */}
                                    <Circle cx="0" cy={CANVAS_HEIGHT - (parseInt(inputNum) / sequenceData.maxVal) * (CANVAS_HEIGHT - 20) - 10} r="4" fill="#fbbf24" />
                                    <Circle cx={CANVAS_WIDTH} cy={CANVAS_HEIGHT - 10} r="4" fill="#10b981" />
                                </Svg>
                                <View className="flex-row justify-between mt-2 px-1">
                                    <Text className="text-slate-600 text-[10px] font-bold">START: {inputNum}</Text>
                                    <Text className="text-slate-600 text-[10px] font-bold">END: 1</Text>
                                </View>
                            </Animated.View>

                            <View className="flex-row space-x-4">
                                <Animated.View entering={FadeInDown.delay(100)} className="flex-1 bg-slate-900 p-5 rounded-2xl border border-slate-800">
                                    <Text className="text-slate-500 text-[10px] uppercase font-bold mb-1">Total Steps</Text>
                                    <Text className="text-white text-2xl font-bold">{sequenceData.steps}</Text>
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(200)} className="flex-1 bg-slate-900 p-5 rounded-2xl border border-slate-800">
                                    <Text className="text-slate-500 text-[10px] uppercase font-bold mb-1">Max Height</Text>
                                    <Text className="text-amber-400 text-2xl font-bold">{sequenceData.maxVal}</Text>
                                </Animated.View>
                            </View>

                            <Animated.View entering={FadeInDown.delay(300)} className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                                <Text className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-3">Sequence Path</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View className="flex-row items-center space-x-2">
                                        {sequenceData.seq.map((val, i) => (
                                            <React.Fragment key={i}>
                                                <View className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                                                    <Text className="text-slate-300 font-mono text-xs">{val}</Text>
                                                </View>
                                                {i < sequenceData.seq.length - 1 && (
                                                    <Ionicons name="arrow-forward" size={12} color="#475569" />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </View>
                                </ScrollView>
                            </Animated.View>

                            <View className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                                <Text className="text-slate-400 text-sm leading-6">
                                    The Collatz Conjecture (also known as the 3n+1 problem) is one of the most famous unsolved problems in mathematics.
                                    {"\n\n"}
                                    Take any positive integer n:
                                    - If n is even, n = n / 2
                                    {"\n"}
                                    - If n is odd, n = 3n + 1
                                    {"\n\n"}
                                    The conjecture states that no matter what value you start with, you will always eventually reach 1.
                                </Text>
                            </View>
                        </View>
                    )}

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
