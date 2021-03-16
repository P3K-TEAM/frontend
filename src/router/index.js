import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Home from '../views/Home.vue';
import Upload from '../views/Upload.vue';
import Result from '../views/Result.vue';
import Document from '../views/Document';

// Components
import ResultTable from '@/components/Result/ResultTable/ResultTable';
import ResultGraph from '@/components/Result/ResultGraph/ResultGraph';

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
				children: [
					{
						path: '/',
						component: ResultTable,
						name: 'result',
						meta: { title: 'Zoznam výsledkov' },
					},
					{
						path: 'graph',
						component: ResultGraph,
						name: 'graph',
						meta: { title: 'Graf výsledkov' },
					},
				],
			},
			{
				path: 'document/:document',
				name: 'document',
				component: Document,
				meta: { title: 'Dokument' },
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
