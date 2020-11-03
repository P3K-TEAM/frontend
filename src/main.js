import Vue from 'vue';
import App from './App.vue';

// Font Awesome Icons
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// Root styles
import './assets/scss/app.scss';

//Favicon
import './assets/img/favicon.ico';

new Vue({
	el: '#app',
	render: h => h(App)
});
