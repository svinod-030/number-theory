import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
    language: string | null;
    setLanguage: (language: string) => void;
    isFirstLaunch: boolean;
    setFirstLaunch: (isFirstLaunch: boolean) => void;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
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
            setFirstLaunch: (isFirstLaunch: boolean) => set({ isFirstLaunch }),
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
