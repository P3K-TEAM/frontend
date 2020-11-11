<template>
	<div
		class="tab flex border-primary pt-3 pb-2 text-white cursor-pointer hover:text-gray-600 whitespace-no-wrap"
		:class="{ 'border-b-3': active }"

	>
		{{ title }}
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'Tab'
		},
		active: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="scss" scoped>
.tab {
	@apply px-4;

	// smaller screens
	@media only screen and (max-width: 640px) {
		& {
			@apply px-2;
		}
	}
}
</style>
