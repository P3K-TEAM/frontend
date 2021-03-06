<!-- eslint-disable vue/no-v-html -->
<template>
	<div
		v-if="isActive"
		class="bg-white p-6 rounded relative flex flex-col"
		:class="additionalClasses"
		data-test-id="modalWindow"
	>
		<a
			href="#"
			class="text-gray-600 text-base absolute right-0 top-0 flex justify-center items-center h-8 w-8"
			@click.prevent="dismiss"
		>
			<fa-icon :icon="['fas', 'times']" />
		</a>

		<template v-if="type === 'html'">
			<header v-html="htmlTemplate.header" />
			<section v-html="htmlTemplate.body" class="overflow-y-auto" />
			<footer v-html="htmlTemplate.footer" />
		</template>

		<template v-else>
			<p>
				{{ text }}
			</p>
		</template>

		<footer
			v-if="confirmation.enabled"
			class="flex justify-end flex-shrink-0 w-full pt-4 min-h-10"
		>
			<button
				type="button"
				class="bg-primary hover:bg-red-100 border border-red-500 text-red-500 font-bold rounded py-1 px-3"
				@click="dismiss"
			>
				{{ $t('cancel') }}
			</button>
			<button
				type="button"
				class="bg-primary-500 hover:bg-primary-400 text-white font-bold rounded py-1 px-3 ml-2"
				@click="confirm"
			>
				{{ confirmation.text || $t('ok') }}
			</button>
		</footer>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('ModalStore', [
			'isActive',
			'type',
			'text',
			'confirmation',
			'htmlTemplate',
			'additionalClasses'
		])
	},
	mounted() {
		document.addEventListener('keyup', e => {
			if (e.key === 'Escape' && this.isActive) {
				this.dismiss();
			}
		});
	},
	methods: {
		dismiss() {
			return this.$store.dispatch('ModalStore/dismissModal');
		},
		confirm() {
			if (this.confirmation.enabled) {
				this.confirmation.callback();
			}
			this.dismiss();
		}
	}
};
</script>
