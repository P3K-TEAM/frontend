<template>
	<Table
		:header="header"
		:data="data"
		:options="options"
	>
		<template
			#tableItemTemplate="{ tableItem }"
			data-test-id="documentMatchesItem"
		>
			<td
				:class="options.layout[0]"
				data-test-id="documentMatchesItemName"
			>
				<span>
					{{ tableItem.name }}
				</span>
			</td>

			<td
				class="truncate text-center"
				:class="options.layout[1]"
				data-test-id="documentMatchesItemPercentage"
			>
				{{ tableItem.percentage | toNumber | roundToTwoDecimals }} %
			</td>

			<td
				class="hidden md:flex justify-end mr-4"
				:class="options.layout[2]"
			>
				<fa-icon
					:icon="['fas', 'eye']"
					class="invisible group-hover:visible text-xl text-gray-400"
				/>
			</td>
		</template>
	</Table>
</template>

<script>
import Table from '@/components/Global/Table/Table';

export default {
	components: {
		Table
	},
	computed: {
		options() {
			return {
				layout: ['w-8/12 text-left', 'w-3/12', 'w-1/12'],
				itemName: this.$i18n.t('matches'),
				onClick: item =>
					this.$router.push({
						name: `compare`,
						params: {
							document: this.$route.params.document,
							compare: item.id
						}
					})
			};
		},
		header() {
			return {
				items: [
					{
						name: this.$i18n.t('file')
					},
					{
						name: this.$i18n.t('fileMatch'),
						classes: 'text-center'
					},
					{
						name: ''
					}
				]
			};
		},
		data() {
			return {
				items: this.$store.getters['DocumentStore/matches'],
				empty: this.$i18n.t('documentZeroMatchesCongratulationsMessage')
			};
		}
	}
};
</script>
