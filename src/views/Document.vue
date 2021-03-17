<template>
	<div class="bg-gray-300">
		<ResultHeader
			:percentage="document ? document.result.percentage : undefined"
			:title="
				document && document.name ? document.name : 'Výsledky kontroly'
			"
			description="Nižšie nájdete podrobné štatistiky kontroly originality vašej práce"
		/>
		<div
			v-if="document"
			class="flex-grow mx-4 md:container md:mx-auto mt-4 md:my-20"
		>
			<a
				class="flex items-center p-2 mb-0 md:mb-2 cursor-pointer text-lg md:text-2xl text-gray-600 hover:text-gray-700"
				@click="
					$router.push({
						name: 'result',
						params: { result: submissionId },
					})
				"
			>
				<i class="fas fa-chevron-left text-sm md:text-lg mr-2" />
				Späť
			</a>
			<div class="shadow rounded-md md:rounded-lg">
				<div
					class="flex items-center justify-between px-4 py-1 md:p-4 md:h-16 bg-primary-500 text-white text-2xl rounded-t-md md:rounded-t-lg"
				>
					<span class="w-1/2 text-base md:text-3xl truncate pr-2">
						{{ document.name }}
					</span>
					<button
						v-if="showDocumentText"
						type="button"
						class="flex items-center ml-auto py-1 md:py-1 px-1 md:px-2 hover:text-white hover:bg-primary-400 focus:outline-none rounded-md"
						@click="showFiles = !showFiles"
					>
						<span class="font-semibold text-base md:text-2xl">
							Súbory / Texty
						</span>
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
import { colorForIndex } from '@/utilities/color.utility';


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
		};
	},
	computed: {
		compiledHighlight() {
			return {
				render: (h) => {
					return h(
						Vue.compile(
							`<p class="text-base md:text-lg">${this.highlightedText()}</p>`
						)
					);
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
			.then(response => {
				this.submissionId = response.submission_id;
				this.document = response.document;
			})
			.catch(e => {
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
				.then(response => response.data);
		},
		mergeIntervals: function (intervals) {
			if (intervals.length <= 1) {
				return intervals;
			}

			let stack = [];
			let top = null;

			intervals = intervals.sort(function (a, b) {
				if (a.from === b.from) {
					if (a.to > b.to || a.to === b.to) {
						return 1;
					} else {
						return -1;
					}
				} else {
					if (a.from < b.from) {
						return -1;
					} else if (a.from > b.from) {
						return 1;
					}
					return 0;
				}
			});

			intervals[0].matches = [
				{ doc: intervals[0].name, per: intervals[0].percentage },
			];
			stack.push(intervals[0]);

			intervals.shift();

			intervals.forEach((item) => {
				top = stack[stack.length - 1];

				if (top.to < item.from) {
					item.matches = [{ doc: item.name, per: item.percentage }];
					stack.push(item);
				} else if (top.to <= item.to) {
					top.to = item.to;
					top.matches.push({ doc: item.name, per: item.percentage });
					stack.pop();
					stack.push(top);
				} else if (top.to > item.to) {
					top.matches.push({ doc: item.name, per: item.percentage });
					stack.pop();
					stack.push(top);
				}
			});

			return stack;
		},
		toggleTooltip: function (docs) {
			const docs_unique = [
				...new Map(docs.map((item) => [item['doc'], item])).values(),
			];

			const text = docs_unique
				.map((d) => `Zhoda so súborom: ${d.doc} (${d.per}%)`)
				.join('<br>');

			return text;
		},
		highlightedText: function () {
			const indices = this.document.result.matched_docs
				.map((matched_doc) =>
					matched_doc.intervals.map((match) => ({
						name: matched_doc.name,
						from: match.begin,
						to: match.end,
						percentage: this.$filters.roundToTwoDecimals(
							this.$filters.toNumber(matched_doc.percentage)
						),
						color: colorForIndex(
							this.document.result.matched_docs
								.map((d) => d.name)
								.indexOf(matched_doc.name)
						),
					}))
				)
				.flat();

			const intervals = this.mergeIntervals(indices)

			const subStringsToReplace = intervals.map((h) => ({
				text: this.document.text.substring(h.from, h.to + 1),
				docs: h.matches,
				color: h.color,
			}));

			return subStringsToReplace.reduce(
				(string, substring) =>
					string.replace(
						new RegExp(substring.text, 'g'),
						`<span v-tooltip.top="'${this.toggleTooltip(
							substring.docs
						)}'" class="font-bold" style="color:${
							substring.color
						};">${substring.text}</span>`
					),
				escape(this.document.text)
			);
		},
	},
};
</script>
