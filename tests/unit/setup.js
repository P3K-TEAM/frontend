import { createLocalVue } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import axios from 'axios';
import filters from '../../src/filters';
import VueAnimateNumber from 'vue-animate-number';

const localVue = createLocalVue();
localVue.use(VueI18n);
localVue.use(Vuex);
localVue.use(VueAnimateNumber);
localVue.prototype.$axios = axios;
localVue.prototype.$filters = filters;

export default {
	localVue,
	i18n: new VueI18n({
		locale: 'sk',
		fallbackLocale: 'en',
		messages: {}
	})
};
