import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDogs, putDog } from '../../apiManager';

const WalkerAssignDog = () => {
	const { walkerId } = useParams();

	const [dogs, setDogs] = useState([]);

	useEffect(() => {
		getDogs().then((dogs) => {
			let filteredDogs = dogs.filter((d) => d.walker === null);
			setDogs(filteredDogs);
		});
	}, []);

	return (
		<ul>
			{dogs.map((d) => {
				return (
					<li key={d.id}>
						<Link
							to={`/dogs/${d.id}`}
							onClick={() => {
								d.walkerId = parseInt(walkerId);
								putDog(d);
							}}>
							{d.name}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default WalkerAssignDog;
