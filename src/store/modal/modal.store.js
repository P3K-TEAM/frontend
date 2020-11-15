const validateType = require('../../functions/validate-type.function');

module.exports = {
	namespaced: true,
	state() {
		return {
			isActive: false,
			defaultType: 'text',
			type: this.defaultType,
			text: '',
			confirmation: {
				enabled: false,
				callback: () => undefined,
				text: undefined,
			},
		};
	},
	getters: {
		isActive(state) {
			return state.isActive;
		},
		type(state) {
			return state.type;
		},
		text(state) {
			return state.text;
		},
		confirmation(state) {
			return state.confirmation;
		},
	},
	mutations: {
		SET_ACTIVE(state, active) {
			validateType(active, 'boolean', 'active');
			state.isActive = active;
		},

		SET_TYPE(state, type) {
			if (!type) {
				type = state.defaultType;
				return;
			}
			validateType(type, 'string', type);
			state.type = type;
		},

		SET_CONFIRMATION(state, enabled) {
			state.confirmation.enabled = enabled;
		},

		SET_CONFIRMATION_CALLBACK(state, callback) {
			validateType(callback, 'function', 'confirmation.callback');
			state.confirmation.callback = callback;
		},

		SET_CONFIRMATION_TEXT(state, text) {
			if (text !== undefined) {
				validateType(text, 'string', 'confirmation.text');
				state.confirmation.text = text;
			}
		},

		SET_TEXT(state, text) {
			validateType(text, 'string', 'text');
			state.text = text;
		},
	},
	actions: {
		setModal(context, payload) {
			context.commit('SET_TYPE', payload.type);
			context.commit('SET_TEXT', payload.text);

			//confirmation
			if (payload.confirmation) {
				context.commit(
					'SET_CONFIRMATION',
					payload.confirmation.enabled
				);
				context.commit(
					'SET_CONFIRMATION_TEXT',
					payload.confirmation?.text
				);
				context.commit(
					'SET_CONFIRMATION_CALLBACK',
					payload.confirmation?.callback
				);
			}

			// enable modal
			context.commit('SET_ACTIVE', true);
		},
		dismissModal(context) {
			context.commit('SET_ACTIVE', false);
		},
	},
};
