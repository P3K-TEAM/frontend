<template>
	<div id="app">
		<nav>
			<router-link to="/">
				Home
			</router-link>
			<router-link to="/result">
				Result
			</router-link>
		</nav>
		<router-view />
	</div>
</template>

<script>
export default {};
</script>

<style>
#app {
	font-size: 18px;
	font-family: 'Roboto', sans-serif;
}
</style>
