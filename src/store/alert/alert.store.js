const validateType = require('../../functions/validate-type.function');

module.exports = {
	namespaced: true,
	state() {
		return {
			isActive: false,
			message: '',
			type: '',
			duration: 0,
			defaultDuration: 2500,
		};
	},
	getters: {
		isActive(state) {
			return state.isActive;
		},
		type(state) {
			return state.type;
		},
		message(state) {
			return state.message;
		},
		duration(state) {
			return state.duration;
		},
	},
	mutations: {
		SET_ACTIVE(state, active) {
			validateType(active, 'boolean', 'active');
			state.isActive = active;
		},

		SET_TYPE(state, type) {
			if (!['success', 'error', 'warning', 'info'].includes(type)) {
				throw new Error(
					'Unsupported alert type. Type has to be one of type: "success","error","warning","info".'
				);
			}

			state.type = type;
		},

		SET_MESSAGE(state, message) {
			validateType(message, 'string', 'message');
			state.message = message;
		},

		SET_DURATION(state, duration) {
			if (!duration) {
				state.duration = state.defaultDuration;
				return;
			}

			validateType(duration, 'number', 'duration');
			state.duration = duration;
		},
	},
	actions: {
		setAlert(context, payload) {
			context.commit('SET_TYPE', payload.type);
			context.commit('SET_MESSAGE', payload.message);
			context.commit('SET_DURATION', payload.duration);
			context.commit('SET_ACTIVE', true);
		},
		dismissAlert(context) {
			context.commit('SET_ACTIVE', false);
		},
	},
};
