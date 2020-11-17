<template>
	<div>
		<router-link
			:to="'document/' + document.id"
			class="flex justify-between mb-3 p-2 text-black bg-white shadow rounded-lg hover-trigger"
			append
		>
			<span class="w-8 text-center mx-2">
				<i :class="filetype_i(document.name)"></i>
			</span>
			<span class="w-1/2">
				{{ document.name }}
			</span>
			<span class="w-1/4 text-center"> {{ document.percentage }}% </span>
			<span class="w-1/4 text-center">
				{{ document.matched_docs.length }}
			</span>
			<div class="w-2 mr-2">
				<i
					class="fas fa-angle-right hover-target text-2xl text-gray-600"
				></i>
			</div>
		</router-link>
	</div>
</template>

<script>
export default {
	props: {
		document: Object,
	},
	methods: {
		filetype_i: function (text) {
			var regex = /\.(.[^.]*)$/;
			var match = text.match(regex);
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

<style scoped>
.hover-trigger .hover-target {
	display: none;
}

.hover-trigger:hover .hover-target {
	display: block;
}
</style>
