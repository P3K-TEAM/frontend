<template>
	<div class="flex flex-row">
		<TabItem
			v-for="(tab, index) in tabs"
			:key="index"
			:tab="tab"
			:active="selectedTab === tab.key"
			:is-first="index === 0"
			:is-last="index === tabs.length - 1"
			@click.native="markTabAsSelected(tab)"
		/>
	</div>
</template>

<script>
import TabItem from '@/components/Global/Tabs/TabItem';

export default {
	components: {
		TabItem
	},
	props: {
		tabs: {
			type: Array,
			required: true
		},
		selectedTab: {
			type: String,
			required: true
		}
	},
	methods: {
		markTabAsSelected(tab) {
			if (!tab.disabled) {
				this.$emit('update:selectedTab', tab.key);
			}
		}
	}
};
</script>
