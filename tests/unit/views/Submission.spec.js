import { shallowMount } from '@vue/test-utils';
import setup from '../setup';
import Submission from '../../../src/views/Submission';
import Vuex from 'vuex';

const mockRoute = {
	params: {
		submission: 5
	}
};
const mockRouter = {
	push: jest.fn()
};

const store = new Vuex.Store({
	getters: {
		isLoading: jest.fn(),
		loadingMessage: jest.fn(),
		status: jest.fn()
	},
	mutations: {
		SET_LOADING_MESSAGE: jest.fn()
	},
	actions: {
		setLoading: jest.fn()
	},
	modules: {
		SubmissionStore: {
			namespaced: true,
			getters: {
				status: jest.fn()
			},
			actions: {
				fetchSubmission: jest.fn()
			}
		}
	}
});

describe('Submission ', () => {
	it('should get getCurrentSubmissionURL', () => {
		const wrapper = shallowMount(Submission, {
			...setup,
			store,
			data() {
				return {
					id: undefined
				};
			},
			stubs: ['router-view'],
			mocks: {
				$route: mockRoute,
				$router: mockRouter,
				prevRoute: { name: 'document', fullPath: '/test/url' }
			}
		});

		let url = wrapper.vm.getCurrentSubmissionURL;
		expect(url).toBe('/submission/5');
	});
});
