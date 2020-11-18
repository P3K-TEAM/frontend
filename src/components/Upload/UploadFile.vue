<template>
	<div class="space-y-6">
		<div class="card-body border-3 border-gray-400 border-dashed 40vh">
			<div class="card-body flex flex-col justify-center bg-primary-100 hover:bg-white">
				<form ref="fileform" class="cursor-pointer">
					<div class="flex flex-col justify-center items-center space-y-2 py-8">
						<i class="fa fa-cloud-upload-alt text-gray-500 text-6xl"></i>
						<h2 class="text-xl font-semibold leading-6 text-gray-800">
							Pretiahnite súbory sem
						</h2>
						<p class="text-md text-gray-600">alebo</p>
						<div class="mx-auto my-4">
							<label
								class="flex text-white rounded shadow-md bg-primary-500 hover:bg-primary-400 px-6 py-2 
								cursor-pointer transition duration-500 ease select-none focus:outline-none"
							>
								Vybrať súbory
								<input
									id="files"
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
		
		<div v-show="this.$parent.files.length > 0" class="overflow-auto h-40 bg-primary-100 shadow-md">
			<div v-for="(file, key) in this.$parent.files" 
				:key="key" 
				class="flex justify-between items-center px-4 my-2 border-b-3 border-gray-400"
			>				
				<div class="flex items-center space-x-4">
					<i class="fas fa-file text-gray-500 text-3xl hover:text-gray-600"></i>
					<p> {{ file.name }} </p>					
				</div>
				<div>
					<button class="p-2 flex justify-center items-center focus:outline-none" v-on:click="removeFile( key )">
						<i class="fas fa-trash text-gray-500 text-2xl hover:text-gray-600"></i>					
					</button>
				</div>
			</div> 
		</div>
		
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			dragAndDropCapable: false,
            uploadPercentage: 0
		};
	},
	mounted(){
		this.dragAndDropCapable = this.determineDragAndDropCapable();              
		
		// If drag and drop capable, then we continue to bind events to our elements.
		if ( this.dragAndDropCapable ){
			
			// Listen to all of the drag events and bind an event listener to each for the fileform.
			['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
			
			// For each event add an event listener that prevents the default action (opening the file in the browser) 
			// and stop the propagation of the event (so no other elements open the file in the browser)		
			this.$refs.fileform.addEventListener(evt, function(e){
				e.preventDefault();
				e.stopPropagation();
			}.bind(this), false);
			}.bind(this));

			// Add an event listener for drop to the form
			this.$refs.fileform.addEventListener('drop', function(e){
				//  Capture the files from the drop event and add them to our local files array.
				for( let i = 0; i < e.dataTransfer.files.length; i++ ){
					this.$parent.files.push( e.dataTransfer.files[i] );
					console.log(this.$parent.files);                
				}				
			}.bind(this));	
		}
    }, 
	methods: {
		
		determineDragAndDropCapable() {
            var div = document.createElement('div');
            return ( ( 'draggable' in div )
                || ( 'ondragstart' in div && 'ondrop' in div ) )
                && 'FormData' in window
                && 'FileReader' in window;
		},
		
		removeFile(key) {
            this.$parent.files.splice( key, 1 );
		},
		
		handleFileUpload(event) {
			console.log(event);
			//this.files = this.$refs.files.files[0];

			for( let i = 0; i < this.$refs.files.files.length; i++ ){	
				this.$parent.files.push( this.$refs.files.files[i]);            
			}	
		},
	},
};
</script>
