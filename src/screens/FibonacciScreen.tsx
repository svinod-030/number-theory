import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFibonacciSequence, getFibonacciRects } from '../utils/math';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function FibonacciScreen() {
    const navigation = useNavigation();
    const [numSquares, setNumSquares] = useState(8);
    const [viewMode, setViewMode] = useState<'spiral' | 'list'>('spiral');

    const sequence = getFibonacciSequence(numSquares + 2).slice(1);
    const rects = getFibonacciRects(numSquares);

    // Calculate bounding box for perfect centering
    const minX = Math.min(...rects.map(r => r.x), 0);
    const maxX = Math.max(...rects.map(r => r.x + r.size), 1);
    const minY = Math.min(...rects.map(r => r.y), 0);
    const maxY = Math.max(...rects.map(r => r.y + r.size), 1);

    const totalWidth = maxX - minX;
    const totalHeight = maxY - minY;

    const scale = (width * 0.85) / Math.max(totalWidth, totalHeight);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Fibonacci & Spiral</Text>
                <View className="flex-row space-x-4">
                    <TouchableOpacity onPress={() => setNumSquares(Math.max(3, numSquares - 1))}>
                        <Ionicons name="remove" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setNumSquares(Math.min(12, numSquares + 1))}>
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex-row justify-center py-4 bg-slate-900/50 space-x-4">
                <TouchableOpacity
                    onPress={() => setViewMode('spiral')}
                    className={`px-6 py-2 rounded-full flex-row items-center ${viewMode === 'spiral' ? 'bg-indigo-600' : 'bg-slate-800'}`}
                >
                    <Ionicons name="sync" size={16} color="white" className="mr-2" />
                    <Text className="text-white font-bold ml-2">Golden Spiral</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setViewMode('list')}
                    className={`px-6 py-2 rounded-full flex-row items-center ${viewMode === 'list' ? 'bg-indigo-600' : 'bg-slate-800'}`}
                >
                    <Ionicons name="list" size={16} color="white" className="mr-2" />
                    <Text className="text-white font-bold ml-2">Sequence</Text>
                </TouchableOpacity>
            </View>

            {viewMode === 'spiral' ? (
                <View className="flex-1 items-center justify-center overflow-hidden">
                    <Animated.View
                        entering={FadeIn}
                        style={{
                            width: totalWidth * scale,
                            height: totalHeight * scale,
                            position: 'relative',
                        }}
                    >
                        {rects.map((rect, i) => (
                            <Animated.View
                                key={i}
                                entering={ZoomIn.delay(i * 150)}
                                style={{
                                    position: 'absolute',
                                    left: (rect.x - minX) * scale,
                                    top: (rect.y - minY) * scale,
                                    width: rect.size * scale,
                                    height: rect.size * scale,
                                    borderWidth: 1,
                                    borderColor: 'rgba(99, 102, 241, 0.5)',
                                    backgroundColor: `rgba(99, 102, 241, ${0.1 + (i / rects.length) * 0.2})`,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 4,
                                    overflow: 'hidden', // Clip the circle to show an arc
                                }}
                            >
                                {rect.size * scale > 25 && (
                                    <Text className="text-indigo-400 font-bold" style={{ fontSize: Math.max(9, rect.size * scale / 5) }}>
                                        {rect.value}
                                    </Text>
                                )}
                                {/* Arc for the spiral - rendered as a clipped circle */}
                                <View style={[
                                    {
                                        width: rect.size * scale * 2,
                                        height: rect.size * scale * 2,
                                        borderRadius: rect.size * scale,
                                        borderWidth: 2,
                                        borderColor: '#818cf8',
                                        position: 'absolute',
                                        // Directions mapping: 0: U, 1: R, 2: D, 3: L
                                        // We position the circle so the correct quadrant is inside the square
                                        ...(rect.direction === 0 && { top: 0, left: 0 }), // Up: Center BR, show TL quad
                                        ...(rect.direction === 1 && { top: 0, left: -rect.size * scale }), // Right: Center BL, show TR quad
                                        ...(rect.direction === 2 && { top: -rect.size * scale, left: -rect.size * scale }), // Down: Center TL, show BR quad
                                        ...(rect.direction === 3 && { top: -rect.size * scale, left: 0 }), // Left: Center TR, show BL quad
                                    }
                                ]} />
                            </Animated.View>
                        ))}
                    </Animated.View>
                </View>
            ) : (
                <View className="flex-1">
                    <ScrollView className="flex-1 px-6 pt-6">
                        {sequence.map((val, i) => {
                            const ratio = i > 0 ? (val / sequence[i - 1]).toFixed(4) : '-';
                            return (
                                <Animated.View
                                    key={i}
                                    entering={FadeIn.delay(i * 100)}
                                    className="bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-4 flex-row items-center justify-between"
                                >
                                    <View>
                                        <Text className="text-slate-500 text-xs mb-1">Index {i + 1}</Text>
                                        <Text className="text-white text-2xl font-bold">{val}</Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-indigo-400 font-mono text-sm">Ratio: {ratio}</Text>
                                        {i === sequence.length - 1 && (
                                            <Text className="text-slate-500 text-[10px] mt-1">Approaching φ ≈ 1.618</Text>
                                        )}
                                    </View>
                                </Animated.View>
                            );
                        })}
                        <View style={{ height: 40 }} />
                    </ScrollView>
                </View>
            )}

            <View className="px-6 py-4 bg-slate-900 border-t border-slate-800">
                <View className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10 mb-3">
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="bulb-outline" size={16} color="#818cf8" />
                        <Text className="text-indigo-400 font-bold ml-2 text-[10px] uppercase">In Simple Terms</Text>
                    </View>
                    <Text className="text-slate-400 text-[10px] leading-4">
                        Each number is simply the <Text className="text-white font-bold">sum of the two before it</Text>: 1, 1, 2, 3, 5, 8, 13, 21… The ratio between consecutive terms gets closer and closer to <Text className="text-indigo-400 font-bold">1.618 (the Golden Ratio)</Text>.
                    </Text>
                </View>
                <View className="flex-row items-center mb-2">
                    <Ionicons name="leaf-outline" size={18} color="#818cf8" />
                    <Text className="text-indigo-400 font-bold ml-2">Nature's Code</Text>
                </View>
                <Text className="text-slate-400 text-xs leading-4">
                    The ratio of consecutive Fibonacci numbers converges to the Golden Ratio (φ). This pattern appears in sunflower seeds, pinecones, and galaxies!
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Styles were removed in favor of inline dynamic styles for clipped circular views
});
