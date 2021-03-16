<template>
	<div class="bg-gray-300">
		<ResultHeader
			:percentage="document ? document.result.percentage : undefined"
			:title="
				document && isMultiple ? document.name : 'Výsledky kontroly'
			"
			description="Nižšie nájdete podrobné štatistiky kontroly originality vašej práce"
		/>
		<div v-if="document" class="flex-grow mx-4 md:container md:mx-auto mt-4 md:my-20">
			<a
				v-if="isMultiple"
				class="flex items-center p-2 mb-0 md:mb-2 cursor-pointer text-lg md:text-2xl text-gray-600 hover:text-gray-700"
				@click="
					$router.push({
						name: 'result',
						params: { result: submissionId },
					})
				"
			>
				<i class="fas fa-chevron-left text-sm md:text-lg mr-2" />
				Všetky súbory
			</a>
			<div class="shadow rounded-md md:rounded-lg">
				<div
					class="flex items-center justify-between px-4 py-1 md:p-4 md:h-16 bg-primary-500 text-white text-2xl rounded-t-md md:rounded-t-lg"
				>
					<span
						v-if="isMultiple"
						class="w-1/2 text-base md:text-3xl truncate pr-2"
					>
						{{ document.name }}
					</span>
					<button
						v-if="showDocumentText"
						type="button"
						class="flex items-center ml-auto py-1 md:py-1 px-1 md:px-2 hover:text-white hover:bg-primary-400 focus:outline-none rounded-md"
						@click="showFiles = !showFiles"
					>
						<span class="font-semibold text-base md:text-2xl"> Súbory / Texty </span>
					</button>
				</div>
				<div
					class="px-0 py-1 md:p-8 bg-white text-justify rounded-b-md md:rounded-b-lg shadow-md"
				>
					<component
						:is="compiledHighlight"
						v-if="!showFiles"
						class="py-1 px-4 md:px-0"
					/>
					<DocumentMatches
						v-else
						:matches="document.result.matched_docs"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import { escape } from 'lodash';
import DocumentMatches from '../components/Document/DocumentMatches';
import ResultHeader from '../components/Result/ResultHeader';

export default {
	components: {
		DocumentMatches,
		ResultHeader,
	},
	data: function () {
		return {
			showDocumentText: false, // TODO: Remove after it's supported on BE
			showFiles: !this.showDocumentText,
			document: undefined,
			submissionId: undefined,
			isMultiple: true,
		};
	},
	computed: {
		compiledHighlight() {
			return {
				render: (h) => {
					return h(Vue.compile(`<p>${this.highlightedText()}</p>`));
				},
			};
		},
	},
	mounted() {
		// initial spinner
		this.$store.dispatch('setLoading', true);

		// get id from route
		this.id = this.$route.params.document;

		// fetch data from BE
		return this.fetch(this.id)
			.then((response) => {
				this.isMultiple = response.is_multiple;
				this.submissionId = response.submission_id;
				this.document = response.document;
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
		fetch(id) {
			return this.$axios
				.get(`/api/documents/${id}`)
				.then((response) => response.data);
		},
		highlightedText: function () {
			const indices = this.document.matched_docs
				.map((matched_doc) =>
					matched_doc.matches.map((match) => ({
						name: matched_doc.name,
						from: match.char_from,
						to: match.char_to,
					}))
				)
				.flat();

			indices.sort((a, b) => b.to - b.from - (a.to - a.from));

			const subStringsToReplace = indices.map((h) => ({
				text: this.document.text.substring(h.from, h.to + 1),
				doc: h.name,
			}));
			return subStringsToReplace.reduce(
				(string, substring) =>
					string.replace(
						new RegExp(substring.text, 'g'),
						`<span v-tooltip.top="'Zhoda so súborom: ${substring.doc}'" class="text-red-500 font-bold">${substring.text}</span>`
					),
				escape(this.document.text)
			);
		},
	},
};
</script>
