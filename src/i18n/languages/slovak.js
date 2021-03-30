const homePage = {
	homePageBannerHeader: 'Nebuďte<br />ako kapitán!',
	homePageBannerDescription: 'Po odovzdaní práce už niet cesty späť. Buď ste plagiátor alebo nie. Náš systém vám to ale môže povedať skôr abyste to dokázali včas zmeniť. Povie Vám na koľko percent máte zhodu v dokumente.',
	homePageCallToActionButton: 'Skontrolovať moju prácu',
	homePageGuideHeading: 'Vložte celé súbory alebo skopírujte text',
	homePageGuideDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper odio quis pulvinar mattis. Sed vulputate arcu.',
	homePageTimeStats: 'priemerný čas doručenia výsledku',
	homePageAmountStats: 'analyzovaných prác v korpuse',
	homePageOtherStats: 'iná štatistika',
	homePageProductOverviewHeading: 'Detailná štatistika zdrojov',
	homePageProductOverviewDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper odio quis pulvinar mattis. Sed vulputate arcu.'
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

const result = {
	results: 'výsledkov',
	matches: 'zhôd',
	resultHeaderHeading: 'Výsledky kontroly',
	resultHeaderDescription: 'Gratulujeme. Nižšie nájdete podrobné štatistiky kontroly originality vašich prác.',
	resultPageLoadingMessage: 'Vaše texty sme zobrali na spracovanie. Výsledky budú automaticky zobrazené na tejto stránke',
	resultPercentageDescription: 'Vaša zhoda je'
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
	...result,
	...document
};

export default messages;
