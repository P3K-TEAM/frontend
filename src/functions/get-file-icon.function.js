export function getFileIcon(filename) {

	const regex = /\.(.[^.]*)$/;
	const match = filename.match(regex);

	if (match) {
		switch (match[0]) {
			case '.pdf':
				return {
					icon: ['fas', 'file-pdf'],
					cssClass: 'text-red-500 text-lg md:text-2xl'
				};
			case '.docx':
			case '.doc':
				return {
					icon: ['fas', 'file'],
					cssClass: 'text-blue-500 text-lg md:text-2xl'
				};
		}
	}

	return {
		icon: ['fas', 'file'],
		cssClass: 'text-gray-400 text-lg md:text-2xl'
	};
}

export default getFileIcon;
