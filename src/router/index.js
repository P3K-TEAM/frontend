import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Upload from '../views/Upload.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Domov',
		component: Home,
	},
	{
		path: '/upload',
		name: 'Upload',
		component: Upload,
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
