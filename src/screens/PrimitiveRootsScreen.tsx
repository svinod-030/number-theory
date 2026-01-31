import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getPowerResidues, isPrimitiveRoot, getTotient, getPrimitiveRoots } from '../utils/math';
import Animated, { FadeIn, ZoomIn, useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function PrimitiveRootsScreen() {
    const navigation = useNavigation();
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
    const radius = circleSize * 0.4;

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Primitive Roots</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="px-6 pt-6">
                    <View className="flex-row space-x-4 mb-8">
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">Base (a)</Text>
                            <TextInput
                                value={baseInput}
                                onChangeText={setBaseInput}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">Modulo (n)</Text>
                            <TextInput
                                value={modInput}
                                onChangeText={setModInput}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                            />
                        </View>
                    </View>

                    <View className="bg-slate-900 rounded-3xl border border-slate-800 mb-8 overflow-hidden">
                        <View className={`${isRoot ? 'bg-sky-500' : 'bg-slate-800'} px-6 py-3 flex-row items-center justify-between`}>
                            <Text className="text-white font-bold">{isRoot ? 'PRIMITIVE ROOT' : 'NOT A PRIMITIVE ROOT'}</Text>
                            <Ionicons name={isRoot ? "star" : "close-circle"} size={20} color="white" />
                        </View>
                        <View className="p-6 items-center">
                            <Text className="text-slate-400 text-center mb-6 text-sm">
                                Powers of {a} mod {n} generate {residues.length} unique values. {isRoot ? `Since φ(${n}) = ${phi}, it generates the entire group!` : `It needs ${phi} values to be a generator.`}
                            </Text>

                            <View style={{ width: circleSize, height: circleSize, position: 'relative' }}>
                                {/* Clock markers */}
                                {Array.from({ length: n }).map((_, i) => {
                                    const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
                                    const x = center + radius * Math.cos(angle);
                                    const y = center + radius * Math.sin(angle);
                                    const isActive = residues.includes(i);
                                    return (
                                        <View
                                            key={i}
                                            style={{
                                                position: 'absolute',
                                                left: x - 15,
                                                top: y - 15,
                                                width: 30,
                                                height: 30,
                                                backgroundColor: isActive ? '#0ea5e9' : '#1e293b',
                                                borderRadius: 15,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: isActive ? '#38bdf8' : '#334155'
                                            }}
                                        >
                                            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{i}</Text>
                                        </View>
                                    );
                                })}

                                {/* Power lines */}
                                {residues.length > 1 && residues.map((val, i) => {
                                    if (i === residues.length - 1) return null;
                                    const nextVal = residues[i + 1];
                                    const angle1 = (val * 2 * Math.PI) / n - Math.PI / 2;
                                    const angle2 = (nextVal * 2 * Math.PI) / n - Math.PI / 2;

                                    const x1 = center + (radius - 15) * Math.cos(angle1);
                                    const y1 = center + (radius - 15) * Math.sin(angle1);
                                    const x2 = center + (radius - 15) * Math.cos(angle2);
                                    const y2 = center + (radius - 15) * Math.sin(angle2);

                                    return (
                                        <View
                                            key={i}
                                            style={{
                                                position: 'absolute',
                                                left: x1,
                                                top: y1,
                                                width: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
                                                height: 2,
                                                backgroundColor: 'rgba(56, 189, 248, 0.3)',
                                                transform: [{ rotate: `${Math.atan2(y2 - y1, x2 - x1)}rad` }],
                                                transformOrigin: '0% 0%'
                                            }}
                                        />
                                    );
                                })}
                            </View>
                        </View>
                    </View>

                    <Text className="text-slate-500 text-xs mb-4 uppercase tracking-widest font-bold">Residue Sequence</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                        {residues.map((r, i) => (
                            <View key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mr-3 items-center min-w-[60px]">
                                <Text className="text-slate-500 text-[10px] mb-1 font-bold">{a}^{i + 1}</Text>
                                <Text className="text-white text-xl font-bold">{r}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <Text className="text-slate-500 text-xs mb-4 uppercase tracking-widest font-bold">Other Primitive Roots mod {n}</Text>
                    <View className="flex-row flex-wrap mb-10">
                        {roots.length > 0 ? roots.map((root, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => setBaseInput(root.toString())}
                                className="bg-sky-900/30 border border-sky-500/30 px-4 py-2 rounded-xl mr-2 mb-2"
                            >
                                <Text className="text-sky-400 font-bold">{root}</Text>
                            </TouchableOpacity>
                        )) : (
                            <Text className="text-slate-600 italic">No primitive roots exist for this modulo.</Text>
                        )}
                    </View>
                </View>

                <View className="px-6 pb-12">
                    <View className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="information-circle-outline" size={20} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2">Did you know?</Text>
                        </View>
                        <Text className="text-slate-400 text-sm leading-5">
                            Primitive roots only exist for modular values of the form 2, 4, p^k, or 2p^k where p is an odd prime. If they exist, there are exactly φ(φ(n)) of them!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
