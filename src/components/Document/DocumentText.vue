<template>
	<div class="py-6 px-10 rounded-xl bg-white shadow text-justify">
		<div v-if="document && matches && intervals" class="py-1 px-4 md:px-0">
			<span
				v-for="(substring, index) in documentSubstrings"
				:key="index"
				v-tooltip.top="
					substring.matches && getTooltipContent(substring.matches)
				"
				:class="[substring.color ? 'font-bold' : 'font-normal']"
				:style="{ color: substring.color }"
			>
				{{ substring.text }}
			</span>
		</div>
	</div>
</template>

<script>
import { colorForIndex } from '@/utilities/color.utility';
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
			// get flat array of unique documentIds
			const uniqueDocumentIds = this.intervals
				.flatMap(({ matches }) => matches.map(m => m.id))
				.filter((x, i, a) => a.indexOf(x) == i);

			// create a map of unique colors for each documentId with documentIds as keys
			const colors = uniqueDocumentIds.reduce((colors, documentId) => {
				colors[documentId] = colorForIndex(documentId);
				return colors;
			}, {});

			// assign color for each interval
			this.intervals.forEach(interval => {
				const maxPercentageDocId = [...interval.matches].sort((a, b) =>
					a.percentage > b.percentage ? -1 : 1
				)[0].id;
				interval.color = colors[maxPercentageDocId];
			});

			const textSubstrings = this.intervals.reduce(
				(substrings, currentInterval, index) => {
					const previous = substrings[substrings.length - 1];
					previous.to = currentInterval.ranges.from;
					previous.text = this.document.text.substring(
						previous.from,
						previous.to
					);

					currentInterval.text = this.document.text.substring(
						currentInterval.ranges.from,
						currentInterval.ranges.to
					);
					substrings.push(currentInterval);

					const following = { from: currentInterval.ranges.to + 1 };

					if (index === this.intervals.length - 1) {
						following.to = this.document.text.length;
						following.text = this.document.text.substring(
							following.from,
							following.to
						);
					}
					substrings.push(following);

					return substrings;
				},
				[{ from: 0 }]
			);

			return textSubstrings;
		},
		getTooltipContent: function (docs) {
			const tooltipText = [...docs]
				.sort((a, b) => a.percentage - b.percentage)
				.reverse()
				.map(d =>
					this.$i18n.t('documentMatchWithOtherFile', {
						document: d.name,
						percentage: d.percentage
					})
				)
				.join('<br>');

			return tooltipText;
		}
	}
};
</script>
