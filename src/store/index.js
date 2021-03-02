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
			state.infoMessage = "";
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
		setLoading(context, payLoad) {
			const status = typeof payLoad === 'boolean' ? payLoad : payLoad.active;

			context.commit('SET_BACKDROP', status);
			context.commit('SET_LOADING', status);

			if (payLoad.infoStatus && payLoad.infoMessage) {
				context.commit('SET_INFO', payLoad.infoStatus);
				context.commit('SET_INFO_MESSAGE', payLoad.infoMessage);
			}
			else {
				context.commit('CLEAR_INFO');
			}
		},
	},
});
