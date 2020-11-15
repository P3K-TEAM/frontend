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
			if (typeof active !== 'boolean') {
				throw new Error(
					'Unsupported alert active property. Property "active" must be boolean.'
				);
			}

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
			if (typeof message !== 'string') {
				throw new Error(
					'Unsupported alert message type. Property "message" must be string.'
				);
			}

			if (!message?.length) {
				throw new Error('Property message must not be empty.');
			}

			state.message = message;
		},

		SET_DURATION(state, duration) {
			if (!duration) {
				duration = state.defaultDuration;
			}

			if (typeof duration !== 'number') {
				throw new Error(
					'Unsupported alert duration type. Property "duration" must be number.'
				);
			}

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
