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
	},
	getters: {
		isLoading(state) {
			return state.loading;
		},
		isBackdropActive(state) {
			return state.backdrop;
		},
	},
	actions: {
		setLoading(context, status) {
			context.commit('SET_BACKDROP', status);
			context.commit('SET_LOADING', status);
		},
	},
});
