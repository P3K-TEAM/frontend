<template>
	<div class="md:container mx-3 md:mx-auto my-3 md:my-10">
		<div>
			<div
				class="flex justify-start mb-1 md:mb-2 md:mx-0 px-1 text-sm md:text-lg text-gray-500 text-md uppercase"
			>
				<span class="w-5/12 md:w-6/12 pl-1 md:pl-4"> Súbor </span>
				<span class="w-4/12 md:w-3/12 text-center"> Percentuálna zhoda </span>

				<span class="w-3/12 md:w-2/12 text-center"> Počet zhôd </span>
				<span class="md:w-1/12 md:mr-4" />
			</div>
			<ResultTableItem
				v-for="doc in documents"
				:key="doc.id"
				:document="doc"
			/>
		</div>
		<div
			class="flex justify-between mt-2 pb-2 ml-1 md:ml-10 text-gray-500 text-sm md:text-md"
		>
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
