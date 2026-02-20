import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rsaSign, rsaVerify } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function DigitalSignatureScreen() {
    const { t } = useTranslation();
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
            <ScreenHeader title={t('visualizers.digital_signature.title')} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title={t('visualizers.sieve.in_simple_terms')}
                >
                    <View className="bg-indigo-500/5 p-5 rounded-2xl border border-indigo-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#818cf8" />
                            <Text className="text-indigo-400 font-bold ml-2 text-xs uppercase">{t('visualizers.digital_signature.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.digital_signature.simple_terms_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-indigo-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.digital_signature.description')}
                >
                    <ThemedInput
                        label={t('visualizers.digital_signature.input_label')}
                        value={msg}
                        onChangeText={setMsg}
                        keyboardType="numeric"
                        helperText={t('visualizers.digital_signature.helper_text')}
                    />

                    <View className="bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/20 items-center">
                        <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">{t('visualizers.digital_signature.signature_label')}</Text>
                        <Text className="text-white text-3xl font-black tracking-tighter">{signature}</Text>
                    </View>
                </MathCard>

                <MathCard
                    index={2}
                    title={t('visualizers.digital_signature.verification_title')}
                    description={t('visualizers.digital_signature.verification_desc')}
                >
                    <ThemedInput
                        label={t('visualizers.digital_signature.verify_input')}
                        value={signatureInput}
                        onChangeText={setSignatureInput}
                        placeholder={t('visualizers.digital_signature.placeholder')}
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
                                {isValid ? t('visualizers.digital_signature.authentic') : t('visualizers.digital_signature.invalid')}
                            </Text>
                            <Text className="text-slate-500 text-xs mt-2 text-center leading-4">
                                <Trans
                                    i18nKey="visualizers.digital_signature.decrypted_label"
                                    values={{ val: verifiedVal }}
                                    components={{
                                        1: <Text className="text-white font-mono" />
                                    }}
                                />{"\n"}
                                {isValid ? t('visualizers.digital_signature.matches') : t('visualizers.digital_signature.no_match')}
                            </Text>
                        </Animated.View>
                    )}
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
