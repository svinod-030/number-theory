import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import ScreenHeader from '../components/ScreenHeader';
import ToolItem from '../components/ToolItem';

import { useTranslation } from 'react-i18next';

export default function ApplicationsCategoryScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const tools = [
        {
            key: "rsa",
            screen: "RSA",
            icon: "lock-closed-outline",
        },
        {
            key: "diffie_hellman",
            screen: "DiffieHellman",
            icon: "key-outline",
        },
        {
            key: "hashing",
            screen: "Hashing",
            icon: "finger-print-outline",
        },
        {
            key: "digital_signatures",
            screen: "DigitalSignature",
            icon: "document-text-outline",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('categories.applications')} />

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
                            accentColor="#f43f5e"
                        />
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
