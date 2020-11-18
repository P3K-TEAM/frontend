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

			<div v-if="submitted === false" class="px-20 pb-10 pt-5 space-y-6">
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
					<UploadFile v-if="selectedTab === tabs[0]" />
					<UploadText v-else-if="this.files.length > 0" :disabled="true"/>
					<UploadText v-else :disabled="false"/>				
				</div>
				
				<div class="flex flex-row-reverse">
					<button v-on="{ click: selectedTab === tabs[0] ? submitFile : submitText }"
						class="text-white rounded shadow-md bg-primary-500 hover:bg-primary-400 px-8 py-2
						cursor-pointer transition duration-500 ease select-none focus:outline-none" 
						type="submit">Nahrať</button>
				</div>
				
			</div>
			 
			<div v-else class="px-20 pb-10 pt-5 space-y-6 ">
				<div class="flex bg-primary-100 z-50 space-x-6 py-10 text-center">
					
					 <svg
						viewBox="0 0 100 100"
						class="text-primary-500 stroke-current progress_circle w-32"
					>
						<circle cx="50" cy="50" r="40" 
						:style="{ 'stroke-dashoffset':  251 - (uploadPercentage /100) * 251}"/>
					</svg>
					
					</div>
				<h3 class="text-center text-xl mt-2 leading-8 text-gray-800"> Nahráva sa: {{ uploadPercentage }} % </h3>
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
			uploadPercentage: 0,
			submitted: false,	
			alert: {
				message: 'Nezadali ste súbor ani text, ktorý chcete skontrolovať !',
				type: 'error',
				duration: 4000,
			}
		};
	},
	methods: {
		submitText(){
			//console.log('text');
			let formData = new FormData();

			formData.append('file', this.text);
			formData.append('title','text...');

			if (this.text.length == 0){
				return this.$store.dispatch('AlertStore/setAlert', this.alert);
			}
			axios.post('http://localhost:8000/file/upload/', formData, {
				headers: {
					'Content-Type': 'text/plain',
				},
				onUploadProgress: function( progressEvent ) {
					this.submitted = true
					this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
					//console.log(this.uploadPercentage);					
				}.bind(this)
			})
			.then((res) => {
				console.log('SUCCESS!!' + res);
			})
			.then(() =>{
				this.$store.dispatch('setLoading',false);
			})
			.catch(function (e) {
				console.log('FAILURE!!' + e);
			});
		},
		
		submitFile() {
			let formData = new FormData();

			for( var i = 0; i < this.files.length; i++ ){
				let file = this.files[i];
				//formData.append('file[' + i + ']', file);
				//formData.append('title[' + i + ']', file.name);
				formData.append('file', file);
				formData.append('title', file.name);
				console.log('subor' + i + ': ' + file.name)					
			}
			if (this.files.length == 0){
				return this.$store.dispatch('AlertStore/setAlert', this.alert);
			}
			
			this.$store.dispatch('setLoading',true);
			axios.post('http://localhost:8000/file/upload/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: function( progressEvent ) {
					this.submitted = true
					this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
					//console.log(this.uploadPercentage);		
				}.bind(this)
			})
			.then((res) => {
				console.log('SUCCESS!!' + res);
			})
			.then(() =>{
				this.$store.dispatch('setLoading',false);
			})
			.catch(function (e) {
				console.log('FAILURE!!' + e);
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


svg.progress_circle {
	display: block;
	height: 100%;
	max-width: 100px;
	margin: auto;
	/* animation: 2s linear infinite spinner-animation; */
}

svg.progress_circle > circle {
	
	display: block;
	fill: transparent;
	stroke: #00b5ff;
	stroke-linecap: round;
	stroke-dasharray: 251;
	/* stroke-dashoffset: 125; */
	stroke-width: 12px;
	transform-origin: 50% 50%;
}


</style>
