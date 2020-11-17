<template>
	<div class="skewed-top-wrapper bg-primary-gradient text-white">
		<Navigation />
		<div
			class="container flex justify-between items-center mx-auto pt-16 pb-32"
		>
			<div class="w-2/3">
				<p class="text-4xl pb-4">{{ name }}</p>
				<p class="text-xl">
					Nižšie nájdete podrobné štatistiky kontroly originality
					vašej práce.
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
</template>

<script>
import Navigation from '@/components/Navigation/Navigation';
export default {
	components: {
		Navigation,
	},
	props: {
		name: String,
		percentage: Number,
	},
};
</script>

<style scoped></style>
