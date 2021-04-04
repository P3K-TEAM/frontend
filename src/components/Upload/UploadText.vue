<template>
	<form class="flex flex-col flex-grow border-2 border-gray-300">
		<textarea
			class="focus:outline-none p-4 md:p-5 flex-grow resize-none"
			:placeholder="$t('uploadTextPlaceholder')"
			@input="handleTextChange"
		/>
	</form>
</template>

<script>
import { throttle } from 'lodash';

export default {
	methods: {
		handleTextChange: throttle(function (event) {
			this.$emit('text-change', event.target.value);
		}, 500)
	}
};
</script>
