import { useState, useEffect } from 'react';
import { getDogs } from '../apiManager';

const DogList = () => {
	const [dogs, setDogs] = useState([]);
	useEffect(() => {
		getDogs().then((dogs) => {
			setDogs(dogs);
		});
	}, []);
	return (
		<ul>
			{dogs?.map((d) => {
				return <li key={d.name}>{d.name}</li>;
			})}
		</ul>
	);
};

export default DogList;
