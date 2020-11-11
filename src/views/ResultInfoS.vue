<template>
	<div class="bg-gray-300 min-h-screen">
		<div class="skewed-top-wrapper bg-primary-gradient text-white">
			<Navigation/>
			<div
				class="container flex justify-between items-center mx-auto pt-16 pb-32"
			>
				<div class="w-2/3">
					<p class="text-4xl pb-4">{{ name }}</p>
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
							<span>{{ percentage }}%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="px-6 md:px-0 container mx-auto my-10">

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
								<span class="text-bold text-2xl"> Texty </span>
							</button>
						</div>
						<div
							class="p-8 bg-white text-justify rounded-b-lg shadow-md"
						>
							<p v-if="stav">{{ text }}</p>
							<div v-else>
								<div
									class="flex justify-between py-1 text-gray-700 text-sm font-bold border-b-2"
								>
									<span class="w-2/3 ml-5"> Nazov </span>

									<span class="w-1/3 text-center">
										Počet zhôd
									</span>
								</div>
								<div
									v-for="match in matched_docs"
									:key="match.name"
									class="flex justify-between my-5 text-black bg-white border-b-2  hover-trigger"
								>
									<span class="pl-5 w-2/3">{{match.name}}</span>
									<span class="w-1/3 text-center" >{{match.matches.length}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Navigation from '@/components/Navigation/Navigation';

	export default {
		components: {
			Navigation
		},
		data: function() {
			return {
				stav: true,
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
			};
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
</style>
