<template>
	<div class="px-6 py-6 border-2 40vh border-gray-300 bg-white">
		<form>
			<textarea
				class="w-full h-64 md:text-md focus:outline-none bg-white"
				:disabled="disabled"
				:placeholder="
					disabled
						? 'Text môžete zadať len ak nemáte vložený súbor'
						: 'Sem skopírujte text Vašej práce...'
				"
				@input="handleTextChange"
			></textarea>
		</form>
	</div>
</template>

<script>
import { debounce } from 'lodash';

export default {
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		handleTextChange: debounce(function (event) {
			this.$emit('text-change', event.target.value);
		}, 500),
	},
};
</script>
