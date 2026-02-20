import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyScreen() {
    const { t } = useTranslation();

    const sections = [
        { title: t('privacy.intro_title'), content: t('privacy.intro_desc') },
        { title: t('privacy.data_collection_title'), content: t('privacy.data_collection_desc') },
        { title: t('privacy.offline_title'), content: t('privacy.offline_desc') },
        { title: t('privacy.third_party_title'), content: t('privacy.third_party_desc') },
        { title: t('privacy.changes_title'), content: t('privacy.changes_desc') },
        { title: t('privacy.contact_title'), content: t('privacy.contact_desc') },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title={t('privacy.title')} />
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingVertical: 12 }}>
                {sections.map((section, index) => (
                    <View key={index} className="mb-8 p-6 bg-slate-900/50 rounded-3xl border border-slate-800">
                        <Text className="text-white text-lg font-black mb-4 tracking-tight">{section.title}</Text>
                        <Text className="text-slate-400 text-sm leading-6">
                            {section.content}
                        </Text>
                    </View>
                ))}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
