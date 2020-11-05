<template>

</template>

<script>
export default {
	props: { zhoda: Number },
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
