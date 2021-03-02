<template>
	<div>
		<div v-if="!!matches.length">
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
				data-test-id="documentMatchesItem"
			>
				<span class="pl-5 w-2/3" data-test-id="documentMatchesItemName">
					{{ match.name }}
				</span>
				<span
					class="w-1/3 text-center"
					data-test-id="documentMatchesItemPercentage"
				>
					{{ match.percentage }} %
				</span>
			</div>
		</div>
		<p v-else class="text-gray-600">
			Gratulujeme! Vaša práca sa nezhoduje so žiadnymi súbormi!
		</p>
	</div>
</template>

<script>
export default {
	props: {
		matches: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style scoped></style>
