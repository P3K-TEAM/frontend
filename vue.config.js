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
			return args;
		});
	}
};
