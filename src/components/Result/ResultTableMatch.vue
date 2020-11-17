<template>
	<div>
		<div
			class="flex justify-between py-1 text-gray-700 text-sm font-bold border-b-2"
		>
			<span class="w-2/3 ml-5"> Nazov </span>

			<span class="w-1/3 text-center"> Počet zhôd </span>
		</div>
		<ResultTableMatchItem
			v-for="match in matched_docs"
			:key="match.name"
			:match="match"
		/>
	</div>
</template>

<script>
import ResultTableMatchItem from './ResultTableMatchItem';

export default {
	components: {
		ResultTableMatchItem,
	},
	props: {
		matched_docs: Object,
	},

};
</script>

<style scoped></style>
