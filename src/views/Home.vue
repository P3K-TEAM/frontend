<template>
	<div>
		<div class="flex flex-col min-h-screen bg-primary-gradient">
			<Navigation />
			<div
				class="flex flex-1 h-full items-center container mx-auto h-full"
			>
				<div class="w-2/3 text-white">
					<h1
						class="text-8xl leading-tight font-bold tracking-widest"
					>
						Nebuďte<br />ako kapitán!
					</h1>
					<p class="my-12 text-xl font-hairline text-justify">
						Po odovzdaní práce už niet cesty späť. Buď ste plagiátor
						alebo nie. Náš systém vám to ale môže povedať skôr aby
						ste to dokázali včas zmeniť. Povie Vám na koľko percent
						máte zhodu v dokumente.
					</p>

					<div class="flex">
						<router-link
							to="/upload"
							class="flex flex-none items-center justify-center px-8 py-3 rounded-lg focus:outline-none bg-primary-500 hover:bg-primary-400"
						>
							Skontrolovať moju prácu
							<i class="fas fa-angle-right ml-3" />
						</router-link>
					</div>
				</div>
			</div>
			<div
				ref="caret"
				class="flex justify-center text-white text-4xl pb-10 cursor-pointer"
				@click="$refs.caret.scrollIntoView()"
			>
				<i class="fas fa-angle-down" />
			</div>
		</div>
		<div class="bg-white">
			<div class="container flex mx-auto py-32">
				<div class="w-1/2 flex items-center justify-center">
					<div class="w-3/5 text-center">
						<h2 class="font-bold text-4xl">
							Vložte celé súbory alebo skopírujte text
						</h2>
						<p class="mt-5 text-xl">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Nulla semper odio quis pulvinar mattis. Sed
							vulputate arcu.
						</p>
					</div>
				</div>
				<div class="flex w-1/2 items-center justify-center">
					<img
						class="w-2/3 h-auto"
						src="../assets/img/image1.png"
						alt="App Preview - Upload"
					/>
				</div>
			</div>

			<div
				class="container justify-between mx-auto mb-32 flex text-white"
			>
				<div
					class="w-1/3 mr-4 text-center bg-primary-700 rounded-xl shadow-xl p-10"
				>
					<div class="mx-auto">
						<h3 class="font-bold text-6xl mb-4 leading-none">
							5 minút
						</h3>
						<p class="text-xl">priemerný čas doručenia výsledku</p>
					</div>
				</div>
				<div
					class="w-1/3 mx-4 text-center bg-primary-500 rounded-xl shadow-xl p-10"
				>
					<div class="mx-auto">
						<h3 class="font-bold text-6xl mb-4 leading-none">
							3857
						</h3>
						<p class="text-xl">analyzovaných prác v korpuse</p>
					</div>
				</div>
				<div
					class="w-1/3 ml-4 text-center bg-primary-700 rounded-xl shadow-xl p-10"
				>
					<div class="mx-auto">
						<h3 class="font-bold text-6xl mb-4 leading-none">
							16217
						</h3>
						<p class="text-xl">iná štatistika</p>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-primary-500 py-10">
			<div class="container text-white flex mx-auto my-20">
				<div class="w-1/2 flex items-center justify-center">
					<img
						class="w-2/3 h-auto"
						src="../assets/img/image2.png"
						alt="App Preview - Result"
					/>
				</div>
				<div class="w-1/2 flex items-center justify-center">
					<div class="w-8/12 text-center">
						<h2 class="font-bold text-4xl">
							Detailná štatistika zdrojov
						</h2>
						<p class="mt-5 text-xl">
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
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';

export default {
	components: {
		Navigation,
		Footer,
	},
};
</script>
