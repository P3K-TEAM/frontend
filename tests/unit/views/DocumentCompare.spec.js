import { shallowMount } from '@vue/test-utils';
import setup from '../setup';
import DocumentCompare from '../../../src/views/DocumentCompare';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

setup.localVue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: '/submission/:submission',
			name: 'submission'
		}
	]
});

const store = new Vuex.Store({
	actions: { setLoading: jest.fn() },
	modules: {
		DocumentStore: {
			namespaced: true,
			getters: {
				diff: jest.fn()
			},
			actions: {
				fetchDiff: () => Promise.resolve()
			}
		}
	}
});

describe('Submission ', () => {
	it('should get getCurrentSubmissionURL', () => {
		// eslint-disable-next-line no-unused-vars
		const wrapper = shallowMount(DocumentCompare, {
			...setup,
			store,
			router
		});
	});
});
