import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { powerMod, isPrime } from '../utils/math';
import ScreenHeader from '../components/ScreenHeader';
import MathCard from '../components/MathCard';
import ThemedInput from '../components/ThemedInput';
import Animated, { FadeIn, SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation, Trans } from 'react-i18next';

export default function DiffieHellmanScreen() {
    const { t } = useTranslation();
    const [p, setP] = useState('23');
    const [g, setG] = useState('5');
    const [privateA, setPrivateA] = useState('6');
    const [privateB, setPrivateB] = useState('15');

    const numP = parseInt(p) || 1;
    const numG = parseInt(g) || 1;
    const numPrivateA = parseInt(privateA) || 0;
    const numPrivateB = parseInt(privateB) || 0;

    const publicA = powerMod(numG, numPrivateA, numP);
    const publicB = powerMod(numG, numPrivateB, numP);

    const secretA = powerMod(publicB, numPrivateA, numP);
    const secretB = powerMod(publicA, numPrivateB, numP);

    const pIsPrime = isPrime(numP);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('visualizers.diffie_hellman.title')} />

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
                            <Text className="text-rose-400 font-bold ml-2 text-xs uppercase">{t('visualizers.diffie_hellman.simple_terms_title')}</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            <Trans
                                i18nKey="visualizers.diffie_hellman.simple_terms_desc"
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
                    description={t('visualizers.diffie_hellman.description')}
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.diffie_hellman.input_p')}
                                value={p}
                                onChangeText={setP}
                                keyboardType="numeric"
                                error={!pIsPrime && p !== ''}
                                helperText={!pIsPrime && p !== '' ? t('visualizers.diffie_hellman.helper_p_not_prime') : t('visualizers.diffie_hellman.helper_p_prime')}
                            />
                        </View>
                        <View className="flex-1">
                            <ThemedInput
                                label={t('visualizers.diffie_hellman.input_g')}
                                value={g}
                                onChangeText={setG}
                                keyboardType="numeric"
                                helperText={t('visualizers.diffie_hellman.helper_g')}
                            />
                        </View>
                    </View>
                </MathCard>

                <View className="flex-row space-x-4 mb-4">
                    <View className="flex-1">
                        <Animated.View
                            entering={SlideInLeft}
                            className="bg-sky-500/5 border border-sky-500/10 p-5 rounded-3xl items-center"
                        >
                            <Ionicons name="person" size={24} color="#38bdf8" />
                            <Text className="text-sky-400 text-xs font-bold mt-2 uppercase">{t('visualizers.diffie_hellman.alice')}</Text>
                            <View className="w-full mt-4">
                                <ThemedInput
                                    label={t('visualizers.diffie_hellman.secret_a')}
                                    value={privateA}
                                    onChangeText={setPrivateA}
                                    keyboardType="numeric"
                                    className="text-center"
                                />
                                <View className="mt-2 items-center bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                                    <Text className="text-slate-500 text-[8px] uppercase font-bold text-center mb-1">{t('visualizers.diffie_hellman.public_a_formula')}</Text>
                                    <Text className="text-xl font-black text-white">{publicA}</Text>
                                </View>
                            </View>
                        </Animated.View>
                    </View>

                    <View className="flex-1">
                        <Animated.View
                            entering={SlideInRight}
                            className="bg-rose-500/5 border border-rose-500/10 p-5 rounded-3xl items-center"
                        >
                            <Ionicons name="person" size={24} color="#f43f5e" />
                            <Text className="text-rose-400 text-xs font-bold mt-2 uppercase">{t('visualizers.diffie_hellman.bob')}</Text>
                            <View className="w-full mt-4">
                                <ThemedInput
                                    label={t('visualizers.diffie_hellman.secret_b')}
                                    value={privateB}
                                    onChangeText={setPrivateB}
                                    keyboardType="numeric"
                                    className="text-center"
                                />
                                <View className="mt-2 items-center bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                                    <Text className="text-slate-500 text-[8px] uppercase font-bold text-center mb-1">{t('visualizers.diffie_hellman.public_b_formula')}</Text>
                                    <Text className="text-xl font-black text-white">{publicB}</Text>
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                </View>

                <MathCard
                    index={2}
                    title={t('visualizers.diffie_hellman.computed_secret_title')}
                    description={t('visualizers.diffie_hellman.computed_secret_desc')}
                >
                    <View className="flex-row space-x-4">
                        <View className="flex-1 bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 items-center">
                            <Text className="text-slate-500 text-[8px] font-bold uppercase mb-2 text-center">{t('visualizers.diffie_hellman.alice_computes')}</Text>
                            <Text className="text-emerald-400 text-3xl font-black">{secretA}</Text>
                        </View>
                        <View className="flex-1 bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 items-center">
                            <Text className="text-slate-500 text-[8px] font-bold uppercase mb-2 text-center">{t('visualizers.diffie_hellman.bob_computes')}</Text>
                            <Text className="text-emerald-400 text-3xl font-black">{secretB}</Text>
                        </View>
                    </View>

                    {secretA === secretB && (
                        <Animated.View entering={FadeIn} className="mt-6 bg-emerald-500/20 p-5 rounded-2xl border border-emerald-500/30 items-center">
                            <View className="flex-row items-center">
                                <Ionicons name="shield-checkmark" size={24} color="#34d399" />
                                <Text className="text-white font-bold ml-2">{t('visualizers.diffie_hellman.match_title')}</Text>
                            </View>
                            <Text className="text-slate-300 text-[10px] mt-1">{t('visualizers.diffie_hellman.match_desc', { secret: secretA })}</Text>
                        </Animated.View>
                    )}
                </MathCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
