import Vue from 'vue';
import Vuex from 'vuex';

// stores
import AlertStore from './alert/alert.store';
import ModalStore from './modal/modal.store';

// functions
import validateType from '@/functions/validate-type.function';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		AlertStore,
		ModalStore,
	},
	state() {
		return {
			backdrop: false,
			loading: false,
			infoStatus: false,
			infoMessage: undefined,
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
		SET_INFO(state, status) {
			validateType(status, 'boolean', 'infoStatus');
			state.infoStatus = status;
		},
		SET_INFO_MESSAGE(state, infoMessage) {
			validateType(infoMessage, 'string', 'infoMessage');
			state.infoMessage = infoMessage;
		},
		CLEAR_INFO(state) {
			state.infoStatus = false;
			state.infoMessage = '';
		},
	},
	getters: {
		isLoading(state) {
			return state.loading;
		},
		isBackdropActive(state) {
			return state.backdrop;
		},
		isMessageActive(info) {
			return info.infoStatus;
		},
		infoMessage(info) {
			return info.infoMessage;
		},
	},
	actions: {
		setLoading(context, payload) {
			const status =
				typeof payload === 'boolean' ? payload : payload.active;

			context.commit('SET_BACKDROP', status);
			context.commit('SET_LOADING', status);

			if (payload.infoStatus && payload.infoMessage) {
				context.commit('SET_INFO', payload.infoStatus);
				context.commit('SET_INFO_MESSAGE', payload.infoMessage);
			} else {
				context.commit('CLEAR_INFO');
			}
		},
	},
});
