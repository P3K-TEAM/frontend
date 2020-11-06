<template>
<div class="card-body flex justify-center border-3 border-gray-400 border-dashed 40vh">
    <div class="flex flex-col justify-center items-center">
        <i class="fa fa-cloud-upload-alt my-8 text-gray-400 text-6xl"></i>
        <h3 class="my-1 text-md leading-5 text-gray-800">Pretiahnite súbory sem</h3>
        <p class="my-1 text-md text-gray-600">
            alebo
        </p>
        <div class="mx-auto my-4">
            <label class="btn btn-default text-white rounded-md flex flex-col items-center bg-primary px-4 py-2 m-2 shadow-md 
                        cursor-pointer transition duration-500 ease select-none hover:bg-gray-600 focus:outline-none focus:shadow-outline">
                        Vybrať súbory
                <input type="file" id="file" ref="file" class="hidden" v-on:change="handleFileUpload" multiple>
            </label>
            <button v-on:click="submitFile">Submit</button>
        </div>
    </div>
</div>
</template>

<script>

import axios from "axios";

export default {
    
    data(){
        return {
            file: undefined
        }
    },
    methods: {
        handleFileUpload(event){
            console.log(event);
            // this.file = this.$refs.file.files;
             this.file = this.$refs.file.file[0];
        },
        submitFile(){
            let formData = new FormData();
            /*for( var i = 0; i < this.files.length; i++ ){
                let file = this.files[i];

                formData.append('files[' + i + ']', file);
            }*/
            formData.append('file',this.file)
            axios.post('http://localhost:8000/file/upload', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                    console.log(res)
            }).catch(function(e){
                console.log("Chyba", e);
            });
        },
    }
}
</script>
