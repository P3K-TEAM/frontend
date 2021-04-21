import { mount } from '@vue/test-utils';
import setup from '../../setup';
import DocumentMatchesTable from '../../../../src/components/Document/DocumentMatchesTable';
import Vuex from 'vuex';

const $router = {
	push: jest.fn()
};

const $route = {
	name: 'document',
	params: {
		submission: 1,
		document: 1
	}
};

const store = new Vuex.Store({
	modules: {
		DocumentStore: {
			namespaced: true,
			getters: {
				matches: jest.fn(() => [])
			}
		}
	}
});

describe('DocumentMatchesTable', () => {
	it('lenght should be zero if nothing get', () => {
		const wrapper = mount(DocumentMatchesTable, {
			...setup,
			store,
			mocks: {
				$route
			}
		});
		expect(wrapper.findAll('template').length).toBe(0);
	});

	it('should redirect to document compare after clicking on item', () => {
		const wrapper = mount(DocumentMatchesTable, {
			...setup,
			store,
			mocks: {
				$route,
				$router
			}
		});

		const documentCompareId = 4;
		wrapper.vm.options.onClick({ id: documentCompareId });
		expect($router.push).toHaveBeenCalledWith({
			name: 'compare',
			params: {
				compare: documentCompareId,
				document: $route.params.document
			}
		});
	});
});
