import { useState, useEffect } from 'react';
import { getDogs } from '../../apiManager';
import { Link, useNavigate } from 'react-router-dom';

const DogList = () => {
	const [dogs, setDogs] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getDogs().then((dogs) => {
			setDogs(dogs);
		});
	}, []);
	return (
		<>
			<div>
				<button
					onClick={() => {
						navigate('/dogs/new');
					}}>
					Add Dog
				</button>
			</div>
			<ul>
				{dogs?.map((d) => {
					return (
						<li key={d.id}>
							<Link to={`dogs/${d.id}`}>{d.name}</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default DogList;
