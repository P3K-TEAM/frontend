<template>
	<div
		class="flex m-2 p-2 border-grey-300 px-4 group hover:bg-gray-100 border-2"
	>
		<span class="inline-block w-1/4">
			{{ name }}
		</span>
		<span class="inline-block text-right pr-3 w-3/4">
			Zhoda: {{ percentage }} %
		</span>
	</div>
</template>

<script>
export default {
	props: {
		percentage: Number,
		name: String,
	},
};
</script>
