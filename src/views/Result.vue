<template>
	<div class="bg-primary" data-e2e-id="homePage">
		<div class="flex bg-gray-100 py-48 skewed-top-wrapper">
			<div class="flex rounded bg-yellow pb-20">
				<div class="bg-yellow-400 p-4 rounded ml-auto">
					<p>Vaša zhoda je</p>
					<p>{{ percentage }}</p>
				</div>
			</div>
		</div>

		<div class="bg-black">
			<p>ah</p>
		</div>
	</div>
</template>

<script>
export default {
	props: { percentage: Number, dokument: String },
};
</script>

<style scoped>
.skewed-top-wrapper {
	clip-path: polygon(
		0 0,
		100% 0,
		100% 50%,
		85% 55%,
		68% 60%,
		50% 61%,
		32% 60%,
		15% 55%,
		0 50%
	);
	background: rgb(0, 25, 64);
	background: linear-gradient(
		90deg,
		rgba(0, 25, 64, 1) 0%,
		rgba(0, 49, 128, 1) 93%
	);
}
</style>
