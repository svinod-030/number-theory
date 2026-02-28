import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../store/useSettingsStore';

const LANGUAGES = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
];

export default function LanguageSelectionScreen() {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { setLanguage, setFirstLaunch, language: currentLanguage } = useSettingsStore();

    const handleSelectLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setLanguage(code);
        setFirstLaunch(false);
        navigation.replace('Home');
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="flex-1 px-6 pt-12 pb-8">
                <Animated.View entering={FadeInUp.duration(600)} className="mb-10">
                    <Text className="text-4xl font-black text-white tracking-widest leading-tight">
                        {t('common.select_language')}
                    </Text>
                    <Text className="text-slate-400 text-lg mt-2 font-medium">
                        Choose your preferred language to continue
                    </Text>
                </Animated.View>

                <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                    <View style={{ gap: 16 }}>
                        {LANGUAGES.map((lang, index) => (
                            <Animated.View
                                key={lang.code}
                                entering={FadeInDown.delay(200 + index * 100).duration(500)}
                            >
                                <TouchableOpacity
                                    onPress={() => handleSelectLanguage(lang.code)}
                                    className={`flex-row items-center justify-between p-6 rounded-3xl border-2 ${currentLanguage === lang.code
                                        ? 'bg-indigo-600/20 border-indigo-500'
                                        : 'bg-slate-900 border-slate-800'
                                        } active:scale-[0.98] shadow-2xl`}
                                    activeOpacity={0.8}
                                >
                                    <View>
                                        <Text className={`text-xl font-bold ${currentLanguage === lang.code ? 'text-white' : 'text-slate-200'}`}>
                                            {lang.name}
                                        </Text>
                                        <Text className="text-slate-500 text-sm mt-1 font-semibold uppercase tracking-wider">
                                            {lang.native}
                                        </Text>
                                    </View>
                                    {currentLanguage === lang.code ? (
                                        <Animated.View entering={ZoomIn}>
                                            <Ionicons name="checkmark-circle" size={32} color="#818cf8" />
                                        </Animated.View>
                                    ) : (
                                        <Ionicons name="chevron-forward" size={24} color="#334155" />
                                    )}
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>
                </ScrollView>

                <Animated.View
                    entering={FadeInDown.delay(800).duration(500)}
                    className="mt-8 items-center"
                >
                    <View className="bg-indigo-600/10 px-6 py-3 rounded-2xl border border-indigo-500/20">
                        <Text className="text-indigo-400 font-bold text-xs uppercase tracking-widest">
                            You can change this later in settings
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}
