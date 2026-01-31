import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getPascalTriangle } from '../utils/math';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function PascalTriangleScreen() {
    const navigation = useNavigation();
    const [rows, setRows] = useState(8);
    const [highlightPattern, setHighlightPattern] = useState<'none' | 'parity' | 'div3' | 'div5'>('none');

    const triangle = getPascalTriangle(rows);

    const descriptions = {
        none: "The classic triangle of binomial coefficients. Each number is the sum of the two values directly above it.",
        parity: "Highlighting odd numbers reveals the Sierpinski Triangle fractal, showing a deep link between numbers and geometry.",
        div3: "Multiples of 3 create a self-similar triangular pattern (a fractal) based on the divisibility of binomial coefficients.",
        div5: "Divisibility by 5 reveals larger scale patterns, a visual proof of Lucas's Theorem in modular arithmetic."
    };

    const getHexColor = (val: number) => {
        if (highlightPattern === 'none') return 'bg-slate-800 border-slate-700';
        if (highlightPattern === 'parity') {
            return val % 2 === 0 ? 'bg-slate-800 border-slate-700' : 'bg-emerald-600 border-emerald-400';
        }
        if (highlightPattern === 'div3') {
            return val % 3 === 0 ? 'bg-sky-600 border-sky-400' : 'bg-slate-800 border-slate-700';
        }
        if (highlightPattern === 'div5') {
            return val % 5 === 0 ? 'bg-amber-600 border-amber-400' : 'bg-slate-800 border-slate-700';
        }
        return 'bg-slate-800 border-slate-700';
    };

    const getTextColor = (val: number) => {
        if (highlightPattern === 'none') return 'text-slate-300';
        if (highlightPattern === 'parity' && val % 2 !== 0) return 'text-white';
        if (highlightPattern === 'div3' && val % 3 === 0) return 'text-white';
        if (highlightPattern === 'div5' && val % 5 === 0) return 'text-white';
        return 'text-slate-400';
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Pascal's Triangle</Text>
                <TouchableOpacity onPress={() => setRows(Math.min(15, rows + 1))}>
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-around py-4 bg-slate-900/50">
                <TouchableOpacity
                    onPress={() => setHighlightPattern('none')}
                    className={`px-3 py-1 rounded-full ${highlightPattern === 'none' ? 'bg-slate-700' : ''}`}
                >
                    <Text className="text-white text-xs">Standard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHighlightPattern('parity')}
                    className={`px-3 py-1 rounded-full ${highlightPattern === 'parity' ? 'bg-emerald-600' : ''}`}
                >
                    <Text className="text-white text-xs">Sierpinski (Odd)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHighlightPattern('div3')}
                    className={`px-3 py-1 rounded-full ${highlightPattern === 'div3' ? 'bg-sky-600' : ''}`}
                >
                    <Text className="text-white text-xs">Mod 3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHighlightPattern('div5')}
                    className={`px-3 py-1 rounded-full ${highlightPattern === 'div5' ? 'bg-amber-600' : ''}`}
                >
                    <Text className="text-white text-xs">Mod 5</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingVertical: 20 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="px-10 items-center min-w-full">
                        {triangle.map((row, i) => (
                            <View key={i} className="flex-row mb-2">
                                {row.map((val, j) => (
                                    <View
                                        key={`${i}-${j}`}
                                        className={`w-12 h-12 rounded-lg items-center justify-center border mx-1 ${getHexColor(val)}`}
                                    >
                                        <Text
                                            className={`text-[10px] font-bold ${getTextColor(val)}`}
                                            numberOfLines={1}
                                            adjustsFontSizeToFit
                                        >
                                            {val > 9999 ? '...' : val}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>

            <View className="px-6 py-4 bg-slate-900">
                <View className="flex-row items-center mb-2">
                    <Ionicons name="bulb-outline" size={18} color="#fbbf24" />
                    <Text className="text-amber-400 font-bold ml-2">Exploring Patterns</Text>
                </View>
                <Text className="text-slate-400 text-xs leading-4">
                    {descriptions[highlightPattern]}
                </Text>
            </View>
        </SafeAreaView>
    );
}
