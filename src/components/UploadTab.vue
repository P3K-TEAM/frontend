<template>
<div class="first:border-r-2 w-1/2 border-gray-300 inline-block bg-white cursor-pointer text-gray-800 hover:text-gray-600">
		
	<div class="text-center border-gray-400 border-t-4 py-3 "
		:class="{ 'border-primary': active }"
		data-e2e-id="uploadTab"
		:data-e2e-active="active"

	>
    {{ title }}
	</div>
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

<style lang="scss">

</style>
