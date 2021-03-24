module.exports = {
	darkMode: false, // or 'media' or 'class'
	purge: {
		preserveHtmlElements: false,
		content: ['./src/**/*.html', './src/**/*.vue']
	},
	theme: {
		extend: {
			borderWidth: {
				3: '3px'
			},
			colors: {
				white: '#fdfdfd',
				primary: {
					100: '#d5f4ff',
					200: '#8ed4fc',
					300: '#61c8fd',
					400: '#36c3ff',
					500: '#00b5ff',
					600: '#1699F1',
					700: '#003180',
					900: '#03132C'
				}
			},
			width: {
				96: '24rem',
				112: '28rem',
				128: '32rem',
				144: '36rem',
				160: '40rem'
			},
			height: {
				96: '24rem',
				112: '28rem',
				128: '32rem',
				144: '36rem',
				160: '40rem'
			},
			fontSize: {
				'7xl': '5rem',
				'8xl': '6rem',
				'9xl': '7rem',
				'10xl': '8rem'
			}
		}
	},
	variants: {
		visibility: ['group-hover'],
		extend: {
			borderWidth: ['first', 'last']
		}
	},
	plugins: []
};
