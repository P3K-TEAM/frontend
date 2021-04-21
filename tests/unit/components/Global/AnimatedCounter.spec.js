import { shallowMount } from '@vue/test-utils';
import setup from '../../setup';
import AnimatedCounter from '../../../../src/components/Global/AnimatedCounter/AnimatedCounter';
import Spinner from '../../../../src/components/Global/Spinner/Spinner';

setup.localVue.directive('view', jest.fn());

describe('AnimatedCounter ', () => {
	it('should have spinner', () => {
		const wrapper = shallowMount(AnimatedCounter, {
			...setup,
			propsData: {
				from: 0,
				to: 5,
				refName: 'text.pdf',
				contentText: 'contenttexttest',
				description: 'descriptiontest'
			}
		});
		wrapper.findComponent(Spinner).exists();
	});
});
