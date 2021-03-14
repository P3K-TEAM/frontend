<template>
	<div class="bg-gray-300">
		<ResultHeader
			title="Podobnosť dokumentov:"
			:documents="[documents.textA.name, documents.textB.name]"
		/>
		<div class="md:flex py-4 md:py-4">
			<div
				class="md:flex1 rounded-md md:rounded-lg mx-4 md:mt-0 md:mr-2 md:ml-4 md:w-1/2 lg:ml-12"
			>
				<div
					class="flex items-center justify-between px-2 py-1 md:p-2 md:h-12 bg-primary-500 text-white text-lg rounded-t-md md:rounded-t-lg"
				>
					<p class="mx-auto">
						{{ documents.textA.name }}
					</p>
				</div>
				<div
					v-html="doneA"
					class="px-4 py-1 pt-1 md:pt-2 md:p-4 bg-white text-justify rounded-b-md md:rounded-b-lg shadow-md"
				/>
			</div>
			<div
				class="md:flex1 rounded-md md:rounded-md mt-4 mx-4 md:mt-0 d:mr-4 md:ml-2 md:w-1/2 lg:mr-12"
			>
				<div
					class="flex items-center justify--between px-2 py-1 md:p-2 md:h-12 bg-primary-500 text-white text-lg rounded-t-md md:rounded-t-lg"
				>
					<p class="mx-auto">
						{{ documents.textB.name }}
					</p>
				</div>
				<div
					v-html="doneB"
					class="px-4 py-1 pt-1 md:pt-2 md:p-4 bg-white text-justify rounded-b-md md:rounded-b-lg shadow-md"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import ResultHeader from '../components/Result/ResultHeader';
import { escape } from 'lodash';
import retry from '@/functions/retry.function';

export default {
	components: {
		ResultHeader,
	},
	data: function () {
		return {
			id: undefined,
			doneA: '',
			doneB: '',
			documents: {},
		};
	},
	mounted: function () {
		// initial spinner
		this.$store.dispatch('setLoading', true);

		this.id = this.$route.params.diff;

		retry(
			() => this.fetchResult(this.id),
			(result) => result.length !== 0
		)
			.then((result) => {
				this.documents = result;

				// If no documents are present even though the submission is processed
				if (!this.documents.textA || !this.documents.textB)
					this.$store.dispatch('AlertStore/setAlert', {
						message:
							'No documents for diff found. Please contact administrator',
						type: 'error',
					});

				if (this.documents && this.documents.matches.length === 0)
					this.$store.dispatch('AlertStore/setAlert', {
						message:
							'Documents for diff found, but no matches found. Please contact administrator',
						type: 'error',
					});
			})
			.catch((e) => {
				this.$store.dispatch('AlertStore/setAlert', {
					message: e.message,
					type: 'error',
					duration: 10000,
				});
			})
			.finally(() => {
				this.highlightedText();
				this.$store.dispatch('setLoading', false);
			});
	},
	methods: {
		fetchResult() {
			//Connect to BE
			// return this.$axios
			// 	.get(`/api/submissions/${id}`)
			// 	.then((response) => response.data);

			return Promise.resolve({
				textA: {
					name: 'moj_dokument.docx',
					obsah:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet nibh vel dolor fringilla tincidunt. Etiam neque eros, feugiat iaculis nisl id, gravida molestie ipsum. Ut tempor, lacus non tincidunt tincidunt, nunc risus vehicula nibh, in pulvinar libero dolor imperdiet elit. Aliquam ac ipsum ut libero molestie bibendum. Donec consequat urna ut augue consectetur rutrum. Maecenas aliquam diam feugiat ipsum iaculis accumsan. Aliquam dictum arcu eu libero pharetra, id blandit lorem finibus. Quisque vitae orci egestas, commodo purus vel, dapibus urna. Nunc in justo dui. Aliquam vel placerat sapien. Sed id fringilla massa, id placerat ipsum. Aliquam placerat, nulla vitae condimentum condimentum, nibh nisl convallis purus, non congue enim sem eu orci. Nunc ultricies imperdiet augue ac pharetra.\n' +
						'\n' +
						'Mauris sed eros enim. Sed viverra semper nunc, et ornare tellus ullamcorper eu. Nullam quam nisl, posuere ac ipsum quis, vehicula sollicitudin dolor. Pellentesque hendrerit purus sed lacus euismod porta. Mauris aliquam consectetur sem nec imperdiet. Nam urna leo, rutrum at rutrum eget, euismod sed dui. Morbi sit amet libero eget urna rhoncus pellentesque eget condimentum eros. Aenean vehicula est quis dolor sodales scelerisque. Morbi imperdiet urna eget volutpat ornare. Phasellus feugiat leo eget lectus egestas gravida. Morbi hendrerit imperdiet enim at porttitor. Sed fermentum ac risus lacinia egestas. Donec malesuada velit nec quam commodo, in laoreet mauris tempor.',
				},
				textB: {
					name: 'cudzi_dokument.docx',
					obsah:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet nibh vel dolor fringilla tincidunt. Etiam neque eros, feugiat iaculis nisl id, gravida molestie ipsum. Ut tempor, lacus non tincidunt tincidunt, nunc risus vehicula nibh, in pulvinar libero dolor imperdiet elit. Aliquam ac ipsum ut libero molestie bibendum. Donec consequat urna ut augue consectetur rutrum. Maecenas aliquam diam feugiat ipsum iaculis accumsan. Aliquam dictum arcu eu libero pharetra, id blandit lorem finibus. Quisque vitae orci egestas, commodo purus vel, dapibus urna. Nunc in justo dui. Aliquam vel placerat sapien. Sed id fringilla massa, id placerat ipsum. Aliquam placerat, nulla vitae condimentum condimentum, nibh nisl convallis purus, non congue enim sem eu orci. Nunc ultricies imperdiet augue ac pharetra.\n' +
						'\n' +
						'Mauris sed eros enim. Sed viverra semper nunc, et ornare tellus ullamcorper eu. Nullam quam nisl, posuere ac ipsum quis, vehicula sollicitudin dolor. Pellentesque hendrerit purus sed lacus euismod porta. Mauris aliquam consectetur sem nec imperdiet. Nam urna leo, rutrum at rutrum eget, euismod sed dui. Morbi sit amet libero eget urna rhoncus pellentesque eget condimentum eros. Aenean vehicula est quis dolor sodales scelerisque. Morbi imperdiet urna eget volutpat ornare. Phasellus feugiat leo eget lectus egestas gravida. Morbi hendrerit imperdiet enim at porttitor. Sed fermentum ac risus lacinia egestas. Donec malesuada velit nec quam commodo, in laoreet mauris tempor.',
				},
				matches: [
					{ fromA: 5, toA: 150, fromB: 15, toB: 150 },
					{ fromA: 290, toA: 400, fromB: 800, toB: 1000 },
					{ fromA: 550, toA: 900, fromB: 220, toB: 600 },
				],
			});
		},
		highlightedText: function () {
			const  _ = require('lodash');

			const indices = this.documents.matches
				.map((matches) => ({
					fromA: matches.fromA,
					toA: matches.toA,
					fromB: matches.fromB,
					toB: matches.toB,
					color: this.hex_color_generator(),
				}))
				.flat();

			const indicesA = _.cloneDeep(indices);
			const indicesB = _.cloneDeep(indices);

			indicesA.sort((a, b) => b.toA - b.fromA - (a.toA - a.fromA));
			indicesB.sort((a, b) => b.toB - b.fromB - (a.toB - a.fromB));

			const subStringToReplaceA = indicesA.map((h) => ({
				text: this.documents.textA.obsah.substring(h.fromA, h.toA + 1),
				color: h.color,
			}));

			const subStringToReplaceB = indicesB.map((h) => ({
				text: this.documents.textB.obsah.substring(h.fromB, h.toB + 1),
				color: h.color,
			}));

			this.doneA = this.merge_text(
				subStringToReplaceA,
				this.documents.textA.obsah
			);

			this.doneB = this.merge_text(
				subStringToReplaceB,
				this.documents.textB.obsah
			);
		},
		hex_color_generator: function () {
			return '#' + ((Math.random() * 0xffffff) << 0).toString(16);
		},
		merge_text(subStringIntervals, text) {
			return subStringIntervals.reduce(
				(string, substring) =>
					string.replace(
						new RegExp(substring.text, 'g'),
						`<span  style="color:${substring.color};" class=" font-bold">${substring.text}</span>`
					),
				escape(text)
			);
		},
	},
};
</script>
