import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;

// Font Awesome Icons
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// Root styles
import './assets/scss/app.scss';

//Favicon
import './assets/img/favicon.ico';

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
