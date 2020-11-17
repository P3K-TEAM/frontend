<template>
	<div class="bg-gray-300 min-h-screen">
		<div class="skewed-top-wrapper bg-primary-gradient text-white">
			<Navigation />
			<div
				class="container flex justify-between items-center mx-auto pt-16 pb-32"
			>
				<div class="w-2/3">
					<p class="text-4xl pb-4">Výsledky kontroly</p>
					<p class="text-xl">
						Gratulujeme! Nižšie nájdete podrobné štatistiky kontroly
						originality vašej práce.
					</p>
				</div>
			</div>
		</div>
		<div>
			<ResultTableDoc :documents="documents" />
		</div>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation';
import ResultTableDoc from '../../components/Result/ResultTableDoc';

export default {
	components: {
		Navigation,
		ResultTableDoc,
	},
	data: function () {
		return {
			id_result: 11,
			documents: [
				{
					id: 1,
					name: 'Document2.pdf',
					percentage: 0.15,
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus consequat ullamcorper. Proin a erat nunc. Aenean at gravida lorem,' +
						' vel iaculis lorem. Quisque bibendum suscipit velit in tincidunt. Quisque ut ipsum egestas risus pretium dignissim. Aliquam sit amet nibh eget felis ' +
						'dignissim ultrices. Cras ac ultricies libero. Sed eu tincidunt leo. Vivamus vestibulum dictum nisl ac tempus. Vestibulum ante ipsum primis' +
						' in faucibus orci luctus et ultrices posuere cubilia curae; Cras posuere consectetur nibh, vel molestie lacus finibus et. Nullam lectus mi,' +
						' aliquam quis enim ac, elementum vehicula metus.',
					matched_docs: [
						{
							name: '1.pdf',
							percentage: 0.45,

							matches: [
								{
									char_from: 15,
									char_to: 19,
								},
								{
									char_from: 15,
									char_to: 19,
								},
							],
						},
						{
							name: '2.pdf',
							percentage: 0.45,
							matches: [
								{
									char_from: 15,
									char_to: 19,
								},
								{
									char_from: 15,
									char_to: 19,
								},
							],
						},
					],
				},
			],
		};
	},
	methods: {
		getUnits: function () {
			if ((this.documents.length == 1 && this.documents.length != 0)) {
				this.$router.push({
					path: `/result/${this.id_result}/sdocument/${this.documents[0].id}`
				});
			}
		},
	},
	beforeMount() {
		this.getUnits();
	},
};
</script>

<style scoped>
.skewed-top-wrapper {
	clip-path: ellipse(95% 100% at 50% 0%);
}
</style>
