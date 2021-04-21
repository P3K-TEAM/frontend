import { shallowMount } from '@vue/test-utils';
import Tabs from '../../../../src/components/Global/Tabs/Tabs';
import setup from '../../setup';

describe('Tabs ', () => {
	it('should be selected', () => {
		const wrapper = shallowMount(Tabs, {
			...setup,
			propsData: {
				tabs: [
					{
						key: 'file',
						title: 'UpFile',
						disabled: 'notempty',
						disabledMessage: 'message'
					},
					{
						key: 'text',
						title: 'UpText',
						disabled: '',
						disabledMessage: 'message'
					}
				],
				selectedTab: ''
			}
		});

		wrapper.vm.markTabAsSelected(wrapper.vm.$props.tabs[0].key);
	});
});
