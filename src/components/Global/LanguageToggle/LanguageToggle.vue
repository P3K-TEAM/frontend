<template>
	<div>
		<button
			v-for="language in languages"
			:key="language.key"
			class="w-10 h-10 rounded-lg border border-primary-600 mr-2 last:mr-0 hover:bg-primary-600 focus:outline-none"
			:class="{ active: activeLanguage === language.key }"
			@click="changeLocale(language.key)"
		>
			<flag :iso="language.flag" :squared="false" />
		</button>
	</div>
</template>

<script>
import { setPreferredLanguage } from '@/utilities/language.utility';

export default {
	data: function () {
		return {
			languages: [
				{ flag: 'sk', key: 'sk' },
				{ flag: 'us', key: 'en' }
			]
		};
	},
	computed: {
		activeLanguage: function () {
			return this.$i18n.locale;
		}
	},
	methods: {
		changeLocale(locale) {
			setPreferredLanguage(this, locale);
		}
	}
};
</script>

<style scoped>
.active {
	@apply cursor-default bg-primary-600 hover:bg-primary-600;
}
</style>
