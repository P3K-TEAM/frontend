<template>
	<div class="flex flex-col min-h-screen bg-primary-500">
		<div
			class="w-screen h-screen absolute bg-primary-gradient clip-half-circle"
		/>
		<Navigation class="z-10" />
		<div class="container mx-auto rounded-lg shadow-xl my-12 bg-white z-10">
			<div class="px-8 pt-10 pb-2">
				<h1 class="text-3xl leading-10 font-bold text-gray-900">
					Kontrola plagiátorstva
				</h1>
				<h3 class="text-xl mt-2 leading-8 text-gray-800">
					Pridajte jednu alebo viac prác, ktoré si prajete
					skontrolovať. Nahrajte súbory alebo vložte text práce.
				</h3>
			</div>
			<div class="px-20 pb-10 pt-5">
				<div class="flex">
					<UploadTab
						v-for="tab in tabs"
						:key="tab"
						:title="tab"
						:active="tab === selectedTab"
						@click.native="selectedTab = tab"
					/>
				</div>
				<UploadFile
					v-if="selectedTab === tabs[0]"
					:files="files"
					@update-files="updateFileList"
					@remove-file="removeFile"
				/>
				<UploadText
					v-else
					:disabled="files.length > 0"
					@text-change="updateText"
				/>
				<div class="text-right mt-6">
					<button
						type="button"
						class="fmt-2 text-white rounded shadow-md bg-primary-500 hover:bg-primary-400 px-8 py-2 cursor-pointer select-none focus:outline-none"
						@click="submitForm"
					>
						Nahrať
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import UploadTab from '@/components/Upload/UploadTab.vue';
import UploadFile from '@/components/Upload/UploadFile.vue';
import UploadText from '@/components/Upload/UploadText.vue';

import axios from 'axios';

export default {
	components: {
		Navigation,
		UploadTab,
		UploadFile,
		UploadText,
	},
	data: function () {
		return {
			selectedTab: '',
			tabs: ['Nahrať súbory', 'Vložiť text'],
			files: [],
			text: '',
		};
	},
	mounted() {
		this.selectedTab = this.tabs[0];
	},
	methods: {
		updateFileList(fileArray) {
			this.files = [...this.files, ...fileArray];
		},
		updateText(text) {
			this.text = text;
		},
		removeFile(key) {
			this.files.splice(key, 1);
		},
		submitForm() {
			const formData = new FormData();
			let headers = '';
			const isFileUpload = this.selectedTab === this.tabs[0];

			if (isFileUpload) {
				headers = { 'Content-Type': 'multipart/form-data' };

				this.files.forEach((file) => formData.append('files', file));

				if (!this.files.length) {
					return this.$store.dispatch('AlertStore/setAlert', {
						message:
							'Nezadali ste súbor, ktorý chcete skontrolovať !',
						type: 'error',
					});
				}
			} else {
				headers = { 'Content-Type': 'text/plain' };

				if (!this.text.length) {
					return this.$store.dispatch('AlertStore/setAlert', {
						message:
							'Nezadali ste text, ktorý chcete skontrolovať !',
						type: 'error',
					});
				}
			}

			this.$store.dispatch('setLoading', true);
			this.$axios
				.post('api/submissions/', isFileUpload ? formData : this.text, {
					headers,
				})
				.then((response) => {
					this.$router.push({
						name: 'result',
						params: { result: response.data.id },
					});
				})
				.catch((e) => {
					this.$store.dispatch('AlertStore/setAlert', {
						message: e.message,
						type: 'error',
					});
				});
		},
	},
};
</script>

<style>
.clip-half-circle {
	clip-path: ellipse(30% 100% at 22% 50%);
}
</style>
