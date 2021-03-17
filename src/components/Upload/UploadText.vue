<template>
	<div
		class="h-full flex flex-col items-center 40vh p-4 md:p-5 md:-mb-16 bg-white border-3 border-gray-300"
	>
		<form class="w-full h-full">
			<textarea
				class="w-full min-h-full max-h-full md:h-64 text-sm md:text-base bg-white-100 focus:outline-none"
				:disabled="disabled"
				:placeholder="
					disabled
						? 'Text môžete zadať len ak nemáte vložený súbor'
						: 'Sem skopírujte text Vašej práce...'
				"
				@input="handleTextChange"
			/>
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
