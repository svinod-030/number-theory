import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Rect } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getUlamSpiral } from '../utils/math';

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width - 48;

export default function UlamSpiralScreen() {
    const navigation = useNavigation();
    const [size, setSize] = useState(400); // Number of points

    const spiralData = useMemo(() => {
        const data = getUlamSpiral(size);
        // Find bounds to scale
        const maxAbs = Math.max(...data.map((p: any) => Math.max(Math.abs(p.x), Math.abs(p.y))));
        const scale = (CANVAS_SIZE / 2 - 10) / (maxAbs || 1);
        const center = CANVAS_SIZE / 2;

        return data.map((p: any) => ({
            ...p,
            px: center + p.x * scale,
            py: center + p.y * scale,
            size: Math.max(2, scale * 0.8)
        }));
    }, [size]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Ulam Spiral</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1 px-6">
                <View className="bg-slate-900 rounded-3xl p-4 items-center mb-8 border border-slate-800">
                    <Svg width={CANVAS_SIZE} height={CANVAS_SIZE}>
                        {spiralData.map((p: any, i: number) => (
                            <Rect
                                key={i}
                                x={p.px}
                                y={p.py}
                                width={p.size}
                                height={p.size}
                                fill={p.isPrime ? "#38bdf8" : "#1e293b"}
                                opacity={p.isPrime ? 1 : 0.3}
                            />
                        ))}
                    </Svg>
                </View>

                <View className="mb-8">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-slate-400 font-medium">Density (Points)</Text>
                        <Text className="text-sky-400 font-bold">{size}</Text>
                    </View>
                    <View className="flex-row items-center space-x-4">
                        <TouchableOpacity
                            onPress={() => setSize(Math.max(100, size - 100))}
                            className="bg-slate-800 p-3 rounded-xl"
                        >
                            <Ionicons name="remove" size={20} color="white" />
                        </TouchableOpacity>
                        <View className="flex-1 h-2 bg-slate-800 rounded-full">
                            <View
                                style={{ width: `${(size / 2000) * 100}%` }}
                                className="h-full bg-sky-500 rounded-full"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setSize(Math.min(2000, size + 100))}
                            className="bg-slate-800 p-3 rounded-xl"
                        >
                            <Ionicons name="add" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50">
                    <Text className="text-white font-bold mb-2">About Ulam Spiral</Text>
                    <Text className="text-slate-400 text-sm leading-6">
                        Discovered by Stanislaw Ulam in 1963, this spiral shows that prime numbers often fall on diagonal lines.
                        Blue squares represent prime numbers, while dark squares represent composite numbers.
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
