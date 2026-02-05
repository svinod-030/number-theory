import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { rsaSign, rsaVerify } from '../utils/math';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

export default function DigitalSignatureScreen() {
    const navigation = useNavigation();

    // RSA parameters for simple demo
    const n = 3233; // 61 * 53
    const e = 17;
    const d = 2753;

    const [msg, setMsg] = useState('123');
    const [signatureInput, setSignatureInput] = useState('');

    const m = parseInt(msg) || 0;
    const signature = rsaSign(m, d, n);

    const verifyInput = parseInt(signatureInput) || 0;
    const verifiedVal = rsaVerify(verifyInput, e, n);
    const isValid = verifiedVal === m && signatureInput !== '';

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-white">Digital Signatures</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mb-8">
                    <Text className="text-slate-400 text-sm mb-6 leading-6">
                        Signatures prove that a message comes from a specific source and hasn't been tampered with.
                    </Text>

                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8">
                        <Text className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">1. Sign Message (Private Key)</Text>
                        <TextInput
                            value={msg}
                            onChangeText={setMsg}
                            keyboardType="numeric"
                            className="bg-slate-800 text-white p-4 rounded-2xl border border-slate-700 text-lg mb-6"
                        />
                        <View className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 items-center">
                            <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">Generated Signature (s = mᵈ mod n)</Text>
                            <Text className="text-white text-3xl font-black">{signature}</Text>
                        </View>
                    </View>

                    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8">
                        <Text className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">2. Verify Signature (Public Key)</Text>
                        <Text className="text-slate-400 text-xs mb-4">Paste the signature above to verify authenticity:</Text>
                        <TextInput
                            value={signatureInput}
                            onChangeText={setSignatureInput}
                            placeholder="Enter signature"
                            placeholderTextColor="#475569"
                            keyboardType="numeric"
                            className="bg-slate-800 text-white p-4 rounded-2xl border border-slate-700 text-lg mb-6"
                        />

                        {signatureInput !== '' && (
                            <Animated.View entering={FadeIn} className={`${isValid ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'} border p-6 rounded-2xl items-center`}>
                                <Ionicons name={isValid ? "checkmark-circle" : "close-circle"} size={32} color={isValid ? "#34d399" : "#f43f5e"} />
                                <Text className={`${isValid ? 'text-emerald-400' : 'text-rose-400'} font-bold text-lg mt-2`}>
                                    {isValid ? 'Authentic Signature' : 'Invalid / Tempered'}
                                </Text>
                                <Text className="text-slate-500 text-xs mt-1 text-center">
                                    Computed value: {verifiedVal} {isValid ? '(Matches message)' : '(Does not match)'}
                                </Text>
                            </Animated.View>
                        )}
                    </View>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
