<template>
	<div class="bg-gray-300">
		<ResultHeader v-if="documents" :title="$t('documentCompareHeading')">
			<p slot="description" class="hidden md:flex text-xl md:invisible">
				{{ documents.textA.name }}
				<span class="font-medium px-2"> a </span>
				{{ documents.textB.name }}
			</p>
		</ResultHeader>
		<div v-if="documents" class="px-5 pt-5 md:px-10 md:pt-0">
			<a
				class="flex items-center p-2 mb-0 md:mb-2 cursor-pointer text-lg md:text-2xl text-gray-600 hover:text-gray-700"
				@click="this.$router.back()"
			>
				<fa-icon
					:icon="['fas', 'chevron-left']"
					class="text-sm md:text-lg mr-2"
				/>
				Späť
			</a>
		</div>
		<div v-if="documents" class="md:flex py-4 md:py-4">
			<div
				class="md:flex1 rounded-md md:rounded-lg mx-4 md:mt-0 md:mr-2 md:ml-4 md:w-1/2 lg:ml-12"
			>
				<div
					class="flex items-center justify-between px-2 py-1 md:p-2 md:h-12 bg-primary-500 text-white text-lg rounded-t-md md:rounded-t-lg"
				>
					<p class="mx-auto">
						{{ documents.textA.name }}
					</p>
				</div>
				<div
					v-html="highlightedTexts.A"
					class="px-4 py-1 pt-1 md:pt-2 md:p-4 bg-white text-justify rounded-b-md md:rounded-b-lg shadow-md"
				/>
			</div>
			<div
				class="md:flex1 rounded-md md:rounded-md mt-4 mx-4 md:mt-0 d:mr-4 md:ml-2 md:w-1/2 lg:mr-12"
			>
				<div
					class="flex items-center justify--between px-2 py-1 md:p-2 md:h-12 bg-primary-500 text-white text-lg rounded-t-md md:rounded-t-lg"
				>
					<p class="mx-auto">
						{{ documents.textB.name }}
					</p>
				</div>
				<div
					v-html="highlightedTexts.B"
					class="px-4 py-1 pt-1 md:pt-2 md:p-4 bg-white text-justify rounded-b-md md:rounded-b-lg shadow-md"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import ResultHeader from '../components/Result/ResultHeader';
import { escape, cloneDeep } from 'lodash';
import retry from '@/functions/retry.function';
import { colorForIndex } from '@/utilities/color.utility';

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
	mounted: function () {
		// initial spinner
		this.$store.dispatch('setLoading', true);

		this.resultId = this.$route.params.result;
		this.documentBId = this.$route.params.compare;
		this.documentAId = this.$route.params.document;

		retry(
			() => this.fetchDocument(this.documentAId, this.documentBId),
			result => result.textA && result.textB && result.matches
		)
			.then(result => {
				this.documents = result;

				if (!this.documents.textA || !this.documents.textB)
					throw new Error(
						this.$t('documentCompareNoDocumentsProvidedError')
					);

				if (this.documents && this.documents.matches.length === 0)
					throw new Error(this.$t('documentCompareZeroMatchesError'));

				this.highlightedTexts = this.highlightText(this.documents);
			})
			.catch(e => {
				this.$store.dispatch('AlertStore/setAlert', {
					message: e.message,
					type: 'error',
					duration: 10000
				});
			})
			.finally(() => {
				this.$store.dispatch('setLoading', false);
			});
	},
	methods: {
		fetchDocument(documentId, id) {
			// Connect to BE
			return this.$axios
				.get(`/api/documents/${documentId}/diff/${id}`)
				.then(response => response.data);
		},
		highlightText: function (documents) {
			const indices = documents.matches
				.map((matches, index) => ({
					fromA: matches.fromA,
					toA: matches.toA,
					fromB: matches.fromB,
					toB: matches.toB,
					color: colorForIndex(index)
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

				color: interval.color
			}));

			const subStringToReplaceB = indicesB.map(interval => ({
				text: documents.textB.content.substring(
					interval.fromB,
					interval.toB + 1
				),
				color: interval.color
			}));

			return {
				A: this.merge_text(
					subStringToReplaceA,
					documents.textA.content
				),
				B: this.merge_text(subStringToReplaceB, documents.textB.content)
			};
		},
		merge_text(subStringIntervals, text) {
			return subStringIntervals.reduce(
				(string, substring) =>
					string.replace(
						new RegExp(substring.text, 'g'),
						`<span  style="color:${substring.color};" class="font-bold">${substring.text}</span>`
					),
				escape(text)
			);
		}
	}
};
</script>
