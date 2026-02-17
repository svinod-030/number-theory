import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTotient, getCoprimes, isPrime } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function TotientScreen() {
    const [input, setInput] = useState('12');
    const [range, setRange] = useState(30);

    const n = parseInt(input) || 1;
    const phi = getTotient(n);
    const coprimes = getCoprimes(n);
    const isP = isPrime(n);

    const plotData = useMemo(() => {
        const data = [];
        for (let i = 1; i <= range; i++) {
            data.push({ n: i, phi: getTotient(i), isPrime: isPrime(i) });
        }
        return data;
    }, [range]);

    const maxPhi = Math.max(...plotData.map(d => d.phi), 1);
    const chartHeight = 150;
    const barWidth = (width - 100) / range;

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Euler's Totient (φ)" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title="In Simple Terms"
                >
                    <View className="bg-sky-500/5 p-5 rounded-2xl border border-sky-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">Everyday Analogy</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Imagine <Text className="text-white font-bold">12 lockers</Text> numbered 1-12. <Text className="text-sky-400 font-bold">φ(12) asks: how many of these numbers share NO common factor with 12?</Text>{"\n"}12 = 2×2×3, so cross off multiples of 2 and 3. What's left? <Text className="text-white font-bold">1, 5, 7, 11</Text> — four numbers. So φ(12) = 4.
                        </Text>
                    </View>
                    <View className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="globe-outline" size={18} color="#34d399" />
                            <Text className="text-emerald-400 font-bold ml-2 text-xs uppercase">Why It Matters</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            The totient function is the <Text className="text-white font-bold">heart of RSA encryption</Text>. When you generate RSA keys, you compute φ(n) to find the private key. Without it, public-key cryptography wouldn't work!
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description="Euler's totient function φ(n) counts the positive integers up to n that are relatively prime to n."
                >
                    <View className="flex-row space-x-4 items-end">
                        <View className="flex-1">
                            <ThemedInput
                                label="Input Number"
                                value={input}
                                onChangeText={setInput}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="bg-sky-500/10 border border-sky-500/20 p-5 rounded-2xl items-center justify-center min-w-[100px] mb-6">
                            <Text className="text-sky-400 text-[10px] mb-1 font-bold uppercase tracking-widest">φ({n})</Text>
                            <Text className="text-white text-3xl font-black">{phi}</Text>
                        </View>
                    </View>
                </MathCard>

                <MathCard index={2} title="Coprime Numbers">
                    <Text className="text-slate-500 text-[10px] mb-4 uppercase tracking-widest font-bold">Numbers coprime to {n}</Text>
                    <View className="flex-row flex-wrap">
                        {coprimes.map((c, i) => (
                            <View key={i} className="bg-slate-900 px-3 py-1.5 rounded-xl mr-2 mb-2 border border-slate-800">
                                <Text className="text-sky-300 font-bold text-xs">{c}</Text>
                            </View>
                        ))}
                    </View>
                </MathCard>

                <MathCard
                    index={3}
                    title="Totient Distribution"
                    description={`Visualizing φ(n) for n = 1 to ${range}:`}
                >
                    <View className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 items-center justify-center mb-4">
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
                        <View className="flex-row justify-between w-full mt-3">
                            <Text className="text-slate-600 text-[8px] font-bold">1</Text>
                            <Text className="text-slate-600 text-[8px] font-bold truncate">n={range}</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <View className="w-2 h-2 bg-sky-400 rounded-sm mr-2" />
                            <Text className="text-slate-500 text-[10px] font-bold uppercase">Prime (φ(p) = p-1)</Text>
                        </View>
                        <Text
                            onPress={() => setRange(range === 30 ? 60 : 30)}
                            className="text-sky-500 text-[10px] font-bold uppercase tracking-wider"
                        >
                            Toggle Range
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={2}
                    title="Properties"
                >
                    <View className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#38bdf8" />
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">Did you know?</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            {isP ? `Since ${n} is prime, φ(${n}) = ${n}-1 = ${phi}.` : `Numbers sharing prime factors with ${n} are not coprime.`}
                            The totient function is a key component of the RSA encryption algorithm!
                        </Text>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
