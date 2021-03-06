<template>
	<div class="bg-gray-300">
		<SubmissionHeader
			:percentage="document ? document.percentage : undefined"
			:title="
				document && document.name
					? document.name
					: $t('submissionHeaderHeading')
			"
			:description="$t('documentResultHeaderDescription')"
		/>

		<div
			v-if="document"
			class="flex-grow mx-4 md:container md:mx-auto mt-4 md:my-20"
		>
			<div class="flex items-center justify-between mb-3">
				<router-link
					class="flex items-center p-2 text-xl text-gray-400 hover:text-gray-500 cursor-pointer"
					:to="getGoBackURL"
				>
					<fa-icon
						:icon="['fas', 'chevron-left']"
						class="text-sm md:text-lg mr-2"
					/>
					{{ $t('back') }}
				</router-link>

				<Toggle :buttons="buttons" />
			</div>

			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SubmissionHeader from '../components/Submission/SubmissionHeader';
import Toggle from '@/components/Global/Toggle/Toggle';
import { prevRoute } from '@/router/index.js';

export default {
	components: {
		SubmissionHeader,
		Toggle
	},
	computed: {
		getGoBackURL: function () {
			if (prevRoute === undefined || prevRoute.name === 'compare') {
				return {
					name: 'submission',
					params: { submission: this.document.submissionId }
				};
			}
			return { path: prevRoute.fullPath };
		},
		id: function () {
			return this.$route.params.document;
		},
		buttons: function () {
			return [
				{
					tooltip: this.$i18n.t('documentContentView'),
					url: this.getCurrentDocumentURL,
					icon: ['fas', 'font']
				},
				{
					tooltip: this.$i18n.t('documentFileListView'),
					url: `${this.getCurrentDocumentURL}/files`,
					icon: ['fas', 'th-list']
				}
			];
		},
		getCurrentDocumentURL: function () {
			return this.$router
				.resolve({ name: 'document', document: this.id })
				.href.replace(/\/$/, '');
		},
		...mapGetters('DocumentStore', ['document'])
	},
	mounted() {
		// initial loader
		this.$store.dispatch('setLoading', true);
		// fetch data from BE
		return this.$store
			.dispatch('DocumentStore/fetchDocument', this.id)
			.finally(() => {
				this.$store.dispatch('setLoading', false);
			});
	}
};
</script>
