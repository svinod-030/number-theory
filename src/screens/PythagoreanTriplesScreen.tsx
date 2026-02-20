import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import { generatePythagoreanTriple } from '../utils/math';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInRight, ZoomIn } from 'react-native-reanimated';
import { Svg, Polygon, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

import { useTranslation } from 'react-i18next';

export default function PythagoreanTriplesScreen() {
    const { t } = useTranslation();
    const [x, setX] = useState('2');
    const [y, setY] = useState('1');

    const triple = useMemo(() => {
        const valX = parseInt(x) || 0;
        const valY = parseInt(y) || 0;
        if (valX <= valY) return null;
        return generatePythagoreanTriple(valX, valY);
    }, [x, y]);

    const svgSize = width - 48;
    const padding = 40;

    const triangleData = useMemo(() => {
        if (!triple) return null;
        const { a, b, c } = triple;
        const maxSide = Math.max(a, b);
        const scale = (svgSize - padding * 2) / maxSide;

        // Vertices for a right triangle (0,0), (a,0), (0,b)
        // Shifted for padding
        const p1 = { x: padding, y: padding + b * scale }; // Bottom Left
        const p2 = { x: padding + a * scale, y: padding + b * scale }; // Bottom Right
        const p3 = { x: padding, y: padding }; // Top Left

        return { p1, p2, p3, scale };
    }, [triple, svgSize]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('visualizers.pythagorean.title')} />

            <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}>
                <MathCard
                    title={t('visualizers.pythagorean.formula_title')}
                    description={t('visualizers.pythagorean.formula_desc')}
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.pythagorean.input_x')}
                                value={x}
                                onChangeText={setX}
                                keyboardType="numeric"
                                placeholder="x"
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.pythagorean.input_y')}
                                value={y}
                                onChangeText={setY}
                                keyboardType="numeric"
                                placeholder="y"
                                error={parseInt(x) <= parseInt(y)}
                                helperText={parseInt(x) <= parseInt(y) ? t('visualizers.pythagorean.input_y_helper') : ""}
                            />
                        </View>
                    </View>

                    <View className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50 items-center">
                        <Text className="text-indigo-300 font-mono text-base">
                            a = x² - y², b = 2xy, c = x² + y²
                        </Text>
                    </View>
                </MathCard>

                {triple ? (
                    <Animated.View entering={FadeIn.duration(600)}>
                        <View className="flex-row justify-between mb-8">
                            <TripleSquare label="a" value={triple.a} color="text-emerald-400" />
                            <TripleSquare label="b" value={triple.b} color="text-sky-400" />
                            <TripleSquare label="c" value={triple.c} color="text-indigo-400" />
                        </View>

                        <View className="bg-slate-900/50 p-4 rounded-3xl border border-slate-800 items-center overflow-hidden">
                            <View className="flex-row items-center mb-4">
                                <View className={`px-3 py-1 rounded-full ${triple.isPrimitive ? 'bg-emerald-500/20' : 'bg-slate-800'}`}>
                                    <Text className={`text-[10px] font-black uppercase ${triple.isPrimitive ? 'text-emerald-400' : 'text-slate-500'}`}>
                                        {triple.isPrimitive ? t('visualizers.pythagorean.primitive_triple') : t('visualizers.pythagorean.non_primitive')}
                                    </Text>
                                </View>
                            </View>

                            {triangleData && (
                                <Svg width={svgSize} height={svgSize}>
                                    {/* Triangle */}
                                    <Polygon
                                        points={`${triangleData.p1.x},${triangleData.p1.y} ${triangleData.p2.x},${triangleData.p2.y} ${triangleData.p3.x},${triangleData.p3.y}`}
                                        fill="rgba(99, 102, 241, 0.1)"
                                        stroke="#6366f1"
                                        strokeWidth="3"
                                        strokeLinejoin="round"
                                    />

                                    {/* Labels */}
                                    <SvgText
                                        x={(triangleData.p1.x + triangleData.p2.x) / 2}
                                        y={triangleData.p1.y + 25}
                                        fill="#94a3b8"
                                        fontSize="14"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        a = {triple.a}
                                    </SvgText>
                                    <SvgText
                                        x={triangleData.p1.x - 25}
                                        y={(triangleData.p1.y + triangleData.p3.y) / 2}
                                        fill="#94a3b8"
                                        fontSize="14"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        transform={`rotate(-90, ${triangleData.p1.x - 25}, ${(triangleData.p1.y + triangleData.p3.y) / 2})`}
                                    >
                                        b = {triple.b}
                                    </SvgText>
                                    <SvgText
                                        x={(triangleData.p2.x + triangleData.p3.x) / 2 + 15}
                                        y={(triangleData.p2.y + triangleData.p3.y) / 2 - 15}
                                        fill="#818cf8"
                                        fontSize="14"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        c = {triple.c}
                                    </SvgText>

                                    {/* Right Angle Indicator */}
                                    <Polygon
                                        points={`${triangleData.p1.x},${triangleData.p1.y - 15} ${triangleData.p1.x + 15},${triangleData.p1.y - 15} ${triangleData.p1.x + 15},${triangleData.p1.y}`}
                                        fill="none"
                                        stroke="#475569"
                                        strokeWidth="1"
                                    />
                                </Svg>
                            )}
                        </View>
                    </Animated.View>
                ) : (
                    <View className="items-center py-20">
                        <Ionicons name="warning-outline" size={48} color="#334155" />
                        <Text className="text-slate-500 mt-4 text-center">{t('visualizers.pythagorean.warning_x_y')}</Text>
                    </View>
                )}

                <MathCard
                    index={2}
                    title={t('visualizers.pythagorean.fun_fact_title')}
                    description={t('visualizers.pythagorean.fun_fact_desc')}
                />

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function TripleSquare({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <View className="bg-slate-900 p-4 rounded-3xl border border-slate-800 items-center flex-1 mx-1 shadow-lg">
            <Text className="text-slate-500 text-[10px] font-black uppercase mb-1">{label}</Text>
            <Text className={`text-2xl font-black ${color}`}>{value}</Text>
        </View>
    );
}
