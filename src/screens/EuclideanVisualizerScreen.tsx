import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    withDelay,
    FadeIn
} from 'react-native-reanimated';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const CANVAS_SIZE = WINDOW_WIDTH - 48;

interface Tile {
    x: number;
    y: number;
    size: number;
    originalSize: number;
    color: string;
    step: number;
}

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const COLORS = [
    '#38bdf8', // sky-400
    '#fbbf24', // amber-400
    '#f472b6', // pink-400
    '#4ade80', // emerald-400
    '#818cf8', // indigo-400
    '#f87171', // red-400
];

export default function EuclideanVisualizerScreen() {
    const navigation = useNavigation();
    const [numA, setNumA] = useState('48');
    const [numB, setNumB] = useState('18');
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [isCalculated, setIsCalculated] = useState(false);
    const [currentStepLimit, setCurrentStepLimit] = useState(0);
    const [stepLog, setStepLog] = useState<string[]>([]);

    const calculateTiling = () => {
        let a = parseInt(numA);
        let b = parseInt(numB);
        if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return;

        const resultTiles: Tile[] = [];
        const logs: string[] = [];
        let x = 0;
        let y = 0;
        let step = 0;

        // Scale everything to fit in CANVAS_SIZE
        const maxVal = Math.max(a, b);
        const scale = CANVAS_SIZE / maxVal;

        while (a > 0 && b > 0) {
            if (a >= b) {
                // Place a square of size b x b
                resultTiles.push({
                    x: x * scale,
                    y: y * scale,
                    size: b * scale,
                    originalSize: b,
                    color: COLORS[step % COLORS.length],
                    step: step++
                });
                logs.push(`Subtracted ${b}x${b} square from ${a}x${b} rectangle.`);
                x += b;
                a -= b;
            } else {
                // Place a square of size a x a
                resultTiles.push({
                    x: x * scale,
                    y: y * scale,
                    size: a * scale,
                    originalSize: a,
                    color: COLORS[step % COLORS.length],
                    step: step++
                });
                logs.push(`Subtracted ${a}x${a} square from ${a}x${b} rectangle.`);
                y += a;
                b -= a;
            }
        }

        setTiles(resultTiles);
        setStepLog(logs);
        setIsCalculated(true);
        setCurrentStepLimit(0);
    };

    useEffect(() => {
        if (isCalculated && currentStepLimit < tiles.length) {
            const timer = setTimeout(() => {
                setCurrentStepLimit(prev => prev + 1);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isCalculated, currentStepLimit, tiles.length]);

    const handleRun = () => {
        setIsCalculated(false);
        setTimeout(calculateTiling, 100);
    };

    const gcd = useMemo(() => {
        const a = parseInt(numA);
        const b = parseInt(numB);
        const calcGCD = (x: number, y: number): number => (!y ? x : calcGCD(y, x % y));
        return isNaN(a) || isNaN(b) ? 0 : calcGCD(a, b);
    }, [numA, numB]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Euclidean Tiling</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    <View className="flex-row space-x-4 mb-6">
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs font-bold mb-2 uppercase">Width (A)</Text>
                            <TextInput
                                value={numA}
                                onChangeText={setNumA}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs font-bold mb-2 uppercase">Height (B)</Text>
                            <TextInput
                                value={numB}
                                onChangeText={setNumB}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800"
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handleRun}
                        className="bg-sky-600 p-4 rounded-2xl items-center mb-8 shadow-lg shadow-sky-500/20"
                    >
                        <Text className="text-white font-bold text-lg">Visualize Tiling</Text>
                    </TouchableOpacity>

                    <View className="bg-slate-900 p-4 rounded-3xl border border-slate-800 items-center justify-center overflow-hidden">
                        <Svg width={CANVAS_SIZE} height={CANVAS_SIZE}>
                            {tiles.slice(0, currentStepLimit).map((tile, i) => (
                                <React.Fragment key={i}>
                                    <AnimatedRect
                                        entering={FadeIn.duration(500)}
                                        x={tile.x}
                                        y={tile.y}
                                        width={tile.size}
                                        height={tile.size}
                                        fill={tile.color}
                                        stroke="#0f172a"
                                        strokeWidth="1"
                                        opacity={0.8}
                                    />
                                    {tile.size > 20 && (
                                        <SvgText
                                            x={tile.x + tile.size / 2}
                                            y={tile.y + tile.size / 2 + 4}
                                            fill="white"
                                            fontSize={tile.size > 40 ? "12" : "8"}
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            {`${tile.originalSize}x${tile.originalSize}`}
                                        </SvgText>
                                    )}
                                </React.Fragment>
                            ))}
                        </Svg>
                    </View>

                    {isCalculated && (
                        <Animated.View entering={FadeIn.delay(200)} className="mt-8 space-y-4">
                            <View className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                                <Text className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Step Log</Text>
                                <View className="space-y-2">
                                    {stepLog.map((log, i) => (
                                        <View key={i} className={`flex-row items-center p-3 rounded-xl ${i === currentStepLimit - 1 ? 'bg-sky-500/10 border border-sky-500/30' : 'opacity-50'}`}>
                                            <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${i === currentStepLimit - 1 ? 'bg-sky-500' : 'bg-slate-800'}`}>
                                                <Text className="text-white text-[10px] font-bold">{i + 1}</Text>
                                            </View>
                                            <Text className="text-slate-300 text-sm flex-1">{log}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                                <Text className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Final Discovery</Text>
                                <View className="flex-row items-center justify-between">
                                    <View>
                                        <Text className="text-white text-2xl font-bold">GCD = {gcd}</Text>
                                        <Text className="text-slate-500 text-xs mt-1">Found after {tiles.length} subtractions</Text>
                                    </View>
                                    <View className="bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20">
                                        <Ionicons name="medal-outline" size={24} color="#10b981" />
                                    </View>
                                </View>
                            </View>

                            <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10">
                                <View className="flex-row items-center mb-3">
                                    <Ionicons name="bulb-outline" size={18} color="#34d399" />
                                    <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">In Simple Terms</Text>
                                </View>
                                <Text className="text-slate-400 text-xs leading-5">
                                    Want to share 18 cookies and 12 brownies equally among as many friends as possible? Find <Text className="text-white font-bold">GCD(18, 12) = 6</Text>. The Euclidean algorithm finds this by repeatedly subtracting the smaller from the larger until they match.
                                </Text>
                            </View>

                            <View className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                                <Text className="text-slate-400 text-sm leading-6">
                                    The Euclidean algorithm can be visualized as finding the largest square that tiles an AxB rectangle.
                                    {"\n\n"}
                                    We repeatedly cut off the largest possible square from the remaining piece until only squares are left. The size of the final remaining square(s) is the Greatest Common Divisor.
                                </Text>
                            </View>
                        </Animated.View>
                    )}

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
