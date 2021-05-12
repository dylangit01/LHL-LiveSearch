import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from 'components/SearchBar';
import Results from 'components/Results';

export default function LiveSearch(props) {
	const [term, setTerm] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);      // setting loading to false at default
	const ENDPOINT = `https://itunes.apple.com/search?term=${term}&country=CA&media=music&entity=album&attribute=artistTerm`;

	useEffect(() => {
		setLoading(true);     // set to true before fetching the data
		axios.get(ENDPOINT).then((res) => {
			setLoading(false);  // set to false after fetching the data
			setResults(res.data.results); //why [...results, res.data.results] not correct?
			console.log(res.data.results);
		});
	}, [term]); // without dependency array, will make this call infinitely

	return (
		<Fragment>
			<header className='logo'>
				<img src='images/brand.png' alt='Brand' />
			</header>
			<main>
				<SearchBar onSearch={(term) => setTerm(term)} />
				{loading ? <h1 style={{ color: '#fff', textAlign: 'center' }}>Loading...</h1> : <Results results={results} />}
			</main>
		</Fragment>
	);
}
