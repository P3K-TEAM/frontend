function validateType(variable, expectedType, variableName) {
	const variableNameWithTrailingSpace = variableName
		? `"${variableName}" `
		: '';

	if (variable === undefined) {
		throw new Error(
			`Variable ${variableNameWithTrailingSpace}must not be undefined.`
		);
	}

	if (typeof variable !== expectedType.toString()) {
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

module.exports = validateType;
