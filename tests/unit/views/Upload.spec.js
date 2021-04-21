import { shallowMount } from '@vue/test-utils';
import setup from '../setup';
import Navigation from '../../../src/components/Global/Navigation/Navigation';
import Upload from '../../../src/views/Upload';
import Vuex from 'vuex';

const store = new Vuex.Store({
	actions: { setLoading: jest.fn() },
	modules: {
		AlertStore: {
			namespaced: true,
			actions: {
				dismissAlert: jest.fn(),
				setAlert: jest.fn(),
				setLoading: jest.fn()
			}
		}
	}
});
describe('Upload ', () => {
	it('should exist navigation', () => {
		const wrapper = shallowMount(Upload, {
			...setup,
			store
		});
		expect(wrapper.findComponent(Navigation).exists());
	});
});
