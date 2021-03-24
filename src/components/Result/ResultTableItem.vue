<template>
	<router-link
		:to="'document/' + document.id"
		class="flex items-center px-3 py-5 md:py-3 text-lg bg-white hover:bg-gray-100 border-t border-gray-200 group"
		append
	>
		<div class="w-5/12 md:w-6/12 truncate pr-2">
			<fa-icon
				class="w-4 md:w-8 mx-1 md:mx-2"
				:icon="getIcon(document.name).icon"
				:class="getIcon(document.name).cssClass"
			/>
			<span>
				{{ document.name ? document.name : 'Text' }}
			</span>
		</div>
		<span class="w-4/12 md:w-3/12 truncate text-center">
			{{ document.percentage | toNumber | roundToTwoDecimals }} %
		</span>
		<span class="w-3/12 md:w-2/12 truncate text-center">
			{{ document.matches }}
		</span>
		<div class="hidden md:flex justify-end md:w-1/12 mr-4">
			<fa-icon
				:icon="['fas', 'angle-right']"
				class="invisible group-hover:visible text-2xl text-gray-400"
			/>
		</div>
	</router-link>
</template>
<script>
export default {
	props: {
		document: { type: Object, required: true }
	},
	methods: {
		getIcon: function (filename) {
			// Plain text
			if (!filename) {
				return {
					icon: ['fas', 'file'],
					cssClass: 'text-gray-400 text-lg md:text-2xl'
				};
			}

			const regex = /\.(.[^.]*)$/;
			const match = filename.match(regex);
			switch (match[0]) {
				case '.pdf':
					return {
						icon: ['fas', 'file-pdf'],
						cssClass: 'text-red-500 text-lg md:text-2xl'
					};
				case '.docx':
				case '.doc':
					return {
						icon: ['fas', 'file'],
						cssClass: 'text-blue-500 text-lg md:text-2xl'
					};
				default:
					return {
						icon: ['fas', 'file'],
						cssClass: 'text-2x'
					};
			}
		}
	}
};
</script>
