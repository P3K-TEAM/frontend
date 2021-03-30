<template>
	<div class="py-6 px-10 rounded-xl bg-white shadow text-justify">
		<component
			:is="compiledHighlight"
			v-if="document && matches"
			class="py-1 px-4 md:px-0"
		/>
	</div>
</template>

<script>
import Vue from 'vue';
import { colorForIndex } from '@/utilities/color.utility';
import { escape } from 'lodash';
import { mapGetters } from 'vuex';

export default {
	computed: {
		compiledHighlight() {
			return {
				render: h => {
					return h(
						Vue.compile(
							`<p class="text-base md:text-lg">${this.highlightedText()}</p>`
						)
					);
				}
			};
		},
		...mapGetters('DocumentStore', ['document', 'matches'])
	},
	methods: {
		highlightedText: function () {
			const indices = this.matches
				.map(matched_doc =>
					matched_doc.intervals.map(match => ({
						name: matched_doc.name,
						from: match.begin,
						to: match.end,
						percentage: this.$filters.roundToTwoDecimals(
							this.$filters.toNumber(matched_doc.percentage)
						),
						color: colorForIndex(
							this.matches
								.map(d => d.name)
								.indexOf(matched_doc.name)
						)
					}))
				)
				.flat();

			const intervals = this.mergeIntervals(indices);

			const subStringsToReplace = intervals.map(h => ({
				text: this.document.text.substring(h.from, h.to + 1),
				docs: h.matches,
				color: h.color
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
				{ doc: intervals[0].name, per: intervals[0].percentage }
			];
			stack.push(intervals[0]);

			intervals.shift();

			intervals.forEach(item => {
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
				...new Map(docs.map(item => [item['doc'], item])).values()
			];

			const text = docs_unique
				.map(d =>
					this.$i18n.t('documentMatchWithOtherFile', {
						document: d.doc,
						percentage: d.per
					})
				)
				.join('<br>');

			return text;
		}
	}
};
</script>
