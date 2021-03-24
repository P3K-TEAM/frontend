import { shallowMount } from '@vue/test-utils';
import setup from '../../setup';
import Navigation from '../../../../src/components/Global/Navigation/Navigation';
import SubmissionHeader from '../../../../src/components/Submission/SubmissionHeader';

describe('SubmissionHeader ', () => {
	it('should exist navigation', () => {
		const wrapper = shallowMount(SubmissionHeader, {
			...setup,
			propsData: {
				title: 'Toto je test',
				description: 'Toto je popis testu',
				percentage: 45
			}
		});
		wrapper.findComponent(Navigation).exists();
	});
});
