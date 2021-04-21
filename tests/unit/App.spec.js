import { shallowMount } from '@vue/test-utils';
import Upload from '../../src/views/Upload';
import setup from './setup';
import Vuex from 'vuex';

const store = new Vuex.Store({
	state: {},
	actions: {
		setLoading: jest.fn()
	},
	getters: {}
});

describe('Upload', () => {
	it('does able to write email when check is not provided', () => {
		shallowMount(Upload, { ...setup, store });
	});
});
