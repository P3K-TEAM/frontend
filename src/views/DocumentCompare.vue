<template>
	<div class="bg-gray-300">
		<SubmissionHeader v-if="diff" :title="$t('documentCompareHeading')">
			<p slot="description" class="hidden md:flex text-xl md:invisible">
				{{ diff.textA.name }}
				<span class="font-medium px-2"> a </span>
				{{ diff.textB.name }}
			</p>
		</SubmissionHeader>

		<div
			v-if="diff"
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
			</div>

			<div class="flex flex-row bg-white rounded-b-xl">
				<div class="w-1/2">
					<div
						class="flex items-center justify-between py-3 bg-primary-500 text-white text-xl"
					>
						<p class="mx-auto">
							{{ diff.textA.name }}
						</p>
					</div>

					<div class="p-6 text-justify border-r border-gray-100">
						<span
							v-for="(substring, index) in substrings.A"
							:id="`A${index}`"
							:key="index"
							:class="[
								substring.color ? 'font-bold' : 'font-normal'
							]"
							:style="{ color: substring.color }"
							@click="scrollToRef(`B${index}`)"
						>
							{{ substring.text }}
						</span>
					</div>
				</div>

				<div class="w-1/2">
					<div
						class="flex items-center justify-between py-3 bg-primary-500 text-white text-xl"
					>
						<p class="mx-auto">
							{{ diff.textB.name }}
						</p>
					</div>
					<div class="p-6 text-justify border-l border-gray-100">
						<span
							v-for="(substring, index) in substrings.B"
							:id="`B${index}`"
							:key="index"
							:class="[
								substring.color ? 'font-bold' : 'font-normal'
							]"
							:style="{ color: substring.color }"
							@click="scrollToRef(`A${index}`)"
						>
							{{ substring.text }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SubmissionHeader from '../components/Submission/SubmissionHeader';
import { colorForIndex } from '@/utilities/color.utility';
import { prevRoute } from '@/router/index.js';
import { mapGetters } from 'vuex';
import { getSubstringsFromDocumentRanges } from '@/functions/get-substrings-from-document-ranges.function';

export default {
	components: {
		SubmissionHeader
	},
	computed: {
		substrings: function () {
			if (this.diff) {
				return {
					A: getSubstringsFromDocumentRanges(
						this.diff.textA.content,
						this.diff.ranges.map((range, index) => ({
							from: range.fromA,
							to: range.toA,
							color: colorForIndex(index)
						}))
					),
					B: getSubstringsFromDocumentRanges(
						this.diff.textB.content,
						this.diff.ranges.map((range, index) => ({
							from: range.fromB,
							to: range.toB,
							color: colorForIndex(index)
						}))
					)
				};
			}
			return undefined;
		},
		getGoBackURL: function () {
			if (prevRoute === undefined) {
				return {
					name: 'matches',
					params: {
						submission: this.$route.params.submission,
						document: this.$route.params.document
					}
				};
			}
			return { path: prevRoute.fullPath };
		},
		...mapGetters('DocumentStore', ['diff'])
	},
	mounted: function () {
		// initial spinner
		this.$store.dispatch('setLoading', true);

		this.$store
			.dispatch('DocumentStore/fetchDiff', {
				id: this.$route.params.document,
				corpusId: this.$route.params.compare
			})
			.finally(() => {
				this.$store.dispatch('setLoading', false);
			});
	},
	methods: {
		scrollToRef(ref) {
			document.getElementById(ref).scrollIntoView({ behavior: 'smooth' });
		}
	}
};
</script>
