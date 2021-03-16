<template>
	<div>
		<div class="flex flex-col md:min-h-screen bg-primary-gradient">
			<Navigation />
			<div
				class="flex flex-1 items-center container mx-auto w-full"
			>
				<div class="mt-2 md:mt-0 px-8 md:px-0 flex flex-col items-center md:items-start w-full md:w-2/3 text-white text-center md:text-left">
					<h1
						class="text-4xl md:text-8xl leading-snug md:leading-tight font-bold w-full text-left tracking-widest"
					>
						Nebuďte<br>ako kapitán!
					</h1>
					<p class="my-5 md:my-12 text-base md:text-xl leading-relaxed md:leading-normal font-hairline text-justify">
						Po odovzdaní práce už niet cesty späť. Buď ste plagiátor
						alebo nie. Náš systém vám to ale môže povedať skôr aby
						ste to dokázali včas zmeniť. Povie Vám na koľko percent
						máte zhodu v dokumente.
					</p>

					<div class="flex items-center w-full md:w-auto mt-2">
						<router-link
							to="/upload"
							class="flex md:flex-none w-full md:w-auto items-center justify-center text-xl 
							px-4 md:px-8 py-3 rounded-lg focus:outline-none bg-primary-500 hover:bg-primary-400"
						>
							Skontrolovať moju prácu
							<i class="hidden md:flex fas fa-angle-right ml-3" />
						</router-link>
					</div>
				</div>
			</div>
			<div
				ref="caret"
				class="flex justify-center text-white text-4xl pb-6 md:pb-10 pt-6 md:pt-4 cursor-pointer"
				@click="$refs.caret.scrollIntoView()"
			>
				<i class="fas fa-angle-down" />
			</div>
		</div>
		<div class="bg-white">
			<div class="container flex flex-col items-center px-10 md:px-0 md:flex-row mx-auto py-8 md:py-32">
				<div class="w-full md:w-1/2 flex items-center justify-center leading-relaxed sm:leading-normal">
					<div class="w-full md:w-3/5 text-center">
						<h2 class="font-bold text-3xl md:text-4xl">
							Vložte celé súbory alebo skopírujte text
						</h2>
						<p class="mt-5 text-base md:text-xl">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Nulla semper odio quis pulvinar mattis. Sed
							vulputate arcu.
						</p>
					</div>
				</div>
				<div class="flex w-full md:w-1/2 mt-5 md:mt-0 items-center justify-center">
					<img
						class="w-full md:w-2/3 h-auto"
						src="../assets/img/image1.png"
						alt="App Preview - Upload"
					>
				</div>
			</div>

			<div
				class="container flex flex-col items-center md:items-stretch md:flex-row justify-between px-10 md:px-0 mx-auto mb-8 md:mb-32 text-white"
			>
				<div
					class="w-full md:w-1/3 mx-0 md:mr-4 my-4 md:my-0 text-center bg-primary-700 rounded-xl shadow-xl p-3 md:p-6 lg:p-10"
				>
					<div class="mx-auto">
						<h3 class="font-bold text-4xl md:text-6xl mb-2 md:mb-4 leading-none">
							5 minút
						</h3>
						<p class="text-lg md:text-xl">
							priemerný čas doručenia výsledku
						</p>
					</div>
				</div>
				<div
					class="w-full md:w-1/3 mx-0 md:mx-4 my-4 md:my-0 text-center bg-primary-500 rounded-xl shadow-xl p-3 md:p-6 lg:p-10"
				>
					<div class="mx-auto">
						<h3 class="font-bold text-4xl md:text-6xl mb-2 md:mb-4 leading-none">
							3857
						</h3>
						<p class="text-lg md:text-xl">
							analyzovaných prác v korpuse
						</p>
					</div>
				</div>
				<div
					class="w-full md:w-1/3 mx-0 md:ml-4 my-4 md:my-0 text-center bg-primary-700 rounded-xl shadow-xl p-3 md:p-6 lg:p-10"
				>
					<div class="mx-auto">
						<h3 class="font-bold text-4xl md:text-6xl mb-2 md:mb-4 leading-none">
							16217
						</h3>
						<p class="text-lg md:text-xl">
							iná štatistika
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-primary-500 py-6 md:py-10 clipped-arrow-down">
			<div class="container flex flex-col items-center px-10 md:px-0 md:flex-row text-white mx-auto py-8 md:py-20">
				<div class="flex w-full md:w-1/2 mb-5 md:mb-0 items-center justify-center ">
					<img
						class="w-full md:w-2/3 h-auto"
						src="../assets/img/image2.png"
						alt="App Preview - Result"
					>
				</div>
				<div class="w-full md:w-1/2 flex items-center justify-center leading-relaxed sm:leading-normal">
					<div class="w-full md:w-8/12 text-center">
						<h2 class="font-bold text-3xl md:text-4xl">
							Detailná štatistika zdrojov
						</h2>
						<p class="mt-5 text-base md:text-xl">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Nulla semper odio quis pulvinar mattis. Sed
							vulputate arcu.
						</p>
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
import Navigation from '@/components/Global/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';

export default {
	components: {
		Navigation,
		Footer,
	},
};
</script>

<style>
.clipped-arrow-down {
	clip-path: polygon(48% 0, 50% 5%, 52% 0, 100% 0, 100% 100%, 0 100%, 0 0);
}
</style>
