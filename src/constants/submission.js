export default Object.freeze({
	PROCESSED: 'PROCESSED',
	PENDING: 'PENDING',
	PROCESSING: 'PROCESSING'
});

// Max number of files per request
export const fileLimit = 50;

// Max size of a file in MB
export const fileSizeLimit = 20;
