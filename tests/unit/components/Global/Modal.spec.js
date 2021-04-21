import { shallowMount } from '@vue/test-utils';
import setup from '../../setup';
import Modal from '../../../../src/components/Global/Modal/Modal';
import Vuex from 'vuex';
import { testId } from '../../functions/test-id.function';

const store = new Vuex.Store({
	modules: {
		ModalStore: {
			namespaced: true,
			getters: {
				isActive: jest.fn()
			},
			actions: {
				dismissModal: jest.fn()
			}
		}
	}
});

describe('Modal', () => {
	it('should not be visible after running dismiss function', () => {
		const wrapper = shallowMount(Modal, { ...setup, store });
		wrapper.vm.dismiss();
		expect(wrapper.find(testId('modalWindow')).exists()).toBe(false);
	});
});
