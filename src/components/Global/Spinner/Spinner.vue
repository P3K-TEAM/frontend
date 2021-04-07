<template>
	<div>
		<svg
			v-if="active"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current spinner w-16"
			:class="additionalClasses"
		>
			<circle
				cx="50"
				cy="50"
				r="45"
			/>
		</svg>
		<div v-if="message">
			<p class="m-4 text-xl text-white text-center">
				{{ message }}
			</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		active: {
			type: Boolean,
			required: true
		},
		message: {
			type: String,
			default: ''
		},
		additionalClasses: {
			type: String,
			default: 'text-primary-500'
		}
	}
};
</script>
