import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import NumericKeyboard from '../components/NumericKeyboard';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInUp, ZoomIn, SlideInUp, SlideInDown } from 'react-native-reanimated';

const WinDisplay = ({ totalGuesses, onReset }: { totalGuesses: number, onReset: () => void }) => {
    const { t } = useTranslation();
    return (
        <Animated.View entering={ZoomIn} className="mb-6">
            <View className="bg-emerald-500/10 rounded-3xl border border-emerald-500/20 p-8 items-center">
                <Ionicons name="trophy" size={40} color="#34d399" />
                <Text className="text-white text-2xl font-black mt-4 text-center">
                    {t('games.guess_game.feedback_win', { count: totalGuesses })}
                </Text>
                <TouchableOpacity
                    onPress={onReset}
                    className="bg-emerald-500 mt-6 px-8 py-4 rounded-2xl flex-row items-center"
                >
                    <Ionicons name="refresh" size={20} color="white" />
                    <Text className="text-white font-black ml-2 uppercase tracking-widest">New Game</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const SecretBubbleContent = ({ totalGuesses }: { totalGuesses: number }) => {
    return (
        <View className="items-center">
            <Text className="text-slate-500 text-4xl font-black">?</Text>
            <Text className="text-slate-600 text-[9px] font-black uppercase mt-1">{totalGuesses} Guesses</Text>
        </View>
    );
};

const GuessDisplay = ({ guess }: { guess: string }) => (
    <Animated.View entering={FadeInUp} className="mb-6">
        <View className="bg-slate-900 rounded-3xl border border-slate-800 p-6 items-center">
            <Text className="text-slate-500 text-[10px] font-black uppercase tracking-[4px] mb-2">Current Guess</Text>
            <Text className={`text-6xl font-black tracking-tighter ${guess.trim() ? 'text-white' : 'text-slate-800'}`}>
                {guess.trim() || '---'}
            </Text>
        </View>
    </Animated.View>
);

export default function GuessGameScreen() {
    const { t } = useTranslation();
    const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100));
    const [guess, setGuess] = useState(' ');
    const [higherGuesses, setHigherGuesses] = useState<number[]>([]);
    const [lowerGuesses, setLowerGuesses] = useState<number[]>([]);
    const [gameOver, setGameOver] = useState(false);

    console.log(secretNumber);

    const handleKeyPress = useCallback((key: string) => {
        if (key === 'DEL') {
            setGuess(prev => prev.slice(0, -1));
        } else if (guess === ' ') {
            setGuess(key);
        } else if (guess.length < 2) {
            setGuess(prev => prev.trim() + key);
        }
    }, [guess]);

    const handleGuess = useCallback(() => {
        const num = parseInt(guess);
        if (isNaN(num) || num < 0 || num > 99) return;

        if (num < secretNumber) {
            setLowerGuesses(prev => [...prev, num].sort((a, b) => b - a));
            setGuess(' ');
        } else if (num > secretNumber) {
            setHigherGuesses(prev => [...prev, num].sort((a, b) => a - b));
            setGuess(' ');
        } else {
            setGameOver(true);
        }
    }, [guess, secretNumber]);

    const resetGame = () => {
        setSecretNumber(Math.floor(Math.random() * 100));
        setGuess(' ');
        setHigherGuesses([]);
        setLowerGuesses([]);
        setGameOver(false);
    };

    const totalGuesses = useMemo(() => higherGuesses.length + lowerGuesses.length, [higherGuesses, lowerGuesses]);

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="flex-1 px-6 pb-6">
                <ScreenHeader title={t('games.guess_game.title')} />
                {/* Visualizer Sections */}
                <View className="flex-1 mb-6" style={{ gap: 12 }}>
                    {/* Higher Section (Top) */}
                    <View className="flex-1 bg-slate-900/50 rounded-[32px] border border-slate-800 p-4 overflow-hidden">
                        <View className="flex-row items-center justify-center mb-4 opacity-40">
                            <Ionicons name="arrow-up" size={12} color="#f43f5e" />
                            <Text className="text-rose-400 text-[10px] font-black uppercase ml-1">Higher Than Secret</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="flex-wrap flex-row justify-center gap-2">
                                {higherGuesses.map((num, index) => (
                                    <Animated.View key={`high-${num}-${index}`} entering={SlideInUp} className="bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl">
                                        <Text className="text-rose-400 font-black text-sm">{num}</Text>
                                    </Animated.View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    {/* Secret Bubble (Center) */}
                    <View className="items-center z-50 -my-10">
                        <View className={`w-24 h-24 rounded-full items-center justify-center border-4 bg-slate-900 border-slate-800`}>
                            <SecretBubbleContent totalGuesses={totalGuesses} />
                        </View>
                    </View>

                    {/* Lower Section (Bottom) */}
                    <View className="flex-1 bg-slate-900/50 rounded-[32px] border border-slate-800 p-4 overflow-hidden">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="flex-wrap flex-row justify-center gap-2">
                                {lowerGuesses.map((num, index) => (
                                    <Animated.View key={`low-${num}-${index}`} entering={SlideInDown} className="bg-sky-500/10 border border-sky-500/20 px-3 py-2 rounded-xl">
                                        <Text className="text-sky-400 font-black text-sm">{num}</Text>
                                    </Animated.View>
                                ))}
                            </View>
                        </ScrollView>
                        <View className="flex-row items-center justify-center mb-4 opacity-40">
                            <Ionicons name="arrow-down" size={12} color="#38bdf8" />
                            <Text className="text-sky-400 text-[10px] font-black uppercase ml-1">Lower Than Secret</Text>
                        </View>
                    </View>
                </View>

                <GuessDisplay guess={guess} />

                {gameOver && <WinDisplay totalGuesses={totalGuesses} onReset={resetGame} />}

                <NumericKeyboard
                    onKeyPress={handleKeyPress}
                    onPress={handleGuess}
                    value={guess}
                />
            </View>
        </SafeAreaView>
    );
}

