import { shallowMount } from '@vue/test-utils';
import DocumentMatches from '@/components/Document/DocumentMatches';
import testId from '../../functions/test-id.function';
import { expect } from 'chai';

const factory = (values = {}) => {
	return shallowMount(DocumentMatches, values);
};

describe('DocumentMatches', () => {
	const matches = [
		{
			name: '1.pdf',
			percentage: 0.45,
			matches: [
				{
					char_from: 200,
					char_to: 280,
				},
			],
		},
		{
			name: '2.pdf',
			percentage: 0.75,
			matches: [
				{
					char_from: 120,
					char_to: 150,
				},
			],
		},
	];

	const selectors = {
		matchItems: testId('documentMatchesItem'),
		name: testId('documentMatchesItemName'),
		percentage: testId('documentMatchesItemPercentage'),
	};

	it('renders list of matched documents correctly', () => {
		const wrapper = factory({
			propsData: {
				matches,
			},
		});

		const matchItems = wrapper.findAll(selectors.matchItems);
		expect(matchItems.length).to.eq(2);

		// check for name and percentage
		matchItems.wrappers.forEach((item, i) => {
			const $name = item.find(selectors.name);
			expect($name.text()).to.eq(matches[i].name);

			const $percentage = item.find(selectors.percentage);
			expect($percentage.text()).to.eq(`${matches[i].percentage} %`);
		});
	});

	it('does not render when matches are not provided', () => {
		expect(DocumentMatches.props.matches.required).to.eq(true);
	});
});
