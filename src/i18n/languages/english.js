const homePage = {
	homePageBannerHeader: 'Check your files before submitting.',
	homePageBannerDescription: "There's no way back after you submit your files. Use our system to look up for matched documents of your work.",
	homePageCallToActionButton: 'Check my files',
	homePageGuideHeading: 'Upload files or paste text',
	homePageGuideDescription: 'We offer quick verification of the originality of your text. By simply dragging the file by inserting text, you can verify whether the thesis you have written is original and how many percentage match with other thesis.',
	homePageTimeStats: 'mean time of result delivery',
	homePageCorpusSizeStats: 'files in corpus',
	homePageSubmissionCountStats: 'analysed files',
	homePageProductOverviewHeading: 'Detailed information about matched files',
	homePageProductOverviewDescription: 'We offer a detailed display of inspection results. You will see exactly which parts of your thesis match others and also how many percentage match.',
	footerNameFaculty: 'Faculty of Informatics and Information Technologies',
	footerAddressFaculty: 'Ilkovičova 2',
	footerCityFaculty: '842 16 Bratislava 4',
	footerPrivacyPolicy: 'Privacy policy'
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

const submission = {
	results: 'results',
	matches: 'matches',
	submissionHeaderHeading: 'Your result',
	submissionHeaderDescription: 'Congratulations. Please, find detailed information about your submission below.',
	submissionPageLoadingMessage: "Your documents are now processing. We'll show you the results on this page as soon as possible.",
	submissionPercentageDescription: 'Your match is'
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
	...submission,
	...document
};

export default messages;
