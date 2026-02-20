import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { isPrime, getGCDWithSteps, getModularInverse, powerMod } from '../utils/math';
import Animated, { FadeIn } from 'react-native-reanimated';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function RSAScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [p, setP] = useState('61');
    const [q, setQ] = useState('53');
    const [message, setMessage] = useState('42');

    const numP = parseInt(p) || 0;
    const numQ = parseInt(q) || 0;
    const m = parseInt(message) || 0;

    const n = numP * numQ;
    const phi = (numP - 1) * (numQ - 1);

    const e = 17;
    const { gcd } = getGCDWithSteps(e, phi);
    const eIsValid = e < phi && gcd === 1;

    const d = eIsValid ? getModularInverse(e, phi) : null;
    const c = (eIsValid && m < n) ? powerMod(m, e, n) : null;
    const decrypted = (d !== null && c !== null) ? powerMod(c, d, n) : null;

    const pIsPrime = isPrime(numP);
    const qIsPrime = isPrime(numQ);
    const isValid = pIsPrime && qIsPrime && numP !== numQ;

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('visualizers.rsa.title')} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <MathCard
                    index={0}
                    title={t('visualizers.sieve.in_simple_terms')}
                >
                    <View className="bg-rose-500/5 p-5 rounded-2xl border border-rose-500/10 mb-4">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="bulb-outline" size={18} color="#f43f5e" />
                            <Text className="text-rose-400 font-bold ml-2 text-xs uppercase">{t('visualizers.rsa.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.rsa.simple_terms_desc"
                                components={{
                                    1: <Text className="text-white font-bold" />,
                                    2: <Text className="text-rose-400 font-bold" />
                                }}
                            />
                        </Text>
                    </View>
                </MathCard>

                <MathCard
                    index={1}
                    description={t('visualizers.rsa.description')}
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.rsa.input_p')}
                                value={p}
                                onChangeText={setP}
                                keyboardType="numeric"
                                error={!pIsPrime && p !== ''}
                                helperText={!pIsPrime && p !== '' ? t('visualizers.rsa.helper_p_not_prime') : t('visualizers.rsa.helper_p_prime')}
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.rsa.input_q')}
                                value={q}
                                onChangeText={setQ}
                                keyboardType="numeric"
                                error={(!qIsPrime && q !== '') || (numP === numQ && q !== '')}
                                helperText={!qIsPrime && q !== '' ? t('visualizers.rsa.helper_q_not_prime') : numP === numQ ? t('visualizers.rsa.helper_q_different') : t('visualizers.rsa.helper_q_prime')}
                            />
                        </View>
                    </View>

                    <View className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 space-y-4">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{t('visualizers.rsa.modulus_label')}</Text>
                            <Text className="text-white font-mono text-lg font-bold">{n}</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{t('visualizers.rsa.totient_label')}</Text>
                            <Text className="text-white font-mono text-lg font-bold">{phi}</Text>
                        </View>
                        {isValid && d !== null && (
                            <Animated.View entering={FadeIn} className="pt-4 border-t border-slate-900 mt-2">
                                <View className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-indigo-400 text-[10px] font-bold uppercase">{t('visualizers.rsa.private_key_label')}</Text>
                                        <Text className="text-indigo-400/60 text-[8px]">{t('visualizers.rsa.private_key_sub', { e, phi })}</Text>
                                    </View>
                                    <Text className="text-white font-mono text-2xl font-black">{d}</Text>
                                </View>
                            </Animated.View>
                        )}
                    </View>
                </MathCard>

                {isValid && (
                    <MathCard
                        index={2}
                        title={t('visualizers.rsa.encryption_title')}
                        description={t('visualizers.rsa.encryption_desc', { e })}
                    >
                        <ThemedInput
                            label={t('visualizers.rsa.message_label', { n })}
                            value={message}
                            onChangeText={setMessage}
                            keyboardType="numeric"
                            error={m >= n}
                            helperText={m >= n ? t('visualizers.rsa.message_error', { n }) : t('visualizers.rsa.message_helper')}
                        />

                        {c !== null && m < n && (
                            <Animated.View entering={FadeIn} className="space-y-6 mt-4">
                                <View className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 items-center">
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">{t('visualizers.rsa.cipher_label')}</Text>
                                    <Text className="text-emerald-400 text-4xl font-black">{c}</Text>
                                </View>

                                <View className="items-center py-2">
                                    <View className="bg-slate-800 p-2 rounded-full">
                                        <Ionicons name="lock-open-outline" size={20} color="#6366f1" />
                                    </View>
                                </View>

                                <View className="bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/20 items-center">
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mb-2">{t('visualizers.rsa.original_message_label')}</Text>
                                    <Text className="text-white text-4xl font-black">{decrypted}</Text>
                                </View>
                            </Animated.View>
                        )}
                    </MathCard>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
