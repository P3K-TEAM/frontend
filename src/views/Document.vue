<template>
	<div class="bg-gray-300">
		<ResultHeader
			:percentage="document ? document.result.percentage : undefined"
			:title="
				document && isMultiple ? document.name : 'Výsledky kontroly'
			"
			description="Nižšie nájdete podrobné štatistiky kontroly originality vašej práce"
		/>
		<div v-if="document" class="px-6 md:px-0 container mx-auto my-20">
			<a
				v-if="isMultiple"
				class="flex items-center p-2 mb-2 cursor-pointer text-2xl text-gray-600 hover:text-gray-700"
				@click="
					$router.push({
						name: 'result',
						params: { result: submissionId },
					})
				"
			>
				<i class="fas fa-chevron-left text-lg mr-2" />
				Všetky súbory
			</a>
			<div class="shadow rounded-b-lg">
				<div
					class="flex items-center justify-between p-4 h-16 bg-primary-500 text-white text-2xl rounded-t-lg"
				>
					<span v-if="isMultiple" class="text-3xl">
						{{ document.name }}
					</span>
					<button
						v-if="showDocumentText"
						type="button"
						class="inline-block ml-auto py-1 px-2 hover:text-white hover:bg-primary-400 focus:outline-none rounded-md"
						@click="showFiles = !showFiles"
					>
						<span class="text-bold text-2xl"> Súbory / Texty </span>
					</button>
				</div>
				<div class="p-8 bg-white text-justify rounded-b-lg shadow-md">
					<component :is="compiledHighlight" v-if="!showFiles" />
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
