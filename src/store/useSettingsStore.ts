import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
    language: string | null;
    isFirstLaunch: boolean;
    _hasHydrated: boolean;
    setLanguage: (lang: string) => void;
    setIsFirstLaunch: (value: boolean) => void;
    setHasHydrated: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            language: null,
            isFirstLaunch: true,
            _hasHydrated: false,
            setLanguage: (language: string) => {
                set({ language });
            },
            setIsFirstLaunch: (isFirstLaunch: boolean) => set({ isFirstLaunch }),
            setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
        }),
        {
            name: 'settings-storage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
