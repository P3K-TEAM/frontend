import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Home from '../views/Home.vue';
import Upload from '../views/Upload.vue';
import Result from '../views/Result.vue';
import Document from '../views/Document';
import DocumentCompare from '../views/DocumentCompare';

// Components
import ResultTable from '@/components/Result/ResultTable/ResultTable';
import ResultGraph from '@/components/Result/ResultGraph/ResultGraph';
import DocumentMatchesTable from '@/components/Document/DocumentMatchesTable';
import DocumentText from '@/components/Document/DocumentText';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/upload',
		name: 'upload',
		component: Upload,
		meta: { title: 'Nahrať dokument' }
	},
	{
		path: '/result/:result',
		component: {
			render(h) {
				return h('router-view');
			}
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
						meta: { title: 'Zoznam výsledkov' }
					},
					{
						path: 'graph',
						component: ResultGraph,
						name: 'graph',
						meta: { title: 'Graf výsledkov' }
					}
				]
			},
			{
				path: 'document/:document',
				component: {
					render(h) {
						return h('router-view');
					}
				},
				children: [
					{
						path: '/',
						component: Document,
						children: [
							{
								path: '/',
								component: DocumentText,
								name: 'document',
								meta: { title: 'Obsah súboru' }
							},
							{
								path: 'files',
								component: DocumentMatchesTable,
								name: 'matches',
								meta: { title: 'Zoznam zhodných súborov' }
							}
						]
					},
					{
						path: 'compare/:compare',
						name: 'compare',
						component: DocumentCompare,
						meta: { title: 'Podobnosť dokumentov' }
					}
				]
			}
		]
	}
];

export let prevRoute = {};

const router = new VueRouter({
	mode: 'history',
	routes,
	prevRoute
});

router.beforeEach((to, from, next) => {
	prevRoute = from;
	next();
});

export default router;
