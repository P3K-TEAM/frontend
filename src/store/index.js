import Vue from 'vue';
import Vuex from 'vuex';

// stores
import AlertStore from './alert/alert.store';
import ModalStore from './modal/modal.store';
import ResultStore from './result/result.store';

// functions
import validateType from '@/functions/validate-type.function';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		AlertStore,
		ModalStore,
		ResultStore,
	},
	state() {
		return {
			backdrop: false,
			loading: false,
			loadingMessage: undefined,
		};
	},
	mutations: {
		SET_LOADING(state, status) {
			validateType(status, 'boolean', 'loading.status');
			state.loading = status;
		},
		SET_BACKDROP(state, status) {
			validateType(status, 'boolean', 'backdrop.status');
			state.backdrop = status;
		},
		SET_LOADING_MESSAGE(state, message) {
			validateType(message, 'string | undefined', 'loadingMessage');
			state.loadingMessage = message;
		},
	},
	getters: {
		isLoading(state) {
			return state.loading;
		},
		isBackdropActive(state) {
			return state.backdrop;
		},
		loadingMessage(state) {
			return state.loadingMessage;
		},
	},
	actions: {
		setLoading(context, payload) {
			const status =
				typeof payload === 'boolean' ? payload : payload.active;

			context.commit('SET_BACKDROP', status);
			context.commit('SET_LOADING', status);

			// if payload contains loading message
			if (payload.active && payload.loadingMessage) {
				context.commit('SET_LOADING_MESSAGE', payload.loadingMessage);
			} else {
				context.commit('SET_LOADING_MESSAGE', undefined);
			}
		},
	},
});
