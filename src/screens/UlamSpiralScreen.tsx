import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Rect, Polyline, Text as SvgText } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getUlamSpiral } from '../utils/math';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width - 48;

export default function UlamSpiralScreen() {
    const navigation = useNavigation();
    const [size, setSize] = useState(400); // Number of points
    const [showPath, setShowPath] = useState(false);

    const { points: spiralPoints, primeCount } = useMemo(() => {
        const data = getUlamSpiral(size);
        let primes = 0;
        // Find bounds to scale
        const maxAbs = Math.max(...data.map((p: any) => Math.max(Math.abs(p.x), Math.abs(p.y))));
        const scale = (CANVAS_SIZE / 2 - 20) / (maxAbs || 1);
        const center = CANVAS_SIZE / 2;

        const points = data.map((p: any) => {
            if (p.isPrime) primes++;
            return {
                ...p,
                px: center + p.x * scale,
                py: center + p.y * scale,
                size: Math.max(2, scale * 0.8)
            };
        });

        return { points, primeCount: primes };
    }, [size]);

    const pathPoints = useMemo(() => {
        return spiralPoints.map(p => `${p.px + p.size / 2},${p.py + p.size / 2}`).join(' ');
    }, [spiralPoints]);

    const primeDensity = ((primeCount / size) * 100).toFixed(1);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Ulam Spiral</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    {/* Simplified Legend and Stats */}
                    <View className="mb-6 space-y-4">
                        <View className="flex-row justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                            <View>
                                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Total Points</Text>
                                <Text className="text-white text-lg font-bold">1 to {size}</Text>
                            </View>
                            <View className="h-8 w-[1px] bg-slate-800" />
                            <View>
                                <Text className="text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-1">Primes Found</Text>
                                <Text className="text-white text-lg font-bold">{primeCount}</Text>
                            </View>
                            <View className="h-8 w-[1px] bg-slate-800" />
                            <View>
                                <Text className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">Density</Text>
                                <Text className="text-white text-lg font-bold">{primeDensity}%</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between items-center">
                            <View className="flex-row items-center space-x-3 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                                <View className="flex-row items-center">
                                    <View className="w-2.5 h-2.5 bg-sky-500 rounded-sm mr-2" />
                                    <Text className="text-slate-300 text-[10px] font-bold uppercase tracking-tight">Prime</Text>
                                </View>
                                <View className="h-3 w-[1px] bg-slate-800" />
                                <View className="flex-row items-center">
                                    <View className="w-2.5 h-2.5 bg-slate-700 rounded-sm mr-2 opacity-50" />
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">Composite</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center">
                                <Text className="text-slate-400 text-[10px] font-bold uppercase mr-2">Show Path</Text>
                                <Switch
                                    value={showPath}
                                    onValueChange={setShowPath}
                                    trackColor={{ false: '#1e293b', true: '#f59e0b' }}
                                    thumbColor="white"
                                />
                            </View>
                        </View>
                    </View>

                    <Animated.View entering={FadeIn} className="bg-slate-900 rounded-3xl p-4 items-center mb-8 border border-slate-800 shadow-2xl">
                        <Svg width={CANVAS_SIZE} height={CANVAS_SIZE}>
                            {showPath && (
                                <Polyline
                                    points={pathPoints}
                                    fill="none"
                                    stroke="#fbbf24"
                                    strokeWidth="0.8"
                                    opacity={0.6}
                                />
                            )}
                            {spiralPoints.map((p: any, i: number) => (
                                <React.Fragment key={i}>
                                    <Rect
                                        x={p.px}
                                        y={p.py}
                                        width={p.size}
                                        height={p.size}
                                        fill={p.isPrime ? "#38bdf8" : "#334155"}
                                        opacity={p.isPrime ? 1 : 0.15}
                                    />
                                    {p.isPrime && p.size > 18 && (
                                        <SvgText
                                            x={p.px + p.size / 2}
                                            y={p.py + p.size / 2 + 3}
                                            fill="white"
                                            fontSize={Math.min(10, p.size * 0.5)}
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            {p.i}
                                        </SvgText>
                                    )}
                                </React.Fragment>
                            ))}
                            {/* Center orientation label if not already shown by a prime */}
                            {(!spiralPoints[0].isPrime || spiralPoints[0].size <= 18) && (
                                <SvgText
                                    x={spiralPoints[0].px + spiralPoints[0].size / 2}
                                    y={spiralPoints[0].py - 5}
                                    fill="white"
                                    fontSize="10"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                >
                                    1
                                </SvgText>
                            )}
                        </Svg>
                    </Animated.View>


                    <View className="mb-8">
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-slate-400 font-medium">Spiral Density</Text>
                            <Text className="text-sky-400 font-bold text-lg">{size} Points</Text>
                        </View>
                        <View className="flex-row items-center space-x-4">
                            <TouchableOpacity
                                onPress={() => setSize(Math.max(100, size - 100))}
                                className="bg-slate-900 p-4 rounded-2xl border border-slate-800"
                            >
                                <Ionicons name="remove" size={20} color="white" />
                            </TouchableOpacity>
                            <View className="flex-1 h-2 bg-slate-900 rounded-full">
                                <View
                                    style={{ width: `${(size / 2000) * 100}%` }}
                                    className="h-full bg-sky-500 rounded-full"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => setSize(Math.min(2000, size + 100))}
                                className="bg-slate-900 p-4 rounded-2xl border border-slate-800"
                            >
                                <Ionicons name="add" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
                        <Text className="text-white font-bold mb-3 text-lg">Uncovering Patterns</Text>
                        <View className="space-y-4">
                            <Text className="text-slate-400 text-sm leading-6">
                                Discovered by Stanislaw Ulam in 1963, this spiral arranges integers in a square pattern. When we highlight primes (blue), they unexpectedly cluster along diagonal lines.
                            </Text>
                            <Text className="text-slate-400 text-sm leading-6">
                                This reveals that certain quadratic equations, like n² + n + 41, produce a surprising number of primes. The "Show Path" toggle helps visualize the underlying numerical growth.
                            </Text>
                        </View>
                    </View>

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
