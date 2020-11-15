<template>
	<div id="app" class="flex flex-col h-full">
		<router-view class="flex-auto" />
		<Alert />
		<Backdrop>
			<Spinner />
			<Modal />
		</Backdrop>
	</div>
</template>

<script>
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
};
</script>
