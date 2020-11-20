import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

Vue.config.productionTip = false;

// Font Awesome Icons
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// Root styles
import '@/assets/scss/app.scss';

// Favicon
import '@/assets/img/favicon.ico';

// v-tooltip
Vue.directive('tooltip', VTooltip);
Vue.directive('close-popover', VClosePopover);
Vue.component('v-popover', VPopover);

// Page title
router.afterEach(to => {
	Vue.nextTick(() => {
		document.title = `${to.name ? `${to.name} | ` : ''}AntiPlag`;
	});
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
