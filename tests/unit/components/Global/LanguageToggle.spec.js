import { shallowMount } from '@vue/test-utils';
import LanguageToggle from '../../../../src/components/Global/LanguageToggle/LanguageToggle';
import setup from '../../setup';

describe('LanguageToggle ', () => {
	it('should be 2 buttons and first sk active', () => {
		const wrapper = shallowMount(LanguageToggle, {
			...setup,
			$axios: {},
			data() {
				return {
					languages: [
						{ flag: 'sk', key: 'sk' },
						{ flag: 'us', key: 'en' }
					]
				};
			}
		});

		const buttons = wrapper.findAll('button');
		expect(buttons.length).toBe(2);
		expect(buttons.at(0).classes('active')).toBe(true);
	});

	it('should have sk language in default', () => {
		const wrapper = shallowMount(LanguageToggle, {
			...setup,
			data() {
				return {
					languages: [
						{ flag: 'sk', key: 'sk' },
						{ flag: 'us', key: 'en' }
					]
				};
			}
		});

		expect(wrapper.vm.activeLanguage).toBe('sk');
	});

	it('should local language to be en', () => {
		const wrapper = shallowMount(LanguageToggle, {
			...setup,
			data() {
				return {
					languages: [
						{ flag: 'sk', key: 'sk' },
						{ flag: 'us', key: 'en' }
					]
				};
			}
		});
		wrapper.vm.changeLocale('en');
		expect(wrapper.vm.$i18n.locale).toBe('en');
	});
});
