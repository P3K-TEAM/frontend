<template>
	<div id="app">
		<Navigation />
		<router-view />
		<Footer />
	</div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';

export default {
	components: {
		Navigation,
		Footer,
	},
};
</script>

<style>
#app {
	font-size: 18px;
	font-family: 'Roboto', sans-serif;
}

.primary-gradient {
	background: linear-gradient(
		90deg,
		rgba(0, 25, 64, 1) 0%,
		rgba(0, 49, 128, 1) 93%
	);
}
</style>
