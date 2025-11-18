import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enDashboard from './locales/en/dashboard.json';
import enHabits from './locales/en/habits.json';
import enCategories from './locales/en/categories.json';
import enValidation from './locales/en/validation.json';

import amCommon from './locales/am/common.json';
import amDashboard from './locales/am/dashboard.json';
import amHabits from './locales/am/habits.json';
import amCategories from './locales/am/categories.json';
import amValidation from './locales/am/validation.json';

type LanguageInfo = {
    nativeName: string;
    dir: 'ltr' | 'rtl';
};

export const LANGUAGES: Record<'en' | 'am', LanguageInfo> = {
    en: { nativeName: 'English', dir: 'ltr' },
    am: { nativeName: 'አማርኛ', dir: 'ltr' },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: enCommon,
                dashboard: enDashboard,
                habits: enHabits,
                categories: enCategories,
                validation: enValidation,
            },
            am: {
                common: amCommon,
                dashboard: amDashboard,
                habits: amHabits,
                categories: amCategories,
                validation: amValidation,
            },
        },
        fallbackLng: 'en',
        defaultNS: 'common',
        ns: ['common', 'dashboard', 'habits', 'categories', 'validation'],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            lookupLocalStorage: 'i18nextLng',
            caches: ['localStorage'],
        },

        react: {
            useSuspense: true,
        },
    });

export default i18n;
