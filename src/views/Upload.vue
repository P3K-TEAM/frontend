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

			<div class="px-20 pb-10 pt-5 space-y-8">
				<div>
					<div class="flex">
						<UploadTab
							v-for="tab in tabs"
							:key="tab"
							:title="tab"
							:active="tab === selectedTab"
							@click.native="selectedTab = tab"
						/>
					</div>
					<UploadFile ref="uploadfile" v-if="selectedTab === tabs[0]"
						v-on:sendFiles="handleFiles"
						v-on:removeFile="removeFiles"
						:files="files"
						/>
					<UploadText v-else :disabled="this.files.length > 0"
						v-on:sendText="handleText"
						/>				
				</div>
				<div class="text-right">
					<button v-on:click="submitFile"
						class="fmt-2 text-white rounded shadow-md bg-primary-500 hover:bg-primary-400 px-8 py-2
						cursor-pointer select-none focus:outline-none">Nahrať</button>
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
	methods: {	
		handleFiles(filesArray){
			Object.values(filesArray).forEach(file => {
				this.files.push(file);     
			});
		},
		handleText(text){
			this.text = this.text + text;
			console.log(this.text)
		},
		removeFiles(key){
			this.files.splice( key, 1 );
		},
		submitFile() {
			let formData = new FormData();

			this.files.forEach(file => {
				formData.append('file', file);
				formData.append('title', file.name);
			})
			
			// TODO (dmensa):
			/*
				Send text - the backend should differentiate between 
				content type html-www-form-encoded and plain/text and 
				should not require the title in case of the latter.
			*/

			if (!this.files.length && !this.text.length){
				return this.$store.dispatch('AlertStore/setAlert', {
					message: 'Nezadali ste súbor ani text, ktorý chcete skontrolovať !',
					type: 'error',
					duration: 4000,
				});	
			}
			
			this.$store.dispatch('setLoading',true);
			axios.post('http://localhost:8000/file/upload/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				}
			})
			.then((res) => {
				this.$store.dispatch('setLoading',false);
			})
			.catch((e) => {
				this.$store.dispatch('AlertStore/setAlert', {
					message: e.message,
					type: 'error',
					duration: 4000,
				});
			});
		},			
	},
	mounted() {
		this.selectedTab = this.tabs[0];
	},
};
</script>


<style>
.clip-half-circle {
	clip-path: ellipse(30% 100% at 22% 50%);
}

</style>
