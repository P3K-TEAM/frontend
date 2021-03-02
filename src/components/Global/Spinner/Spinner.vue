<template>
	<div>
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
		<div v-if="isMessageActive">
			<p
				class="bg-white border-4 rounded border-primary-500 p-2 m-4 text-center"
			>
				{{ infoMessage }}
			</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['isMessageActive', 'isLoading', 'infoMessage']),
	},
};
</script>
