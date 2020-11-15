<template>
	<div id="app" class="flex flex-col h-full">
		<router-view class="flex-auto" />
		<Alert />
		<Modal />
	</div>
</template>

<script>
import Alert from '@/components/Alert/Alert';
import Modal from '@/components/Modal/Modal';

export default {
	components: {
		Alert,
		Modal,
	},
	mounted() {
		this.$store.dispatch('ModalStore/setModal', {
			header: '',
			text:
				'Lord, yer not fighting me without a beauty! Small, mysterious dosis',
			confirmation: {
				enabled: true,
				callback: () => {},
			},
		});
	},
};
</script>
