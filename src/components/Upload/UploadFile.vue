<template>
	<div class="space-y-6">
		<div class="border-3 border-gray-400 border-dashed 40vh">
			<div class="flex flex-col justify-center bg-white">
				<form ref="fileForm">
					<div
						class="flex flex-col justify-center items-center space-y-2 py-8"
					>
						<i
							class="fa fa-cloud-upload-alt text-gray-400 text-6xl"
						/>
						<h2
							class="text-xl font-semibold leading-6 text-gray-800"
						>
							Pretiahnite súbory sem
						</h2>
						<span class="text-md text-gray-600"> alebo </span>
						<div>
							<label
								class="flex text-white rounded shadow-md bg-primary-500 hover:bg-primary-400 px-6 py-2 cursor-pointer select-none focus:outline-none"
							>
								Vybrať súbory
								<input
									ref="files"
									type="file"
									multiple
									class="hidden"
									@change="handleFileUpload"
								>
							</label>
						</div>
					</div>
				</form>
			</div>
		</div>

		<div v-show="!!files.length" class="overflow-auto h-40 bg-white">
			<div
				v-for="(file, key) in files"
				:key="key"
				class="flex justify-between items-center px-4 py-1 border-b-3 border-gray-400"
			>
				<div class="flex items-center space-x-4">
					<i class="fas fa-file text-gray-500 text-3xl" />
					<p>{{ file.name }}</p>
				</div>

				<button
					class="p-2 flex justify-center items-center focus:outline-none text-gray-500 hover:bg-gray-100 hover:text-gray-600"
					@click="removeFile(key)"
				>
					<i class="fas fa-trash text-2xl" />
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
			required: true,
		},
	},
	data() {
		return {
			dragAndDropCapable: false,
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
				'drop',
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
		},
	},
};
</script>
