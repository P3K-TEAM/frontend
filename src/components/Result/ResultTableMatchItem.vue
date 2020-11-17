<template>
	<div class="flex justify-between my-5 text-black bg-white border-b-2 hover-trigger">
		<span class="pl-5 w-2/3">{{ match.name }}</span>
		<span class="w-1/3 text-center">{{ match.matches.length }}</span>
	</div>
</template>

<script>
export default {
	props: {
		match: Object,
	},
};
</script>

<style scoped></style>
