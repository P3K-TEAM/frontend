<template>
	<div class="py-6 px-10 rounded-xl bg-white shadow text-justify">
		<div v-if="document && matches && intervals" class="py-1 px-4 md:px-0">
			<span
				v-for="(substring, index) in documentSubstrings"
				:key="index"
				v-tooltip.top="substring.matches && toggleTooltip(substring.matches)"
				:class="[substring.color ? 'font-bold' : 'font-normal']"
				:style="{ color: substring.color }"
			>
				{{ substring.text }}
			</span>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import { colorForIndex } from '@/utilities/color.utility';
import { escape } from 'lodash';
import { mapGetters } from 'vuex';

export default {
	computed: {
		documentSubstrings() {
			return this.createDocumentSubstrings();
		},
		...mapGetters('DocumentStore', ['document', 'matches', 'intervals'])
	},
	methods: {
		createDocumentSubstrings: function () {
			
			const documentIds = this.intervals.flatMap(({ matches }) =>
				matches.map(m => m.id)
			);

			const uniqueDocumentIds = documentIds.filter(
				(x, i, a) => a.indexOf(x) == i
			);

			const colors = uniqueDocumentIds.reduce((colors, documentId) => {
				colors[documentId] = colorForIndex(documentId);
				return colors;
			}, {});

			this.intervals.forEach(interval => {
				const matches = interval.matches.slice();
				const maxPercentageDocId = matches.sort((a, b) =>
					a.percentage > b.percentage ? -1 : 1
				)[0].id;
				interval.color = colors[maxPercentageDocId];
			});

			let start = 0;
			let textSubstrings = [];

			this.intervals.forEach(interval => {
				const documentText = this.document.text.substring(
					start,
					interval.ranges.from
				);
				const textMatch = this.document.text.substring(
					interval.ranges.from,
					interval.ranges.to + 1
				);
				start = interval.ranges.to + 1;
				textSubstrings.push({
					text: documentText
				}),
				textSubstrings.push({
					text: textMatch,
					matches: interval.matches,
					color: interval.color
				});
			});

			textSubstrings.push({
				text: this.document.text.substring(
					start,
					this.document.text.length
				)
			});

			return textSubstrings;
		},
		toggleTooltip: function (docs) {
			const text = docs
				.map(d =>
					this.$i18n.t('documentMatchWithOtherFile', {
						document: d.name,
						percentage: d.percentage
					})
				)
				.join('<br>');

			return text;
		}
	}
};
</script>
