<template>
	<div class="py-6 px-10 rounded-xl bg-white shadow text-justify break-words">
		<div v-if="document && matches && ranges" class="py-1 px-4 md:px-0">
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
import { mapGetters } from 'vuex';
import {
	documentColorMap,
	getSubstringsFromDocumentRanges
} from '@/functions/get-substrings-from-document-ranges.function';

export default {
	computed: {
		documentSubstrings: function () {
			// get flat array of document id's
			const documentIds = this.ranges.flatMap(({ matches }) =>
				matches.map(m => m.id)
			);

			// assign color for each interval
			const colors = documentColorMap(documentIds);

			this.ranges.forEach(range => {
				const maxPercentageDocumentId = [
					...range.matches
				].sort((a, b) => (a.percentage > b.percentage ? -1 : 1))[0].id;
				range.color = colors[maxPercentageDocumentId];
			});

			return getSubstringsFromDocumentRanges(
				this.document.text,
				this.ranges
			);
		},
		...mapGetters('DocumentStore', ['document', 'matches', 'ranges'])
	},
	methods: {
		getTooltipContent: function (docs) {
			return [...docs]
				.sort((a, b) => a.percentage - b.percentage)
				.reverse()
				.map(doc =>
					this.$i18n.t('documentMatchWithOtherFile', {
						document: doc.name,
						percentage: `${doc.percentage}%`
					})
				)
				.join('<br>');
		}
	}
};
</script>
