<template>
	<div class="skewed-top-wrapper bg-primary-gradient text-white">
		<Navigation />
		<div
			class="container flex justify-between items-center mx-auto pt-16 pb-32"
		>
			<div :class="{ 'w-2/3': percentage }">
				<p class="text-4xl pb-4">
					{{ title || 'Výsledky kontroly' }}
				</p>
				<p class="text-xl">
					{{ description }}
				</p>
			</div>
			<div v-if="percentage" class="w-1/3">
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
		title: { type: String },
		description: { type: String },
		percentage: { type: Number },
	},
};
</script>

<style scoped lang="scss">
	.skewed-top-wrapper {
		clip-path: ellipse(95% 100% at 50% 0%);
	}
</style>
