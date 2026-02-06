import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ThemedInputProps extends TextInputProps {
    label: string;
    error?: boolean;
    helperText?: string;
    className?: string;
    icon?: string;
}

export default function ThemedInput({ label, error, helperText, className, icon, style, ...props }: ThemedInputProps) {
    return (
        <View className="mb-6">
            <Text className={`text-xs font-bold mb-2 uppercase tracking-wide ${error ? 'text-rose-400' : 'text-slate-500'}`}>
                {label}
            </Text>
            <View className="relative justify-center">
                {icon && (
                    <View className="absolute left-4 z-10">
                        <Ionicons name={icon as any} size={20} color="#475569" />
                    </View>
                )}
                <TextInput
                    className={`bg-slate-800 text-white p-4 ${icon ? 'pl-12' : ''} rounded-2xl border ${error ? 'border-rose-500/50' : 'border-slate-700'} text-lg font-bold shadow-inner ${className}`}
                    placeholderTextColor="#475569"
                    style={style}
                    {...props}
                />
            </View>
            {helperText && (
                <Text className={`text-[10px] mt-1.5 ml-1 ${error ? 'text-rose-400' : 'text-slate-500'}`}>
                    {helperText}
                </Text>
            )}
        </View>
    );
}
