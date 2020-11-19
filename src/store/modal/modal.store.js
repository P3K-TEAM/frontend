const validateType = require('../../functions/validate-type.function');

module.exports = {
	namespaced: true,
	state() {
		return {
			isActive: false,
			defaultType: 'text',
			type: this.defaultType,
			text: '',
			htmlTemplate: {
				header: '',
				body: '',
				footer: '',
			},
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
		htmlTemplate(state) {
			return state.htmlTemplate;
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

			if (!['text', 'html'].includes(type)) {
				throw new Error(
					'Unsupported alert type. Type has to be one of type: "text","html".'
				);
			}

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

		SET_HTML(state, htmlTemplate) {
			validateType(htmlTemplate, 'object', 'htmlTemplate');

			if (htmlTemplate.header) {
				validateType(
					htmlTemplate.header,
					'string',
					'htmlTemplate.header'
				);
				state.htmlTemplate.header = htmlTemplate.header;
			}

			if (htmlTemplate.body) {
				validateType(htmlTemplate.body, 'string', 'htmlTemplate.body');
				state.htmlTemplate.body = htmlTemplate.body;
			}

			if (htmlTemplate.footer) {
				validateType(
					htmlTemplate.footer,
					'string',
					'htmlTemplate.footer'
				);
				state.htmlTemplate.footer = htmlTemplate.footer;
			}
		},
	},
	actions: {
		setModal(context, payload) {
			context.commit('SET_TYPE', payload.type);

			if (context.state.type === 'text') {
				context.commit('SET_TEXT', payload.text);
			} else {
				context.commit('SET_HTML', payload.htmlTemplate);
			}

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

			// enable backdrop from root store
			context.commit('SET_BACKDROP', true, { root: true });
			// enable modal
			context.commit('SET_ACTIVE', true);
		},
		dismissModal(context) {
			context.commit('SET_ACTIVE', false);
			context.commit('SET_BACKDROP', false, { root: true });
		},
	},
};
