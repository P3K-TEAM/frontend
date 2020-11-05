<template>
	<div>
		<div class="flex py-48 skewed-top-wrapper">
			<div class="flex mx-auto">
				<div class="w-1/2 mx-auto">
					<p>Výsledky kontroly</p>
					<p>
						Gratulujeme. Nižšie nájdete podrobné štatistiky kontroly
						originality vášej práce.
					</p>
				</div>
				<div class="w-1/4 rounded bg-yellow-400 p-4 rounded mx-auto">
					<p class="text-sm">Vaša zhoda je</p>
					<p class="text-center text-lg">{{ zhoda }}</p>
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
			zhoda: 55,
			document: {
				name: 'Documnet1.pdf',
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
	/*clip-path: polygon(*/
	/*	0 0,*/
	/*	100% 0,*/
	/*	100% 50%,*/
	/*	85% 55%,*/
	/*	68% 60%,*/
	/*	50% 61%,*/
	/*	32% 60%,*/
	/*	15% 55%,*/
	/*	0 50%*/
	/*);*/
	background: rgb(0, 25, 64);
	background: linear-gradient(
		90deg,
		rgba(0, 25, 64, 1) 0%,
		rgba(0, 49, 128, 1) 93%
	);
}
</style>
