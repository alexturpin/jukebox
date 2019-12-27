import React, { useState } from 'react';
import { search, SearchResult } from '../api/youtube';

const Search: React.FC = () => {
	const [terms, setTerms] = useState<string>('');
	const [results, setResults] = useState<SearchResult[]>([]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setResults(await search(terms));
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={terms}
					onChange={e => setTerms(e.target.value)}
				/>
				<input type="submit" value="Search" />
			</form>
			<ul>
				{results.map(video => (
					<li key={video.id}>{video.title}</li>
				))}
			</ul>
		</>
	);
};

export { Search };
