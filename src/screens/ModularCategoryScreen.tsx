import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import ScreenHeader from '../components/ScreenHeader';
import ToolItem from '../components/ToolItem';

import { useTranslation } from 'react-i18next';

export default function ModularCategoryScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
        {
            key: "modulus_basics",
            screen: "ModulusBasics",
            icon: "help-circle-outline",
        },
        {
            key: "modular_playground",
            screen: "ModularPlayground",
            icon: "color-palette-outline",
        },
        {
            key: "modular_table",
            screen: "ModularTable",
            icon: "grid-outline",
        },
        {
            key: "totient",
            screen: "Totient",
            icon: "pie-chart-outline",
        },
        {
            key: "primitive_roots",
            screen: "PrimitiveRoots",
            icon: "refresh-circle-outline",
        },
        {
            key: "modular_inverse",
            screen: "ModularInverse",
            icon: "key-outline",
        },
        {
            key: "modular_exponentiation",
            screen: "ModularExponentiation",
            icon: "flash-outline",
        },
        {
            key: "crt",
            screen: "CRT",
            icon: "git-branch-outline",
        },
        {
            key: "legendre",
            screen: "Legendre",
            icon: "flash-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('categories.modular')} />

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
                            accentColor="#38bdf8"
                        />
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
