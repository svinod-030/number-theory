import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface KeyboardButtonProps {
    val: string;
    onPress: (val: string) => void;
    icon?: any;
    color?: string;
}

const KeyboardButton = ({ val, onPress, icon, color = 'bg-slate-900' }: KeyboardButtonProps) => (
    <TouchableOpacity
        onPress={() => onPress(val)}
        className={`${color} flex-1 m-1 h-16 rounded-2xl items-center justify-center border border-slate-800 active:bg-slate-800`}
    >
        {icon ? <Ionicons name={icon} size={24} color="white" /> : <Text className="text-white text-2xl font-black">{val}</Text>}
    </TouchableOpacity>
);

interface NumericKeyboardProps {
    onKeyPress: (val: string) => void;
    onPress: () => void;
    value: string;
}

export default function NumericKeyboard({ onKeyPress, onPress, value }: NumericKeyboardProps) {
    return (
        <View style={{ gap: 8 }}>
            <View className="flex-row">
                <KeyboardButton val="1" onPress={onKeyPress} />
                <KeyboardButton val="2" onPress={onKeyPress} />
                <KeyboardButton val="3" onPress={onKeyPress} />
            </View>
            <View className="flex-row">
                <KeyboardButton val="4" onPress={onKeyPress} />
                <KeyboardButton val="5" onPress={onKeyPress} />
                <KeyboardButton val="6" onPress={onKeyPress} />
            </View>
            <View className="flex-row">
                <KeyboardButton val="7" onPress={onKeyPress} />
                <KeyboardButton val="8" onPress={onKeyPress} />
                <KeyboardButton val="9" onPress={onKeyPress} />
            </View>
            <View className="flex-row">
                <KeyboardButton val="DEL" onPress={onKeyPress} icon="backspace-outline" color="bg-slate-800" />
                <KeyboardButton val="0" onPress={onKeyPress} />
                <TouchableOpacity
                    onPress={onPress}
                    disabled={!value}
                    className={`flex-1 m-1 h-16 rounded-2xl items-center justify-center border ${value ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/30' : 'bg-slate-800 border-slate-700 opacity-50'}`}
                >
                    <Ionicons name="checkmark-circle" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
