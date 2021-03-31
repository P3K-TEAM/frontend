<template>
	<div class="flex flex-col flex-grow">
		<form
			ref="fileForm"
			class="flex flex-col space-y-2 justify-center items-center py-8 border-2 border-gray-300"
			:class="!!files.length ? 'h-64' : 'flex-grow md:space-y-6'"
		>
			<span>
				<fa-icon
					:icon="['fas', 'cloud-upload-alt']"
					class="hidden md:flex text-gray-300 text-6xl"
				/>
			</span>
			<h2
				class="hidden md:flex text-xl font-semibold leading-6 text-center text-gray-800"
			>
				{{ $t('dragFilesHere') }}
			</h2>
			<span class="hidden md:flex items-center text-base text-gray-400">
				{{ $t('or') }}
			</span>
			<div>
				<label
					class="text-white text-center py-2 px-3 md:px-5 rounded bg-primary-500 hover:bg-primary-400 cursor-pointer focus:outline-none"
				>
					{{ $t('chooseFiles') }}
					<input
						ref="files"
						type="file"
						multiple
						class="hidden"
						accept=".doc, .docx, .pdf, .pps, .pptx, text/plain, text/markdown, text/xml, text/rtf, text/html, text/pdf, text/csv, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation, image/*"
						@change="handleFileUpload"
					/>
				</label>
			</div>
		</form>

		<div
			v-if="!!files.length"
			class="flex-grow border-2 border-t-0 border-gray-300 rounded-b max-h-60 overflow-y-scroll"
		>
			<div
				v-for="(file, key) in files"
				:key="key"
				class="flex justify-between items-center px-3 md:px-4 py-1 border-b border-gray-200 group"
			>
				<div class="flex items-center space-x-2 md:space-x-4">
					<fa-icon
						:icon="['fas', 'file']"
						class="text-gray-400 text-lg md:text-2xl"
					/>
					<p class="">
						{{ file.name }}
					</p>
				</div>

				<button
					class="flex justify-center items-center p-2 mr-2 text-gray-300 hover:text-gray-400 invisible group-hover:visible"
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
