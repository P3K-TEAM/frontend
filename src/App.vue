<template>
	<div id="app" class="flex flex-col h-full">
		<router-view class="flex-auto flex-shrink-0" />
		<Alert />
		<Backdrop>
			<Spinner :active="isLoading" :message="loadingMessage" />
			<Modal />
		</Backdrop>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Alert from '@/components/Global/Alert/Alert';
import Backdrop from '@/components/Global/Backdrop/Backdrop';
import Modal from '@/components/Global/Modal/Modal';
import Spinner from '@/components/Global/Spinner/Spinner';

export default {
	components: {
		Alert,
		Backdrop,
		Modal,
		Spinner,
	},
	computed: {
		...mapGetters(['isLoading', 'loadingMessage']),
	},
};
</script>
