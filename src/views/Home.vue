<template>
	<div>
		<div class="primary-gradient">
			<div class="container mx-auto py-20">
				<div class="w-2/3 text-white">
					<h1 class="text-6xl leading-tight font-bold w-1/2">
						Nebuďte ako kapitán!
					</h1>
					<p class="my-8 text-xl">
						Po odovzdaní práce už niet cesty späť. Buď ste plagiátor
						alebo nie. Náš systém vám to ale môže povedať skôr aby
						ste to dokázali včas zmeniť. Povie Vám na koľko percent
						máte zhodu v dokumente.
					</p>

					<div class="flex">
						<router-link
							to="/upload"
							class="flex flex-none items-center justify-center px-5 py-3 rounded focus:outline-none bg-primary"
						>
							Skontrolovať moju prácu
							<i class="fas fa-angle-right ml-3" />
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="container flex mx-auto my-20">
				<div class="w-1/2 flex items-center justify-center">
					<div class="w-3/4 text-center">
						<h2 class="font-bold text-4xl">
							Vložte celé súbory alebo skopírujte text
						</h2>
						<p class="mt-3 text-xl">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Nulla semper odio quis pulvinar mattis. Sed
							vulputate arcu.
						</p>
					</div>
				</div>
				<div class="w-1/2 flex items-center justify-center">
					<div>
						<img src="../assets/img/image1.png" />
					</div>
				</div>
			</div>

			<div
				class="container justify-between mx-auto mb-20 flex text-white"
			>
				<div
					class="w-1/3 mr-4 text-center bg-primary-dark rounded-xl shadow-xl p-10"
				>
					<div class="mx-auto">
						<h3 class="font-bold text-6xl mb-4 leading-none">
							5 minút
						</h3>
						<p class="text-xl">priemerný čas doručenia výsledku</p>
					</div>
				</div>
				<div
					class="w-1/3 mx-4 text-center bg-primary rounded-xl shadow-xl p-10"
				>
					<div class="mx-auto">
						<h3 class="font-bold text-6xl mb-4 leading-none">
							3857
						</h3>
						<p class="text-xl">analyzovaných prác v korpuse</p>
					</div>
				</div>
				<div
					class="w-1/3 ml-4 text-center bg-primary-dark rounded-xl shadow-xl p-10"
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

		<div class="bg-primary py-10">
			<div class="container text-white flex mx-auto my-20">
				<div class="w-1/2 flex items-center justify-center">
					<img class="h-128" src="../assets/img/image2.png" />
				</div>
				<div class="w-1/2 flex items-center justify-center">
					<div class="w-3/4 text-center">
						<h2 class="font-bold text-4xl">
							Detailná štatistika zdrojov
						</h2>
						<p class="mt-3 text-xl">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Nulla semper odio quis pulvinar mattis. Sed
							vulputate arcu.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>
