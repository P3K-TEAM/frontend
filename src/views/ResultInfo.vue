<template>
	<div class="bg-gray-300 min-h-screen">
		<div class="skewed-top-wrapper bg-primary-gradient text-white">
			<Navigation/>
			<div
				class="container flex justify-between items-center mx-auto pt-16 pb-32"
			>
				<div class="w-2/3">
					<p class="text-4xl pb-4">Výsledky kontroly</p>
					<p class="text-xl">
						Gratulujeme! Nižšie nájdete podrobné štatistiky kontroly
						originality vašej práce.
					</p>
				</div>
				<div v-if="documents.length === 1" class="w-1/3">
					<div
						class="ml-auto text-center rounded-lg bg-primary-500 w-2/3 py-4"
					>
						<span>Vaša zhoda je</span>
						<div class="font-bold text-5xl leading-none">
							<span>{{ documents[0].percentage }}</span>
							<span>%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="px-6 md:px-0 container mx-auto my-10">

				<div v-if="documents.length > 0 && documents.length < 2">
					<ResultDocText :document="documents[0]"></ResultDocText>

				</div>
				<div v-else>
					<div class="flex justify-between py-1 text-gray-700 text-sm font-bold">
						<span class="w-1/2 ml-5"> Nazov</span>
						<span class="w-1/4 text-center"> Percentuálna zhoda</span>
						<span class="w-1/4 text-center"> Počet zhôd</span>
					</div>
					<div
						v-for="doc in documents"
						:key="doc.id"
					>
						<router-link
							:to="'document/'+doc.id"
							class="flex justify-between mb-3 p-2 text-black bg-white shadow rounded-lg hover-trigger"
							append
						>
							<span class="w-1/2 ml-5"> {{ doc.name }}</span>
							<span class="w-1/4 text-center"> {{ doc.percentage }}%</span>
							<span class="w-1/4 text-center">
								{{ doc.matched_docs.length }}
							</span>
							<i class="fas fa-angle-down hover-target" />
						</router-link>
					</div>
				</div>
				<div class="flex justify-between p-2 text-gray-700 text-sm font-bold">
					<span>{{documents.length}} výsledkov z {{documents.length}} </span>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import Navigation from '@/components/Navigation/Navigation';
	import ResultDocItem from '../components/Result/ResultDocItem';
	import ResultDocTab from '../components/Result/ResultDocTab';
	import ResultDocText from '../components/Result/ResultDocText';
	import ResultDocMatches from '../components/Result/ResultDocMatches';

	export default {
		components: {
			Navigation,
			ResultDocItem,
			ResultDocTab,
			ResultDocText,
			ResultDocMatches
		},
		data: function() {
			return {
				id_result: 11,
				documents: [
					{
						id: 1,
						name: 'Document2.pdf',
						percentage: 0.15,
						text:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus consequat ullamcorper. Proin a erat nunc. Aenean at gravida lorem,' +
							' vel iaculis lorem. Quisque bibendum suscipit velit in tincidunt. Quisque ut ipsum egestas risus pretium dignissim. Aliquam sit amet nibh eget felis ' +
							'dignissim ultrices. Cras ac ultricies libero. Sed eu tincidunt leo. Vivamus vestibulum dictum nisl ac tempus. Vestibulum ante ipsum primis' +
							' in faucibus orci luctus et ultrices posuere cubilia curae; Cras posuere consectetur nibh, vel molestie lacus finibus et. Nullam lectus mi,' +
							' aliquam quis enim ac, elementum vehicula metus.',
						matched_docs: [
							{
								name: '1.pdf',
								percentage: 0.45,

								matches: [
									{
										char_from: 15,
										char_to: 19
									},
									{
										char_from: 15,
										char_to: 19
									}
								]
							},
							{
								name: '2.pdf',
								percentage: 0.45,
								matches: [
									{
										char_from: 15,
										char_to: 19
									},
									{
										char_from: 15,
										char_to: 19
									}
								]
							}
						]
					}, {
						id: 2,
						name: 'Document2.pdf',
						percentage: 0.15,
						text:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus consequat ullamcorper. Proin a erat nunc. Aenean at gravida lorem,' +
							' vel iaculis lorem. Quisque bibendum suscipit velit in tincidunt. Quisque ut ipsum egestas risus pretium dignissim. Aliquam sit amet nibh eget felis ' +
							'dignissim ultrices. Cras ac ultricies libero. Sed eu tincidunt leo. Vivamus vestibulum dictum nisl ac tempus. Vestibulum ante ipsum primis' +
							' in faucibus orci luctus et ultrices posuere cubilia curae; Cras posuere consectetur nibh, vel molestie lacus finibus et. Nullam lectus mi,' +
							' aliquam quis enim ac, elementum vehicula metus.',
						matched_docs: [
							{
								name: '1.pdf',
								percentage: 0.45,

								matches: [
									{
										char_from: 15,
										char_to: 19
									},
									{
										char_from: 15,
										char_to: 19
									}
								]
							},
							{
								name: '2.pdf',
								percentage: 0.45,
								matches: [
									{
										char_from: 15,
										char_to: 19
									},
									{
										char_from: 15,
										char_to: 19
									}
								]
							}
						]
					}

				]
			};

			// zhoda: 0.55,
			// document: {
			// 	name: 'Document1.pdf',
			// 	percentage: 5,
			// 	text:
			// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper odio quis pulvinar mattis. Sed vulputate arcu eget porttitor fringilla. ' +
			// 		'Donec efficitur, odio ut cursus mattis, magna lorem convallis purus, nec varius turpis urna sed velit. Quisque convallis dolor et ex accumsan volutpat.' +
			// 		' Suspendisse ullamcorper nibh quis sagittis maximus. Maecenas a vehicula felis. Aliquam vel eros molestie, dignissim est et, suscipit leo.' +
			// 		' Aenean quis leo ut metus sagittis convallis in vel elit. Aenean et metus dolor. Vestibulum et congue quam. In ornare pellentesque odio. ' +
			// 		'Integer non urna ultrices, sollicitudin dui vitae, gravida orci. Nullam tellus eros, iaculis vitae velit eu, tincidunt ultrices sapien. ' +
			// 		'Donec non mauris ac massa pulvinar rutrum. Sed maximus velit ut lacus porta blandit. Etiam dolor orci, fermentum a porttitor sed, elementum quis sem.\n' +
			// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper odio quis pulvinar mattis. Sed vulputate arcu eget porttitor fringilla.',
			// },
		},
		computed: {
			selectedDocument: function() {
				return this.documents.find((doc) => doc.name === this.selectedTab);
			}
		}
	};
</script>

<style scoped>
	.skewed-top-wrapper {
		clip-path: ellipse(95% 100% at 50% 0%);
	}
	.hover-trigger .hover-target {
		display: none;
	}

	.hover-trigger:hover .hover-target {
		display: block;
	}
</style>
