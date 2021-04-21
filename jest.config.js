module.exports = {
	preset: '@vue/cli-plugin-unit-jest',
	moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
	transform: {
		// process `*.vue` files with `vue-jest`
		'^.+\\.vue$': 'vue-jest',
		'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
			'jest-transform-stub',
		'^.+\\.(js|jsx)?$': 'babel-jest'
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	transformIgnorePatterns: [
		"<rootDir>/node_modules/(!vue-flag-icon)",
	],
	collectCoverage: true,
	collectCoverageFrom: ['src/**/views/*.vue', 'src/**/components/**/*.vue']
};
