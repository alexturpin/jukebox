function loadClient() {
	return new Promise(resolve => {
		gapi.load('client', resolve);
	});
}

function loadYouTube() {
	return new Promise(resolve => {
		gapi.client.load('youtube', 'v3', resolve);
	});
}

export async function init() {
	await loadClient();
	await loadYouTube();

	gapi.client.init({
		apiKey: process.env.REACT_APP_YOUTUBE_API_KEY
	});
}

export interface SearchResult {
	id: string;
	title: string;
}

export async function search(q: string) {
	const response = await gapi.client.youtube.search.list({
		q,
		part: 'snippet',
		maxResults: 5,
		type: 'video',
		videoCategoryId: '10' // "Music" https://developers.google.com/youtube/v3/docs/videoCategories/list?apix_params=%7B%22part%22%3A%22snippet%22%2C%22regionCode%22%3A%22ca%22%7D
	});

	const results: SearchResult[] = [];

	for (const video of response.result.items || []) {
		if (
			typeof video.id !== 'undefined' &&
			typeof video.id.videoId !== 'undefined' &&
			typeof video.snippet !== 'undefined' &&
			typeof video.snippet.title !== 'undefined'
		) {
			results.push({
				id: video.id.videoId,
				title: video.snippet.title
			});
		}
	}

	return results;
}
