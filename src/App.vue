<template>
	<div id="app">
		<Navigation />
		<router-view />
		<Footer />
	</div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
	components: {
		Navigation,
		Footer,
	},
};
</script>