<template>
	<div>
		<div v-if="!!matches.length">
			<div
				class="flex justify-between py-1 text-gray-500 text-sm uppercase border-b-2 border-gray-400"
			>
				<span class="w-2/3 ml-4 md:ml-5 md:text-lg"> Súbor </span>

				<span class="w-1/3 text-center mr-2 md:mr-0 md:text-lg"> Zhoda so súborom </span>
			</div>
			<div
				v-for="match in matches"
				:key="match.name"
				class="flex justify-between py-3 md:py-5 text-base md:text-lg text-black bg-white border-b-2 border-gray-400"
				data-test-id="documentMatchesItem"
			>
				<span class="pl-4 md:pl-5 w-2/3 pr-2 truncate" data-test-id="documentMatchesItemName">
					{{ match.name }}
				</span>
				<span
					class="w-1/3 text-center mr-2 md:mr-0 truncate"
					data-test-id="documentMatchesItemPercentage"
				>
					{{ match.percentage }} %
				</span>
			</div>
		</div>
		<p v-else class="text-gray-600 font-normal text-sm md:text-lg py-2 md:py-0 px-4 md:px-0">
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
