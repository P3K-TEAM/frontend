<template>
	<div class="bg-gray-300 min-h-screen">
		<ResultHeader
			description="Gratulujeme. Nižšie nájdete podrobné štatistiky kontroly originality vašich prác."
		/>
		<div
			v-if="!isLoading"
			class="flex flex-col flex-grow md:container mx-4 md:mx-auto my-3 md:my-10"
		>
			<div class="flex justify-end">
				<Toggle :buttons="buttons" class="mb-3"></Toggle>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import retry from '@/functions/retry.function';
import SubmissionStatus from '@/constants/submission';
import ResultHeader from '../components/Result/ResultHeader';
import Toggle from '@/components/Global/Toggle/Toggle';

export default {
	components: {
		ResultHeader,
		Toggle,
	},
	data: function () {
		return {
			id: undefined,
		};
	},
	computed: {
		buttons: function () {
			return [
				{
					tooltip: 'Zoznam',
					url: this.getCurrentResultURL,
					class: 'fas fa-bars',
				},
				{
					tooltip: 'Grafové zobrazenie',
					url: `${this.getCurrentResultURL}/graph`,
					class: 'fas fa-project-diagram',
				},
			];
		},
		getCurrentResultURL: function () {
			return `/result/${this.id}`;
		},
		...mapGetters(['isLoading', 'loadingMessage']),
		...mapGetters('ResultStore', ['status']),
	},
	mounted: function () {
		// initial loader
		this.$store.dispatch('setLoading', {
			active: true,
		});

		// retry fetching until the result is
		this.id = this.$route.params.result;

		// fetch data from BE
		return retry(
			() => this.$store.dispatch('ResultStore/fetchResult', this.id),
			() => {
				// if submission is not processed, add message to the loading spinner
				const isProcessed = this.status === SubmissionStatus.PROCESSED;

				if (!isProcessed && !this.loadingMessage) {
					this.$store.commit(
						'SET_LOADING_MESSAGE',
						'Vaše texty sme zobrali na spracovanie. Výsledky budú automaticky zobrazené na tejto stránke'
					);
				}

				// retry until processed
				return isProcessed;
			},
			5000,
			100
		).finally(() => {
			this.$store.dispatch('setLoading', false);
		});
	},
};
</script>
