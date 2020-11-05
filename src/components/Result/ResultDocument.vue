<template>
	<div class="mx-auto w-3/4 pb-48">
		<button class="pb-4 pl-4 text-center">
			<i class="fas fa-angle-left" />
			<span>Všetky práce</span>
		</button>
		<div class="border-2">
			<div class="flex bg-blue-900 p-3">
				<p class="w-1/4 pl-5 text-white">
					{{ name }}
				</p>
				<span class="w-1/4 ml-auto text-right pr-5 text-white">
					Zhoda {{ percentage }}%
				</span>
			</div>
			<div class="text-sm p-3">
				{{ text }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		percentage: Number,
		name: String,
		text: String,
	},
};
</script>

<style scoped></style>
