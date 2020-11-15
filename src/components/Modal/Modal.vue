<template>
	<div
		v-if="isActive"
		class="flex justify-center items-center h-full w-full fixed z-9999 modal-backdrop"
	>
		<div class="bg-white p-6 rounded relative">
			<a
				href="#"
				class="text-gray-600 text-base absolute right-0 top-0 flex justify-center items-center h-8 w-8"
				@click.prevent="dismiss"
			>
				<i class="fas fa-times"></i>
			</a>

			<template v-if="type === 'html'">
				<header v-html="htmlTemplate.header" />
				<section v-html="htmlTemplate.body" />
				<footer v-html="htmlTemplate.footer" />
			</template>

			<template v-else>
				<p>
					{{ text }}
				</p>
			</template>

			<footer v-if="confirmation.enabled" class="flex w-full justify-end pt-4">
				<button
					type="button"
					class="bg-primary hover:bg-red-100 border border-red-500 text-red-500 font-bold rounded py-1 px-3"
					@click="dismiss"
				>
					Zrušiť
				</button>
				<button
					type="button"
					class="bg-primary-500 hover:bg-primary-400 text-white font-bold rounded py-1 px-3 ml-2"
					@click="confirm"
				>
					{{ confirmation.text || 'OK' }}
				</button>
			</footer>
		</div>
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
		]),
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
		},
	},
};
</script>

<style scoped>
.modal-backdrop {
	background: rgba(0, 0, 0, 0.4);
}
</style>
