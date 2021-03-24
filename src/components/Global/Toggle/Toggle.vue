<template>
	<div class="text-gray-400 shadow rounded-md">
		<router-link
			v-tooltip.top="buttons[0].tooltip"
			:to="buttons[0].url"
			class="inline-block text-center w-10 toggle py-1 px-3 border border-r-0 border-gray-400 rounded-tl-md rounded-bl-md"
		>
			<fa-icon :icon="buttons[0].icon" />
		</router-link>
		<router-link
			v-tooltip.top="buttons[1].tooltip"
			:to="buttons[1].url"
			class="inline-block text-center w-10 toggle py-1 border border-gray-400 rounded-tr-md rounded-br-md"
		>
			<fa-icon :icon="buttons[1].icon" />
		</router-link>
	</div>
</template>

<script>
export default {
	props: {
		buttons: {
			type: Array,
			required: true
		}
	},
	data: function () {
		return {};
	}
};
</script>

<style lang="scss">
.toggle {
	&.router-link-exact-active {
		@apply bg-white;
	}

	&:not(&.router-link-exact-active) {
		@apply bg-gray-300;
	}
}
</style>
