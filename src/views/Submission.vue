<template>
	<div class="bg-gray-300 min-h-screen">
		<SubmissionHeader
			:title="$t('submissionHeaderHeading')"
			:description="$t('submissionHeaderDescription')"
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
import SubmissionHeader from '../components/Submission/SubmissionHeader';
import Toggle from '@/components/Global/Toggle/Toggle';

export default {
	components: {
		SubmissionHeader,
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
					url: this.getCurrentSubmissionURL,
					icon: ['fas', 'bars']
				},
				{
					tooltip: this.$i18n.t('graphViewIconTooltip'),
					url: `${this.getCurrentSubmissionURL}/graph`,
					icon: ['fas', 'project-diagram']
				}
			];
		},
		getCurrentSubmissionURL: function () {
			return `/submission/${this.id}`;
		},
		...mapGetters(['isLoading', 'loadingMessage']),
		...mapGetters('SubmissionStore', ['status'])
	},
	mounted: function () {
		// initial loader
		this.$store.dispatch('setLoading', true);

		// get id from route
		this.id = this.$route.params.submission;

		// retry fetching until the submission is processed
		return retry(
			() => this.$store.dispatch('SubmissionStore/fetchSubmission', this.id),
			() => {
				// if submission is not processed, add message to the loading spinner
				const isProcessed = this.status === SubmissionStatus.PROCESSED;

				if (!isProcessed && !this.loadingMessage) {
					this.$store.commit(
						'SET_LOADING_MESSAGE',
						this.$i18n.t('submissionPageLoadingMessage')
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
