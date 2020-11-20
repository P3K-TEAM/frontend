<template>
	<div
		class="px-6 py-6 border-2 40vh border-gray-300 bg-white"
	>
		<form ref="form">
			<textarea :disabled="disabled"
				@change="handleText"
				class="w-full h-64 md:text-md focus:outline-none bg-white"
				:placeholder="disabled ? 'Text môžete zadať len ak nemáte vložený súbor' : 'Sem skopírujte text Vašej práce...' "	
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
			this.$emit('sendText', event.data);
		}		
	}	
}
</script>
