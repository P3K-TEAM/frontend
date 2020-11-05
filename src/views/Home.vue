<template>
	<div class="bg-gray-300">
		<div class="flex py-24 skewed-top-wrapper">
			<div class="flex mx-auto">
				<div class="w-1/2 mr-auto text-white ">
					<p class="text-3xl pb-4">Výsledky kontroly</p>
					<p class="text-md ">
						Gratulujeme. Nižšie nájdete podrobné štatistiky kontroly
						originality vášej práce.
					</p>
				</div>
				<div class="w-1/2 ">
					<div
						class="flex bg-blue-own px-4 rounded-lg w-1/2 ml-auto text-center "
					>
						<span class=" w-full inline-block text-sm text-white align-middle">Vaša zhoda je </span>
						<span class="w-full inline-block font-bold text-4xl text-white">{{ zhoda }}</span>
						<span class="inline-block font-bold text-4xl text-white">%</span>
					</div>
				</div>
			</div>
		</div>
		<ResultDocument
			:name="document.name"
			:percentage="document.percentage"
			:text="document.text"
		/>
	</div>
</template>

<script>
import ResultWhole from '../components/Result/ResultWhole';
import ResultDocument from '../components/Result/ResultDocument';
import ResultDocItem from '../components/Result/ResultDocItem';
export default {
	components: {
		ResultWhole,
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
	clip-path: polygon(
		0 0,
		100% 0,
		100% 90%,
		85% 95%,
		68% 98%,
		50% 100%,
		32% 98%,
		15% 95%,
		0 90%
	);
	background: rgb(0, 25, 64);
	background: linear-gradient(
		90deg,
		rgba(0, 25, 64, 1) 0%,
		rgba(0, 49, 128, 1) 93%
	);
}
.bg-blue-own {
	background: #1699f1;
}
</style>
