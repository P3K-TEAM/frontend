import validateType from '@/functions/validate-type.function';

export default {
	namespaced: true,
	state() {
		return {
			document: undefined,
			matches: undefined,
			intervals: undefined
		};
	},
	getters: {
		document(state) {
			return state.document;
		},
		matches(state) {
			return state.matches;
		},
		intervals(state) {
			return state.intervals;
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
		SET_INTERVALS(state, intervals) {
			validateType(intervals, 'array', 'intervals');
			state.intervals = intervals;
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
						percentage: data.document.result.percentage
					});
					context.commit(
						'SET_MATCHES',
						data.document.result.matched_docs
					);
					context.commit(
						'SET_INTERVALS',
						data.document.intervals
					);
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
		}
	}
};
