import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { powerMod, isPrime } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { ZoomIn, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function ModularExponentiationScreen() {
    const [base, setBase] = useState('2');
    const [exp, setExp] = useState('10');
    const [mod, setMod] = useState('7');

    const b = parseInt(base) || 0;
    const e = parseInt(exp) || 0;
    const m = parseInt(mod) || 1;

    const result = powerMod(b, e, m);
    const isModPrime = isPrime(m);

    const canUseFermat = isModPrime && (b % m !== 0);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Modular Exponentiation" />

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
                            <Text className="text-sky-400 font-bold ml-2 text-xs uppercase">The Shortcut</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            What's <Text className="text-white font-bold">2¹⁰ mod 7</Text>? You could compute 2¹⁰ = 1024, then divide by 7. But there's a faster way: <Text className="text-sky-400 font-bold">keep taking remainders at each step</Text>.{"\n"}2→4→1→2→4→1… The answer cycles! This trick lets computers handle numbers with <Text className="text-white font-bold">hundreds of digits</Text> — the basis of all modern encryption.
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description="Calculate large powers modulo n efficiently. This is the foundation of modern cryptography like RSA."
                >
                    <View className="flex-row space-x-2">
                        <View className="flex-[1.5]">
                            <ThemedInput label="Base (a)" value={base} onChangeText={setBase} keyboardType="numeric" />
                        </View>
                        <View className="flex-1">
                            <ThemedInput label="Exp (k)" value={exp} onChangeText={setExp} keyboardType="numeric" />
                        </View>
                        <View className="flex-[1.5]">
                            <ThemedInput label="Mod (n)" value={mod} onChangeText={setMod} keyboardType="numeric" />
                        </View>
                    </View>

                    <Animated.View key={`${b}-${e}-${m}`} entering={ZoomIn} className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl items-center my-4">
                        <Text className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2">Result</Text>
                        <Text className="text-6xl font-black text-emerald-400">{result}</Text>
                        <Text className="text-slate-500 text-[10px] mt-4 uppercase font-bold text-center">
                            {b}^{e} mod {m} ≡ {result}
                        </Text>
                    </Animated.View>
                </MathCard>

                {canUseFermat && (
                    <MathCard
                        index={2}
                        title="Fermat's Little Theorem"
                        description="Since the modulus is prime, we can use this theorem to simplify calculations."
                    >
                        <Animated.View entering={FadeIn} className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20">
                            <View className="flex-row items-center mb-4">
                                <Ionicons name="sparkles" size={16} color="#fbbf24" />
                                <Text className="text-amber-400 font-bold ml-2 text-xs uppercase">Power Reduction</Text>
                            </View>
                            <Text className="text-slate-300 text-xs mb-4 leading-5">
                                If <Text className="text-white font-bold">p</Text> is prime and does not divide <Text className="text-white font-bold">a</Text>, then <Text className="text-white font-mono">aᵖ⁻¹ ≡ 1 (mod p)</Text>.
                            </Text>
                            <View className="bg-slate-950/50 p-4 rounded-xl items-center">
                                <Text className="text-white font-mono text-sm">{b}^{m - 1} ≡ 1 (mod {m})</Text>
                            </View>
                        </Animated.View>
                    </MathCard>
                )}

                <MathCard
                    index={3}
                    title="Algorithm Efficiency"
                >
                    <View className="flex-row items-center space-x-3">
                        <View className="bg-sky-500/20 p-2 rounded-lg">
                            <Ionicons name="speedometer-outline" size={20} color="#38bdf8" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white font-bold text-sm">Binary Exponentiation</Text>
                            <Text className="text-slate-500 text-[10px] mt-0.5">Calculates result in O(log k) steps using squaring and multiplication.</Text>
                        </View>
                    </View>
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
