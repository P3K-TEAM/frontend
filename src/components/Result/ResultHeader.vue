<template>
	<div class="skewed-top-wrapper bg-primary-gradient text-white">
		<Navigation />
		<div
			class="md:container flex flex-col md:flex-row justify-between items-center mx-auto pt-0 md:pt-16 pb-6 md:pb-32"
		>
			<div
				class="flex flex-col px-8 md:px-0 w-full"
				:class="{ 'md:w-2/3': percentage !== undefined }"
			>
				<p
					class="font-semibold md:font-normal text-center md:text-left text-2xl md:text-4xl break-words pb-2 md:pb-4"
					:class="{ truncate: percentage !== undefined }"
				>
					{{ title }}
				</p>
				<p class="hidden md:flex text-xl">
					{{ description }}
				</p>
			</div>

			<div
				v-if="percentage !== undefined"
				class="w-full md:w-1/3 flex flex-col items-center px-8 md:px-0"
			>
				<div
					class="w-full md:w-11/12 lg:w-5/6 py-1 md:py-4 md:ml-auto text-center text-xl rounded-lg bg-primary-500"
				>
					<span class="px-4">Vaša zhoda je</span>
					<div
						class="px-1 font-semibold md:font-bold text-3xl md:text-5xl leading-none"
					>
						<span
							>{{
								percentage | toNumber | roundToTwoDecimals
							}} %</span
						>
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
		title: { type: String, default: 'Výsledky kontroly' },
		description: { type: String, required: true },
		percentage: { type: Number, default: undefined },
	},
};
</script>

<style scoped lang="scss">
.skewed-top-wrapper {
	clip-path: ellipse(95% 100% at 50% 0%);

	@media (max-width: 768px) {
		& {
			clip-path: ellipse(180% 100% at 50% 0%);
		}
	}
}
</style>
