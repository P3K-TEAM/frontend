<template>
	<div class="mx-auto w-2/4 py-24">
		<div class="pb-4 pl-2 hover:text-accent">
			<a href="/results" class="text-center text-gray-700">
				<i class="fas fa-angle-left text-2xl" />
				<span class="text-bold text-2xl">Všetky súbory</span>
			</a>
		</div>
		<div class="shadow-lg">
			<div class="flex bg-blue-own p-2">
				<div class="w-1/4 ">
					<span class="pl-2 text-white">
						{{ name }}
					</span>
				</div>
				<div class="w-1/4 ml-auto text-right">
					<span class="text-white"> Zhoda:</span>
					<span class="text-white font-bold text-xl">
						{{ percentage }}
					</span>
					<span class="pr-2 text-white font-bold text-xl">% </span>
				</div>
			</div>
			<div class="text-sm p-8 bg-white text-justify">
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

<style scoped>
.bg-blue-own {
	background: #1699f1;
}
</style>
