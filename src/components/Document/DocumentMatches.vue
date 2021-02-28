<template>
	<div>
		<div v-if="!!matches.length">
			<div
				class="flex justify-between py-1 text-gray-500 uppercase border-b-2 border-gray-400"
			>
				<span class="w-2/3 ml-3 md:ml-5 text-xs md:text-lg"> Súbor </span>

				<span class="w-1/3 text-center mr-1 md:mr-0 text-xs md:text-lg"> Zhoda so súborom </span>
			</div>
			<div
				v-for="match in matches"
				:key="match.name"
				class="flex justify-between py-1 md:py-5 text-sm text-black bg-white border-b-2 border-gray-400"
				data-test-id="documentMatchesItem"
			>
				<span class="pl-3 md:pl-5 w-2/3 truncate" data-test-id="documentMatchesItemName">
					{{ match.name }}
				</span>
				<span
					class="w-1/3 text-center mr-1 md:mr-0"
					data-test-id="documentMatchesItemPercentage"
				>
					{{ match.percentage }} %
				</span>
			</div>
		</div>
		<p v-else class="text-gray-600 font-medium md:font-normal text-base md:text-lg px-3 md:px-0">
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
