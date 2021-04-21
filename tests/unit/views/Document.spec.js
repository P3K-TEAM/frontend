import { shallowMount } from '@vue/test-utils';
import setup from '../setup';
import Document from '../../../src/views/Document';
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
	actions: {
		setLoading: jest.fn()
	},
	modules: {
		DocumentStore: {
			namespaced: true,
			getters: {
				document: jest.fn(() => ({ submissionId: 1 }))
			},
			actions: {
				fetchDocument: jest.fn(() => Promise.resolve())
			}
		}
	}
});

describe('Document', () => {
	it('should return submission route', () => {
		const wrapper = shallowMount(Document, {
			...setup,
			store,
			router,
			stubs: ['fa-icon']
		});

		let url = wrapper.vm.getGoBackURL;
		expect(url).toStrictEqual({
			name: 'submission',
			params: { submission: 1 }
		});
	});
});
