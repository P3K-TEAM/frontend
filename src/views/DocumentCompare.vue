<template>
	<div class="bg-gray-300">
		<ResultHeader v-if="documents" :title="$t('documentCompareHeading')">
			<p slot="description" class="hidden md:flex text-xl md:invisible">
				{{ documents.textA.name }}
				<span class="font-medium px-2"> a </span>
				{{ documents.textB.name }}
			</p>
		</ResultHeader>

		<div
			v-if="documents && highlightedTexts"
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
							{{ documents.textA.name }}
						</p>
					</div>
					<div
						class="p-6 text-justify border-r border-gray-100"
						v-html="highlightedTexts.A"
					/>
				</div>

				<div class="w-1/2">
					<div
						class="flex items-center justify-between py-3 bg-primary-500 text-white text-xl"
					>
						<p class="mx-auto">
							{{ documents.textB.name }}
						</p>
					</div>
					<div
						class="p-6 text-justify border-l border-gray-100"
						v-html="highlightedTexts.B"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ResultHeader from '../components/Result/ResultHeader';
import { escape, cloneDeep } from 'lodash';
import { colorForIndex } from '@/utilities/color.utility';
import { prevRoute } from '../router/index.js';

export default {
	components: {
		ResultHeader
	},
	data: function () {
		return {
			documentBId: undefined,
			documentAId: undefined,
			resultId: undefined,
			highlightedTexts: undefined,
			documents: undefined
		};
	},
	computed: {
		getGoBackURL: function () {
			if (prevRoute === undefined) {
				return {
					name: 'matches',
					params: {
						result: this.resultId,
						document: this.documentAId
					}
				};
			}
			return { path: prevRoute.fullPath };
		}
	},
	mounted: function () {
		// initial spinner
		this.$store.dispatch('setLoading', true);

		this.resultId = this.$route.params.result;
		this.documentAId = this.$route.params.document;
		this.documentBId = this.$route.params.compare;

		this.fetchComparison(this.documentAId, this.documentBId).then(
			result => {
				this.documents = result;

				if (!this.documents.textA || !this.documents.textB)
					throw new Error(
						this.$t('documentCompareNoDocumentsProvidedError')
					);

				if (this.documents && this.documents.matches.length === 0)
					throw new Error(this.$t('documentCompareZeroMatchesError'));

				this.highlightedTexts = this.highlightText(this.documents);
			}
		);
	},
	methods: {
		// Connect to BE
		fetchComparison(id, corpusId) {
			return this.$axios
				.get(`/api/documents/${id}/diff/${corpusId}`)
				.then(response => response.data)
				.catch(e => {
					this.$store.dispatch('AlertStore/setAlert', {
						message:
							e.response.data && e.response.data.error
								? e.response.data.error
								: e.message,
						type: 'error',
						duration: 0
					});
				})
				.finally(() => {
					this.$store.dispatch('setLoading', false);
				});
		},
		highlightText: function (documents) {
			const indices = documents.matches
				.map((matches, index) => ({
					fromA: matches.fromA,
					toA: matches.toA,
					fromB: matches.fromB,
					toB: matches.toB,
					color: colorForIndex(index),
					index
				}))
				.flat();

			const indicesA = cloneDeep(indices);
			const indicesB = cloneDeep(indices);

			indicesA.sort((a, b) => b.toA - b.fromA - (a.toA - a.fromA));
			indicesB.sort((a, b) => b.toB - b.fromB - (a.toB - a.fromB));

			const subStringToReplaceA = indicesA.map(interval => ({
				text: documents.textA.content.substring(
					interval.fromA,
					interval.toA + 1
				),
				color: interval.color,
				index: interval.index
			}));

			const subStringToReplaceB = indicesB.map(interval => ({
				text: documents.textB.content.substring(
					interval.fromB,
					interval.toB + 1
				),
				color: interval.color,
				index: interval.index
			}));

			return {
				A: this.merge_text(
					subStringToReplaceA,
					documents.textA.content,
					'A',
					'B'
				),
				B: this.merge_text(
					subStringToReplaceB,
					documents.textB.content,
					'B',
					'A'
				)
			};
		},
		merge_text(subStringIntervals, text, from, to) {
			return subStringIntervals.reduce(
				(string, substring) =>
					string.replace(
						new RegExp(substring.text, 'g'),
						`<span
							onclick="document.getElementById('${to}${substring.index}').scrollIntoView({behavior: 'smooth'})"
							id="${from}${substring.index}"
							style="color:${substring.color};cursor: pointer;"
							class="font-bold">${substring.text}
						</span>`
					),
				escape(text)
			);
		}
	}
};
</script>
