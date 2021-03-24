import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import setup from '../../setup';
import Backdrop from '../../../../src/components/Global/Backdrop/Backdrop';

const store = new Vuex.Store({
	getters: {
		isBackdropActive: jest.fn()
	}
});

describe('Backdrop ', () => {
	it('should render class if backdrop is true', async () => {
		const wrapper = shallowMount(Backdrop, { ...setup, store });

		wrapper.vm.$options.watch.isBackdropActive.call(wrapper.vm, true);
		await expect(
			document.body.classList.contains('overflow-y-hidden')
		).toBe(true);
	});

	it('should remove class if backdrop is false', async () => {
		const wrapper = shallowMount(Backdrop, { ...setup, store });

		wrapper.vm.$options.watch.isBackdropActive.call(wrapper.vm, false);
		await expect(
			document.body.classList.contains('overflow-y-hidden')
		).toBe(false);
	});
});
