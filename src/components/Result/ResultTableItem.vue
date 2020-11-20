<template>
	<router-link
		:to="'document/' + document.id"
		class="flex items-center mb-3 px-2 py-3 text-black bg-white hover:bg-gray-200 shadow rounded-lg group"
		append
	>
		<div class="w-6/12">
			<i class="w-8 text-center mx-2" :class="getIcon(document.name)" />
			<span>
				{{ document.name }}
			</span>
		</div>
		<span class="w-3/12 text-center"> {{ document.percentage }}% </span>
		<span class="w-2/12 text-center">
			{{ document.matches }}
		</span>
		<div class="flex justify-end w-1/12 mr-4">
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
					return 'fas fa-file-pdf text-red-500 text-2xl';
				case '.docx':
				case '.doc':
					return 'fas fa-file text-blue-500 text-2xl';
				default:
					return 'fas fa-file text-2x ';
			}
		},
	},
};
</script>
