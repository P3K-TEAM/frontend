<template>
	<div
		class="flex justify-between mb-3 p-2 text-black bg-white shadow rounded-lg"
	>
		<span class="w-1/2 ml-5"> {{ document.name }}</span>
		<span class="w-1/4 text-center"> {{ document.percentage }}%</span>
		<span class="w-1/4 text-center">
			{{ document.matched_docs.length }}
		</span
		>
	</div>
</template>

<script>
export default {
	props: {
		document: Object,
	},
};
</script>
