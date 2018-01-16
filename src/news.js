import 'whatwg-fetch';
const APIKEY = '1546a5ab1b52476d807442f5624d9b5b';
const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
const newsApiHeadlines =
	'https://newsapi.org/v2/top-headlines?country=it&pageSize=100';
const newsApiEverything =
	'https://newsapi.org/v2/everything?language=it&pageSize=100&sortBy=publishedAt';

const from = '2018-01-16T00:00:00';
const to = '2018-01-16T023:59:59';
export default function getNews(phrases = [], callback) {
	const q = encodeURI(phrases.join(' OR '));
	console.log('searching', q);
	fetch(`${corsAnywhere}${newsApiEverything}&q=${q}&from=${from}&to=${to}`, {
		headers: {
			'X-Api-Key': APIKEY
		}
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log('parsed json', data);
			callback(
				`<ul>${data.articles.map(article => {
					const { title, source, publishedAt, url } = article;
					return `<li><h2>${title}</h2><h4>${publishedAt}</h4><h4>${source.name}</h4><h4>${url}</h4></li>`;
				}).join('')}</ul>`
			);
		})
		.catch(ex => {
			console.log('parsing failed', ex);
		});
}
