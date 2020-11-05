<template>
	<div class="container mx-auto pt-24">
		<a
			href="/results"
			class="inline-block mb-4 hover:text-blue-500 text-gray-700"
		>
			<i class="fas fa-angle-left text-2xl" />
			<span class="text-bold text-2xl">Všetky súbory</span>
		</a>
		<div class="shadow-lg">
			<div
				class="flex justify-between bg-blue-own p-4 text-white text-2xl"
			>
				<span class="">
					{{ name }}
				</span>
				<div>
					<span class=""> Zhoda:</span>
					<span class="font-bold">
						{{ percentage }}
					</span>
					<span class="text-white font-bold">% </span>
				</div>
			</div>
			<div class="p-8 bg-white text-justify">
				<p>{{ text }}</p>
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

<style scoped>
.bg-blue-own {
	background: #1699f1;
}
</style>
