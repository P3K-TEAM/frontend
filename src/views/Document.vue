<template>
	<div class="bg-gray-300">
		<ResultHeader
			:percentage="document ? document.result.percentage : undefined"
			:title="
				document && isMultiple ? document.name : 'Výsledky kontroly'
			"
			description="Nižšie nájdete podrobné štatistiky kontroly originality vašej práce"
		/>
		<div v-if="document" class="mx-4 md:container md:mx-auto mt-4 md:my-20">
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
					return h(Vue.compile(`<p class="text-base md:text-lg">${this.highlightedText()}</p>`));
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
		colorForIndex: function(i, asString = true) {
			const values = this.HSVToRGB((i * 0.618033988749895) % 1.0, 0.5, Math.sqrt(1.0 - ((i * 0.618033988749895) % 0.5)));
			return asString ? `rgb(${values[0]}, ${values[1]}, ${values[2]})` : values;
		},
		clamp: function(val, min, max) {
			return Math.max(min, Math.min(val, max));
		},
		HSVToRGB: function(h, s, v) {
			if (s == 0) {
				return [v, v, v];
			}
			if (v == 0) {
				return [0, 0, 0];
			}
			const col = [0, 0, 0];
			const hval = h * 6;
			const sel = Math.floor(hval);
			const mod = hval - sel;
			const v1 = v * (1 - s);
			const v2 = v * (1 - s * mod);
			const v3 = v * (1 - s * (1 - mod));

			switch (sel + 1) {
				case 0:
					col[0] = v;
					col[1] = v1;
					col[2] = v2;
					break;
				case 1:
					col[0] = v;
					col[1] = v3;
					col[2] = v1;
					break;
				case 2:
					col[0] = v2;
					col[1] = v;
					col[2] = v1;
					break;
				case 3:
					col[0] = v1;
					col[1] = v;
					col[2] = v3;
					break;
				case 4:
					col[0] = v1;
					col[1] = v2;
					col[2] = v;
					break;
				case 5:
					col[0] = v3;
					col[1] = v1;
					col[2] = v;
					break;
				case 6:
					col[0] = v;
					col[1] = v1;
					col[2] = v2;
					break;
				case 7:
					col[0] = v;
					col[1] = v3;
					col[2] = v1;
					break;
			}

			col[0] = Math.floor(this.clamp(col[0], 0, 1) * 255);
			col[1] = Math.floor(this.clamp(col[1], 0, 1) * 255);
			col[2] = Math.floor(this.clamp(col[2], 0, 1) * 255);
			return col;
		},
		mergeIntervals: function (intervals) {
			
			if(intervals.length <= 1)
				return intervals;

			let stack = [];
			let top = null;

			intervals = intervals.sort(function (a, b) {
				if (a.from === b.from){
					return +(a.to > b.to) || +(a.to === b.to) - 1;
				}
				return +(a.from > b.from) || - 1;
			});
			
			intervals[0].matches = [{doc: intervals[0].name, per: intervals[0].percentage}]
			stack.push(intervals[0]);
			
			for (var i = 1; i < intervals.length; i++) {
				top = stack[stack.length - 1];
				
				if (top.to < intervals[i].from) {
					intervals[i].matches = [{doc: intervals[i].name, per: intervals[i].percentage}]
					stack.push(intervals[i]);
				}
				
				else if (top.to <= intervals[i].to){
					top.to = intervals[i].to;
					top.matches.push({doc: intervals[i].name, per: intervals[i].percentage})
					stack.pop();
					stack.push(top);
				}
				else if(top.to > intervals[i].to){
					top.matches.push({doc: intervals[i].name, per: intervals[i].percentage})
					stack.pop();
					stack.push(top);
				}
			}
			
			return stack;
		},
		toggleTooltip: function(docs){

			const docs_unique = docs.filter((elem, index) => docs.findIndex(obj => obj.doc === elem.doc) === index)
			let text = ''

			for (var i = 0; i < docs_unique.length; i++){
				text = text.concat('Zhoda so súborom: ', docs_unique[i].doc, ' (',  docs_unique[i].per, '%)<br>')
			}
			
			return(text)
		},
		highlightedText: function () {
			
			const indices = this.document.result.matched_docs
				.map((matched_doc) =>
					matched_doc.intervals.map((match) => ({
						name: matched_doc.name,
						from: match.begin,
						to: match.end,
						percentage: this.$filters.roundToTwoDecimals(this.$filters.toNumber(matched_doc.percentage)),
						color: this.colorForIndex(this.document.result.matched_docs.map(d => d.name).indexOf(matched_doc.name))
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
						`<span v-tooltip.top="'${this.toggleTooltip(substring.docs)}'" class="font-bold" style="color:${substring.color};">${substring.text}</span>`
					),
				escape(this.document.text)
			);
		},
	},
};
</script>

<style>
.tooltip {	 
	background: black;
	color: black;
	border-radius: 10px;
	padding: 5px 5px ;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
</style>
