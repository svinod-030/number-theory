import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const GRID_MAX_SIZE = width - 48;

export default function ModularTableScreen() {
    const navigation = useNavigation();
    const [mod, setMod] = useState(12);
    const [highlightResidue, setHighlightResidue] = useState<number | null>(null);

    const cellSize = Math.floor(GRID_MAX_SIZE / (mod + 1));

    const getColor = (val: number) => {
        if (val === 0) return 'bg-slate-800';
        const hue = (val / mod) * 220 + 200; // Blue to purple range
        return { backgroundColor: `hsl(${hue}, 70%, 50%)` };
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Modular Table</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    <View className="bg-sky-500/5 p-5 rounded-2xl border border-sky-500/10 mb-6">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">What You're Looking At</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            This is a <Text className="text-white font-bold">multiplication table, but with a twist</Text> — every answer gets wrapped around using the modulus. Instead of 3 × 4 = 12, you get 3 × 4 = 12 mod 5 = <Text className="text-sky-400 font-bold">2</Text>. Tap any cell to highlight all cells with the same remainder. Try prime moduli and notice that <Text className="text-white font-bold">every non-zero row is a perfect shuffle</Text>!
                        </Text>
                    </View>

                    <View className="mb-8">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-slate-400 font-medium">Modulus (n)</Text>
                            <Text className="text-sky-400 font-bold text-2xl">{mod}</Text>
                        </View>
                        <View className="flex-row items-center space-x-4">
                            <TouchableOpacity
                                onPress={() => setMod(Math.max(2, mod - 1))}
                                className="bg-slate-900 p-4 rounded-2xl border border-slate-800"
                            >
                                <Ionicons name="remove" size={24} color="white" />
                            </TouchableOpacity>
                            <View className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                                <View
                                    style={{ width: `${(mod / 30) * 100}%` }}
                                    className="h-full bg-sky-500"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => setMod(Math.min(30, mod + 1))}
                                className="bg-slate-900 p-4 rounded-2xl border border-slate-800"
                            >
                                <Ionicons name="add" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Animated.View entering={FadeIn} className="items-center justify-center bg-slate-900 p-4 rounded-3xl border border-slate-800">
                        {/* Table Header */}
                        <View className="flex-row">
                            <View style={{ width: cellSize, height: cellSize }} className="items-center justify-center">
                                <Text className="text-slate-600 text-[10px] font-bold">×</Text>
                            </View>
                            {Array.from({ length: mod }).map((_, i) => (
                                <View key={i} style={{ width: cellSize, height: cellSize }} className="items-center justify-center">
                                    <Text className="text-slate-500 text-[10px] font-bold">{i}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Table Body */}
                        {Array.from({ length: mod }).map((_, i) => (
                            <View key={i} className="flex-row">
                                <View style={{ width: cellSize, height: cellSize }} className="items-center justify-center">
                                    <Text className="text-slate-500 text-[10px] font-bold">{i}</Text>
                                </View>
                                {Array.from({ length: mod }).map((_, j) => {
                                    const val = (i * j) % mod;
                                    const isHighlighted = highlightResidue !== null && val === highlightResidue;
                                    const bgColor = getColor(val);

                                    return (
                                        <TouchableOpacity
                                            key={j}
                                            onPress={() => setHighlightResidue(val === highlightResidue ? null : val)}
                                            style={[
                                                { width: cellSize - 2, height: cellSize - 2, margin: 1, borderRadius: 4 },
                                                typeof bgColor === 'object' ? bgColor : null,
                                                isHighlighted ? { borderWidth: 2, borderColor: 'white', opacity: 1 } : { opacity: highlightResidue !== null ? 0.3 : 1 }
                                            ]}
                                            className={`${typeof bgColor === 'string' ? bgColor : ''} items-center justify-center`}
                                        >
                                            {cellSize > 25 && (
                                                <Text className="text-white text-[8px] font-bold">{val}</Text>
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ))}
                    </Animated.View>

                    <View className="mt-8 space-y-4">
                        <View className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <Text className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-3">Interactive Guide</Text>
                            <Text className="text-slate-300 text-sm leading-6">
                                Tap any cell to highlight all occurrences of that remainder.
                                {"\n\n"}
                                Notice how prime moduli (like 7, 11, 13) create tables where every row (except zero) contains every number exactly once. This is because every non-zero element has a modular inverse!
                            </Text>
                        </View>

                        {highlightResidue !== null && (
                            <Animated.View entering={FadeIn} className="bg-sky-500/10 p-5 rounded-2xl border border-sky-500/20">
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-sky-400 font-bold">Highlighting Residue: {highlightResidue}</Text>
                                    <TouchableOpacity onPress={() => setHighlightResidue(null)}>
                                        <Text className="text-slate-500 text-xs font-bold">CLEAR</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        )}
                    </View>

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
