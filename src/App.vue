<template>
	<div id="app">
		<Alert />
		<Backdrop>
			<Spinner :active="isLoading" :message="loadingMessage" />
			<Modal />
		</Backdrop>
		<router-view class="flex flex-col min-h-screen" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Alert from '@/components/Global/Alert/Alert';
import Backdrop from '@/components/Global/Backdrop/Backdrop';
import Modal from '@/components/Global/Modal/Modal';
import Spinner from '@/components/Global/Spinner/Spinner';
import { getPreferredLanguage, setPreferredLanguage } from '@/utilities/language.utility';

export default {
	components: {
		Alert,
		Backdrop,
		Modal,
		Spinner
	},
	computed: {
		...mapGetters(['isLoading', 'loadingMessage'])
	},
	mounted() {
		// if user's language preference exists in localstorage, set it
		const userPreferredLanguage = getPreferredLanguage();
		setPreferredLanguage(this, userPreferredLanguage);
	}
};
</script>
