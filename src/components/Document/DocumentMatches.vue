<template>
	<div>
		<div v-if="!!matches.length">
			<div
				class="flex justify-between py-1 text-gray-500 text-sm uppercase border-b-2 border-gray-400"
			>
				<span class="w-2/3 ml-4 md:ml-5 md:text-lg">
					{{ $t('file') }}
				</span>

				<span class="w-1/3 text-center mr-2 md:mr-0 md:text-lg">
					{{ $t('fileMatch') }}
				</span>
			</div>
			<a
				v-for="(match, index) in matches"
				:key="index"
				@click="
					$router.push({
						name: `compare`,
						params: {
							result: $route.params.result,
							document: $route.params.document,
							compare: match.elastic_id
						}
					})
				"
				class="flex justify-between py-3 md:py-5 text-base md:text-lg text-black bg-white border-b-2 border-gray-400 cursor-pointer hover:bg-gray-200 group"
				data-test-id="documentMatchesItem"
			>
				<span
					class="pl-4 md:pl-5 w-7/12 md:w-6/12 pr-2 truncate"
					data-test-id="documentMatchesItemName"
				>
					{{ match.name }}
				</span>
				<span
					class="w-4/12 md:w-3/12 text-right mr-2 md:mr-0 truncate"
					data-test-id="documentMatchesItemPercentage"
				>
					{{ match.percentage | toNumber | roundToTwoDecimals }} %
				</span>

				<div class="hidden md:flex justify-end md:w-1/12 mr-4">
					<i
						class="fa fa-eye invisible group-hover:visible text-2xl text-gray-400"
					/>
				</div>
			</a>
		</div>
		<p
			v-else
			class="text-gray-600 font-normal text-sm md:text-lg py-2 md:py-0 px-4 md:px-0"
		>
			{{ $t('documentZeroMatchesCongratulationsMessage') }}
		</p>
	</div>
</template>

<script>
export default {
	props: {
		matches: {
			type: Array,
			required: true
		}
	}
};
</script>

<style scoped></style>
