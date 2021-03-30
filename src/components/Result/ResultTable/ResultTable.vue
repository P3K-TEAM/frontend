<template>
	<Table
		:header="header"
		:data="data"
		:options="options"
	>
		<template #tableItemTemplate="{ tableItem }">
			<td class="truncate pr-2" :class="options.layout[0]">
				<fa-icon
					class="w-4 md:w-8 mr-1 md:mr-2"
					:icon="getIcon(tableItem.name).icon"
					:class="getIcon(tableItem.name).cssClass"
				/>
				<span>
					{{ tableItem.name }}
				</span>
			</td>

			<td class="truncate text-center" :class="options.layout[1]">
				{{ tableItem.percentage | toNumber | roundToTwoDecimals }} %
			</td>

			<td class="truncate text-center" :class="options.layout[2]">
				{{ tableItem.matches }}
			</td>

			<td
				class="hidden md:flex justify-end mr-4"
				:class="options.layout[3]"
			>
				<fa-icon
					:icon="['fas', 'angle-right']"
					class="invisible group-hover:visible text-2xl text-gray-400"
				/>
			</td>
		</template>
	</Table>
</template>

<script>
import Table from '@/components/Global/Table/Table';
import { getFileIcon } from '@/functions/get-file-icon.function';

export default {
	components: {
		Table
	},
	computed: {
		options() {
			return {
				layout: [
					'w-5/12 md:w-6/12 text-left',
					'w-4/12 md:w-3/12',
					'w-3/12 md:w-2/12',
					'md:w-1/12'
				],
				itemName: this.$i18n.t('results'),
				onClick: item =>
					this.$router.push({
						name: 'document',
						params: { document: item.id }
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
						name: this.$i18n.t('matchPercentage'),
						classes: 'text-center'
					},
					{
						name: this.$i18n.t('numOfMatches'),
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
				items: this.$store.getters['ResultStore/documents']
			};
		}
	},
	methods: {
		getIcon: getFileIcon
	}
};
</script>
