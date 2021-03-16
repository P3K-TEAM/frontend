<template>
	<div class="pt-4 pb-3 rounded-xl bg-white shadow">
		<div
			class="flex justify-start mb-4 md:mx-0 px-1 text-sm font-bold text-gray-400 uppercase"
		>
			<span class="w-5/12 md:w-6/12 pl-4"> Súbor </span>
			<span class="w-4/12 md:w-3/12 text-center">
				Percentuálna zhoda
			</span>

			<span class="w-3/12 md:w-2/12 text-center"> Počet zhôd </span>
			<span class="md:w-1/12 md:mr-4" />
		</div>

		<div v-if="documents.length">
			<!-- items -->
			<ResultTableItem
				v-for="(doc, index) in documents"
				:key="index"
				:document="doc"
			/>
			<div
				class="flex justify-between pt-3 pl-4 text-gray-400 text-sm md:text-md border-t border-gray-200"
			>
				<span>
					<span class="font-bold">
						{{ documents.length }} výsledkov
					</span>
					z {{ documents.length }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ResultTableItem from '../ResultTableItem';

export default {
	components: {
		ResultTableItem,
	},
	computed: {
		...mapGetters('ResultStore', ['documents']),
	},
};
</script>
