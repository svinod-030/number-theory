import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    withSequence,
    Layout,
    FadeIn
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const GRID_SIZE = 10;
const CELL_MARGIN = 3;
const CELL_SIZE = (width - 64 - (GRID_SIZE * CELL_MARGIN * 2)) / GRID_SIZE;

interface NumberCellProps {
    num: number;
    status: 'active' | 'prime' | 'composite' | 'current' | 'idle';
}

const NumberCell = ({ num, status }: NumberCellProps) => {
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);

    const getColors = () => {
        switch (status) {
            case 'prime': return { bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-400' };
            case 'composite': return { bg: 'bg-slate-900', text: 'text-slate-700', border: 'border-slate-800' };
            case 'current': return { bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-400' };
            case 'active': return { bg: 'bg-sky-500', text: 'text-white', border: 'border-sky-400' };
            default: return { bg: 'bg-slate-900', text: 'text-slate-500', border: 'border-slate-800' };
        }
    };

    const { bg, text, border } = getColors();

    useEffect(() => {
        if (status === 'current') {
            scale.value = withSequence(withTiming(1.2, { duration: 200 }), withTiming(1, { duration: 200 }));
        } else if (status === 'composite') {
            opacity.value = withTiming(0.3, { duration: 500 });
        } else if (status === 'prime') {
            scale.value = withSequence(withTiming(1.1, { duration: 200 }), withTiming(1, { duration: 200 }));
        } else if (status === 'idle') {
            opacity.value = 1;
            scale.value = 1;
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
            className={`rounded-lg items-center justify-center border ${border} ${bg}`}
        >
            <Text className={`text-[10px] font-black ${text}`}>{num}</Text>
        </Animated.View>
    );
};

export default function SieveScreen() {
    const [numbers, setNumbers] = useState<Record<number, NumberCellProps['status']>>({});
    const [currentP, setCurrentP] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        initNumbers();
    }, []);

    const initNumbers = () => {
        const initial: Record<number, NumberCellProps['status']> = {};
        for (let i = 2; i <= 100; i++) {
            initial[i] = 'idle';
        }
        setNumbers(initial);
    };

    const reset = () => {
        setIsAnimating(false);
        initNumbers();
        setCurrentP(null);
    };

    const runStep = useCallback(() => {
        setNumbers(prev => {
            const next = { ...prev };
            let p = currentP;

            if (p === null) {
                p = 2;
            } else if (next[p] === 'current') {
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
                    next[p] = 'prime';
                    p = null;
                    for (let i = 2; i <= 100; i++) {
                        if (next[i] === 'idle') {
                            p = i;
                            break;
                        }
                    }
                    if (p === null || p * p > 100) {
                        if (p !== null) {
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
            interval = setInterval(runStep, 150);
        }
        return () => clearInterval(interval);
    }, [isAnimating, runStep]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Sieve of Eratosthenes" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title="In Simple Terms"
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">Everyday Analogy</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Imagine writing numbers 2–100 on a whiteboard. Start at <Text className="text-white font-bold">2</Text> (the first prime) and cross off every 2nd number after it (4, 6, 8…). Move to <Text className="text-white font-bold">3</Text> and cross off every 3rd number. Keep going — whatever survives the crossing is <Text className="text-emerald-400 font-bold">prime</Text>.
                        </Text>
                    </View>
                    <View className="bg-sky-500/5 p-5 rounded-2xl border border-sky-500/10">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="globe-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">Why It Matters</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Every time you shop online or send a message, <Text className="text-white font-bold">prime numbers</Text> protect your data. Modern encryption (like RSA) depends on large primes. The Sieve is the first step to finding them efficiently.
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description="The most efficient ancient algorithm to find all primes up to 100 by progressively marking multiples of each discovered prime."
                >
                    <View className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/50 items-center justify-center">
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

                    <View className="mt-8 flex-row items-center space-x-4">
                        <TouchableOpacity
                            onPress={() => setIsAnimating(!isAnimating)}
                            className={`flex-1 flex-row items-center justify-center p-4 rounded-2xl border ${isAnimating ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20'} active:opacity-80`}
                        >
                            <Ionicons
                                name={isAnimating ? "pause" : "play"}
                                size={24}
                                color={isAnimating ? "#f59e0b" : "#10b981"}
                            />
                            <Text className={`font-black ml-3 uppercase tracking-widest text-xs ${isAnimating ? 'text-amber-500' : 'text-emerald-500'}`}>
                                {isAnimating ? 'Stop Animation' : 'Start Sieve'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={reset}
                            className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50 active:bg-slate-900"
                        >
                            <Ionicons name="refresh" size={24} color="#f43f5e" />
                        </TouchableOpacity>
                    </View>
                </MathCard>

                <MathCard
                    index={2}
                    title="How it Works"
                >
                    <View className="space-y-4">
                        <StepItem icon="1" text="Start with the first prime (2)." />
                        <StepItem icon="2" text="Mark all its multiples as composite." />
                        <StepItem icon="3" text="Move to the next unmarked number and repeat." />
                        <StepItem icon="4" text="Stop when the next number's square exceeds the limit." />
                    </View>
                </MathCard>

                <MathCard
                    index={3}
                    title="Math Fact"
                >
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="leaf-outline" size={18} color="#10b981" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase font-bold">Historical Brilliance</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Attributed to the Greek mathematician Eratosthenes (3rd century BC), this method remains the foundation for many modern sieve theories used in advanced number theory research today.
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function StepItem({ icon, text }: { icon: string, text: string }) {
    return (
        <View className="flex-row items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
            <View className="w-6 h-6 rounded-full bg-slate-800 items-center justify-center mr-4 border border-slate-700">
                <Text className="text-slate-400 text-[10px] font-black">{icon}</Text>
            </View>
            <Text className="text-slate-400 text-xs font-bold flex-1">{text}</Text>
        </View>
    );
}
