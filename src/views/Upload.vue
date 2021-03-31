<template>
	<div class="flex flex-col min-h-screen bg-primary-500">
		<!-- background -->
		<div
			class="w-screen h-screen absolute bg-primary-gradient clip-half-circle"
		/>

		<Navigation class="z-10" />

		<div
			class="flex flex-col flex-grow md:container md:mx-auto mb-20 p-4 md:p-10 z-10 bg-white rounded-lg shadow-xl"
		>
			<h1
				class="text-xl md:text-3xl leading-normal md:leading-10 font-bold text-gray-900"
			>
				{{ $t('antiplagCheck') }}
			</h1>
			<h3
				class="text-base md:text-xl mt-1 md:mt-2 leading-6 md:leading-8 text-gray-800"
			>
				{{ $t('uploadDescription') }}
			</h3>

			<Tabs
				:tabs="tabs"
				:selectedTab.sync="selectedTab"
				class="mt-4"
			/>

			<UploadFile
				v-if="selectedTab === tabs[0].key"
				:files="files"
				@update-files="updateFileList"
				@remove-file="removeFile"
			/>

			<UploadText v-else @text-change="updateText" />

			<div
				class="flex flex-col md:flex-row justify-end items-center text-center mt-6"
			>
				<div class="flex flex-row items-center text-gray-500">
					<label class="flex flex-row text-xs md:text-sm text-left">
						<input
							v-model="userEmailProvided"
							name="emailProvidedCheckbox"
							type="checkbox"
							class="cursor-pointer mr-2"
						/>
						{{ $t('emailInputDescription') }}
					</label>
					<div class="flex-row pr-5">
						<input
							v-model="userEmailAddress"
							name="email"
							type="email"
							class="w-48 py-1 px-2 ml-2 border text-sm border-dark text-gray-600 rounded"
							:disabled="!userEmailProvided"
							:class="{
								'cursor-not-allowed border-gray-300 bg-gray-200': !userEmailProvided
							}"
							:placeholder="$t('emailInputPlaceholder')"
						/>
					</div>
				</div>

				<button
					type="button"
					class="w-full md:w-auto py-1 px-5 md:px-8 mt-4 md:mt-0 text-white bg-primary-500 hover:bg-primary-400 rounded focus:outline-none"
					@click="submitForm"
				>
					{{ $t('uploadSubmitButton') }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import Navigation from '@/components/Global/Navigation/Navigation.vue';
import Tabs from '@/components/Global/Tabs/Tabs';
import UploadFile from '@/components/Upload/UploadFile.vue';
import UploadText from '@/components/Upload/UploadText.vue';
import { fileLimit, fileSizeLimit } from '@/constants/submission';

export default {
	components: {
		Navigation,
		Tabs,
		UploadFile,
		UploadText
	},
	data: function () {
		return {
			selectedTab: 'file',
			files: [],
			text: '',
			userEmailProvided: false,
			userEmailAddress: ''
		};
	},
	computed: {
		tabs() {
			return [
				{
					key: 'file',
					title: this.$i18n.t('uploadFiles'),
					disabled: this.text !== '',
					disabledMessage: this.$i18n.t('uploadFileDisabledMessage')
				},
				{
					key: 'text',
					title: this.$i18n.t('uploadText'),
					disabled: !!this.files.length,
					disabledMessage: this.$i18n.t('uploadTextDisabledMessage')
				}
			];
		}
	},
	methods: {
		updateFileList(fileList) {
			const filteredFileArray = Array.from(fileList).filter(
				file => file.size <= fileSizeLimit * 1024 * 1024
			);
			const requestContainsLargeFile =
				fileList.length !== filteredFileArray.length;

			if (requestContainsLargeFile) {
				this.$store.dispatch('AlertStore/setAlert', {
					message: this.$i18n.t('uploadFileSizeLimitError', {
						fileSizeLimit
					}),
					type: 'error'
				});
			}

			this.files = [...this.files, ...filteredFileArray];
			if (this.files.length > fileLimit) {
				this.$store.dispatch('AlertStore/setAlert', {
					message: this.$i18n.t('uploadFileLimitError', {
						fileLimit
					}),
					type: 'error'
				});
				this.files = this.files.slice(0, fileLimit);
			}
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
			let requestBody = {};
			const isFileUpload = this.selectedTab === this.tabs[0].key;

			if (isFileUpload) {
				headers = { 'Content-Type': 'multipart/form-data' };

				this.files.forEach(file => formData.append('files', file));

				if (!this.files.length) {
					return this.$store.dispatch('AlertStore/setAlert', {
						message: this.$i18n.t('uploadFileNotProvidedError'),
						type: 'error'
					});
				}
			} else {
				headers = { 'Content-Type': 'application/json' };

				if (!this.text.length) {
					return this.$store.dispatch('AlertStore/setAlert', {
						message: this.$i18n.t('uploadTextNotProvidedError'),
						type: 'error'
					});
				}

				requestBody.text = this.text;
			}

			// If user provided their address, append into request body
			if (this.userEmailProvided) {
				const userEmailAddress = this.userEmailAddress.trim();

				if (userEmailAddress === '') {
					return this.$store.dispatch('AlertStore/setAlert', {
						message: this.$i18n.t('uploadEmailNotProvidedError'),
						type: 'error'
					});
				}

				if (isFileUpload) {
					formData.append('email', userEmailAddress);
				} else {
					requestBody.email = userEmailAddress;
				}
			}

			this.$store.dispatch('setLoading', true);
			this.$store.dispatch('AlertStore/dismissAlert');

			this.$axios
				.post(
					'/api/submissions/',
					isFileUpload ? formData : requestBody,
					{
						headers
					}
				)
				.then(response => {
					return this.$router.push({
						name: 'result',
						params: { result: response.data.id }
					});
				})
				.catch(e => {
					this.$store.dispatch('AlertStore/setAlert', {
						message:
							e.response.data && e.response.data.error
								? e.response.data.error
								: e.message,
						type: 'error'
					});
					this.$store.dispatch('setLoading', false);
				});
		}
	}
};
</script>

<style>
.clip-half-circle {
	clip-path: ellipse(30% 100% at 22% 50%);
}
</style>
