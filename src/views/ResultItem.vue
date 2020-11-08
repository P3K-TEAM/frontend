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
		<ResultDocument
			:name="document.name"
			:percentage="document.percentage"
			:text="document.text"
		/>
		<ResultDocItem />
	</div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation';
import ResultDocument from '@/components/Result/ResultDocument';
import ResultDocItem from '../components/Result/ResultDocItem';

export default {
	components: {
		Navigation,
		ResultDocument,
		ResultDocItem,
	},
	data: function () {
		return {
			zhoda: 0.55,
			document: {
				name: 'Document1.pdf',
				percentage: 5,
				text:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper odio quis pulvinar mattis. Sed vulputate arcu eget porttitor fringilla. ' +
					'Donec efficitur, odio ut cursus mattis, magna lorem convallis purus, nec varius turpis urna sed velit. Quisque convallis dolor et ex accumsan volutpat.' +
					' Suspendisse ullamcorper nibh quis sagittis maximus. Maecenas a vehicula felis. Aliquam vel eros molestie, dignissim est et, suscipit leo.' +
					' Aenean quis leo ut metus sagittis convallis in vel elit. Aenean et metus dolor. Vestibulum et congue quam. In ornare pellentesque odio. ' +
					'Integer non urna ultrices, sollicitudin dui vitae, gravida orci. Nullam tellus eros, iaculis vitae velit eu, tincidunt ultrices sapien. ' +
					'Donec non mauris ac massa pulvinar rutrum. Sed maximus velit ut lacus porta blandit. Etiam dolor orci, fermentum a porttitor sed, elementum quis sem.\n' +
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper odio quis pulvinar mattis. Sed vulputate arcu eget porttitor fringilla.',
			},
		};
	},
};
</script>

<style scoped>
.skewed-top-wrapper {
	clip-path: ellipse(95% 100% at 50% 0%);
}
</style>