<template>
	<div class="h-full flex flex-col space-y-2 md:space-y-6">
		<div
			class="h-full flex flex-col items-center border-3 border-gray-400 border-dashed 40vh"
		>
			<div
				class="h-full flex flex-col items-center justify-center bg-white"
			>
				<form ref="fileForm">
					<div
						class="flex flex-col justify-center items-center md:space-y-2 py-8"
					>
						<span>
							<fa-icon
								:icon="['fas', 'cloud-upload-alt']"
								class="hidden md:flex text-gray-400 text-6xl"
							/>
						</span>
						<h2
							class="hidden md:flex text-xl font-semibold leading-6 text-center text-gray-800"
						>
							{{ $t('dragFilesHere') }}
						</h2>
						<span
							class="hidden md:flex items-center text-base text-gray-600"
						>
							{{ $t('or') }}
						</span>
						<div>
							<label
								class="flex text-white text-center text-base py-2 px-3 md:px-6 rounded shadow-md bg-primary-500 hover:bg-primary-400 cursor-pointer select-none focus:outline-none"
							>
								{{ $t('chooseFiles') }}
								<input
									ref="files"
									type="file"
									multiple
									class="hidden"
									@change="handleFileUpload"
								/>
							</label>
						</div>
					</div>
				</form>
			</div>
		</div>

		<div v-show="!!files.length" class="md:overflow-auto md:h-40 bg-white">
			<div
				v-for="(file, key) in files"
				:key="key"
				class="flex justify-between items-center px-3 md:px-4 py-1 border-b-3 border-gray-400"
			>
				<div class="flex items-center space-x-2 md:space-x-4">
					<fa-icon
						:icon="['fas', 'file']"
						class="text-gray-500 text-lg md:text-3xl"
					/>
					<p class="text-sm md:text-lg">
						{{ file.name }}
					</p>
				</div>

				<button
					class="p-2 flex justify-center items-center focus:outline-none text-gray-500 hover:bg-gray-100 hover:text-gray-600"
					@click="removeFile(key)"
				>
					<fa-icon
						:icon="['fas', 'trash']"
						class="text-lg md:text-2xl"
					/>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		files: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			dragAndDropCapable: false
		};
	},
	mounted() {
		this.dragAndDropCapable = this.determineDragAndDropCapable();

		if (this.dragAndDropCapable) {
			[
				'drag',
				'dragstart',
				'dragend',
				'dragover',
				'dragenter',
				'dragleave',
				'drop'
			].forEach(
				function (evt) {
					this.$refs.fileForm.addEventListener(
						evt,
						function (e) {
							e.preventDefault();
							e.stopPropagation();
						}.bind(this),
						false
					);
				}.bind(this)
			);

			this.$refs.fileForm.addEventListener(
				'drop',
				function (e) {
					this.$emit('update-files', e.dataTransfer.files);
				}.bind(this)
			);
		}
	},
	methods: {
		determineDragAndDropCapable() {
			let div = document.createElement('div');
			return (
				('draggable' in div ||
					('ondragstart' in div && 'ondrop' in div)) &&
				'FormData' in window &&
				'FileReader' in window
			);
		},
		removeFile(key) {
			this.$emit('remove-file', key);
		},
		handleFileUpload() {
			this.$emit('update-files', this.$refs.files.files);
		}
	}
};
</script>
