<template>
	<div
		v-if="isBackdropActive"
		class="flex flex-col justify-center items-center h-full w-full fixed z-9999 modal-backdrop"
	>
		<slot />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['isBackdropActive']),
	},
	watch: {
		// If backdrop was enabled, disable scrolling by appending class to the body
		isBackdropActive(newValue) {
			const className = 'overflow-y-hidden';
			if (newValue) {
				document.body.classList.add(className);
			} else {
				document.body.classList.remove(className);
			}
		},
	},
};
</script>

<style scoped>
.modal-backdrop {
	background: rgba(0, 0, 0, 0.4);
}
</style>
