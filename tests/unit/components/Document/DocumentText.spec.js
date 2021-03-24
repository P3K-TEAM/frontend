import { shallowMount } from '@vue/test-utils';
import setup from '../../setup';
import DocumentText from '../../../../src/components/Document/DocumentText';
import {
	documentColorMap,
	getSubstringsFromDocumentRanges
} from '@/functions/get-substrings-from-document-ranges.function';
import Vuex from 'vuex';

const getters = {
	ranges: () => [
		{
			from: 10,
			to: 20,
			matches: [
				{
					id: 2
				}
			]
		},
		{
			from: 40,
			to: 50,
			matches: [
				{
					id: 2
				},
				{
					id: 3
				}
			]
		}
	],
	document: () => ({
		text:
			'Luba, glos, et devirginato. Cum omnia favere, omnes assimilatioes resuscitabo rusticus, salvus tabeses.'
	}),
	matches: jest.fn()
};

const store = new Vuex.Store({
	modules: {
		DocumentStore: {
			getters,
			namespaced: true
		}
	}
});

describe('DocumentMatchesTable', () => {
	it('should have sk language in default', () => {
		const wrapper = shallowMount(DocumentText, {
			...setup,
			store,
			documentColorMap,
			getSubstringsFromDocumentRanges
		});

		expect(wrapper.vm.documentSubstrings).toEqual([
			{ from: 0, text: 'Luba, glos', to: 10 },
			{
				color: 'rgb(255, 127, 127)',
				from: 10,
				matches: [{ id: 2 }],
				text: ', et devir',
				to: 20
			},
			{ from: 21, text: 'inato. Cum omnia fa', to: 40 },
			{
				color: 'rgb(255, 127, 127)',
				from: 40,
				matches: [{ id: 2 }, { id: 3 }],
				text: 'vere, omne',
				to: 50
			},
			{
				from: 51,
				text: ' assimilatioes resuscitabo rusticus, salvus tabeses.',
				to: 103
			}
		]);
	});
});
