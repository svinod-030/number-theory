import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPascalTriangle } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function PascalTriangleScreen() {
    const { t } = useTranslation();
    const [rows, setRows] = useState(8);
    const [highlightPattern, setHighlightPattern] = useState<'none' | 'parity' | 'div3' | 'div5'>('none');

    const triangle = getPascalTriangle(rows);

    const descriptions = {
        none: t('visualizers.pascal.desc_none'),
        parity: t('visualizers.pascal.desc_parity'),
        div3: t('visualizers.pascal.desc_div3'),
        div5: t('visualizers.pascal.desc_div5')
    };

    const getHexColor = (val: number) => {
        if (highlightPattern === 'none') return 'bg-slate-900 border-slate-800';
        if (highlightPattern === 'parity') {
            return val % 2 === 0 ? 'bg-slate-900 border-slate-800' : 'bg-emerald-500/20 border-emerald-500/40';
        }
        if (highlightPattern === 'div3') {
            return val % 3 === 0 ? 'bg-sky-500/20 border-sky-500/40' : 'bg-slate-900 border-slate-800';
        }
        if (highlightPattern === 'div5') {
            return val % 5 === 0 ? 'bg-amber-500/20 border-amber-500/40' : 'bg-slate-900 border-slate-800';
        }
        return 'bg-slate-900 border-slate-800';
    };

    const getTextColor = (val: number) => {
        if (highlightPattern === 'none') return 'text-slate-400';
        if (highlightPattern === 'parity' && val % 2 !== 0) return 'text-emerald-400';
        if (highlightPattern === 'div3' && val % 3 === 0) return 'text-sky-400';
        if (highlightPattern === 'div5' && val % 5 === 0) return 'text-amber-400';
        return 'text-slate-600';
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('visualizers.pascal.title')} />

            <View className="flex-row justify-center py-4 bg-slate-900/30 space-x-2 border-b border-slate-900 flex-wrap px-4">
                <PatternTab active={highlightPattern === 'none'} label={t('visualizers.pascal.tab_plain')} onPress={() => setHighlightPattern('none')} color="slate" />
                <PatternTab active={highlightPattern === 'parity'} label={t('visualizers.pascal.tab_sierpinski')} onPress={() => setHighlightPattern('parity')} color="emerald" />
                <PatternTab active={highlightPattern === 'div3'} label={t('visualizers.pascal.tab_mod3')} onPress={() => setHighlightPattern('div3')} color="sky" />
                <PatternTab active={highlightPattern === 'div5'} label={t('visualizers.pascal.tab_mod5')} onPress={() => setHighlightPattern('div5')} color="amber" />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="px-6 mb-6">
                    <MathCard
                        index={0}
                        title={t('visualizers.sieve.in_simple_terms')}
                    >
                        <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10 mb-4">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="bulb-outline" size={18} color="#34d399" />
                                <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">{t('visualizers.pascal.analogy_title')}</Text>
                            </View>
                            <Text className="text-slate-400 text-xs leading-5">
                                <Trans
                                    i18nKey="visualizers.pascal.analogy_desc"
                                    components={{
                                        1: <Text className="text-white font-bold" />,
                                        2: <Text className="text-emerald-400 font-bold" />
                                    }}
                                />
                            </Text>
                        </View>
                    </MathCard>
                    <MathCard
                        index={1}
                        description={descriptions[highlightPattern]}
                    >
                        <View className="flex-row items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
                            <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('visualizers.pascal.height_label')}</Text>
                            <View className="flex-row items-center space-x-4">
                                <TouchableOpacity onPress={() => setRows(Math.max(2, rows - 1))} className="bg-slate-800 p-2 rounded-xl border border-slate-700">
                                    <Ionicons name="remove" size={18} color="white" />
                                </TouchableOpacity>
                                <Text className="text-white text-xl font-black">{rows}</Text>
                                <TouchableOpacity onPress={() => setRows(Math.min(15, rows + 1))} className="bg-slate-800 p-2 rounded-xl border border-slate-700">
                                    <Ionicons name="add" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </MathCard>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="px-10 items-center min-w-full">
                        {triangle.map((row, i) => (
                            <Animated.View key={i} entering={FadeIn.delay(i * 50)} className="flex-row mb-2">
                                {row.map((val, j) => (
                                    <View
                                        key={`${i}-${j}`}
                                        className={`w-10 h-10 rounded-lg items-center justify-center border mx-0.5 ${getHexColor(val)}`}
                                    >
                                        <Text
                                            className={`text-[8px] font-black ${getTextColor(val)}`}
                                            numberOfLines={1}
                                            adjustsFontSizeToFit
                                        >
                                            {val > 9999 ? '...' : val}
                                        </Text>
                                    </View>
                                ))}
                            </Animated.View>
                        ))}
                    </View>
                </ScrollView>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function PatternTab({ active, label, onPress, color }: { active: boolean, label: string, onPress: () => void, color: string }) {
    const bg = active
        ? (color === 'emerald' ? 'bg-emerald-600' : color === 'sky' ? 'bg-sky-600' : color === 'amber' ? 'bg-amber-600' : 'bg-slate-600')
        : 'bg-slate-800';

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`px-3 py-1.5 rounded-xl mb-1 ${bg} border border-white/5`}
        >
            <Text className="text-white text-[10px] font-bold uppercase tracking-wider">{label}</Text>
        </TouchableOpacity>
    );
}
