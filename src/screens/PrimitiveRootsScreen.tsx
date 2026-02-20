import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPowerResidues, isPrimitiveRoot, getTotient, getPrimitiveRoots } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

import { useTranslation, Trans } from 'react-i18next';

export default function PrimitiveRootsScreen() {
    const { t } = useTranslation();
    const [baseInput, setBaseInput] = useState('3');
    const [modInput, setModInput] = useState('7');

    const a = parseInt(baseInput) || 1;
    const n = parseInt(modInput) || 2;

    const residues = useMemo(() => getPowerResidues(a, n), [a, n]);
    const phi = useMemo(() => getTotient(n), [n]);
    const isRoot = residues.length === phi;
    const roots = useMemo(() => getPrimitiveRoots(n), [n]);

    const circleSize = width * 0.7;
    const center = circleSize / 2;
    const radius = circleSize * 0.38;

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('tools.primitive_roots.title')} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title={t('visualizers.sieve.in_simple_terms')}
                >
                    <View className="bg-sky-500/5 p-5 rounded-2xl border border-sky-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">{t('visualizers.primitive_roots.analogy_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.primitive_roots.analogy_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-sky-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.primitive_roots.description')}
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.primitive_roots.base_label')}
                                value={baseInput}
                                onChangeText={setBaseInput}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.primitive_roots.mod_label')}
                                value={modInput}
                                onChangeText={setModInput}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <Animated.View
                        key={`${a}-${n}`}
                        entering={FadeIn}
                        className={`bg-slate-900 rounded-3xl border ${isRoot ? 'border-sky-500/50' : 'border-slate-800'} overflow-hidden mb-4`}
                    >
                        <View className={`${isRoot ? 'bg-sky-500' : 'bg-slate-800'} px-6 py-3 flex-row items-center justify-between`}>
                            <Text className="text-white font-bold text-xs uppercase tracking-widest">{isRoot ? t('visualizers.primitive_roots.is_root') : t('visualizers.primitive_roots.not_root')}</Text>
                            <Ionicons name={isRoot ? "star" : "close-circle"} size={18} color="white" />
                        </View>
                        <View className="p-6 items-center">
                            <Text className="text-slate-400 text-center mb-8 text-[11px] leading-4">
                                <Trans
                                    i18nKey="visualizers.primitive_roots.residues_desc"
                                    values={{ a, n, count: residues.length, status: isRoot ? t('visualizers.primitive_roots.is_root_status', { n, phi }) : t('visualizers.primitive_roots.not_root_status', { n, phi }) }}
                                    components={{
                                        1: <Text className="text-white font-bold" />
                                    }}
                                />
                            </Text>

                            <View style={{ width: circleSize, height: circleSize, position: 'relative' }}>
                                {Array.from({ length: Math.min(n, 64) }).map((_, i) => {
                                    const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
                                    const x = center + radius * Math.cos(angle);
                                    const y = center + radius * Math.sin(angle);
                                    const isActive = residues.includes(i);
                                    return (
                                        <View
                                            key={i}
                                            style={{
                                                position: 'absolute',
                                                left: x - 12,
                                                top: y - 12,
                                                width: 24,
                                                height: 24,
                                                backgroundColor: isActive ? '#0ea5e9' : '#1e293b',
                                                borderRadius: 12,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: isActive ? '#38bdf8' : '#334155'
                                            }}
                                        >
                                            <Text style={{ color: 'white', fontSize: 8, fontWeight: '900' }}>{i}</Text>
                                        </View>
                                    );
                                })}

                                {residues.length > 1 && residues.slice(0, 100).map((val, i) => {
                                    if (i === residues.length - 1) return null;
                                    const nextVal = residues[i + 1];
                                    const angle1 = (val * 2 * Math.PI) / n - Math.PI / 2;
                                    const angle2 = (nextVal * 2 * Math.PI) / n - Math.PI / 2;

                                    const x1 = center + (radius - 12) * Math.cos(angle1);
                                    const y1 = center + (radius - 12) * Math.sin(angle1);
                                    const x2 = center + (radius - 12) * Math.cos(angle2);
                                    const y2 = center + (radius - 12) * Math.sin(angle2);

                                    return (
                                        <View
                                            key={i}
                                            style={{
                                                position: 'absolute',
                                                left: x1,
                                                top: y1,
                                                width: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
                                                height: 1.5,
                                                backgroundColor: 'rgba(56, 189, 248, 0.4)',
                                                transform: [{ rotate: `${Math.atan2(y2 - y1, x2 - x1)}rad` }],
                                                transformOrigin: '0% 0%'
                                            }}
                                        />
                                    );
                                })}
                            </View>
                        </View>
                    </Animated.View>
                </MathCard>

                <MathCard
                    index={2}
                    title={t('visualizers.primitive_roots.sequence_title')}
                    description={t('visualizers.primitive_roots.sequence_desc', { a, n })}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
                        {residues.map((r, i) => (
                            <View key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mr-3 items-center min-w-[50px]">
                                <Text className="text-slate-600 text-[8px] mb-1 font-bold uppercase">{a}^{i + 1}</Text>
                                <Text className="text-white text-xl font-black">{r}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </MathCard>

                <MathCard
                    index={3}
                    title={t('visualizers.primitive_roots.others_title')}
                >
                    <View className="flex-row flex-wrap">
                        {roots.length > 0 ? roots.map((root, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => setBaseInput(root.toString())}
                                className="bg-sky-500/10 border border-sky-500/20 px-4 py-2 rounded-xl mr-2 mb-2"
                            >
                                <Text className="text-sky-400 font-bold text-xs">{root}</Text>
                            </TouchableOpacity>
                        )) : (
                            <Text className="text-slate-600 italic text-xs">{t('visualizers.primitive_roots.no_roots', { n })}</Text>
                        )}
                    </View>
                </MathCard>

                <MathCard
                    index={4}
                    title={t('visualizers.primitive_roots.fun_fact')}
                >
                    <View className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">{t('visualizers.primitive_roots.fun_fact')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            {t('visualizers.primitive_roots.fun_fact_desc')}
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
