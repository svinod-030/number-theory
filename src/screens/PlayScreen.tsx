import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

export default function PlayScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const games = [
        {
            key: "guess_game",
            screen: "GuessGame" as keyof RootStackParamList,
            icon: "game-controller-outline",
            color: "#818cf8",
            bgColor: "bg-indigo-500/10",
            borderColor: "border-indigo-500/20"
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View entering={FadeInUp.duration(600)} className="mb-10">
                    <Text className="text-3xl font-black text-white tracking-tighter">
                        {t('common.play')}
                    </Text>
                    <Text className="text-slate-500 font-medium mt-1">
                        Learn through interactive math games
                    </Text>
                </Animated.View>

                <View style={{ gap: 2 }}>
                    {games.map((game, index) => (
                        <Animated.View
                            key={game.key}
                            entering={FadeInDown.delay(index * 100 + 200).duration(500)}
                            layout={Layout}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate(game.screen as never)}
                                className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex-row items-center shadow-lg active:scale-[0.98]"
                            >
                                <View className={`${game.bgColor} p-4 rounded-xl mr-5 border ${game.borderColor}`}>
                                    <Ionicons name={game.icon as any} size={32} color={game.color} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-xl font-bold text-white tracking-tight">
                                        {t(`games.${game.key}.title`)}
                                    </Text>
                                    <Text className="text-slate-500 text-xs mt-1">
                                        {t(`games.${game.key}.description`)}
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={24} color="#334155" />
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
