import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    withSequence,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const GRID_SIZE = 10;
const CELL_MARGIN = 4;
const CELL_SIZE = (width - 48 - (GRID_SIZE * CELL_MARGIN * 2)) / GRID_SIZE;

interface NumberCellProps {
    num: number;
    status: 'active' | 'prime' | 'composite' | 'current' | 'idle';
}

const NumberCell = ({ num, status }: NumberCellProps) => {
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);

    const getColors = () => {
        switch (status) {
            case 'prime': return { bg: 'bg-emerald-500', text: 'text-white' };
            case 'composite': return { bg: 'bg-slate-800', text: 'text-slate-600' };
            case 'current': return { bg: 'bg-amber-500', text: 'text-white' };
            case 'active': return { bg: 'bg-sky-500', text: 'text-white' };
            default: return { bg: 'bg-slate-900', text: 'text-slate-400' };
        }
    };

    const { bg, text } = getColors();

    useEffect(() => {
        if (status === 'current') {
            scale.value = withSequence(withTiming(1.2, { duration: 200 }), withTiming(1, { duration: 200 }));
        } else if (status === 'composite') {
            opacity.value = withTiming(0.4, { duration: 500 });
        } else if (status === 'prime') {
            scale.value = withTiming(1.1, { duration: 300 });
        } else {
            opacity.value = withTiming(1, { duration: 300 });
            scale.value = withTiming(1, { duration: 300 });
        }
    }, [status]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View
            style={[
                { width: CELL_SIZE, height: CELL_SIZE, margin: CELL_MARGIN },
                animatedStyle
            ]}
            className={`rounded-lg items-center justify-center border border-slate-800/50 ${bg}`}
        >
            <Text className={`text-xs font-bold ${text}`}>{num}</Text>
        </Animated.View>
    );
};

export default function SieveScreen() {
    const navigation = useNavigation();
    const [numbers, setNumbers] = useState<Record<number, NumberCellProps['status']>>({});
    const [currentP, setCurrentP] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const initial: Record<number, NumberCellProps['status']> = {};
        for (let i = 2; i <= 100; i++) {
            initial[i] = 'idle';
        }
        setNumbers(initial);
    }, []);

    const reset = () => {
        setIsAnimating(false);
        const initial: Record<number, NumberCellProps['status']> = {};
        for (let i = 2; i <= 100; i++) {
            initial[i] = 'idle';
        }
        setNumbers(initial);
        setCurrentP(null);
        setStep(0);
    };

    const runStep = useCallback(() => {
        setNumbers(prev => {
            const next = { ...prev };
            let p = currentP;

            // Find next prime p
            if (p === null) {
                p = 2;
            } else if (next[p] === 'current') {
                // If already at p, mark its multiples
                let multiple = p * 2;
                let foundMultiple = false;
                while (multiple <= 100) {
                    if (next[multiple] === 'idle') {
                        next[multiple] = 'composite';
                        foundMultiple = true;
                        break;
                    }
                    multiple += p;
                }

                if (!foundMultiple) {
                    // No more multiples for this p, mark p as prime and find next p
                    next[p] = 'prime';
                    p = null;
                    for (let i = 2; i <= 100; i++) {
                        if (next[i] === 'idle') {
                            p = i;
                            break;
                        }
                    }
                    if (p === null || p * p > 100) {
                        // Sieve complete
                        if (p !== null) {
                            // Mark remaining as prime
                            for (let i = p; i <= 100; i++) {
                                if (next[i] === 'idle') next[i] = 'prime';
                            }
                        }
                        setIsAnimating(false);
                        return next;
                    }
                    next[p] = 'current';
                }
            } else {
                next[p] = 'current';
            }

            setCurrentP(p);
            return next;
        });
    }, [currentP]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAnimating) {
            interval = setInterval(() => {
                runStep();
            }, 400);
        }
        return () => clearInterval(interval);
    }, [isAnimating, runStep]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Sieve of Eratosthenes</Text>
                <TouchableOpacity onPress={reset}>
                    <Ionicons name="refresh" size={24} color="#f43f5e" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
                <View className="p-6">
                    <View className="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-2xl">
                        <View className="flex-row flex-wrap justify-center">
                            {Object.keys(numbers).sort((a, b) => Number(a) - Number(b)).map((num) => (
                                <NumberCell
                                    key={num}
                                    num={Number(num)}
                                    status={numbers[Number(num)]}
                                />
                            ))}
                        </View>
                    </View>

                    <View className="mt-8 space-y-4">
                        <View className="flex-row justify-between items-center bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <View>
                                <Text className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Status</Text>
                                <Text className="text-white text-lg font-bold">
                                    {isAnimating ? 'Sieving...' : 'Ready'}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setIsAnimating(!isAnimating)}
                                className={`p-4 rounded-2xl ${isAnimating ? 'bg-amber-500/20' : 'bg-emerald-500/20'}`}
                            >
                                <Ionicons
                                    name={isAnimating ? "pause" : "play"}
                                    size={28}
                                    color={isAnimating ? "#f59e0b" : "#10b981"}
                                />
                            </TouchableOpacity>
                        </View>

                        <View className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                            <Text className="text-slate-400 text-sm leading-6">
                                The Sieve of Eratosthenes is an ancient algorithm for finding all prime numbers up to any given limit.
                                {"\n\n"}
                                1. Find the next smallest number (p) that isn't marked.
                                {"\n"}
                                2. Mark p as a prime.
                                {"\n"}
                                3. Mark all multiples of p as composite.
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
