import 'i18next';
import type enCommon from '../i18n/locales/en/common.json';
import type enDashboard from '../i18n/locales/en/dashboard.json';
import type enHabits from '../i18n/locales/en/habits.json';
import type enCategories from '../i18n/locales/en/categories.json';
import type enValidation from '../i18n/locales/en/validation.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: {
            common: typeof enCommon;
            dashboard: typeof enDashboard;
            habits: typeof enHabits;
            categories: typeof enCategories;
            validation: typeof enValidation;
        };
    }
}
