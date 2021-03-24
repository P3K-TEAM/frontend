import { mount } from '@vue/test-utils';
import SubmissionTable from '../../../../src/components/Submission/SubmissionTable/SubmissionTable';
import Vuex from 'vuex';
import setup from '../../setup';

const store = new Vuex.Store({
	modules: {
		SubmissionStore: {
			namespaced: true,
			getters: {
				// eslint-disable-next-line no-unused-vars
				documents: _ => []
			}
		}
	}
});

describe('SubmissionTable ', () => {
	it('should return correct icon for .pdf file', () => {
		const wrapper = mount(SubmissionTable, {
			...setup,
			store
		});

		let icon = wrapper.vm.getIcon('test.pdf');
		expect(icon.icon).toEqual(['fas', 'file-pdf']);
		expect(icon.cssClass).toEqual('text-red-500 text-lg md:text-2xl');
	});

	it('should return correct icon for .doc file', () => {
		const wrapper = mount(SubmissionTable, {
			...setup,
			store
		});

		let icon = wrapper.vm.getIcon('test.doc');
		expect(icon.icon).toEqual(['fas', 'file']);
		expect(icon.cssClass).toEqual('text-blue-500 text-lg md:text-2xl');
	});

	it('should return correct icon for .docx file', () => {
		const wrapper = mount(SubmissionTable, {
			...setup,
			store
		});

		let icon = wrapper.vm.getIcon('test.docx');
		expect(icon.icon).toEqual(['fas', 'file']);
		expect(icon.cssClass).toEqual('text-blue-500 text-lg md:text-2xl');
	});

	it('should return correct icon for other file', () => {
		const wrapper = mount(SubmissionTable, {
			...setup,
			stubs: ['router-link'],
			store
		});

		let icon = wrapper.vm.getIcon('test.txt');
		expect(icon.icon).toEqual(['fas', 'file']);
		expect(icon.cssClass).toEqual('text-gray-400 text-lg md:text-2xl');
	});
});
