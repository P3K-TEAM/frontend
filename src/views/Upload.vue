<template>
	<div class="flex flex-col min-h-screen bg-primary-500">
		<div
			class="w-screen h-screen absolute bg-primary-gradient clip-half-circle"
		/>
		<Navigation class="z-10" />
		<div class="container mx-auto rounded-lg shadow-xl mt-12 bg-white z-10">
			<div class="px-4 py-5 sm:px-6">
				<h1 class="text-2xl leading-8 font-bold text-gray-900">
					Kontrola plagiátorstva
				</h1>
				<h3 class="text-md mt-2 leading-6 text-gray-800">
					Pridajte jednu alebo viac prác, ktoré si prajete
					skontrolovať. Nahrajte súbory alebo vložte text práce.
				</h3>
			</div>

			<div class="px-16 py-10">
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
				<UploadText v-else />
			</div>
		</div>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import UploadTab from '@/components/Upload/UploadTab.vue';
import UploadFile from '@/components/Upload/UploadFile.vue';
import UploadText from '@/components/Upload/UploadText.vue';

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
		};
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
