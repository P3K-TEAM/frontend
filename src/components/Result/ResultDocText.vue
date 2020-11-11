<template>
	<div class="container mx-auto pt-24">
		<div class="shadow rounded-b-lg">
			<div
				class="flex justify-between bg-primary-500 p-4 text-white text-2xl"
			>
				<span class="">
					{{ document.name }}
				</span>
				<div>
					<router-link
						to="/result"
						class="inline-block hover:text-black text-white "
					>
						<span class="text-bold text-2xl">Texty</span>
					</router-link>
				</div>
			</div>
			<div class="p-8 bg-white text-justify rounded-b-lg">
				<p>{{ document.text }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		document: Object,
	},
};
</script>
