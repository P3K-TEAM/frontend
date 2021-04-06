<template>
	<div class="bg-gray-300">
		<ResultHeader
			:percentage="document ? document.percentage : undefined"
			:title="
				document && document.name
					? document.name
					: $t('resultHeaderHeading')
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
import ResultHeader from '../components/Result/ResultHeader';
import Toggle from '@/components/Global/Toggle/Toggle';
import { prevRoute } from '../router/index.js';

export default {
	components: {
		ResultHeader,
		Toggle
	},
	computed: {
		getGoBackURL: function () {
			if (prevRoute === undefined) {
				return { name: 'result', params: { result: this.resultId } };
			}
			return { path: prevRoute.fullPath };
		},
		id: function () {
			return this.$route.params.document;
		},
		resultId: function () {
			return this.$route.params.result;
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
			return `/result/${this.resultId}/document/${this.id}`;
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
