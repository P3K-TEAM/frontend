import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import setup from '../../setup';
import Alert from '../../../../src/components/Global/Alert/Alert';

const getters = {
	isActive: jest.fn(),
	duration: jest.fn()
};

const store = new Vuex.Store({
	modules: {
		AlertStore: {
			namespaced: true,
			getters,
			actions: {
				dismissAlert: jest.fn()
			}
		}
	}
});

describe('Alert ', () => {
	it('should run dismiss function after duration', () => {
		const wrapper = shallowMount(Alert, { ...setup, store });

		jest.useFakeTimers();
		wrapper.vm.$options.watch.isActive.call(wrapper.vm, getters.duration());
		jest.advanceTimersByTime(getters.duration());
	});

	it('should run dismiss function', () => {
		const wrapper = shallowMount(Alert, { ...setup, store });
		wrapper.vm.dismiss();
	});
});
