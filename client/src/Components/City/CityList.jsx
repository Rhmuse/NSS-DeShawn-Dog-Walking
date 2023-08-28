import { useEffect, useState } from 'react';
import { getCities } from '../../apiManager';

const CityList = () => {
	const [cities, setCities] = useState([]);

	useEffect(() => {
		getCities().then((cities) => {
			setCities(cities);
		});
	}, []);
	return (
		<ul>
			{cities.map((c) => {
				return <li key={c.id}>{c.name}</li>;
			})}
		</ul>
	);
};

export default CityList;
