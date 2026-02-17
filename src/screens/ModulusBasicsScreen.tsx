import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Text as SvgText, G, Line, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const CANVAS_SIZE = WINDOW_WIDTH - 48;
const CENTER = CANVAS_SIZE / 2;
const RADIUS = CENTER - 30;

export default function ModulusBasicsScreen() {
    const navigation = useNavigation();
    const [a, setA] = useState(7);
    const [n, setN] = useState(5);

    const remainder = useMemo(() => a % n, [a, n]);
    const quotient = useMemo(() => Math.floor(a / n), [a, n]);

    const clockPoints = useMemo(() => {
        const points = [];
        for (let i = 0; i < n; i++) {
            const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
            const x = CENTER + RADIUS * Math.cos(angle);
            const y = CENTER + RADIUS * Math.sin(angle);
            points.push({ x, y, val: i });
        }
        return points;
    }, [n]);

    const remainderPos = useMemo(() => {
        const activeIdx = remainder;
        const angle = (activeIdx / n) * 2 * Math.PI - Math.PI / 2;
        return {
            x: CENTER + RADIUS * Math.cos(angle),
            y: CENTER + RADIUS * Math.sin(angle)
        };
    }, [remainder, n]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Modulus Basics</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    {/* Header Explanation */}
                    <Animated.View entering={FadeInDown.duration(600)} className="mb-8">
                        <Text className="text-slate-400 text-lg leading-7">
                            The <Text className="text-sky-400 font-bold">modulus operator (%)</Text> gives the remainder after division.
                            Think of it as <Text className="text-amber-400 font-bold">"clock arithmetic"</Text>.
                        </Text>
                    </Animated.View>

                    {/* Formula View */}
                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8 items-center">
                        <View className="flex-row items-baseline">
                            <Text className="text-white text-4xl font-bold">{a}</Text>
                            <Text className="text-sky-400 text-2xl font-bold mx-2">mod</Text>
                            <Text className="text-white text-4xl font-bold">{n}</Text>
                            <Text className="text-slate-500 text-2xl font-bold mx-2">=</Text>
                            <Text className="text-amber-400 text-5xl font-bold">{remainder}</Text>
                        </View>
                        <Text className="text-slate-500 mt-4 text-center">
                            {a} = ({n} × {quotient}) + <Text className="text-amber-400 font-bold">{remainder}</Text>
                        </Text>
                    </View>

                    {/* Visualizer Container */}
                    <View className="bg-slate-900 rounded-3xl p-4 items-center mb-8 border border-slate-800">
                        <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Clock Visualization</Text>
                        <Svg width={CANVAS_SIZE} height={CANVAS_SIZE}>
                            {/* Main Circle */}
                            <Circle
                                cx={CENTER}
                                cy={CENTER}
                                r={RADIUS}
                                stroke="#1e293b"
                                strokeWidth="2"
                                fill="transparent"
                                strokeDasharray="5,5"
                            />

                            {/* Clock Points */}
                            {clockPoints.map((pt, i) => (
                                <G key={i}>
                                    <Circle
                                        cx={pt.x}
                                        cy={pt.y}
                                        r={16}
                                        fill={i === remainder ? "#fbbf24" : "#1e293b"}
                                    />
                                    <SvgText
                                        x={pt.x}
                                        y={pt.y + 5}
                                        fill={i === remainder ? "#0f172a" : "#64748b"}
                                        fontSize="12"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        {pt.val}
                                    </SvgText>
                                </G>
                            ))}

                            {/* Arrow to current remainder */}
                            <Line
                                x1={CENTER}
                                y1={CENTER}
                                x2={remainderPos.x}
                                y2={remainderPos.y}
                                stroke="#fbbf24"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <Circle cx={CENTER} cy={CENTER} r={6} fill="#fbbf24" />
                        </Svg>

                        <View className="mt-4 px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20">
                            <Text className="text-amber-400 text-xs font-medium text-center">
                                Adding {a} to 0 wraps around {n} for {quotient} full turns + {remainder} units
                            </Text>
                        </View>
                    </View>

                    {/* Sliders Area */}
                    <View className="space-y-6">
                        <View>
                            <View className="flex-row justify-between mb-4">
                                <Text className="text-slate-400 font-medium">Number (a)</Text>
                                <Text className="text-sky-400 font-bold text-lg">{a}</Text>
                            </View>
                            <View className="flex-row items-center space-x-3">
                                <TouchableOpacity
                                    onPress={() => setA(Math.max(0, a - 1))}
                                    className="bg-slate-800 w-12 h-12 rounded-xl items-center justify-center border border-slate-700"
                                >
                                    <Ionicons name="remove" size={24} color="white" />
                                </TouchableOpacity>

                                <View className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                                    <View
                                        style={{ width: `${Math.min(100, (a / 50) * 100)}%` }}
                                        className="h-full bg-sky-500 rounded-full"
                                    />
                                </View>

                                <TouchableOpacity
                                    onPress={() => setA(Math.min(100, a + 1))}
                                    className="bg-slate-800 w-12 h-12 rounded-xl items-center justify-center border border-slate-700"
                                >
                                    <Ionicons name="add" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <View className="flex-row justify-between mb-4">
                                <Text className="text-slate-400 font-medium">Modulus (n)</Text>
                                <Text className="text-amber-400 font-bold text-lg">{n}</Text>
                            </View>
                            <View className="flex-row items-center space-x-3">
                                <TouchableOpacity
                                    onPress={() => setN(Math.max(2, n - 1))}
                                    className="bg-slate-800 w-12 h-12 rounded-xl items-center justify-center border border-slate-700"
                                >
                                    <Ionicons name="remove" size={24} color="white" />
                                </TouchableOpacity>

                                <View className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                                    <View
                                        style={{ width: `${(n / 24) * 100}%` }}
                                        className="h-full bg-amber-500 rounded-full"
                                    />
                                </View>

                                <TouchableOpacity
                                    onPress={() => setN(Math.min(24, n + 1))}
                                    className="bg-slate-800 w-12 h-12 rounded-xl items-center justify-center border border-slate-700"
                                >
                                    <Ionicons name="add" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Key Properties */}
                    <View className="mt-12 space-y-4">
                        <Text className="text-white font-bold text-lg px-2">Key Properties</Text>

                        <View className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <View className="flex-row items-center mb-2">
                                <View className="w-2 h-2 rounded-full bg-sky-500 mr-3" />
                                <Text className="text-white font-bold">Range of Remainder</Text>
                            </View>
                            <Text className="text-slate-400 text-sm leading-6">
                                The result of <Text className="text-slate-200">a % n</Text> is always between <Text className="text-slate-200">0</Text> and <Text className="text-slate-200">n - 1</Text>.
                            </Text>
                        </View>

                        <View className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <View className="flex-row items-center mb-2">
                                <View className="w-2 h-2 rounded-full bg-sky-500 mr-3" />
                                <Text className="text-white font-bold">Congruence (≡)</Text>
                            </View>
                            <Text className="text-slate-400 text-sm leading-6">
                                If two numbers have the same remainder when divided by <Text className="text-slate-200">n</Text>, we say they are <Text className="text-sky-400 font-bold">congruent modulo n</Text>.
                            </Text>
                        </View>
                    </View>

                    <View style={{ height: 60 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
