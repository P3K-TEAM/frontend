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
		Footer
	}
};
</script>

<style>
#app {
	font-size: 18px;
	font-family: 'Roboto', sans-serif;
}
</style>
