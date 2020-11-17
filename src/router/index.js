import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Upload from '../views/Upload.vue';
import Result from '../views/result/Result.vue';
import ResultInfo from '../views/result/ResultInfo';
import ResultInfoS from '../views/result/ResultInfoS';

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
	{
		path: '/result/:id',
		component: {
			render(h) {
				return h('router-view');
			},
		},
		children: [
			{
				path: '/',
				component: Result,
			},
			{
				path: 'document/:id_doc',
				component: ResultInfo,
			},
			{
				path: 'sdocument/:id_doc',
				component: ResultInfoS,
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
