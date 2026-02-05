import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rsaSign, rsaVerify } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function DigitalSignatureScreen() {
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
            <ScreenHeader title="Digital Signatures" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    description="Digital signatures verify the authenticity of a message using RSA. Encryption with a private key serves as the signature."
                >
                    <ThemedInput
                        label="Message to Sign (Numeric)"
                        value={msg}
                        onChangeText={setMsg}
                        keyboardType="numeric"
                        helperText="The integer message to be signed"
                    />

                    <View className="bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/20 items-center">
                        <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">Generated Signature (s = mᵈ mod n)</Text>
                        <Text className="text-white text-3xl font-black tracking-tighter">{signature}</Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    title="Verification (Public Key)"
                    description="Anyone with the public key can verify that the signature was created by the corresponding private key."
                >
                    <ThemedInput
                        label="Verify Signature"
                        value={signatureInput}
                        onChangeText={setSignatureInput}
                        placeholder="Paste signature here"
                        keyboardType="numeric"
                    />

                    {signatureInput !== '' && (
                        <Animated.View
                            entering={FadeIn}
                            className={`${isValid ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'} border p-6 rounded-2xl items-center`}
                        >
                            <Ionicons
                                name={isValid ? "checkmark-circle" : "close-circle"}
                                size={40}
                                color={isValid ? "#34d399" : "#f43f5e"}
                            />
                            <Text className={`${isValid ? 'text-emerald-400' : 'text-rose-400'} font-black text-xl mt-3`}>
                                {isValid ? 'AUTHENTIC' : 'INVALID'}
                            </Text>
                            <Text className="text-slate-500 text-xs mt-2 text-center leading-4">
                                Decrypted value: <Text className="text-white font-mono">{verifiedVal}</Text>{"\n"}
                                {isValid ? 'Matches original message!' : 'Does not match message.'}
                            </Text>
                        </Animated.View>
                    )}
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
