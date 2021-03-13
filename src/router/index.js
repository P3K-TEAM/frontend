import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Upload from '../views/Upload.vue';
import Result from '../views/Result.vue';
import Document from '../views/Document';
import Diff from '../views/Diff';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/upload',
		name: 'upload',
		component: Upload,
		meta: { title: 'Nahrať dokument' },
	},
	{
		path: '/result/:result',
		component: {
			render(h) {
				return h('router-view');
			},
		},
		children: [
			{
				path: '/',
				component: Result,
				name: 'result',
				meta: { title: 'Výsledky kontroly' },
			},
			{
				path: 'document/:document',
				name: 'document',
				component: Document,
				meta: { title: 'Dokument' },
			},
			{
				path: 'diff/:diff',
				name: 'diff',
				component: Diff,
				meta: { title: 'Podobnosť dokumentov' },
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
