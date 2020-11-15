import Vue from 'vue';
import Vuex from 'vuex';

// stores
import AlertStore from './alert/alert.store';
import ModalStore from './modal/modal.store';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		AlertStore,
		ModalStore,
	},
});
