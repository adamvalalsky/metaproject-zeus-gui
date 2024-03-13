import i18next, { Resource, use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from './model.ts';
import enTranslation from './resources/en.json';

const resources = {
	[Language.EN]: {
		translation: enTranslation
	}
} as Resource;

use(initReactI18next).init({
	resources,
	lng: Language.EN,
	fallbackLng: Object.values(Language),
	interpolation: {
		escapeValue: false
	},
	simplifyPluralSuffix: true,
	returnNull: false,
	react: {
		useSuspense: false
	}
});

export default i18next;
