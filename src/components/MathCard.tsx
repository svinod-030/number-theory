import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface MathCardProps extends ViewProps {
    title?: string;
    description?: string;
    index?: number;
}

export default function MathCard({ title, description, children, index = 0, style, ...props }: MathCardProps) {
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100)}
            className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl mb-6"
            style={style}
            {...props}
        >
            {title && (
                <Text className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">
                    {title}
                </Text>
            )}
            {description && (
                <Text className="text-slate-400 text-sm mb-6 leading-6">
                    {description}
                </Text>
            )}
            {children}
        </Animated.View>
    );
}
