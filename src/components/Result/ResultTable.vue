<template>
	<div class="px-6 md:px-0 container mx-auto my-10">
		<div>
			<div
				class="flex justify-start mb-2 text-gray-500 text-md uppercase"
			>
				<span class="w-6/12 pl-12"> Súbor </span>
				<span class="w-3/12 text-center"> Percentuálna zhoda </span>

				<span class="w-2/12 text-center"> Počet zhôd </span>
				<span class="w-1/12"></span>
			</div>
			<ResultTableItem
				v-for="doc in documents"
				:key="doc.id"
				:document="doc"
			/>
		</div>
		<div class="flex justify-between mt-2 ml-8 text-gray-500 text-md">
			<span>
				<span class="font-bold">{{ documents.length }} výsledkov </span>
				z {{ documents.length }}
			</span>
		</div>
	</div>
</template>

<script>
import ResultTableItem from './ResultTableItem';

export default {
	components: {
		ResultTableItem,
	},
	props: {
		documents: { type: Array, required: true },
	},
};
</script>
