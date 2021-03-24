<template>
	<nav
		class="container flex flex-row justify-between mx-auto px-6 md:px-0 py-6"
	>
		<router-link to="/" class="text-white text-2xl flex items-center">
			<img
				src="@/assets/img/logo.png"
				class="h-10"
				alt="logo"
			/>
			<span class="ml-5 tracking-wider">{{ $t('appName') }}</span>
		</router-link>
		<LanguageToggle />
	</nav>
</template>

<script>
import LanguageToggle from '@/components/Global/LanguageToggle/LanguageToggle';

export default {
	components: {
		LanguageToggle
	}
};
</script>
