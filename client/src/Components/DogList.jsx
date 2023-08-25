import { useState, useEffect } from 'react';
import { getDogs } from '../apiManager';
import { Link } from 'react-router-dom';

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
				return (
					<li key={d.id}>
						<Link to={`./dogs/${d.id}`}>{d.name}</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default DogList;
