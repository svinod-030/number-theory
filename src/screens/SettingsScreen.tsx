import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { APP_CONFIG } from '../constants';
import { UpdateService } from '../services/UpdateService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function SettingsScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="px-6 pt-8 pb-4">
                <Animated.Text
                    entering={FadeInUp.duration(600)}
                    className="text-3xl font-black text-white tracking-tighter"
                >
                    {t('common.settings')}
                </Animated.Text>
            </View>

            <ScrollView
                className="flex-1 px-6"
                contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Support & Feedback Section */}
                <Animated.View entering={FadeInDown.delay(200)} className="mb-8">
                    <Text className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4 ml-1">
                        {t('visualizers.settings.support_title')}
                    </Text>
                    <View style={{ gap: 10 }}>
                        <TouchableOpacity
                            onPress={() => UpdateService.openStore()}
                            className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex-row items-center"
                        >
                            <View className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 mr-4">
                                <Ionicons name="star-outline" size={20} color="#fbbf24" />
                            </View>
                            <Text className="text-white font-bold flex-1">{t('visualizers.settings.rate_title')}</Text>
                            <Ionicons name="chevron-forward" size={16} color="#334155" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(`mailto:vinod.sigadana.labs@gmail.com?subject=Number Theory App Feedback for Version ${APP_CONFIG.APP_VERSION}`);
                            }}
                            className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex-row items-center"
                        >
                            <View className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20 mr-4">
                                <Ionicons name="mail-outline" size={20} color="#818cf8" />
                            </View>
                            <Text className="text-white font-bold flex-1">{t('visualizers.settings.contact_title')}</Text>
                            <Ionicons name="chevron-forward" size={16} color="#334155" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('PrivacyPolicy')}
                            className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex-row items-center"
                        >
                            <View className="bg-slate-500/10 p-2 rounded-xl border border-slate-500/20 mr-4">
                                <Ionicons name="shield-checkmark-outline" size={20} color="#94a3b8" />
                            </View>
                            <Text className="text-white font-bold flex-1">{t('visualizers.settings.privacy_title')}</Text>
                            <Ionicons name="chevron-forward" size={16} color="#334155" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* App Version Section */}
                <Animated.View entering={FadeInDown.delay(400)} className="mt-4 items-center">
                    <Text className="text-white text-[12px] font-bold uppercase tracking-widest">
                        {t('visualizers.settings.version_title')} {APP_CONFIG.APP_VERSION}
                    </Text>
                    <Text className="text-white text-[10px] font-medium mt-1">
                        {t('visualizers.settings.developer_title')}
                    </Text>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}
