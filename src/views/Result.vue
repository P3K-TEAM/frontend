<template>
	<div class="bg-gray-300 min-h-screen">
		<ResultHeader
			description="Gratulujeme. Nižšie nájdete podrobné štatistiky kontroly originality vašich prác."
		/>
		<ResultTable
			v-if="documents && documents.length"
			:documents="documents"
		/>
	</div>
</template>

<script>
import ResultTable from '../components/Result/ResultTable';
import ResultHeader from '../components/Result/ResultHeader';

export default {
	components: {
		ResultTable,
		ResultHeader,
	},
	data: function () {
		return {
			id: undefined,
			documents: [],
		};
	},
	mounted: function () {
		// initial spinner
		this.$store.dispatch('setLoading', true);
		// get id from route
		this.id = this.$route.params.result;
		// fetch data from BE
		this.fetchResult(this.id).then((result) => {
			this.documents = result.documents;
			if (this.documents && this.documents.length === 1) {
				return this.$router.push({
					path: `/result/${this.id}/document/${this.documents[0].id}`,
				});
			}
			this.$store.dispatch('setLoading', false);
		});
	},
	methods: {
		fetchResult(id) {
			// TODO: fetch prop BE
			console.log(id);
			return new Promise((resolve) =>
				setTimeout(
					() =>
						resolve({
							documents: [
								{
									id: 1,
									name: 'Document2.pdf',
									percentage: 0.15,
									matches: 5,
								},
								{
									id: 2,
									name: 'Document2.pdf',
									percentage: 0.15,
									matches: 5,
								},
							],
						}),
					1000
				)
			);
		},
	},
};
</script>

<style scoped>
.skewed-top-wrapper {
	clip-path: ellipse(95% 100% at 50% 0%);
}
</style>
