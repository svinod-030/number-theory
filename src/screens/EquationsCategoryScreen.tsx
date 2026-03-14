import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import ScreenHeader from '../components/ScreenHeader';
import ToolItem from '../components/ToolItem';

import { useTranslation } from 'react-i18next';

export default function EquationsCategoryScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
        {
            key: "diophantine",
            screen: "Diophantine",
            icon: "link-outline",
        },
        {
            key: "pells_equation",
            screen: "PellsEquation",
            icon: "infinite-outline",
        },
        {
            key: "pythagorean",
            screen: "PythagoreanTriples",
            icon: "triangle-outline",
        },
        {
            key: "perfect_numbers",
            screen: "PerfectNumbers",
            icon: "star-outline",
        },
        {
            key: "constructible",
            screen: "ConstructiblePolygons",
            icon: "shapes-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('categories.equations')} />

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
                            accentColor="#a855f7"
                        />
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
