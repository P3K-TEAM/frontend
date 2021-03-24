import Vue from 'vue';
import VueI18n from 'vue-i18n';
import FlagIcon from 'vue-flag-icon';

// languages
import en from './languages/english';
import sk from './languages/slovak';

Vue.use(VueI18n);
Vue.use(FlagIcon);

const languages = {
	sk,
	en
};

export const supportedLanguages = Object.freeze(Object.keys(languages));

export function isSupportedLanguage(language) {
	return supportedLanguages.includes(language);
}

const i18n = new VueI18n({
	locale: 'sk',
	fallbackLocale: 'en',
	messages: languages
});

export default i18n;
