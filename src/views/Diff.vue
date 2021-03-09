<template>
	<div class="bg-gray-300 min-h-screen">
		<ResultHeader
			title="Podobnosť dokumentov:"
			:documents= "[documents.nazov1,documents.nazov2]"
		/>

	</div>
</template>

<script>

import ResultHeader from '../components/Result/ResultHeader';

export default {
	components: {
		ResultHeader,
	},
	data: function () {
		return {
			id: undefined,
			documents: {
				nazov1: "moj_dokument.docs",
				nazov2: "cudzi_dokument.docs"
			},
		};
	},
	created: function () {},
	mounted: function () {},
};
</script>
