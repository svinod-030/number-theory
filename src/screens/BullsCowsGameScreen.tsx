import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import { useTranslation } from 'react-i18next';
import Animated, {
    ZoomIn
} from 'react-native-reanimated';
import NumericKeyboard from '../components/NumericKeyboard';

// Sub-component for the Game Over display
const GameStatusBanner = ({ status, secret, historyLength, onReset, t }: any) => {
    if (status === 'playing') return null;

    const isWin = status === 'win';
    return (
        <Animated.View entering={ZoomIn} className="mb-4">
            <View className={`rounded-3xl border p-6 items-center ${isWin ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                <Ionicons name={isWin ? "trophy" : "lock-closed"} size={38} color={isWin ? "#34d399" : "#f43f5e"} />
                <Text className="text-white text-xl font-black mt-3 uppercase tracking-wider">
                    {isWin ? t('games.bulls_cows.code_cracked') : t('games.bulls_cows.mission_failed')}
                </Text>
                <Text className="text-slate-400 text-xs mt-1 text-center font-medium">
                    {isWin
                        ? t('games.bulls_cows.feedback_win', { number: secret.join(''), count: historyLength })
                        : t('games.bulls_cows.feedback_lose', { number: secret.join('') })}
                </Text>
                <TouchableOpacity
                    onPress={onReset}
                    className={`${isWin ? 'bg-emerald-500' : 'bg-rose-500'} mt-4 px-6 py-3 rounded-xl flex-row items-center`}
                >
                    <Ionicons name="refresh" size={18} color="white" />
                    <Text className="text-white font-black ml-2 uppercase text-xs">{t('games.bulls_cows.try_again')}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

// Sub-component for the input slots
const GuessInputSlots = ({ guessDigits, animatedStyle }: any) => (
    <Animated.View style={animatedStyle} className="flex-row justify-center gap-3 mb-6">
        {guessDigits.map((char: string, i: number) => (
            <View key={i} className="w-14 h-14 bg-slate-900 rounded-2xl border border-slate-800 items-center justify-center">
                <Text className="text-white text-2xl font-black">{char || ''}</Text>
                {!char && <View className="w-1.5 h-1.5 rounded-full bg-slate-700" />}
            </View>
        ))}
    </Animated.View>
);

export default function BullsCowsGameScreen() {
    const { t } = useTranslation();

    // Initializer to generate a secret number with 4 unique digits
    const generateSecret = useCallback((): string[] => {
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const result: string[] = [];
        while (result.length < 4) {
            const idx = Math.floor(Math.random() * digits.length);
            result.push(digits[idx]);
            digits.splice(idx, 1);
        }
        return result;
    }, []);

    const [secret, setSecret] = useState<string[]>(generateSecret());
    const [guess, setGuess] = useState(' ');
    const [history, setHistory] = useState<any[]>([]);
    const [gameOver, setGameOver] = useState<'win' | 'lose' | 'playing'>('playing');
    const [modalVisible, setModalVisible] = useState(false);

    // 1. Stable Key Press Logic (Functional Update)
    const handleKeyPress = useCallback((key: string) => {
        if (gameOver !== 'playing') return;
        if (key === 'DEL') {
            setGuess(prev => prev.trim().slice(0, -1));
        } else {
            setGuess(prev => {
                if (prev.trim().length >= 4 || prev.trim().includes(key)) return prev;
                return prev.trim() + key;
            });
        }
    }, [gameOver]);

    // 2. Stable Submit Logic
    const handleGuessSubmit = useCallback(() => {
        if (guess.length !== 4 || gameOver !== 'playing') return;

        let bulls = 0, cows = 0;
        guess.split('').forEach((char, i) => {
            if (char === secret[i]) bulls++;
            else if (secret.includes(char)) cows++;
        });

        const newHistory = [...history, { guess, bulls, cows }];
        setHistory(newHistory);
        setGuess('');

        if (bulls === 4) setGameOver('win');
        else if (newHistory.length >= 10) setGameOver('lose');
    }, [guess, secret, history, gameOver]);

    const guessDigits = useMemo(() => {
        const arr = guess.split('');
        return Array.from({ length: 4 }, (_, i) => arr[i] || '');
    }, [guess]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            {/* Keeping the container flat and consistent with the working screen */}
            <View className="flex-1 px-6 pb-6">
                <ScreenHeader title={t('games.bulls_cows.title')}
                    rightElement={
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Ionicons name="help-circle" size={24} color="white" />
                        </TouchableOpacity>
                    } />

                {/* Secret Indicators */}
                <View className="flex-row justify-center gap-3 my-4">
                    {secret.map((s, i) => (
                        <View key={i} className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 items-center justify-center">
                            <Text className="text-slate-500 font-black">{gameOver !== 'playing' ? s : '?'}</Text>
                        </View>
                    ))}
                </View>

                {/* History Scroll Area */}
                <View className="flex-1 bg-slate-900/30 rounded-3xl border border-slate-800 p-4 mb-4">
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={history}
                        renderItem={({ item }) => (
                            <View className="flex-row justify-center gap-3 my-4" key={`row-${item.guess}`}>
                                {item.guess.split('').map((s: string, i: number) => (
                                    <View key={`${item.guess}-${i}`} className={`w-12 h-12 rounded-xl ${secret[i] === s ? 'bg-green-500' : secret.includes(s) ? 'bg-yellow-500' : 'bg-slate-900'} border border-slate-800 items-center justify-center`}>
                                        <Text className="text-white font-black">{s}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                        keyExtractor={(item, idx) => idx.toString()}
                    />
                </View>

                {
                    gameOver === 'playing' && <View>
                        <GuessInputSlots guessDigits={guessDigits} />
                        <NumericKeyboard onKeyPress={handleKeyPress} onPress={handleGuessSubmit} value={guess} />
                    </View>
                }
                <GameStatusBanner
                    status={gameOver}
                    secret={secret}
                    historyLength={history.length}
                    onReset={() => {
                        setSecret(generateSecret());
                        setHistory([]);
                        setGameOver('playing');
                        setGuess('');
                    }}
                    t={t}
                />
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-11/12">
                        <Text className="text-white text-2xl font-bold">{t('games.bulls_cows.simple_terms_title')}</Text>
                        <Text className="text-slate-400 mt-4">
                            {t('games.bulls_cows.simple_terms_desc')}
                        </Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="mt-6 bg-emerald-500 px-4 py-2 rounded-lg"
                        >
                            <Text className="text-white text-center font-bold">{t('games.bulls_cows.got_it')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
