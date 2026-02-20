import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import ScreenHeader from '../components/ScreenHeader';
import ToolItem from '../components/ToolItem';

import { useTranslation } from 'react-i18next';

export default function PrimesCategoryScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
        {
            key: "ulam",
            screen: "UlamSpiral",
            icon: "apps-outline",
        },
        {
            key: "sieve",
            screen: "Sieve",
            icon: "grid-outline",
        },
        {
            key: "factorization",
            screen: "Factorization",
            icon: "git-branch-outline",
        },
        {
            key: "quadratic_reciprocity",
            screen: "QuadraticReciprocity",
            icon: "infinite-outline",
        },
        {
            key: "goldbach",
            screen: "Goldbach",
            icon: "medal-outline",
        },
        {
            key: "amicable",
            screen: "AmicableNumbers",
            icon: "heart-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('categories.primes')} />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ gap: 16 }}>
                    {tools.map((tool, index) => (
                        <ToolItem
                            key={index}
                            index={index}
                            title={t(`tools.${tool.key}.title`)}
                            description={t(`tools.${tool.key}.description`)}
                            icon={tool.icon}
                            onPress={() => navigation.navigate(tool.screen as any)}
                            accentColor="#34d399"
                        />
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
