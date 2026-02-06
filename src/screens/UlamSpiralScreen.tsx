import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Rect, Polyline, Text as SvgText } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { getUlamSpiral } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width - 48;

export default function UlamSpiralScreen() {
    const [size, setSize] = useState(400);
    const [showPath, setShowPath] = useState(false);

    const { points: spiralPoints, primeCount } = useMemo(() => {
        const data = getUlamSpiral(size);
        let primes = 0;
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
            <ScreenHeader title="Ulam Spiral" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="Visualize primes in a square spiral. Notice how primes tend to cluster along diagonal lines, suggesting mysterious patterns in the distribution of prime numbers."
                >
                    <View className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 mb-6 flex-row justify-between items-center">
                        <View className="items-center">
                            <Text className="text-slate-500 text-[8px] font-black uppercase mb-1">Density</Text>
                            <Text className="text-white text-xl font-black">{primeDensity}%</Text>
                        </View>
                        <View className="w-[1px] h-8 bg-slate-800" />
                        <View className="items-center">
                            <Text className="text-sky-400 text-[8px] font-black uppercase mb-1">Primes</Text>
                            <Text className="text-white text-xl font-black">{primeCount}</Text>
                        </View>
                        <View className="w-[1px] h-8 bg-slate-800" />
                        <View className="items-center">
                            <Text className="text-slate-500 text-[8px] font-black uppercase mb-1">Total</Text>
                            <Text className="text-white text-xl font-black">{size}</Text>
                        </View>
                    </View>

                    <Animated.View key={size + (showPath ? 'p' : 'n')} entering={FadeIn} className="bg-slate-950 rounded-2xl p-2 items-center mb-6 border border-slate-800">
                        <Svg width={CANVAS_SIZE} height={CANVAS_SIZE}>
                            {showPath && (
                                <Polyline
                                    points={pathPoints}
                                    fill="none"
                                    stroke="#334155"
                                    strokeWidth="0.5"
                                    opacity={0.5}
                                />
                            )}
                            {spiralPoints.map((p: any, i: number) => (
                                <Rect
                                    key={i}
                                    x={p.px}
                                    y={p.py}
                                    width={p.size}
                                    height={p.size}
                                    fill={p.isPrime ? "#38bdf8" : "#1e293b"}
                                    opacity={p.isPrime ? 1 : 0.4}
                                    rx={p.size / 4}
                                />
                            ))}
                        </Svg>
                    </Animated.View>

                    <View className="flex-row justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
                        <View className="flex-row items-center">
                            <Ionicons name="git-commit-outline" size={18} color="#f59e0b" />
                            <Text className="text-slate-400 text-[10px] font-black uppercase ml-2 tracking-widest">Show Growth Path</Text>
                        </View>
                        <Switch
                            value={showPath}
                            onValueChange={setShowPath}
                            trackColor={{ false: '#1e293b', true: '#0ea5e9' }}
                            thumbColor="white"
                        />
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    title="Control Spiral"
                >
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Number of Points</Text>
                        <Text className="text-sky-500 font-black">{size}</Text>
                    </View>
                    <View className="flex-row items-center space-x-4">
                        <TouchableOpacity
                            onPress={() => setSize(Math.max(100, size - 100))}
                            className="bg-slate-800 p-3 rounded-xl border border-slate-700 active:bg-slate-700"
                        >
                            <Ionicons name="remove" size={20} color="white" />
                        </TouchableOpacity>
                        <View className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                            <View
                                style={{ width: `${(size / 2000) * 100}%` }}
                                className="h-full bg-sky-500 rounded-full shadow-sm shadow-sky-500/50"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setSize(Math.min(2000, size + 100))}
                            className="bg-slate-800 p-3 rounded-xl border border-slate-700 active:bg-slate-700"
                        >
                            <Ionicons name="add" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </MathCard>

                <MathCard
                    index={2}
                    title="Mathematical Insight"
                >
                    <View className="bg-sky-500/5 p-5 rounded-2xl border border-sky-500/10">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="flash-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase font-bold">Stanisław Ulam (1963)</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            While listening to a "long and very boring paper" at a scientific meeting, Ulam doodled a grid of numbers. He noticed that prime numbers appeared to fall primarily on diagonal lines. This suggests that certain quadratic polynomials like <Text className="text-white font-bold">n² + n + 41</Text> are remarkably rich in prime numbers.
                        </Text>
                    </View>
                </MathCard>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
