import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import ScreenHeader from '../components/ScreenHeader';
import ToolItem from '../components/ToolItem';

import { useTranslation } from 'react-i18next';

export default function SequencesCategoryScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
        {
            key: "fibonacci",
            screen: "Fibonacci",
            icon: "infinite-outline",
        },
        {
            key: "lucas_numbers",
            screen: "LucasNumbers",
            icon: "sync-outline",
        },
        {
            key: "happy_numbers",
            screen: "HappyNumbers",
            icon: "happy-outline",
        },
        {
            key: "farey_sequences",
            screen: "FareySequences",
            icon: "git-commit-outline",
        },
        {
            key: "pascal",
            screen: "PascalTriangle",
            icon: "triangle-outline",
        },
        {
            key: "collatz",
            screen: "Collatz",
            icon: "stats-chart-outline",
        },
        {
            key: "partition",
            screen: "Partition",
            icon: "apps-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('categories.sequences')} />

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
                            accentColor="#818cf8"
                        />
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
