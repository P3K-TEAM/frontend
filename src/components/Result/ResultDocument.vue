<template>
	<div class="container mx-auto py-24">
		<router-link
			to="/results"
			class="inline-block mb-4 hover:text-gray-500 text-gray-600"
		>
			<i class="fas fa-angle-left text-2xl" />
			<span class="text-bold text-2xl">Všetky súbory</span>
		</router-link>
		<div class="shadow rounded-b-lg">
			<div
				class="flex justify-between bg-primary-500 p-4 text-white text-2xl"
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
			<div class="p-8 bg-white text-justify rounded-b-lg">
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
