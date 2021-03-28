<template>
	<div class="bg-gray-300 min-h-screen">
		<ResultHeader
			:title="$t('resultHeaderHeading')"
			:description="$t('resultHeaderDescription')"
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
		Toggle
	},
	data: function () {
		return {
			id: undefined
		};
	},
	computed: {
		buttons: function () {
			return [
				{
					tooltip: this.$i18n.t('listViewIconTooltip'),
					url: this.getCurrentResultURL,
					icon: ['fas', 'bars']
				},
				{
					tooltip: this.$i18n.t('graphViewIconTooltip'),
					url: `${this.getCurrentResultURL}/graph`,
					icon: ['fas', 'project-diagram']
				}
			];
		},
		getCurrentResultURL: function () {
			return `/result/${this.id}`;
		},
		...mapGetters(['isLoading', 'loadingMessage']),
		...mapGetters('ResultStore', ['status'])
	},
	mounted: function () {
		// initial loader
		this.$store.dispatch('setLoading', {
			active: true
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
						this.$i18n.t('resultPageLoadingMessage')
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
	}
};
</script>
