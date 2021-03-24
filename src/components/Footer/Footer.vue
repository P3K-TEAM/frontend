<template>
	<footer class="bg-primary-900">
		<div
			class="container flex flex-col items-center sm:flex-row justify-between mx-auto text-gray-500 leading-relaxed md:leading-normal font-hairline p-6 sm:p-10"
		>
			<ul class="w-full sm:w-1/3 text-center md:text-left mb-4 sm:mb-0">
				<li>Lorem ipsum</li>
				<li>Dolor Sit Amet</li>
				<li>Etiam dolor orci</li>
				<li>Fermentum</li>
			</ul>
			<ul class="w-full sm:w-1/3 text-center md:text-left mb-4 sm:mb-0">
				<li>Lorem ipsum</li>
				<li>Dolor Sit Amet</li>
				<li>Etiam dolor orci</li>
				<li>Fermentum</li>
			</ul>
			<ul
				class="w-full sm:w-1/3 text-center md:text-left text-xl sm:text-3xl"
			>
				<li class="inline">
					<fa-icon
						:icon="['fab', 'facebook-square']"
						class="mr-4 sm:m-4"
					/>
				</li>
				<li class="inline">
					<fa-icon :icon="['fab', 'instagram']" class="mr-4 sm:m-4" />
				</li>
				<li class="inline">
					<fa-icon :icon="['far', 'envelope']" class="sm:m-4" />
				</li>
			</ul>
		</div>
	</footer>
</template>
