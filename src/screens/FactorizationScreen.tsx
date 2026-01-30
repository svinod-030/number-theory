import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFactorTree, FactorNode, getPrimeFactors } from '../utils/math';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const Node = ({ node, level = 0 }: { node: FactorNode; level?: number }) => {
    // Dynamic spacing: higher levels (top of tree) need more space to spread
    const horizontalMargin = Math.max(12, 40 - level * 4);

    return (
        <View style={{ alignItems: 'center' }}>
            <Animated.View
                entering={ZoomIn.springify().delay(level * 100)}
                className={`w-14 h-14 rounded-full items-center justify-center border-2 shadow-sm ${node.isPrime ? 'bg-emerald-900 border-emerald-400' : 'bg-slate-800 border-slate-600'
                    }`}
            >
                <Text className="text-white font-bold text-lg">{node.value}</Text>
            </Animated.View>

            {node.left && node.right && (
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={{ alignItems: 'center', marginHorizontal: horizontalMargin }}>
                        <View className="w-0.5 h-8 bg-slate-700" style={{ transform: [{ rotate: '25deg' }, { translateY: -4 }] }} />
                        <Node node={node.left} level={level + 1} />
                    </View>
                    <View style={{ alignItems: 'center', marginHorizontal: horizontalMargin }}>
                        <View className="w-0.5 h-8 bg-slate-700" style={{ transform: [{ rotate: '-25deg' }, { translateY: -4 }] }} />
                        <Node node={node.right} level={level + 1} />
                    </View>
                </View>
            )}
        </View>
    );
};

export default function FactorizationScreen() {
    const navigation = useNavigation();
    const [input, setInput] = useState('60');
    const [tree, setTree] = useState<FactorNode | null>(null);
    const [factors, setFactors] = useState<number[]>([]);

    useEffect(() => {
        handleCalculate();
    }, []);

    const handleCalculate = () => {
        const n = parseInt(input);
        if (!isNaN(n) && n > 1) {
            setTree(getFactorTree(n));
            setFactors(getPrimeFactors(n));
        }
    };

    const factorCountMap = factors.reduce((acc, f) => {
        acc[f] = (acc[f] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Factor Tree</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1">
                <View className="px-6 mb-8">
                    <View className="flex-row space-x-4 mb-4">
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            keyboardType="numeric"
                            className="flex-1 bg-slate-900 text-white p-4 rounded-xl border border-slate-800"
                            placeholder="Enter a composite number"
                            placeholderTextColor="#475569"
                        />
                        <TouchableOpacity
                            onPress={handleCalculate}
                            className="bg-emerald-600 px-6 rounded-xl items-center justify-center"
                        >
                            <Ionicons name="play" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {factors.length > 0 && (
                        <View className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                            <Text className="text-slate-400 text-xs uppercase mb-2 font-bold tracking-widest">
                                Unique Factorization
                            </Text>
                            <View className="flex-row flex-wrap items-baseline">
                                {Object.entries(factorCountMap).map(([f, count], i) => (
                                    <View key={f} className="flex-row items-baseline mr-2">
                                        <Text className="text-2xl font-bold text-emerald-400">{f}</Text>
                                        {count > 1 && (
                                            <Text className="text-sm font-bold text-emerald-600 ml-0.5" style={{ top: -8 }}>
                                                {count}
                                            </Text>
                                        )}
                                        {i < Object.keys(factorCountMap).length - 1 && (
                                            <Text className="text-slate-500 mx-2 text-xl">×</Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    indicatorStyle="white"
                    contentContainerStyle={{
                        paddingVertical: 40,
                        paddingHorizontal: 100, // Large padding for deep trees
                        minWidth: width,
                    }}
                >
                    <View style={{ alignSelf: 'flex-start' }}>
                        {tree && <Node node={tree} />}
                    </View>
                </ScrollView>

                <View className="px-6 pb-12">
                    <View className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="information-circle-outline" size={20} color="#10b981" />
                            <Text className="text-emerald-400 font-bold ml-2">Fundamental Theorem</Text>
                        </View>
                        <Text className="text-slate-400 text-sm leading-5">
                            Every integer greater than 1 either is a prime number itself or can be represented as a product of prime numbers and that, moreover, this representation is unique, up to (except for) the order of the factors.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
