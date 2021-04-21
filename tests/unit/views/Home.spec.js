import { shallowMount } from '@vue/test-utils';
import setup from '../setup';
import Home from '../../../src/views/Home';

describe('Submission ', () => {
	it('should get getCurrentSubmissionURL', () => {
		// eslint-disable-next-line no-unused-vars
		const wrapper = shallowMount(Home, {
			...setup,
			data() {
				return {
					stats: {}
				};
			},
			stubs: ['router-link', 'fa-icon']
		});
	});
});
