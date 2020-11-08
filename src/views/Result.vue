<template>
	<div class="bg-gray-300 min-h-screen">
		<div class="skewed-top-wrapper bg-primary-gradient text-white">
			<Navigation />
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
				<div class="w-1/3">
					<div
						class="ml-auto text-center rounded-lg bg-primary-500 w-2/3 py-4"
					>
						<span>Vaša zhoda je</span>
						<div class="font-bold text-5xl leading-none">
							<span>{{ zhoda }}</span>
							<span>%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="px-6 md:px-0 container mx-auto my-10">
				<h1 class="text-2xl font-bold mb-4">Dokumenty</h1>
				<div class="bg-white rounded shadow">
					<div class="border-b-2 bg-primary-500 overflow-x-auto flex">
						<ResultDocTab
							v-for="tab in documents"
							:key="tab.name"
							:title="tab.name"
							:active="tab.name === selectedTab"
							@click.native="selectedTab = tab.name"
						/>
					</div>
<!--					<pre>-->
<!--						{{JSON.stringify(selectedDocument)}}-->
<!--					</pre>-->
					<div v-if="selectedDocument && selectedDocument.matched_docs.length ">
						<ResultDocItem
							v-for="match in selectedDocument.matched_docs"
							:key="match.name"
							:document="match"
						/>
					</div>
					<div v-else class="text-green-600 px-4 py-3 text-xl">
						Gratulujem! V tomto dokumente nemáte žiadnu zhodu.
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation';
import ResultDocItem from '../components/Result/ResultDocItem';
import ResultDocTab from '../components/Result/ResultDocTab';

export default {
	components: {
		Navigation,
		ResultDocItem,
		ResultDocTab,
	},
	data: function () {
		return {
			selectedTab: '',
			documents: [
				{
					name: 'Document1.pdf',
					percentage: 0.15,
					matched_docs: [
						
					],
				},
				{
					name: 'Document2.pdf',
					percentage: 0.15,
					matched_docs: [
						{
							name: '1.pdf',
							percentage: 0.45,
							matches: [
								{
									char_from: 15,
									char_to: 19,
								},
								{
									char_from: 15,
									char_to: 19,
								},
							],
						},
						{
							name: '2.pdf',
							percentage: 0.45,
							matches: [
								{
									char_from: 15,
									char_to: 19,
								},
								{
									char_from: 15,
									char_to: 19,
								},
							],
						},
					],
				},
				{
					name: 'Document3.pdf',
					percentage: 0.15,
					matched_docs: [
						{
							name: '1.pdf',
							percentage: 0.45,
							matches: [
								{
									char_from: 15,
									char_to: 19,
								},
								{
									char_from: 15,
									char_to: 19,
								},
							],
						},
						{
							name: '2.pdf',
							percentage: 0.45,
							matches: [
								{
									char_from: 15,
									char_to: 19,
								},
								{
									char_from: 15,
									char_to: 19,
								},
							],
						},
					],
				},
			],
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
		selectedDocument:function() {
			return this.documents.find((doc) => doc.name === this.selectedTab);
		},
	},
};
</script>

<style scoped>
.skewed-top-wrapper {
	clip-path: ellipse(95% 100% at 50% 0%);
}
</style>
