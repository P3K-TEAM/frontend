import validateType from '@/functions/validate-type.function';
import i18n from '@/i18n';

export default {
	namespaced: true,
	state() {
		return {
			document: undefined,
			matches: undefined,
			ranges: undefined,
			diff: undefined
		};
	},
	getters: {
		document(state) {
			return state.document;
		},
		matches(state) {
			return state.matches;
		},
		ranges(state) {
			return state.ranges;
		},
		diff(state) {
			return state.diff;
		}
	},
	mutations: {
		SET_DOCUMENT(state, document) {
			validateType(document, 'object', 'document');
			state.document = document;
		},
		SET_MATCHES(state, matches) {
			validateType(matches, 'array', 'matches');
			state.matches = matches;
		},
		SET_RANGES(state, ranges) {
			validateType(ranges, 'array', 'intervals');
			state.ranges = ranges;
		},
		SET_DIFF(state, diff) {
			validateType(diff, 'object', 'diff');
			state.diff = diff;
		}
	},
	actions: {
		fetchDocument(context, id) {
			return this.$axios
				.get(`/api/documents/${id}`)
				.then(response => response.data)
				.then(data => {
					context.commit('SET_DOCUMENT', {
						id: Number(id),
						name: data.document.name,
						text: data.document.text,
						percentage: data.document.total_percentage,
						submissionId: data.submission_id
					});
					context.commit('SET_MATCHES', data.document.matches);
					context.commit('SET_RANGES', data.document.ranges);
				})
				.catch(e => {
					this.dispatch('AlertStore/setAlert', {
						message:
							e.response.data && e.response.data.error
								? e.response.data.error
								: e.message,
						type: 'error',
						duration: 0 // do not dismiss the error automatically
					});
				});
		},
		fetchDiff(context, { id, corpusId }) {
			return this.$axios
				.get(`/api/documents/${id}/diff/${corpusId}`)
				.then(response => response.data)
				.then(data => {
					context.commit('SET_DIFF', data);

					if (!data.textA || !data.textB) {
						throw new Error(
							i18n.t('documentCompareNoDocumentsProvidedError')
						);
					}

					if (data && data === 0) {
						throw new Error(
							i18n.t('documentCompareZeroMatchesError')
						);
					}

					context.commit('SET_DIFF', data);
				})
				.catch(e => {
					this.dispatch('AlertStore/setAlert', {
						message:
							e.response.data && e.response.data.error
								? e.response.data.error
								: e.message,
						type: 'error',
						duration: 0
					});
				});
		}
	}
};
