<template>
	<div v-if="document" class="bg-gray-300 min-h-screen">
		<ResultHeader
			:percentage="document.percentage"
			:title="isMultiple ? document.name : 'Výsledky kontroly'"
			description="Nižšie nájdete podrobné štatistiky kontroly originality vašej práce"
		/>
		<div class="px-6 md:px-0 container mx-auto mt-20">
			<a
				v-if="isMultiple"
				class="flex items-center p-2 mb-2 cursor-pointer text-2xl text-gray-600 hover:text-gray-700"
				@click="$router.go(-1)"
			>
				<i class="fas fa-chevron-left text-lg mr-2" />
				Všetky súbory
			</a>
			<div class="shadow rounded-b-lg">
				<div
					class="flex items-center justify-between bg-primary-500 p-4 text-white text-2xl rounded-t-lg"
				>
					<span v-if="!isMultiple" class="text-3xl">
						{{ document.name }}
					</span>
					<button
						type="button"
						class="inline-block ml-auto py-1 px-2 hover:text-white hover:bg-primary-400 focus:outline-none rounded-md"
						@click="showFiles = !showFiles"
					>
						<span class="text-bold text-2xl"> Súbory / Texty </span>
					</button>
				</div>
				<div class="p-8 bg-white text-justify rounded-b-lg shadow-md">
					<component :is="compiledHighlight" v-if="!showFiles" />
					<DocumentMatches v-else :matches="document.matched_docs" />
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
			showFiles: false,
			isMultiple: undefined,
			document: undefined,
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
		this.fetchDocument(this.id).then((result) => {
			this.document = result.document;
			this.isMultiple = result.isMultiple;
			this.$store.dispatch('setLoading', false);
		});
	},
	methods: {
		fetchDocument(id) {
			// TODO: fetch prop BE
			console.log(id);
			return new Promise((resolve) =>
				setTimeout(
					() =>
						resolve({
							isMultiple: true,
							document: {
								name: 'Document2.pdf',
								percentage: 0.15,
								text:
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Aenean dapibus consequat ullamcorper. Proin a ' +
									'erat nunc. Aenean at gravida lorem, vel iaculis lorem. Quisque bibendum suscipit velit in ti1ncidunt. Quisque ut ipsum egestas risus pretium' +
									' dignissim. Aliquam sit amet nibh eget felis dignissim ultrices. Cras ac ultricies libero. Sed eu tincidunt leo. Vivamus vestibulum dictum nisl ac' +
									' tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras posuere consectetur nibh, vel molestie lacus finibus ' +
									'et. Nullam lectus mi, aliquam quis enim ac, elementum vehicula metus.',

								matched_docs: [
									{
										name: '1.pdf',
										percentage: 0.45,

										matches: [
											{
												char_from: 200,
												char_to: 280,
											},
										],
									},
									{
										name: '2.pdf',
										percentage: 0.45,
										matches: [
											{
												char_from: 120,
												char_to: 150,
											},
										],
									},
								],
							},
						}),
					1000
				)
			);
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

<style scoped lang="scss">
.skewed-top-wrapper {
	clip-path: ellipse(95% 100% at 50% 0%);
}
</style>
