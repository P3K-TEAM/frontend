import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import store from './store';
import filters from './filters';

// Internationalization
import i18n from './i18n';

// Font Awesome Icons
import './icons';

// Third party global dependencies
import axios from 'axios';
import VTooltip from 'v-tooltip';
import VueAnimateNumber from 'vue-animate-number';
import checkView from 'vue-check-view';
import VueSmoothScroll from 'vue2-smooth-scroll'

// Root component
import App from './App.vue';

// Production tooltip
Vue.config.productionTip = false;

// Root styles
import '@/assets/scss/app.scss';

// v-tooltip
Vue.use(VTooltip, {
	defaultTrigger: window.innerWidth > 768 ? 'hover focus' : 'click',
	defaultHideOnTargetClick: false
});

// vue-animate-number
Vue.use(VueAnimateNumber);

// vue-check-view
Vue.use(checkView)

// vue2-smooth-scroll
Vue.use(VueSmoothScroll)

// Page title
router.afterEach(to => {
	Vue.nextTick(() => {
		document.title = `${
			to.meta && to.meta.title ? `${to.meta.title} | ` : ''
		}AntiPlag`;
	});
});

// Set baseURL of axios
const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_API_URL
});

// Set axios as global property (this.$axios)
Vue.prototype.$axios = axiosInstance;
Vuex.Store.prototype.$axios = axiosInstance;

// Set filters as global property (to be addressed from script)
Vue.prototype.$filters = filters;

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app');
