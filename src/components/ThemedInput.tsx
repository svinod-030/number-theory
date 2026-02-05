import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface ThemedInputProps extends TextInputProps {
    label: string;
    error?: boolean;
    helperText?: string;
    className?: string;
}

export default function ThemedInput({ label, error, helperText, className, style, ...props }: ThemedInputProps) {
    return (
        <View className="mb-6">
            <Text className={`text-xs font-bold mb-2 uppercase tracking-wide ${error ? 'text-rose-400' : 'text-slate-500'}`}>
                {label}
            </Text>
            <TextInput
                className={`bg-slate-800 text-white p-4 rounded-2xl border ${error ? 'border-rose-500/50' : 'border-slate-700'} text-lg font-bold shadow-inner ${className}`}
                placeholderTextColor="#475569"
                style={style}
                {...props}
            />
            {helperText && (
                <Text className={`text-[10px] mt-1.5 ml-1 ${error ? 'text-rose-400' : 'text-slate-500'}`}>
                    {helperText}
                </Text>
            )}
        </View>
    );
}
