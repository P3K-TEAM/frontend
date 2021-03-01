<template>
	<svg
		v-if="isLoading"
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
		class="text-primary-500 stroke-current spinner w-16"
	>
		<circle
			cx="50"
			cy="50"
			r="45"
		/>
	</svg>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['isLoading']),
	},
};
</script>
