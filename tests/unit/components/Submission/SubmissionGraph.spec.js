import { shallowMount } from '@vue/test-utils';
import setup from '../../setup';
import SubmissionGraph from '../../../../src/components/Submission/SubmissionGraph/SubmissionGraph';
import ColorScale from 'color-scales';
import Vuex from 'vuex';

const store = new Vuex.Store({
	modules: {
		SubmissionStore: {
			namespaced: true,
			getters: {
				graph: jest.fn()
			},
			actions: {
				fetchGraph: () => Promise.resolve()
			}
		}
	}
});

const $route = {
	name: 'graph',
	params: {
		submission: 1
	}
};

describe('SubmissionGraph ', () => {
	it('should exist navigation', () => {
		// eslint-disable-next-line no-unused-vars
		const wrapper = shallowMount(SubmissionGraph, {
			...setup,
			store,
			data() {
				return {
					isLoading: true,
					colorScale: new ColorScale(0, 1, ['#00FF00', '#FF0000']),
					options: {
						uploadedNodeColor: '#EBC12C',
						defaultNodeColor: '#1699F1'
					}
				};
			},
			mocks: {
				$route
			}
		});
	});
});
