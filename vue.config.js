module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	filenameHashing: process.env.NODE_ENV !== 'production',
	lintOnSave: true,
	runtimeCompiler: true,
	devServer: {
		port: 8080,
	},
	chainWebpack: (config) => {
		config.module
			.rule('ico')
			.test(/\.ico$/)
			.use('url-loader')
			.loader('url-loader')
			.end();

		config.plugin('html').tap((args) => {
			args[0].title = 'AntiPlag - Frontend';
			args[0].template = 'src/index.html';
			args[0].favicon = 'src/assets/img/favicon.ico';
			return args;
		});
	},
};
