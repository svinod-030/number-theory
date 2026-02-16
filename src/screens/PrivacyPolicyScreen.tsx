import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function PrivacyPolicyScreen() {
    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <ScreenHeader title="Privacy Policy" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                    <Text className="text-white text-lg font-bold mb-4">Introduction</Text>
                    <Text className="text-slate-400 text-sm leading-6 mb-8">
                        Welcome to Number Theory. We value your privacy and are committed to protecting it. This Privacy Policy explains how we handle your information.
                    </Text>

                    <Text className="text-white text-lg font-bold mb-4">Data Collection</Text>
                    <Text className="text-slate-400 text-sm leading-6 mb-8">
                        The Number Theory app does not collect, store, or transmit any personal data or usage information. All calculations and visualizations are performed locally on your device.
                    </Text>

                    <Text className="text-white text-lg font-bold mb-4">Offline Functionality</Text>
                    <Text className="text-slate-400 text-sm leading-6 mb-8">
                        The app is designed to work entirely offline. No internet connection is required for its core features, and no data is sent to external servers.
                    </Text>

                    <Text className="text-white text-lg font-bold mb-4">Third-Party Services</Text>
                    <Text className="text-slate-400 text-sm leading-6 mb-8">
                        The Number Theory app does not use any third-party analytics, advertising, or tracking services that collect your personal information.
                    </Text>

                    <Text className="text-white text-lg font-bold mb-4">Changes to This Policy</Text>
                    <Text className="text-slate-400 text-sm leading-6 mb-8">
                        We may update our Privacy Policy from time to time. Any changes will be posted on this screen, and your continued use of the app constitutes acceptance of those changes.
                    </Text>

                    <Text className="text-white text-lg font-bold mb-4">Contact Us</Text>
                    <Text className="text-slate-400 text-sm leading-6 mb-12">
                        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
                    </Text>
                </Animated.View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
