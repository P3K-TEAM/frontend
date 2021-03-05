import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip';
import axios from 'axios';
import filter from './filters/filter'

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

// Page title
router.afterEach((to) => {
	Vue.nextTick(() => {
		document.title = `${to.meta && to.meta.title ? `${to.meta.title} | ` : ''}AntiPlag`;
	});
});

Vue.prototype.$axios = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

new Vue({
	filter,
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
