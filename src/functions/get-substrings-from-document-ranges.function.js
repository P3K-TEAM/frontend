import { colorForIndex } from '@/utilities/color.utility';

/**
 * 	Create a map of unique colors for each document
 *
 * @param documentIds
 * @returns - object { [ documentId:string ] : string (rgb value) }
 */
export function documentColorMap(documentIds) {
	// filter out duplicates
	const uniqueIds = documentIds.filter((x, i, a) => a.indexOf(x) === i);

	return uniqueIds.reduce((colors, documentId, index) => {
		colors[documentId] = colorForIndex(index);
		return colors;
	}, {});
}

export function getSubstringsFromDocumentRanges(text, ranges) {
	// if no matches found
	if (ranges.length === 0) {
		return [
			{
				from: 0,
				to: text.length,
				text
			}
		];
	}

	return ranges.reduce(
		(substrings, currentInterval, index) => {
			// previous interval
			const previous = substrings[substrings.length - 1];
			previous.to = currentInterval.from;
			previous.text = text.substring(previous.from, previous.to);

			// current interval
			currentInterval.text = text.substring(
				currentInterval.from,
				currentInterval.to
			);
			substrings.push(currentInterval);

			// set starting index of the following interval
			const following = { from: currentInterval.to + 1 };

			// in case of last element, copy the rest of the text till the end
			if (index === ranges.length - 1) {
				following.to = text.length;
				following.text = text.substring(following.from, following.to);
			}
			substrings.push(following);

			return substrings;
		},
		[{ from: 0 }] // initial value - its `to` will be filled in first iteration
	);
}
