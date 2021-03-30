import { languages } from '@/i18n';
import localStorageKeys from '@/constants/localStorageKeys';

export const supportedLanguages = Object.freeze(Object.keys(languages));

export function isSupportedLanguage(language) {
	return supportedLanguages.includes(language);
}

export function getPreferredLanguage() {
	// if user's language preference exists in localstorage, set it
	return window.localStorage.getItem(localStorageKeys.userLanguagePreference);
}

export function setPreferredLanguage(instance, language) {
	if (!language || !isSupportedLanguage(language)) {
		throw new Error('Unsupported language');
	}

	window.localStorage.setItem(
		localStorageKeys.userLanguagePreference,
		language
	);

	// set i18n locale
	instance.$i18n.locale = language;

	// set axios 'Accept-Language' header (BE i18n)
	instance.$axios.defaults.headers.common['Accept-Language'] = language;

	// html lang attribute
	document.querySelector('html').setAttribute('lang', language);
}
