<template>
<div class="bg-primary">
    <div class="container overflow-hidden sm:rounded-lg mx-auto mt-10 rounded shadow"
    style="background-color:#F4FCFF"
    data-e2e-id="uploadTab">

        <div class="px-4 py-5 sm:px-6">
            <h1 class="text-2xl leading-8 font-bold text-gray-900">Kontrola plagiátorstva</h1>
            <h3 class="text-md mt-2 leading-6 text-gray-800">Pridajte jednu alebo viac prác, ktoré si prajete skontrolovať. Nahrajte súbory alebo vložte text práce.</h3>
        </div>
        
        <div class="card card-default mx-8 pt-2 sm:p-6">
            
            <div class="card-header flex" >
                <UploadTab v-for="tab in tabs"
                        :key="tab"
                        :title="tab"
                        :active="tab === selectedTab"
                        @click.native="selectedTab = tab"                  
                    />
            </div>

            <div v-if="selectedTab === tabs[0]">
                <UploadFile></UploadFile>
            </div>
            <div v-if="selectedTab === tabs[1]">
                <UploadText></UploadText>
            </div>                
                        
        </div>   
    </div>
</div>   
</template>


<script>

import UploadTab from '@/components/UploadTab.vue';
import UploadFile from '@/components/UploadFile.vue';
import UploadText from '@/components/UploadText.vue';


export default {
    components: {
        UploadTab,
        UploadFile,
        UploadText
    },
    data: function () {
        return {
            selectedTab: '',
            tabs: ['Nahrať súbory','Vložiť text']
        }
        
    },
    mounted() {
		this.selectedTab = this.tabs[0];
    },
}

</script>

<style>
.40vh {
    height: 40vh;
}
</style>


