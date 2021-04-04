const homePage = {
	homePageBannerHeader: 'Check your files before submitting.',
	homePageBannerDescription: "There's no way back after you submit your files. Use our system to look up for matched documents of your work.",
	homePageCallToActionButton: 'Check my files',
	homePageGuideHeading: 'Upload files or paste text',
	homePageGuideDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper odio quis pulvinar mattis. Sed vulputate arcu.',
	homePageTimeStats: 'mean time of result delivery',
	homePageAmountStats: 'files in corpus',
	homePageOtherStats: 'other stats',
	homePageProductOverviewHeading: 'Detailed information about matched files',
	homePageProductOverviewDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper odio quis pulvinar mattis. Sed vulputate arcu.'
};

const upload = {
	uploadFiles: 'Upload files',
	uploadText: 'Paste text',
	uploadDescription: 'Provide one or more files you wish to check. Upload files or paste text of your document.',
	emailInputDescription: 'Send me an e-mail with results.',
	emailInputPlaceholder: 'adress@domain.com',
	uploadSubmitButton: 'Upload',
	uploadFileLimitError: 'Maximum file amount reached. You might only upload {fileLimit} at the same time.',
	uploadFileDisabledMessage: 'You can only upload files if you do not have any text inserted',
	uploadFileSizeLimitError: 'The maximum supported file size is {fileSizeLimit} MB.',
	uploadFileNotProvidedError: 'Please, upload some files to check.',
	uploadTextNotProvidedError: 'Please, upload some text.',
	uploadEmailNotProvidedError: 'Please provide e-mail adress.',
	dragFilesHere: 'Drag files here',
	chooseFiles: 'Choose files',
	uploadTextDisabledMessage: 'Some files were uploaded. You might either upload file or paste text.',
	uploadTextPlaceholder: 'Paste text here..'
};

const result = {
	results: 'results',
	matches: 'matches',
	resultHeaderHeading: 'Your result',
	resultHeaderDescription: 'Congratulations. Please, find detailed information about your submission below.',
	resultPageLoadingMessage: "Your documents are now processing. We'll show you the results on this page as soon as possible.",
	resultPercentageDescription: 'Your match is'
};

const document = {
	documentResultHeaderDescription: 'Please, find detailed information about your submission below.',
	documentMatchWithOtherFile: 'Match with file: {document} ({percentage})',
	documentCompareNoDocumentsProvidedError: 'No documents for diff check found. Please contact administrator.',
	documentCompareZeroMatchesError: 'No matches between documents found. Please contact administrator.',
	documentCompareHeading: 'Document similarity:',
	documentZeroMatchesCongratulationsMessage: "Congratulations! Your submission didn't match any documents in our database!",
	documentContentView: 'Document content',
	documentFileListView: 'List of matched files'
};

const messages = {
	appName: 'AntiPlag',
	ok: 'OK',
	cancel: 'Cancel',
	back: 'Back',
	file: 'File',
	of: 'of',
	or: 'or',
	fileMatch: 'Matches',
	antiplagCheck: 'Antiplag check',
	minutePlural: 'minutes',
	listViewIconTooltip: 'List view',
	graphViewIconTooltip: 'Graph view',
	matchPercentage: 'Percentage',
	numOfMatches: 'Matches',
	...homePage,
	...upload,
	...result,
	...document
};

export default messages;
