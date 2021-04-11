module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	filenameHashing: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	lintOnSave: true,
	devServer: {
		port: 8080
	},
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = 'AntiPlag';
			args[0].template = 'src/index.html';
			args[0].favicon = 'src/assets/img/favicon.ico';
			args[0].description = {
				en: 'Check your files before submitting.',
				sk: 'Skontroluj svoju prácu, či sa nezhoduje s prácami iných.'
			};
			args[0].url = 'https://antiplag.sk';
			return args;
		});
	}
};
