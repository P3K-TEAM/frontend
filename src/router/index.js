import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Home from '../views/Home.vue';
import Upload from '../views/Upload.vue';
import Submission from '../views/Submission.vue';
import Document from '../views/Document';
import DocumentCompare from '../views/DocumentCompare';

// Components
import SubmissionTable from '@/components/Submission/SubmissionTable/SubmissionTable';
import SubmissionGraph from '@/components/Submission/SubmissionGraph/SubmissionGraph';
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
		path: '/submission/:submission',
		component: {
			render(h) {
				return h('router-view');
			}
		},
		children: [
			{
				path: '/',
				component: Submission,
				children: [
					{
						path: '/',
						component: SubmissionTable,
						name: 'submission',
						meta: { title: 'Zoznam výsledkov' }
					},
					{
						path: 'graph',
						component: SubmissionGraph,
						name: 'graph',
						meta: { title: 'Graf výsledkov' }
					}
				]
			}
		]
	},
	{
		path: '/document/:document',
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
];

export let prevRoute = undefined;

const router = new VueRouter({
	mode: 'history',
	routes
});

router.beforeEach((to, from, next) => {
	if (from.fullPath !== '/' && from.name !== null) {
		prevRoute = from;
	}
	next();
});

export default router;
