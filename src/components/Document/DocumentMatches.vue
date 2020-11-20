<template>
	<div>
		<div
			class="flex justify-between py-1 text-gray-500 uppercase border-b-2 border-gray-400"
		>
			<span class="w-2/3 ml-5"> Súbor </span>

			<span class="w-1/3 text-center"> Zhoda so súborom </span>
		</div>
		<div
			v-for="match in matches"
			:key="match.name"
			class="flex justify-between py-5 text-black bg-white border-b-2 border-gray-400"
		>
			<span class="pl-5 w-2/3">
				{{ match.name }}
			</span>
			<span class="w-1/3 text-center"> {{ match.percentage }} % </span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		matches: { type: Array },
	},
};
</script>

<style scoped></style>
