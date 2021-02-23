<template>
	<div class="bg-gray-300 min-h-screen">
		<ResultHeader
			:title="isProcessed ? 'Prebieha kontrola originality' : undefined"
			:description="
				isProcessed
					? 'Gratulujeme. Nižšie nájdete podrobné štatistiky kontroly originality vašich prác.'
					: `Vaše práce sme vzali na spracovanie. Výsledky kontroly originality budú dostupné o chvíľu. Prosím navštívte túto stránku neskôr.`
			"
		/>
		<ResultTable
			v-if="documents && documents.length"
			:documents="documents"
		/>
	</div>
</template>

<script>
import SubmissionStatus from '@/constants/submission';

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
			isProcessed: status === SubmissionStatus.PROCESSED,
			documents: [],
		};
	},
	created: function () {
		this.SubmissionStatus = SubmissionStatus;
	},
	mounted() {
		// initial spinner
		this.$store.dispatch('setLoading', true);
		// get id from route
		this.id = this.$route.params.result;
		return this.retry(
			() => this.fetchResult(this.id),
			(result) => result.status === this.SubmissionStatus.PROCESSED
		).then((result) => {
			this.status = result.status;
			this.documents = result.documents;
			// If no documents are present even though the submission is processed
			if (!this.documents) {
				this.$store.dispatch('AlertStore/setAlert', {
					message: 'No documents found. Please contact administrator',
					type: 'error',
				});
			}
			// if single document, redirect to the detail
			if (this.documents && this.documents.length === 1) {
				return this.$router.push({
					path: `/result/${this.id}/document/${this.documents[0].id}`,
				});
			}
			this.$store.dispatch('setLoading', false);
		});
	},
	methods: {
		// generic function for retrying demand
		retry(fn, conditionFn, waitingInterval = 3500, maxRetries = 10) {
			const tryToGetResult = (retry) => {
				return fn().then((result) => {
					if (conditionFn(result)) {
						return result;
					}
					if (retry <= maxRetries) {
						// sleep the specified time
						return this.sleep(waitingInterval).then(() =>
							tryToGetResult(retry + 1)
						);
					} else {
						throw new Error('Retrying failed!!!');
					}
				});
			};
			// start retrying function
			return tryToGetResult(1);
		},
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		},
		fetchResult(id) {
			return this.$axios
				.get(`api/submissions/${id}`)
				.then((response) => {
					return response.data;
				})
				.catch((e) => {
					this.$store.dispatch('AlertStore/setAlert', {
						message: e.message,
						type: 'error',
					});
				});
		},
	},
};
</script>
