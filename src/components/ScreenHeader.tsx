import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface ScreenHeaderProps {
    title: string;
    showBack?: boolean;
    rightElement?: React.ReactNode;
}

export default function ScreenHeader({ title, showBack = true, rightElement }: ScreenHeaderProps) {
    const navigation = useNavigation();

    return (
        <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
            <View className="flex-row items-center flex-1">
                {showBack && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="mr-4 bg-slate-900 p-2 rounded-xl border border-slate-800"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={20} color="white" />
                    </TouchableOpacity>
                )}
                <Text className="text-xl font-bold text-white tracking-tight flex-1" numberOfLines={1}>
                    {title}
                </Text>
            </View>
            {rightElement && <View>{rightElement}</View>}
        </View>
    );
}
