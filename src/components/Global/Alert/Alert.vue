<template>
	<transition name="fade">
		<div
			v-if="isActive"
			class="flex justify-center w-full fixed mt-8 z-9999"
		>
			<div class="bg-white rounded shadow-2xl mx-6 md:mx-0 max-w-sm relative">
				<a
					href="#"
					class="flex justify-center items-center close-icon"
					@click.prevent="dismiss"
				>
					<i class="fas fa-times" />
				</a>
				<div
					class="p-4 border-t-4"
					:class="{
						'border-green-500': type === 'success',
						'border-red-600': type === 'error',
						'border-orange-500': type === 'warning',
						'border-blue-500': type === 'info',
					}"
				>
					{{ message }}
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('AlertStore', [
			'isActive',
			'message',
			'type',
			'duration',
		]),
	},
	watch: {
		isActive(newValue) {
			// If alert was enabled, set timeout and then dismiss after certain amount of time
			if (newValue) {
				setTimeout(() => this.dismiss(), this.duration);
			}
		},
	},
	methods: {
		dismiss() {
			return this.$store.dispatch('AlertStore/dismissAlert');
		},
	},
};
</script>

<style scoped>
.close-icon {
	@apply absolute w-4 h-4;
	background-color: rgba(255, 255, 255, 0.6);
	right: -0.9em;
	top: 0.2em;
}
</style>
