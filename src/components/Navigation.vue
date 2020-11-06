<template>
	<nav class="primary-gradient">
		<div class="container mx-auto py-6">
			<router-link
				to="/"
				class="text-white text-2xl font-bold flex items-center"
			>
				<img
					class="h-10 mr-3 rounded-full"
					src="../assets/img/logo.png"
				/>
				AntiPlag
			</router-link>
			<router-link to="/upload" class="text-white">
				Upload file
			</router-link>
		</div>
	</nav>
</template>

<script>
export default {};
</script>
