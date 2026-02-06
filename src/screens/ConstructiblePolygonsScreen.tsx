import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import { isConstructiblePolygon } from '../utils/math';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, ZoomIn, FadeInDown } from 'react-native-reanimated';
import { Svg, Polygon } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function ConstructiblePolygonsScreen() {
    const [sides, setSides] = useState('17');
    const n = parseInt(sides) || 0;

    const result = useMemo(() => isConstructiblePolygon(n), [n]);

    const svgSize = width * 0.7;

    const polygonPoints = useMemo(() => {
        if (n < 3 || n > 100) return null; // Limit visualization for performance
        const points = [];
        const radius = (svgSize / 2) - 10;
        const centerX = svgSize / 2;
        const centerY = svgSize / 2;

        for (let i = 0; i < n; i++) {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            points.push(`${x},${y}`);
        }
        return points.join(' ');
    }, [n, svgSize]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Constructible Polygons" />

            <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}>
                <MathCard
                    title="Gauss's Theorem"
                    description="A regular n-sided polygon is constructible if n is a power of 2 times distinct Fermat primes (3, 5, 17, 257, 65537)."
                >
                    <ThemedInput
                        label="Number of Sides (n)"
                        value={sides}
                        onChangeText={setSides}
                        keyboardType="numeric"
                        placeholder="e.g. 17"
                    />
                </MathCard>

                {n >= 3 ? (
                    <Animated.View entering={FadeIn.duration(600)} className="items-center">
                        <View className={`p-6 rounded-3xl border w-full mb-8 ${result.isConstructible ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                            <View className="flex-row items-center mb-2">
                                <Ionicons
                                    name={result.isConstructible ? "checkmark-circle" : "close-circle"}
                                    size={24}
                                    color={result.isConstructible ? "#34d399" : "#f43f5e"}
                                />
                                <Text className={`ml-3 text-xl font-bold ${result.isConstructible ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {result.isConstructible ? 'Constructible' : 'Not Constructible'}
                                </Text>
                            </View>
                            <Text className="text-slate-400 text-sm leading-5">
                                {result.reason}
                            </Text>
                        </View>

                        {polygonPoints && (
                            <Animated.View entering={ZoomIn.duration(500)} className="bg-slate-900/50 p-8 rounded-full border border-slate-800 mb-8 items-center justify-center">
                                <Svg width={svgSize} height={svgSize}>
                                    <Polygon
                                        points={polygonPoints}
                                        fill="rgba(99, 102, 241, 0.15)"
                                        stroke={result.isConstructible ? "#34d399" : "#6366f1"}
                                        strokeWidth="2"
                                    />
                                </Svg>
                                <View className="absolute">
                                    <Text className="text-white/20 text-4xl font-black">{n}</Text>
                                </View>
                            </Animated.View>
                        )}

                        {n > 100 && (
                            <View className="bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-8">
                                <Text className="text-slate-500 text-xs text-center italic">
                                    Visualization hidden for n &gt; 100 to maintain smoothness.
                                </Text>
                            </View>
                        )}
                    </Animated.View>
                ) : (
                    <View className="items-center py-20">
                        <Ionicons name="help-circle-outline" size={48} color="#334155" />
                        <Text className="text-slate-500 mt-4 text-center">Enter 3 or more sides to check constructability.</Text>
                    </View>
                )}

                <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
                    <Text className="text-white font-bold mb-4">Known Fermat Primes</Text>
                    <View className="flex-row flex-wrap">
                        {[3, 5, 17, 257, 65537].map((p, i) => (
                            <Animated.View
                                key={p}
                                entering={FadeInDown.delay(i * 100)}
                                className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 mr-2 mb-2"
                            >
                                <Text className="text-indigo-400 font-mono text-xs">{p}</Text>
                            </Animated.View>
                        ))}
                    </View>
                    <Text className="text-slate-500 text-[10px] mt-2 leading-4">
                        Gauss's 1796 discovery showed that the heptadecagon (17 sides) is constructible, a feat that eluded mathematicians for 2000 years!
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
