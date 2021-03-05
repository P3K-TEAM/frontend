<template>
	<router-link
		:to="'document/' + document.id"
		class="flex items-center mb-1 md:mb-3 md:mx-0 px-2 py-5 md:py-3 text-lg md:text-lg text-black bg-white hover:bg-gray-200 shadow rounded-md md:rounded-lg group"
		append
	>
		<div class="w-5/12 md:w-6/12 truncate pr-2">
			<i
				class="w-4 md:w-8 mx-1 md:mx-2"
				:class="getIcon(document.name)"
			/>
			<span>
				{{ document.name }}
			</span>
		</div>
		<span class="w-4/12 md:w-3/12 truncate text-center">
			{{ Number(document.percentage) | roundToTwoDecimals }} %
		</span>
		<span class="w-3/12 md:w-2/12 truncate text-center">
			{{ document.matches }}
		</span>
		<div class="hidden md:flex justify-end md:w-1/12 mr-4">
			<i
				class="fas fa-angle-right invisible group-hover:visible text-2xl text-gray-500"
			/>
		</div>
	</router-link>
</template>
<script>
export default {
	props: {
		document: { type: Object, required: true },
	},
	methods: {
		getIcon: function (text) {
			const regex = /\.(.[^.]*)$/;
			const match = text.match(regex);
			switch (match[0]) {
				case '.pdf':
					return 'fas fa-file-pdf text-red-500 text-lg md:text-2xl';
				case '.docx':
				case '.doc':
					return 'fas fa-file text-blue-500 text-lg md:text-2xl';
				default:
					return 'fas fa-file text-2x ';
			}
		},
	},
};
</script>
