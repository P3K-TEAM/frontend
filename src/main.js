import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import store from './store';
import filters from './filters';

// Third party global dependencies
import axios from 'axios';
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip';

// Root component
import App from './App.vue';

// Production tooltip
Vue.config.productionTip = false;

// Font Awesome Icons
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// Root styles
import '@/assets/scss/app.scss';

// v-tooltip
Vue.directive('tooltip', VTooltip);
Vue.directive('close-popover', VClosePopover);
Vue.component('v-popover', VPopover);
VTooltip.options.defaultTrigger = window.innerWidth > 768 ? 'hover focus click' : 'click'

// Page title
router.afterEach(to => {
	Vue.nextTick(() => {
		document.title = `${to.meta && to.meta.title ? `${to.meta.title} | ` : ''}AntiPlag`;
	});
});

// Set baseURL of axios
const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

// Set axios as global property (this.$axios)
Vue.prototype.$axios = axiosInstance;
Vuex.Store.prototype.$axios = axiosInstance;

// Set filters as global property (to be addressed from script)
Vue.prototype.$filters = filters;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
