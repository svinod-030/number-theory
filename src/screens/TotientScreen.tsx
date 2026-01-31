import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getTotient, getCoprimes, isPrime } from '../utils/math';

const { width } = Dimensions.get('window');

export default function TotientScreen() {
    const navigation = useNavigation();
    const [input, setInput] = useState('12');
    const [range, setRange] = useState(30);

    const n = parseInt(input) || 1;
    const phi = getTotient(n);
    const coprimes = getCoprimes(n);
    const isP = isPrime(n);

    // Data for the distribution plot
    const plotData = useMemo(() => {
        const data = [];
        for (let i = 1; i <= range; i++) {
            data.push({ n: i, phi: getTotient(i), isPrime: isPrime(i) });
        }
        return data;
    }, [range]);

    const maxPhi = Math.max(...plotData.map(d => d.phi), 1);
    const chartHeight = 180;
    const barWidth = (width - 80) / range;

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Euler's Totient (φ)</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="px-6 pt-6 mb-8">
                    <View className="flex-row space-x-4 mb-6">
                        <View className="flex-1">
                            <Text className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-bold">Input Number</Text>
                            <TextInput
                                value={input}
                                onChangeText={setInput}
                                keyboardType="numeric"
                                className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-lg font-bold"
                                placeholder="n"
                            />
                        </View>
                        <View className="bg-sky-900/40 border border-sky-500/30 p-4 rounded-2xl items-center justify-center min-w-[100px]">
                            <Text className="text-sky-400 text-xs mb-1 font-bold">φ({n})</Text>
                            <Text className="text-white text-3xl font-black">{phi}</Text>
                        </View>
                    </View>

                    <View className="bg-slate-900 p-5 rounded-2xl border border-slate-800 mb-8">
                        <Text className="text-slate-500 text-xs mb-4 uppercase tracking-widest font-bold">Numbers coprime to {n}</Text>
                        <View className="flex-row flex-wrap">
                            {coprimes.map((c, i) => (
                                <View key={i} className="bg-slate-800 px-3 py-1.5 rounded-lg mr-2 mb-2 border border-slate-700">
                                    <Text className="text-sky-300 font-bold">{c}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Text className="text-slate-500 text-xs mb-4 uppercase tracking-widest font-bold">Distribution Plot (φ(1) to φ({range}))</Text>
                    <View className="bg-slate-900 p-4 rounded-2xl border border-slate-800 items-center justify-center mb-4">
                        <View style={{ height: chartHeight, width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            {plotData.map((d, i) => (
                                <View key={i} style={{ alignItems: 'center' }}>
                                    <View
                                        style={{
                                            width: Math.max(2, barWidth - 2),
                                            height: (d.phi / maxPhi) * chartHeight,
                                            backgroundColor: d.isPrime ? '#38bdf8' : '#1e293b',
                                            borderRadius: 2,
                                            borderWidth: d.isPrime ? 0 : 1,
                                            borderColor: '#334155'
                                        }}
                                    />
                                </View>
                            ))}
                        </View>
                        <View className="flex-row justify-between w-full mt-2">
                            <Text className="text-slate-600 text-[10px]">1</Text>
                            <Text className="text-slate-600 text-[10px]">{range}</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between mb-8">
                        <View className="flex-row items-center">
                            <View className="w-3 h-3 bg-sky-400 rounded-sm mr-2" />
                            <Text className="text-slate-400 text-xs">Prime (φ(p) = p-1)</Text>
                        </View>
                        <TouchableOpacity onPress={() => setRange(range === 30 ? 60 : 30)}>
                            <Text className="text-sky-500 text-xs font-bold">Toggle Range</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-6 pb-12">
                    <View className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="information-circle-outline" size={20} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2">How it works</Text>
                        </View>
                        <Text className="text-slate-400 text-sm leading-5">
                            Euler's totient function counts how many numbers less than $n$ have a GCD of 1 with $n$. {isP ? `Since ${n} is prime, all ${n - 1} numbers smaller than it are coprime!` : `Numbers that share prime factors with ${n} are excluded.`}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
