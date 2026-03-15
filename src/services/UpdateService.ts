import VersionCheck from 'react-native-version-check-expo';
import { Linking, Platform } from 'react-native';
import { APP_CONFIG } from '../constants';

export interface VersionCheckResult {
    isUpdateAvailable: boolean;
    latestVersion: string;
    currentVersion: string;
    storeUrl: string;
}

export const UpdateService = {
    /**
     * Checks if a new version is available on the respective store.
     */
    async checkForUpdate(): Promise<VersionCheckResult> {
        // Skip update check in development to avoid unnecessary noise and errors
        if (__DEV__) {
            return {
                isUpdateAvailable: false,
                latestVersion: APP_CONFIG.APP_VERSION,
                currentVersion: APP_CONFIG.APP_VERSION,
                storeUrl: '',
            };
        }

        try {
            const currentVersion = VersionCheck.getCurrentVersion();
            const latestVersion = await VersionCheck.getLatestVersion({
                provider: Platform.select({
                    android: 'playStore',
                    ios: 'appStore',
                    default: 'playStore',
                }),
                packageName: APP_CONFIG.ANDROID_PACKAGE_NAME,
                appId: APP_CONFIG.IOS_APP_ID,
            });

            if (!latestVersion) {
                return {
                    isUpdateAvailable: false,
                    latestVersion: currentVersion,
                    currentVersion,
                    storeUrl: '',
                };
            }

            const isUpdateAvailable = await VersionCheck.needUpdate({
                currentVersion,
                latestVersion,
            });

            const storeUrl = Platform.select({
                android: APP_CONFIG.STORE_URL_ANDROID,
                ios: APP_CONFIG.STORE_URL_IOS,
                default: '',
            });

            return {
                isUpdateAvailable: !!isUpdateAvailable?.isNeeded,
                latestVersion: latestVersion,
                currentVersion,
                storeUrl: storeUrl || '',
            };
        } catch (error: any) {
            // Log as warning rather than error for "Parse Error" which usually means app is not published
            if (error?.message?.includes('Parse Error')) {
                console.warn('Update check: App not found on store or page structure changed (likely unpublished).');
            } else {
                console.error('Error checking for version update:', error);
            }
            
            return {
                isUpdateAvailable: false,
                latestVersion: APP_CONFIG.APP_VERSION,
                currentVersion: APP_CONFIG.APP_VERSION,
                storeUrl: '',
            };
        }
    },

    /**
     * Opens the respective store page for the app.
     */
    async openStore(url?: string) {
        const storeUrl = url || Platform.select({
            android: APP_CONFIG.STORE_URL_ANDROID,
            ios: APP_CONFIG.STORE_URL_IOS,
            default: '',
        });

        if (storeUrl) {
            Linking.openURL(storeUrl);
        }
    }
};
