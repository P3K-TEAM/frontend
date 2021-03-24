<template>
	<div class="flex flex-col min-h-screen bg-primary-500">
		<div
			class="w-screen h-screen absolute bg-primary-gradient clip-half-circle"
		/>
		<Navigation class="z-10" />
		<div
			class="h-full flex flex-col items-start md:container md:mx-auto w-full mx-0 md:h-auto md:rounded-lg shadow-xl mt-0 md:my-12 bg-white z-10"
		>
			<div class="px-4 md:px-8 pt-3 md:pt-10 pb-1 md:pb-2">
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
			</div>
			<div
				class="w-full h-full md:h-auto px-0 md:px-20 pb-4 md:pb-8 pt-3 md:pt-5"
			>
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
			</div>

			<div
				class="flex flex-row justify-end items-center text-center w-full px-2 md:px-20 md:text-right pb-2 md:pb-10 mt-10 md:mt-10"
			>
				<label class="text-sm text-gray-500">
					<input
						v-model="userEmailProvided"
						name="emailProvidedCheckbox"
						type="checkbox"
						class="cursor-pointer"
					/>
					{{ $t('emailInputDescription') }}
				</label>
				<div class="flex-row pr-5">
					<input
						v-model="userEmailAddress"
						name="email"
						type="email"
						class="border border-dark rounded py-0.5 px-1 ml-1 text-gray-600"
						:disabled="!userEmailProvided"
						:class="{
							'cursor-not-allowed border-gray-300 bg-gray-200': !userEmailProvided
						}"
						:placeholder="$t('emailInputPlaceholder')"
					/>
				</div>

				<button
					type="button"
					class="fmt-2 w-full md:w-auto px-5 md:px-8 py-2 text-center text-base text-white bg-primary-500 hover:bg-primary-400 rounded shadow-md cursor-pointer select-none focus:outline-none"
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
import UploadTab from '@/components/Upload/UploadTab.vue';
import UploadFile from '@/components/Upload/UploadFile.vue';
import UploadText from '@/components/Upload/UploadText.vue';

export default {
	components: {
		Navigation,
		UploadTab,
		UploadFile,
		UploadText
	},
	data: function () {
		return {
			selectedTab: '',
			files: [],
			text: '',
			userEmailProvided: false,
			userEmailAddress: ''
		};
	},
	computed: {
		tabs() {
			return [this.$i18n.t('uploadFiles'), this.$i18n.t('uploadText')];
		}
	},
	mounted() {
		this.selectedTab = this.tabs[0];
	},
	methods: {
		updateFileList(fileList) {
			// Setting: Max number of files per request
			const fileLimit = 50;
			// Setting: Max size of a file in MB
			const fileSizeLimit = 20;

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
			const isFileUpload = this.selectedTab === this.tabs[0];

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
				headers = { 'Content-Type': 'text/plain' };

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
					isFileUpload ? formData : this.text,
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
						message: e.message,
						type: 'error'
					});
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
