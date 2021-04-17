<template>
	<div>
		<div class="flex flex-col md:min-h-screen bg-primary-gradient">
			<Navigation />
			<div class="flex flex-1 items-center container mx-auto w-full">
				<div
					class="mt-2 md:mt-0 px-8 md:px-0 flex flex-col items-center md:items-start w-full md:w-2/3 text-white text-center md:text-left"
				>
					<h1
						class="text-4xl md:text-8xl leading-snug md:leading-tight font-bold w-full text-left tracking-widest"
						v-html="$t('homePageBannerHeader')"
					></h1>
					<p
						class="my-5 md:my-12 text-base md:text-xl leading-relaxed md:leading-normal font-hairline text-justify"
					>
						{{ $t('homePageBannerDescription') }}
					</p>

					<div class="flex items-center w-full md:w-auto mt-2">
						<router-link
							to="/upload"
							class="flex md:flex-none w-full md:w-auto items-center justify-center text-xl px-4 md:px-8 py-3 rounded-lg focus:outline-none bg-primary-500 hover:bg-primary-400"
						>
							{{ $t('homePageCallToActionButton') }}
							<fa-icon
								:icon="['fas', 'angle-right']"
								class="hidden md:flex ml-3"
							/>
						</router-link>
					</div>
				</div>
			</div>
			<div
				class="flex justify-center text-white text-4xl pb-6 md:pb-10 pt-6 md:pt-4 cursor-pointer"
				@click="scrollToRef('appDescription')"
			>
				<fa-icon :icon="['fas', 'angle-down']" />
			</div>
		</div>
		<div class="bg-white">
			<div
				ref="appDescription"
				class="container flex flex-col items-center px-10 md:px-0 md:flex-row mx-auto py-8 md:py-32"
			>
				<div
					class="w-full md:w-1/2 flex items-center justify-center leading-relaxed sm:leading-normal"
				>
					<div class="w-full md:w-3/5 text-center">
						<h2 class="font-bold text-3xl md:text-4xl">
							{{ $t('homePageGuideHeading') }}
						</h2>
						<p class="mt-5 text-base md:text-xl text-justify">
							{{ $t('homePageGuideDescription') }}
						</p>
					</div>
				</div>
				<div
					class="flex w-full md:w-1/2 mt-5 md:mt-0 items-center justify-center"
				>
					<img
						class="w-full md:w-2/3 h-auto"
						src="../assets/img/image1.png"
						alt="App Preview - Upload"
					/>
				</div>
			</div>

			<div
				class="container flex flex-col items-center md:items-stretch md:flex-row justify-between px-10 md:px-0 mx-auto mb-8 md:mb-32 text-white"
			>
				<AnimatedCounter
					refName="corpusSizeCounter"
					:from="0"
					:to="stats['corpusSize']"
					:description="$t('homePageCorpusSizeStats')"
					class="bg-primary-700"
				/>
				<AnimatedCounter
					refName="submissionTimeCounter"
					:from="0"
					:to="stats['submissionTime']"
					:contentText="$t('minutePlural')"
					:description="$t('homePageTimeStats')"
					class="bg-primary-500"
				/>
				<AnimatedCounter
					refName="submissionCounter"
					:from="0"
					:to="stats['submissionCount']"
					:description="$t('homePageSubmissionCountStats')"
					class="bg-primary-700"
				/>
			</div>
		</div>

		<div class="bg-primary-500 py-6 md:py-10 clipped-arrow-down">
			<div
				class="container flex flex-col items-center px-10 md:px-0 md:flex-row text-white mx-auto py-8 md:py-20"
			>
				<div
					class="flex w-full md:w-1/2 mb-5 md:mb-0 items-center justify-center"
				>
					<img
						class="w-full md:w-2/3 h-auto"
						src="../assets/img/image2.png"
						alt="App Preview - Result"
					/>
				</div>
				<div
					class="w-full md:w-1/2 flex items-center justify-center leading-relaxed sm:leading-normal"
				>
					<div class="w-full md:w-8/12 text-center">
						<h2 class="font-bold text-3xl md:text-4xl">
							{{ $t('homePageProductOverviewHeading') }}
						</h2>
						<p class="mt-5 text-base md:text-xl text-justify">
							{{ $t('homePageProductOverviewDescription') }}
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
import AnimatedCounter from '@/components/Global/AnimatedCounter/AnimatedCounter';

export default {
	components: {
		Navigation,
		Footer,
		AnimatedCounter
	},
	data: function () {
		return {
			stats: {}
		};
	},
	mounted: function () {
		return this.$axios
			.get('/api/stats')
			.then(response => response.data)
			.then(data => {
				this.stats = {
					corpusSize: data.corpus_size,
					submissionTime: data.submission_avg_time,
					submissionCount: data.submission_count
				};
			});
	},
	methods: {
		scrollToRef(ref) {
			this.$smoothScroll({
				scrollTo: this.$refs[ref],
				updateHistory: false,
				duration: 1000,
				offset: 120
			});
		}
	}
};
</script>

<style scoped lang="scss">
.clipped-arrow-down {
	clip-path: polygon(48% 0, 50% 5%, 52% 0, 100% 0, 100% 100%, 0 100%, 0 0);

	@media (max-width: 768px) {
		& {
			clip-path: polygon(
				45% 0,
				50% 5%,
				55% 0,
				100% 0,
				100% 100%,
				0 100%,
				0 0
			);
		}
	}
}
</style>
