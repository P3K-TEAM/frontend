const homePage = {
	homePageBannerHeader: 'Nebuďte<br />ako kapitán!',
	homePageBannerDescription: 'Po odovzdaní práce už niet cesty späť. Buď ste plagiátor alebo nie. Náš systém vám to ale môže povedať skôr abyste to dokázali včas zmeniť. Povie Vám na koľko percent máte zhodu v dokumente.',
	homePageCallToActionButton: 'Skontrolovať moju prácu',
	homePageGuideHeading: 'Vložte celé súbory alebo skopírujte text',
	homePageGuideDescription: 'Ponúkame rýchle overenie originality vášho textu. Jednoduchým  potiahnutím súboru vložením textu si viete overiť, či vami napísaná práca je originálna a na koľko percent sa zhoduje s inými prácami.',
	homePageTimeStats: 'priemerný čas doručenia výsledku',
	homePageCorpusSizeStats: 'prác k porovnaniu v korpuse',
	homePageSubmissionCountStats: 'analyzovaných prác',
	homePageProductOverviewHeading: 'Detailná štatistika zdrojov',
	homePageProductOverviewDescription: 'Ponúkame detailné zobrazenie výsledkov kontroly. Presne uvidíte, ktoré časti vašej práce sa zhodujú s inými prácami a aj na koľko percent sa vaša práca zhoduje.',
	homePageFooterPrivacyPolicy: 'Zásady ochrany osobných údajov',
	homePageFooterFacultyAddress: 'Fakulta informatiky a informačných technológií<br/>Ilkovičova 2<br/>842 16 Bratislava 4'
};

const upload = {
	uploadFiles: 'Nahrať súbory',
	uploadText: 'Vložiť text',
	uploadDescription: 'Pridajte jednu alebo viac prác, ktoré si prajete skontrolovať. Nahrajte súbory alebo vložte text práce.',
	emailInputDescription: 'Informovať ma e-mailom o stave kontroly:',
	emailInputPlaceholder: 'adresa@email.sk',
	uploadSubmitButton: 'Nahrať',
	uploadFileLimitError: 'Nie je možné kontrolovať naraz viac ako {fileLimit} súborov!',
	uploadFileDisabledMessage: 'Súbory môžete nahrať len ak nemáte vložený text',
	uploadFileSizeLimitError: 'Súbory väčšie ako {fileSizeLimit} MB nie sú podporované!',
	uploadFileNotProvidedError: 'Nezadali ste súbor, ktorý chcete skontrolovať!',
	uploadTextNotProvidedError: 'Nezadali ste text, ktorý chcete skontrolovať!',
	uploadEmailNotProvidedError: 'Nezadali ste emailovú adresu!',
	dragFilesHere: 'Pretiahnite súbory sem',
	chooseFiles: 'Vybrať súbory',
	uploadTextDisabledMessage: 'Text môžete zadať len ak nemáte vložený súbor',
	uploadTextPlaceholder: 'Sem skopírujte text Vašej práce...'
};

const submission = {
	results: 'výsledkov',
	matches: 'zhôd',
	submissionHeaderHeading: 'Výsledky kontroly',
	submissionHeaderDescription: 'Gratulujeme. Nižšie nájdete podrobné štatistiky kontroly originality vašich prác.',
	submissionPageLoadingMessage: 'Vaše texty sme zobrali na spracovanie. Výsledky budú automaticky zobrazené na tejto stránke',
	submissionPercentageDescription: 'Vaša zhoda je'
};

const document = {
	documentResultHeaderDescription: 'Nižšie nájdete podrobné štatistiky kontroly originality vašej práce',
	documentMatchWithOtherFile: 'Zhoda so súborom: {document} ({percentage})',
	documentCompareNoDocumentsProvidedError: 'Nenašli sa žiadne dokumenty pre porovnanie. Prosím, kontaktujte administrátora.',
	documentCompareZeroMatchesError: 'Nenašli sa žiadne zhody medzi danými súbormi. Prosím, kontaktujte administrátora.',
	documentCompareHeading: 'Podobnosť dokumentov:',
	documentZeroMatchesCongratulationsMessage: 'Gratulujeme! Vaša práca sa nezhoduje so žiadnymi súbormi!',
	documentContentView: 'Obsah dokumentu',
	documentFileListView: 'Zoznam zhodných dokumentov'
};

const messages = {
	appName: 'AntiPlag',
	ok: 'OK',
	cancel: 'Zrušiť',
	back: 'Späť',
	file: 'Súbor',
	of: 'z',
	or: 'alebo',
	fileMatch: 'Zhoda so súborom',
	antiplagCheck: 'Kontrola plagiátorstva',
	minutePlural: 'minút',
	listViewIconTooltip: 'Zoznam',
	graphViewIconTooltip: 'Grafové zobrazenie',
	matchPercentage: 'Percentuálna zhoda',
	numOfMatches: 'Počet zhôd',
	...homePage,
	...upload,
	...submission,
	...document
};

export default messages;
