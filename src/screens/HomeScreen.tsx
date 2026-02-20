import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, ZoomIn, Layout, FadeIn } from 'react-native-reanimated';
import { useTranslation, Trans } from 'react-i18next';

interface ProjectTool {
    key: string;
    screen: keyof RootStackParamList;
    icon: string;
    accent: string;
}

const ALL_TOOLS: ProjectTool[] = [
    { key: "sieve", screen: "Sieve", icon: "grid-outline", accent: "#34d399" },
    { key: "ulam", screen: "UlamSpiral", icon: "sync-outline", accent: "#34d399" },
    { key: "factorization", screen: "Factorization", icon: "git-branch-outline", accent: "#34d399" },
    { key: "goldbach", screen: "Goldbach", icon: "flame-outline", accent: "#34d399" },
    { key: "amicable", screen: "AmicableNumbers", icon: "heart-outline", accent: "#34d399" },
    { key: "modular_playground", screen: "ModularPlayground", icon: "calculator-outline", accent: "#38bdf8" },
    { key: "modular_inverse", screen: "ModularInverse", icon: "swap-horizontal-outline", accent: "#38bdf8" },
    { key: "modular_exponentiation", screen: "ModularExponentiation", icon: "flash-outline", accent: "#38bdf8" },
    { key: "modular_table", screen: "ModularTable", icon: "grid-outline", accent: "#38bdf8" },
    { key: "totient", screen: "Totient", icon: "pie-chart-outline", accent: "#38bdf8" },
    { key: "crt", screen: "CRT", icon: "layers-outline", accent: "#38bdf8" },
    { key: "primitive_roots", screen: "PrimitiveRoots", icon: "infinite-outline", accent: "#38bdf8" },
    { key: "quadratic_reciprocity", screen: "QuadraticReciprocity", icon: "git-merge-outline", accent: "#38bdf8" },
    { key: "euclidean", screen: "EuclideanVisualizer", icon: "trending-down-outline", accent: "#fbbf24" },
    { key: "lcm", screen: "LCM", icon: "trending-up-outline", accent: "#fbbf24" },
    { key: "fibonacci", screen: "Fibonacci", icon: "infinite-outline", accent: "#fbbf24" },
    { key: "pascal", screen: "PascalTriangle", icon: "triangle-outline", accent: "#fbbf24" },
    { key: "collatz", screen: "Collatz", icon: "stats-chart-outline", accent: "#fbbf24" },
    { key: "continued_fractions", screen: "ContinuedFraction", icon: "reorder-four-outline", accent: "#fbbf24" },
    { key: "diophantine", screen: "Diophantine", icon: "link-outline", accent: "#fbbf24" },
    { key: "divisors", screen: "Divisors", icon: "list-outline", accent: "#fbbf24" },
    { key: "partition", screen: "Partition", icon: "apps-outline", accent: "#fbbf24" },
    { key: "rsa", screen: "RSA", icon: "lock-closed-outline", accent: "#f43f5e" },
    { key: "diffie_hellman", screen: "DiffieHellman", icon: "key-outline", accent: "#f43f5e" },
    { key: "hashing", screen: "Hashing", icon: "barcode-outline", accent: "#f43f5e" },
    { key: "digital_signatures", screen: "DigitalSignature", icon: "create-outline", accent: "#f43f5e" },
    { key: "perfect_numbers", screen: "PerfectNumbers", icon: "star-outline", accent: "#f43f5e" },
    { key: "legendre", screen: "Legendre", icon: "prism-outline", accent: "#f43f5e" },
    { key: "pythagorean", screen: "PythagoreanTriples", icon: "triangle-outline", accent: "#fbbf24" },
    { key: "constructible", screen: "ConstructiblePolygons", icon: "shapes-outline", accent: "#34d399" },
];

const LANGUAGES = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
];

export default function HomeScreen() {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [search, setSearch] = useState('');
    const [langModalVisible, setLangModalVisible] = useState(false);

    const categories = [
        { title: t('categories.primes'), count: 6, screen: "PrimesCategory", icon: "sparkles-outline", iconColor: "#34d399", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/20" },
        { title: t('categories.modular'), count: 9, screen: "ModularCategory", icon: "sync-circle-outline", iconColor: "#38bdf8", bgColor: "bg-sky-500/10", borderColor: "border-sky-500/20" },
        { title: t('categories.divisibility'), count: 13, screen: "DivisibilityCategory", icon: "calculator-outline", iconColor: "#fbbf24", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/20" },
        { title: t('categories.applications'), count: 4, screen: "ApplicationsCategory", icon: "shield-checkmark-outline", iconColor: "#f43f5e", bgColor: "bg-rose-500/10", borderColor: "border-rose-500/20" }
    ];

    const searchResults = useMemo(() => {
        if (!search.trim()) return [];
        return ALL_TOOLS.filter(t_obj => {
            const title = t(`tools.${t_obj.key}.title`);
            const desc = t(`tools.${t_obj.key}.description`);
            return title.toLowerCase().includes(search.toLowerCase()) ||
                desc.toLowerCase().includes(search.toLowerCase());
        }).slice(0, 5);
    }, [search, i18n.language]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header Section */}
                <Animated.View entering={FadeInUp.duration(600)} className="flex-row items-center justify-between mb-8">
                    <View className="flex-row items-center">
                        <Animated.View
                            entering={ZoomIn.delay(200).duration(400)}
                            className="bg-slate-900 p-3 rounded-2xl border border-slate-800 mr-4 shadow-2xl"
                        >
                            <Image
                                source={require('../../assets/icon.png')}
                                style={{ width: 48, height: 48, borderRadius: 12 }}
                            />
                        </Animated.View>
                        <View>
                            <Text className="text-2xl font-black text-white tracking-tighter">Number Theory</Text>
                            <Text className="text-slate-500 font-medium text-xs">{t('common.queen_of_math')}</Text>
                        </View>
                    </View>
                    <View className="flex-row">
                        <TouchableOpacity
                            onPress={() => setLangModalVisible(true)}
                            className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 mr-2 shadow-sm"
                        >
                            <Ionicons name="globe-outline" size={20} color="#64748b" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Glossary')}
                            className="bg-indigo-600/20 px-4 py-2 rounded-xl border border-indigo-500/30 flex-row items-center"
                        >
                            <Ionicons name="library-outline" size={18} color="#818cf8" />
                            <Text className="text-indigo-400 font-bold ml-2 text-xs">{t('common.glossary')}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Global Search Bar */}
                <Animated.View entering={FadeInUp.delay(300)} className="mb-10 z-50">
                    <View className="bg-slate-900 rounded-2xl border border-slate-800 flex-row items-center px-5 py-3.5 shadow-xl">
                        <Ionicons name="search-outline" size={20} color="#64748b" />
                        <TextInput
                            placeholder={t('common.search_placeholder')}
                            placeholderTextColor="#475569"
                            className="flex-1 ml-4 text-white font-medium"
                            value={search}
                            onChangeText={setSearch}
                        />
                        {search.length > 0 && (
                            <TouchableOpacity onPress={() => setSearch('')}>
                                <Ionicons name="close-circle" size={20} color="#475569" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Search Results Dropdown */}
                    {search.length > 0 && (
                        <Animated.View
                            entering={FadeIn.duration(200)}
                            className="absolute top-16 left-0 right-0 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden"
                        >
                            {searchResults.length > 0 ? searchResults.map((tool, i) => (
                                <TouchableOpacity
                                    key={tool.screen}
                                    onPress={() => {
                                        setSearch('');
                                        navigation.navigate(tool.screen as any);
                                    }}
                                    className={`flex-row items-center p-4 ${i < searchResults.length - 1 ? 'border-b border-slate-800' : ''}`}
                                >
                                    <View style={{ backgroundColor: `${tool.accent}20` }} className="p-2 rounded-lg mr-3">
                                        <Ionicons name={tool.icon as any} size={16} color={tool.accent} />
                                    </View>
                                    <View>
                                        <Text className="text-white font-bold text-sm">{t(`tools.${tool.key}.title`)}</Text>
                                        <Text className="text-slate-500 text-[10px]">{t(`tools.${tool.key}.description`)}</Text>
                                    </View>
                                </TouchableOpacity>
                            )) : (
                                <View className="p-4 items-center">
                                    <Text className="text-slate-500 text-xs">
                                        {t('common.no_results', { search })}
                                    </Text>
                                </View>
                            )}
                        </Animated.View>
                    )}
                </Animated.View>

                {/* Categories Grid */}
                <Text className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4 ml-1">{t('common.learning_hubs')}</Text>
                <View style={{ gap: 16 }}>
                    {categories.map((category, index) => (
                        <Animated.View
                            key={index}
                            entering={FadeInDown.delay(index * 100 + 500).duration(500)}
                            layout={Layout}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate(category.screen as any)}
                                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex-row items-center shadow-lg active:scale-[0.98]"
                                activeOpacity={0.8}
                            >
                                <View className={`${category.bgColor} p-3.5 rounded-xl mr-4 border ${category.borderColor}`}>
                                    <Ionicons name={category.icon as any} size={28} color={category.iconColor} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-lg font-bold text-white tracking-tight">{category.title}</Text>
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-wider">
                                        {t('common.concepts', { count: category.count })}
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#334155" />
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Footer Tip */}
                <Animated.View
                    entering={FadeIn.delay(1200)}
                    className="mt-12 p-6 rounded-3xl bg-indigo-600/5 border border-indigo-500/10 items-center"
                >
                    <Ionicons name="bulb-outline" size={24} color="#818cf8" />
                    <Text className="text-slate-400 text-xs text-center mt-3 leading-5">
                        <Trans
                            i18nKey="common.tip"
                            components={{
                                1: <Text className="text-indigo-400 font-bold" />,
                                2: <Text className="text-indigo-400 font-bold" />
                            }}
                        />
                    </Text>
                </Animated.View>

                {/* Support & Feedback Section */}
                <Animated.View
                    entering={FadeIn.delay(1000)}
                    className="mt-8 flex-row justify-between"
                >
                    <TouchableOpacity
                        onPress={() => {
                            const pkg = "com.vinodsigadana030.numbertheory";
                            const url = `market://details?id=${pkg}`;
                            const webUrl = `https://play.google.com/store/apps/details?id=${pkg}`;
                            import('react-native').then(({ Linking }) => {
                                Linking.canOpenURL(url).then(supported => {
                                    Linking.openURL(supported ? url : webUrl);
                                });
                            });
                        }}
                        className="flex-1 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex-row items-center justify-center mr-2"
                    >
                        <Ionicons name="star-outline" size={18} color="#fbbf24" />
                        <Text className="text-white font-bold ml-2 text-xs">{t('common.rate_us')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            import('react-native').then(({ Linking }) => {
                                Linking.openURL('mailto:scricscore3@gmail.com?subject=Number Theory App Feedback');
                            });
                        }}
                        className="flex-1 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex-row items-center justify-center ml-2"
                    >
                        <Ionicons name="mail-outline" size={18} color="#818cf8" />
                        <Text className="text-white font-bold ml-2 text-xs">{t('common.contact_us')}</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Privacy Policy Link */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                    className="mt-10 mb-4 items-center"
                >
                    <Text className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                        {t('common.privacy_policy')}
                    </Text>
                </TouchableOpacity>

                <View style={{ height: 60 }} />
            </ScrollView>

            {/* Language Selection Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={langModalVisible}
                onRequestClose={() => setLangModalVisible(false)}
            >
                <Pressable
                    className="flex-1 bg-slate-950/80 justify-center items-center px-6"
                    onPress={() => setLangModalVisible(false)}
                >
                    <Animated.View
                        entering={ZoomIn.duration(300)}
                        className="bg-slate-900 w-full rounded-3xl border border-slate-800 p-6 shadow-2xl"
                    >
                        <Text className="text-white text-xl font-black mb-6 tracking-tight">Select Language</Text>
                        <View style={{ gap: 12 }}>
                            {LANGUAGES.map((lang) => (
                                <TouchableOpacity
                                    key={lang.code}
                                    onPress={() => {
                                        i18n.changeLanguage(lang.code);
                                        setLangModalVisible(false);
                                    }}
                                    className={`flex-row items-center justify-between p-4 rounded-2xl border ${i18n.language === lang.code ? 'bg-indigo-600/10 border-indigo-500/50' : 'bg-slate-800/50 border-slate-700/50'}`}
                                >
                                    <View>
                                        <Text className={`text-sm font-bold ${i18n.language === lang.code ? 'text-white' : 'text-slate-300'}`}>
                                            {lang.name}
                                        </Text>
                                        <Text className="text-slate-500 text-[10px] mt-0.5">{lang.native}</Text>
                                    </View>
                                    {i18n.language === lang.code && (
                                        <Ionicons name="checkmark-circle" size={20} color="#818cf8" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}
