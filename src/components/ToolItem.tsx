import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ToolItemProps {
    title: string;
    description: string;
    icon: string;
    onPress: () => void;
    accentColor: string;
    index?: number;
}

export default function ToolItem({ title, description, icon, onPress, accentColor, index = 0 }: ToolItemProps) {
    return (
        <Animated.View entering={FadeInDown.delay(index * 100)}>
            <TouchableOpacity
                onPress={onPress}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex-row items-center shadow-lg active:scale-[0.98] transition-all"
                activeOpacity={0.7}
            >
                <View
                    style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30` }}
                    className="p-3 rounded-xl mr-4 border"
                >
                    <Ionicons name={icon as any} size={24} color={accentColor} />
                </View>
                <View className="flex-1">
                    <Text className="text-lg font-bold text-white mb-1 tracking-tight">{title}</Text>
                    <Text className="text-slate-400 text-xs leading-4">{description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#475569" />
            </TouchableOpacity>
        </Animated.View>
    );
}
