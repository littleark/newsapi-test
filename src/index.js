import getNews from './news';
import './index.scss';

const searchTerms = ['"salvini"', '"bonino"', '"renzi"', '"berlusconi"', '"di maio"'];

getNews(searchTerms, result => {
	document.getElementById('root').innerHTML = result;
});
