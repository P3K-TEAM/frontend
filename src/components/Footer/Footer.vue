<template>
	<footer class="bg-primary-900">
		<div
			class="container flex flex-col items-center sm:flex-row justify-between mx-auto text-gray-500 leading-relaxed md:leading-normal font-hairline p-6 sm:p-10"
		>
			<ul class="w-full sm:w-1/2 text-center md:text-left mb-4 sm:mb-0">
				<li>
					<!-- TODO: Add link -->
					<a
						href="javascript:void(0)"
						class="hover:text-underline hover:text-gray-400"
					>
						{{ $t('homePageFooterPrivacyPolicy') }}
					</a>
				</li>
				<li>
					<a
						href="mailto:tim10fiit@googlegroups.com"
						class="hover:text-underline hover:text-gray-400"
					>
						tim10fiit@googlegroups.com
					</a>
				</li>
			</ul>
			<ul class="w-full sm:w-1/2 text-center md:text-left mb-4 sm:mb-0">
				<li>
					<a
						href="https://goo.gl/maps/UP19hKHWFhYcea9q8"
						class="hover:text-underline hover:text-gray-400"
						v-html="$t('homePageFooterFacultyAddress')"
					>
					</a>
				</li>
			</ul>
		</div>
	</footer>
</template>
