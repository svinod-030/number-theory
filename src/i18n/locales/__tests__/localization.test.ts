import fs from 'fs';
import path from 'path';

const localesDir = path.resolve(__dirname, '../');
const languages = ['kn', 'ml', 'ta', 'te'];
const baseLanguage = 'en';

const getKeys = (obj: any, prefix = ''): string[] => {
    return Object.keys(obj).reduce((res: string[], el) => {
        if (Array.isArray(obj[el])) {
            return res;
        } else if (typeof obj[el] === 'object' && obj[el] !== null) {
            return [...res, ...getKeys(obj[el], prefix + el + '.')];
        }
        return [...res, prefix + el];
    }, []);
};

describe('Localization Integrity', () => {
    const enFile = path.join(localesDir, `${baseLanguage}.json`);
    const enTranslations = JSON.parse(fs.readFileSync(enFile, 'utf8'));
    const enKeys = getKeys(enTranslations).sort();

    languages.forEach((lang) => {
        test(`should have all keys from en.json in ${lang}.json`, () => {
            const langFile = path.join(localesDir, `${lang}.json`);
            if (!fs.existsSync(langFile)) {
                throw new Error(`Locale file not found: ${langFile}`);
            }

            const langTranslations = JSON.parse(fs.readFileSync(langFile, 'utf8'));
            const langKeys = getKeys(langTranslations).sort();

            const missingKeys = enKeys.filter((key) => !langKeys.includes(key));
            const extraKeys = langKeys.filter((key) => !enKeys.includes(key));

            if (missingKeys.length > 0) {
                console.warn(`Missing keys in ${lang}.json:\n${missingKeys.join('\n')}`);
            }

            if (extraKeys.length > 0) {
                console.warn(`Extra keys in ${lang}.json:\n${extraKeys.join('\n')}`);
            }

            expect(missingKeys).toEqual([]);
            expect(extraKeys).toEqual([]);
        });
    });
});
