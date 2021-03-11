<template>
	<div class="bg-gray-300">
		<ResultHeader
			title="Podobnosť dokumentov:"
			:documents="[documents.text1.name, documents.text2.name]"
		/>
		<div class="md:flex py-4 md:py-4">
			<div
				class="md:flex1 rounded-md md:rounded-lg mx-4 md:mt-0 md:mr-2 md:ml-4 md:w-1/2 lg:ml-12"
			>
				<div
					class="flex items-center justify-between px-2 py-1 md:p-2 md:h-12 bg-primary-500 text-white text-lg rounded-t-md md:rounded-t-lg"
				>
					<p class="mx-auto">
						{{ documents.text1.name }}
					</p>
				</div>
				<div
					class="px-4 py-1 pt-1 md:pt-2 md:p-4 bg-white text-justify rounded-b-md md:rounded-b-lg shadow-md"
				>
					{{ documents.text1.obsah }}
				</div>
			</div>

			<div
				class="md:flex1 rounded-md md:rounded-md mt-4 mx-4 md:mt-0 d:mr-4 md:ml-2 md:w-1/2 lg:mr-12"
			>
				<div
					class="flex items-center justify-between px-2 py-1 md:p-2 md:h-12 bg-primary-500 text-white text-lg rounded-t-md md:rounded-t-lg"
				>
					<p class="mx-auto">
						{{ documents.text2.name }}
					</p>
				</div>
				<div
					v-html="highlightedText()"
					class="px-4 py-1 pt-1 md:pt-2 md:p-4 bg-white text-justify rounded-b-md md:rounded-b-lg shadow-md"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
import ResultHeader from '../components/Result/ResultHeader';
import Vue from 'vue';
import { escape } from 'lodash';

export default {
	components: {
		ResultHeader,
	},
	data: function () {
		return {
			id: undefined,
			documents: {
				text1: {
					name: 'moj_dokument.docx',
					obsah:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet nibh vel dolor fringilla tincidunt. Etiam neque eros, feugiat iaculis nisl id, gravida molestie ipsum. Ut tempor, lacus non tincidunt tincidunt, nunc risus vehicula nibh, in pulvinar libero dolor imperdiet elit. Aliquam ac ipsum ut libero molestie bibendum. Donec consequat urna ut augue consectetur rutrum. Maecenas aliquam diam feugiat ipsum iaculis accumsan. Aliquam dictum arcu eu libero pharetra, id blandit lorem finibus. Quisque vitae orci egestas, commodo purus vel, dapibus urna. Nunc in justo dui. Aliquam vel placerat sapien. Sed id fringilla massa, id placerat ipsum. Aliquam placerat, nulla vitae condimentum condimentum, nibh nisl convallis purus, non congue enim sem eu orci. Nunc ultricies imperdiet augue ac pharetra.\n' +
						'\n' +
						'Mauris sed eros enim. Sed viverra semper nunc, et ornare tellus ullamcorper eu. Nullam quam nisl, posuere ac ipsum quis, vehicula sollicitudin dolor. Pellentesque hendrerit purus sed lacus euismod porta. Mauris aliquam consectetur sem nec imperdiet. Nam urna leo, rutrum at rutrum eget, euismod sed dui. Morbi sit amet libero eget urna rhoncus pellentesque eget condimentum eros. Aenean vehicula est quis dolor sodales scelerisque. Morbi imperdiet urna eget volutpat ornare. Phasellus feugiat leo eget lectus egestas gravida. Morbi hendrerit imperdiet enim at porttitor. Sed fermentum ac risus lacinia egestas. Donec malesuada velit nec quam commodo, in laoreet mauris tempor.',
				},
				text2: {
					name: 'cudzi_dokument.docx',
					obsah:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet nibh vel dolor fringilla tincidunt. Etiam neque eros, feugiat iaculis nisl id, gravida molestie ipsum. Ut tempor, lacus non tincidunt tincidunt, nunc risus vehicula nibh, in pulvinar libero dolor imperdiet elit. Aliquam ac ipsum ut libero molestie bibendum. Donec consequat urna ut augue consectetur rutrum. Maecenas aliquam diam feugiat ipsum iaculis accumsan. Aliquam dictum arcu eu libero pharetra, id blandit lorem finibus. Quisque vitae orci egestas, commodo purus vel, dapibus urna. Nunc in justo dui. Aliquam vel placerat sapien. Sed id fringilla massa, id placerat ipsum. Aliquam placerat, nulla vitae condimentum condimentum, nibh nisl convallis purus, non congue enim sem eu orci. Nunc ultricies imperdiet augue ac pharetra.\n' +
						'\n' +
						'Mauris sed eros enim. Sed viverra semper nunc, et ornare tellus ullamcorper eu. Nullam quam nisl, posuere ac ipsum quis, vehicula sollicitudin dolor. Pellentesque hendrerit purus sed lacus euismod porta. Mauris aliquam consectetur sem nec imperdiet. Nam urna leo, rutrum at rutrum eget, euismod sed dui. Morbi sit amet libero eget urna rhoncus pellentesque eget condimentum eros. Aenean vehicula est quis dolor sodales scelerisque. Morbi imperdiet urna eget volutpat ornare. Phasellus feugiat leo eget lectus egestas gravida. Morbi hendrerit imperdiet enim at porttitor. Sed fermentum ac risus lacinia egestas. Donec malesuada velit nec quam commodo, in laoreet mauris tempor.',
				},
				matches: [
					{ fromA: 5, toA: 25, fromB: 15, toB: 25 },
					{ fromA: 85, toA: 150, fromB: 50, toB: 75 },
					{ fromA: 30, toA: 79, fromB: 50, toB: 75 },
				],
			},
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
			const indices = this.documents.matches
				.map((matches) => ({
					from: matches.fromA,
					to: matches.toA,
				}))
				.flat();

			indices.sort((a, b) => b.to - b.from - (a.to - a.from));

			const subStringToReplace = indices.map((h) => ({
				text: this.documents.text1.obsah.substring(h.from, h.to + 1),
			}));
			console.log();
			console.log(subStringToReplace);

			return subStringToReplace.reduce(
				(string, substring) =>
					string.replace(
						new RegExp(substring.text, 'g'),
						`<span  style="color:${this.generator()};" class=" font-bold">${substring.text}</span>`
					),
				escape(this.documents.text1.obsah)
			);
		},
		generator: function () {
			return '#' + ((Math.random() * 0xffffff) << 0).toString(16);
		},
	},
};
</script>
