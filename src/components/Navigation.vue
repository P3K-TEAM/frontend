<template>
	<nav data-e2e-id="navigation">
		<div class="container flex mx-auto py-6">
			<div class="ml-3 relative">
				<div>
					<button class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
						<img class="h-8 w-8 rounded-full" src="../assets/img/ziarovka.png" alt="">
					</button>
				</div>
			</div>
			<router-link
				to="/"
				class="text-primary text-2xl font-bold flex flex-shrink-0"
			>
				AntiPlag
			</router-link>
		</div>
	</nav>
</template>

<script>

export default {
	data: function() {
		return {
		};
	}
};
</script>