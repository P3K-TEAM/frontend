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
import SubmissionStatus from '@/constants/submission';
import retry from '@/functions/retry.function';

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
	created: function () {
		this.SubmissionStatus = SubmissionStatus;
	},
	mounted: function () {
		// initial spinner
		this.$store.dispatch('setLoading', {
			active: true,
			infoStatus: true,
			infoMessage: 'Vaše texty sme zobrali na spracovanie. Výsledky budú automaticky zobrazené na tejto stránke',
		});
		// get id from route
		this.id = this.$route.params.result;

		// fetch data from BE
		return retry(
			() => this.fetchResult(this.id),
			(result) => result.status === this.SubmissionStatus.PROCESSED
		)
			.then((result) => {
				this.status = result.status;
				this.documents = result.documents;

				// If no documents are present even though the submission is processed
				if (!this.documents)
					this.$store.dispatch('AlertStore/setAlert', {
						message:
							'No documents found. Please contact administrator',
						type: 'error',
					});

				// if single document, redirect to the detail
				if (this.documents && this.documents.length === 1) {
					return this.$router.push({
						name: 'document',
						params: {
							result: this.id,
							document: this.documents[0].id,
						},
					});
				}
			})
			.catch((e) => {
				this.$store.dispatch('AlertStore/setAlert', {
					message: e.message,
					type: 'error',
					duration: 10000,
				});
			})
			.finally(() => {
				this.$store.dispatch('setLoading', false);
			});
	},
	methods: {
		fetchResult(id) {
			return this.$axios
				.get(`/api/submissions/${id}`)
				.then((response) => response.data);
		},
	},
};
</script>
