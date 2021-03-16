/**
 * Checks the type of given variable and throws an error if it does not fulfil conditions
 *
 * @param variable : any - variable to be checked
 * @param expectedType : string - single or multiple expected types with '|', e.g. number | undefined
 * @param variableName : string - human readable name of variable only used in debugging logs.
 */
export default function validateType(variable, expectedType, variableName) {
	const variableNameWithTrailingSpace = variableName
		? `"${variableName}" `
		: '';

	const isOneOfType = expectedType
		.split('|')
		.some((type) => typeof variable === type.toString().trim());

	// typeof array is object, needs to be checked separately
	const isArray = expectedType.includes('array') && Array.isArray(variable);

	if (!isOneOfType && !isArray) {
		throw new Error(
			`Unsupported ${variableNameWithTrailingSpace}property. ${variableNameWithTrailingSpace}must be ${expectedType.toString()}.`
		);
	}

	if (typeof variable === 'string' && variable.length < 1) {
		throw new Error(
			`Variable ${variableNameWithTrailingSpace}must not be empty.`
		);
	}
}
