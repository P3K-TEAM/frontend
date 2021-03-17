function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// generic function for retrying demand
export default function retry(
	fn,
	conditionFn,
	waitingInterval = 3000,
	maxRetries = 10
) {
	const tryToGetResult = retry => {
		return fn().then(result => {
			if (conditionFn(result)) {
				return result;
			}
			if (retry <= maxRetries) {
				// sleep the specified time
				return sleep(waitingInterval).then(() =>
					tryToGetResult(retry + 1)
				);
			} else {
				throw new Error(`Retrying failed after ${maxRetries} tries.`);
			}
		});
	};
	// start retrying function
	return tryToGetResult(1);
}
