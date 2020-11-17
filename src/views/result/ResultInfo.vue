<template>
	<div class="bg-gray-300 min-h-screen">
		<ResultInfoHeadMulti :percentage="percentage" :name="name"></ResultInfoHeadMulti>
		<div>
			<div class="px-6 md:px-0 container mx-auto my-10">
				<div class="p-2">
					<a
						@click="$router.go(-1)"
						class="cursor-pointer text-2xl text-gray-700 hover:text-gray-900"
					>
						<i class="fas fa-chevron-left" />
						Vsetky súbory
					</a>
				</div>
				<div class="container mx-auto">
					<div class="shadow rounded-b-lg">
						<div
							class="flex justify-between bg-primary-500 p-4 text-white text-2xl rounded-t-lg"
						>
							<button
								type="button"
								@click="stav = !stav"
								class="inline-block hover:text-primary-500 hover:bg-white text-white ml-auto border-2 p-1 focus:outline-none rounded-md"
							>
								<span class="text-bold text-2xl">
									Subory / Texty
								</span>
							</button>
						</div>
						<div
							class="p-8 bg-white text-justify rounded-b-lg shadow-md"
						>
							<component
								v-if="stav"
								:is="compiledHighlight"
							></component>
							<ResultTableMatch
								v-else
								:matched_docs="matched_docs"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation';
import Vue from 'vue';
import { escape } from 'lodash';
import ResultTableMatchItem from '../../components/Result/ResultTableMatchItem';
import ResultTableMatch from '../../components/Result/ResultTableMatch';
import ResultInfoHead from '../../components/Result/ResultInfoHead';

export default {
	components: {
		Navigation,
		ResultTableMatchItem,
		ResultTableMatch,
		ResultInfoHead,
	},
	data: function () {
		return {
			stav: true,
			id: 1,
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
	methods: {
		highlightedText: function () {
			const indices = this.matched_docs
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
				text: this.text.substring(h.from, h.to + 1),
				doc: h.name,
			}));
			return subStringsToReplace.reduce(
				(string, substring) =>
					string.replace(
						new RegExp(substring.text, 'g'),
						`<span v-tooltip.top="'Zhoda so súborom: ${substring.doc}'" class="text-red-500 font-bold">${substring.text}</span>`
					),
				escape(this.text)
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
