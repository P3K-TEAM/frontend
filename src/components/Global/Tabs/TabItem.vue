<template>
	<div
		v-tooltip="tab.disabled && { content: tab.disabledMessage }"
		class="inline-block w-1/2 text-gray-800 hover:text-gray-600 border-t-4"
		:class="{
			'bg-white border-primary-500': active,
			'bg-gray-100 border-gray-300': !active,
			'cursor-not-allowed': tab.disabled,
			'cursor-pointer hover:bg-gray-50': !tab.disabled && !active
		}"
	>
		<div
			class="text-center text-base md:text-lg py-2 md:py-3 border-gray-300"
			:class="{
				'border-l-2 border-r': isFirst,
				'border-l border-r-2': isLast
			}"
		>
			{{ tab.title }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		tab: {
			type: Object,
			required: true
		},
		active: {
			type: Boolean,
			default: false
		},
		isFirst: {
			type: Boolean,
			default: false
		},
		isLast: {
			type: Boolean,
			default: false
		}
	}
};
</script>
