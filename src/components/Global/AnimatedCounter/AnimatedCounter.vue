<template>
	<div
		class="flex flex-col justify-center items-center w-full text-center rounded-xl shadow-xl md:w-1/3 mx-0 md:mr-4 my-4 md:my-0 p-3 md:p-6 lg:p-10"
	>
		<template v-if="from !== undefined && to !== undefined">
			<h3
				class="font-bold text-4xl md:text-6xl mb-2 md:mb-4 leading-none"
			>
				<animate-number
					:ref="refName"
					v-view.once="() => playAnimation(refName)"
					:from="from"
					:to="to"
					duration="750"
					mode="manual"
				/>
				{{ contentText }}
			</h3>
			<p class="text-lg md:text-xl">
				{{ description }}
			</p>
		</template>

		<Spinner
			v-else
			:active="true"
			additionalClasses="text-white"
		/>
	</div>
</template>

<script>
import Spinner from '@/components/Global/Spinner/Spinner';

export default {
	components: {
		Spinner
	},
	props: {
		from: {
			type: Number,
			default: 0
		},
		to: {
			type: Number
		},
		refName: {
			type: String,
			required: true
		},
		contentText: {
			type: String,
			default: ''
		},
		description: {
			type: String,
			required: true
		}
	},
	methods: {
		playAnimation(ref) {
			this.$refs[ref].start();
		}
	}
};
</script>
