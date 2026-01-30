import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getGCDWithSteps, isPrime, getPrimeFactors } from '../utils/math';

export default function ToolboxScreen() {
    const navigation = useNavigation();
    const [numA, setNumA] = useState('48');
    const [numB, setNumB] = useState('18');
    const [result, setResult] = useState<{ gcd: number; steps: string[] } | null>(null);

    const [checkNum, setCheckNum] = useState('17');
    const [primeInfo, setPrimeInfo] = useState<{ isPrime: boolean; factors: number[] } | null>(null);

    const handleCalculateGCD = () => {
        const a = parseInt(numA);
        const b = parseInt(numB);
        if (!isNaN(a) && !isNaN(b)) {
            setResult(getGCDWithSteps(a, b));
        }
    };

    const handleCheckPrime = () => {
        const n = parseInt(checkNum);
        if (!isNaN(n)) {
            setPrimeInfo({
                isPrime: isPrime(n),
                factors: getPrimeFactors(n)
            });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Toolbox</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1 px-6">
                {/* GCD Section */}
                <View className="mb-8">
                    <Text className="text-sky-400 font-bold text-lg mb-4">Euclidean Algorithm (GCD)</Text>
                    <View className="flex-row space-x-4 mb-4">
                        <TextInput
                            value={numA}
                            onChangeText={setNumA}
                            keyboardType="numeric"
                            className="flex-1 bg-slate-900 text-white p-4 rounded-xl border border-slate-800"
                            placeholder="Number A"
                            placeholderTextColor="#475569"
                        />
                        <TextInput
                            value={numB}
                            onChangeText={setNumB}
                            keyboardType="numeric"
                            className="flex-1 bg-slate-900 text-white p-4 rounded-xl border border-slate-800"
                            placeholder="Number B"
                            placeholderTextColor="#475569"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleCalculateGCD}
                        className="bg-sky-600 p-4 rounded-xl items-center"
                    >
                        <Text className="text-white font-bold">Calculate GCD</Text>
                    </TouchableOpacity>

                    {result && (
                        <View className="mt-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                            <Text className="text-white font-bold text-lg mb-2">GCD: {result.gcd}</Text>
                            <Text className="text-slate-400 text-sm mb-2">Steps:</Text>
                            {result.steps.map((step, i) => (
                                <Text key={i} className="text-slate-300 font-mono text-xs mb-1">
                                    {step}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>

                {/* Primality Section */}
                <View className="mb-8">
                    <Text className="text-sky-400 font-bold text-lg mb-4">Primality & Factors</Text>
                    <View className="flex-row space-x-4 mb-4">
                        <TextInput
                            value={checkNum}
                            onChangeText={setCheckNum}
                            keyboardType="numeric"
                            className="flex-1 bg-slate-900 text-white p-4 rounded-xl border border-slate-800"
                            placeholder="Enter Number"
                            placeholderTextColor="#475569"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleCheckPrime}
                        className="bg-sky-600 p-4 rounded-xl items-center"
                    >
                        <Text className="text-white font-bold">Check Primality</Text>
                    </TouchableOpacity>

                    {primeInfo && (
                        <View className="mt-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                            <View className="flex-row items-center mb-2">
                                <Text className="text-white font-bold text-lg mr-2">
                                    {primeInfo.isPrime ? 'It is Prime!' : 'Not Prime'}
                                </Text>
                                <Ionicons
                                    name={primeInfo.isPrime ? "checkmark-circle" : "close-circle"}
                                    size={20}
                                    color={primeInfo.isPrime ? "#10b981" : "#ef4444"}
                                />
                            </View>
                            {!primeInfo.isPrime && (
                                <Text className="text-slate-400 text-sm">
                                    Factors: {primeInfo.factors.join(' × ')}
                                </Text>
                            )}
                        </View>
                    )}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
