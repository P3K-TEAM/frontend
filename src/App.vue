<template>
	<div id="app" class="flex flex-col h-full">
		<router-view class="flex-auto" />
		<Alert />
	</div>
</template>

<script>
import Alert from '@/components/Alert/Alert';

export default {
	components: {
		Alert,
	},
};
</script>
