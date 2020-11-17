<template>
	<div class="px-6 md:px-0 container mx-auto my-10">
		<div>
			<div
				class="flex justify-between py-1 text-gray-600 text-md font-bold"
			>
				<span class="w-1/2 ml-8 pl-6"> Nazov </span>
				<span class="w-1/4 text-center"> Percentuálna zhoda </span>
				<span class="w-1/4 text-center mr-4"> Počet zhôd </span>
			</div>
			<ResultTableDocItem
				v-for="doc in documents"
				:key="doc.id"
				:document="doc"
			/>
		</div>
		<div class="flex justify-between p-2 text-gray-700 text-sm font-bold">
			<span>
				{{ documents.length }} výsledkov z
				{{ documents.length }}
			</span>
		</div>
	</div>
</template>

<script>
import ResultTableDocItem from './ResultTableDocItem';

export default {
	components: {
		ResultTableDocItem,
	},
	props: {
		documents: Object,
	},
};
</script>

<style scoped></style>
