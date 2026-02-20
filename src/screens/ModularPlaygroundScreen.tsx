import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width - 48;
const CENTER = CANVAS_SIZE / 2;
const RADIUS = CENTER - 10;

import { useTranslation, Trans } from 'react-i18next';
import ScreenHeader from '../components/ScreenHeader';

export default function ModularPlaygroundScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [n, setN] = useState(100);
    const [k, setK] = useState(2);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAnimating) {
            interval = setInterval(() => {
                setK(prev => (prev >= 50 ? 2 : prev + 0.1));
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isAnimating]);

    const lines = useMemo(() => {
        const result = [];
        for (let i = 0; i < n; i++) {
            const next = (i * k) % n;

            const angle1 = (i / n) * 2 * Math.PI - Math.PI / 2;
            const x1 = CENTER + RADIUS * Math.cos(angle1);
            const y1 = CENTER + RADIUS * Math.sin(angle1);

            const angle2 = (next / n) * 2 * Math.PI - Math.PI / 2;
            const x2 = CENTER + RADIUS * Math.cos(angle2);
            const y2 = CENTER + RADIUS * Math.sin(angle2);

            result.push({ x1, y1, x2, y2 });
        }
        return result;
    }, [n, k]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader
                title={t('tools.modular_playground.title')}
                rightElement={
                    <TouchableOpacity onPress={() => setIsAnimating(!isAnimating)}>
                        <Ionicons name={isAnimating ? "pause" : "play"} size={24} color="#38bdf8" />
                    </TouchableOpacity>
                }
            />

            <ScrollView className="flex-1 p-6">
                <View className="bg-sky-500/5 p-5 rounded-2xl border border-sky-500/10 mb-6">
                    <View className="flex-row items-center mb-3">
                        <Ionicons name="compass-outline" size={18} color="#38bdf8" />
                        <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">{t('visualizers.modular_playground.how_to_explore')}</Text>
                    </View>
                    <Text className="text-slate-400 text-xs leading-5">
                        <Trans
                            i18nKey="visualizers.modular_playground.explore_desc"
                            components={{
                                1: <Text className="text-white font-bold" />,
                                2: <Text className="text-sky-400 font-bold" />
                            }}
                        />
                    </Text>
                </View>

                <View className="bg-slate-900 rounded-3xl p-4 items-center mb-8 border border-slate-800">
                    <Svg width={CANVAS_SIZE} height={CANVAS_SIZE}>
                        <Circle
                            cx={CENTER}
                            cy={CENTER}
                            r={RADIUS}
                            stroke="#1e293b"
                            strokeWidth="1"
                            fill="transparent"
                        />
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="#38bdf8"
                                strokeWidth="0.5"
                                opacity={0.6}
                            />
                        ))}
                    </Svg>
                </View>

                <View className="space-y-6">
                    <View>
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-slate-400 font-medium">{t('visualizers.modular_playground.points_label')}</Text>
                            <Text className="text-sky-400 font-bold">{n}</Text>
                        </View>
                        <View className="flex-row items-center space-x-4">
                            <TouchableOpacity
                                onPress={() => setN(Math.max(5, n - 10))}
                                className="bg-slate-800 p-3 rounded-xl"
                            >
                                <Ionicons name="remove" size={20} color="white" />
                            </TouchableOpacity>
                            <View className="flex-1 h-2 bg-slate-800 rounded-full">
                                <View
                                    style={{ width: `${(n / 200) * 100}%` }}
                                    className="h-full bg-sky-500 rounded-full"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => setN(Math.min(200, n + 10))}
                                className="bg-slate-800 p-3 rounded-xl"
                            >
                                <Ionicons name="add" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-slate-400 font-medium">{t('visualizers.modular_playground.multiplier_label')}</Text>
                            <Text className="text-sky-400 font-bold">{typeof k === 'number' ? k.toFixed(1) : k}</Text>
                        </View>
                        <View className="flex-row items-center space-x-4">
                            <TouchableOpacity
                                onPress={() => setK(Math.max(2, k - 0.5))}
                                className="bg-slate-800 p-3 rounded-xl"
                            >
                                <Ionicons name="remove" size={20} color="white" />
                            </TouchableOpacity>
                            <View className="flex-1 h-2 bg-slate-800 rounded-full">
                                <View
                                    style={{ width: `${(k / 50) * 100}%` }}
                                    className="h-full bg-sky-500 rounded-full"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => setK(Math.min(50, k + 0.5))}
                                className="bg-slate-800 p-3 rounded-xl"
                            >
                                <Ionicons name="add" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View className="mt-8 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
                    <Text className="text-slate-400 text-sm leading-6">
                        {t('visualizers.modular_playground.patterns_desc')}
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

