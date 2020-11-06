import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Upload from '../views/Upload.vue';
import Result from '../views/Result.vue';

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
		component: Home
	},
	{
		path: '/result',
		name: 'Result',
		component: Result
	}
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
