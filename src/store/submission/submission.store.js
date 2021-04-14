import validateType from '@/functions/validate-type.function';

export default {
	namespaced: true,
	state() {
		return {
			id: undefined,
			status: undefined,
			documents: [],
			graph: undefined
		};
	},
	getters: {
		id(state) {
			return state.id;
		},
		status(state) {
			return state.status;
		},
		documents(state) {
			return state.documents;
		},
		graph(state) {
			return state.graph;
		}
	},
	mutations: {
		SET_ID(state, id) {
			validateType(id, 'number', 'id');
			state.id = id;
		},
		SET_STATUS(state, status) {
			validateType(status, 'string', 'status');
			state.status = status;
		},
		SET_DOCUMENTS(state, documents) {
			validateType(documents, 'array | undefined', 'documents');
			state.documents = documents;
		},
		SET_GRAPH(state, graph) {
			validateType(graph, 'object', 'graph');
			state.graph = graph;
		}
	},
	actions: {
		fetchSubmission(context, id) {
			return this.$axios
				.get(`/api/submissions/${id}`)
				.then(response => response.data)
				.then(data => {
					context.commit('SET_ID', Number(id));
					context.commit('SET_STATUS', data.status);
					context.commit('SET_DOCUMENTS', data.documents);
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
		fetchGraph(context, id) {
			return this.$axios
				.get(`/api/submissions/${id}/graph`)
				.then(response => {
					context.commit('SET_GRAPH', response.data);
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
