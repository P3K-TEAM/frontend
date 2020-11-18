<template>
	<div
		class="card-body justify-center px-6 py-6 border-2 40vh border-gray-300 bg-white"
	>
		<form ref="form">
			<textarea v-if="disabled" disabled
				class="w-full h-64 md:text-md focus:outline-none bg-white"
				placeholder="Text môžete zadať len ak nemáte vložený žiadny súbor..."
			></textarea>
			
			<textarea ref="text"
				class="w-full h-48 md:text-md focus:outline-none bg-white"
				@input="handleText"
				placeholder="Sem skopírujte text Vašej práce..." 
			></textarea>
		
		</form>
	</div>
</template>


<script>
export default {
	props: {
		disabled: {
			type: Boolean,
			default: false,
		}
	},

	methods: {
		handleText(event){
			this.$parent.text = this.$parent.text + event.data;				
		}		
	}	
}
</script>