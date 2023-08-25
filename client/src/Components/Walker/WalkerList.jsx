import { useEffect, useState } from 'react';
import { getCities, getWalkers } from '../../apiManager';

const WalkerList = () => {
	const [walkers, setWalkers] = useState([]);
	const [filteredWalkers, setFilteredWalkers] = useState([]);
	const [cities, setCities] = useState([]);
	const [cityFilterId, setCityFilterId] = useState(0);

	useEffect(() => {
		getWalkers().then((walkers) => {
			setWalkers(walkers);
			setFilteredWalkers(walkers);
		});

		getCities().then((cities) => {
			setCities(cities);
		});
	}, []);

	useEffect(() => {
		if (cityFilterId === 0) {
			setFilteredWalkers(walkers);
		} else {
			let filteredWalkers = [];
			walkers.forEach((w) => {
				const foundCity = w.cities.find((c) => c.id === cityFilterId);
				if (foundCity) filteredWalkers.push(w);
			});
			setFilteredWalkers(filteredWalkers);
		}
	}, [cityFilterId]);
	return (
		<>
			<div>
				<select
					onChange={(e) => setCityFilterId(parseInt(e.target.value))}>
					<option value={0}>Select a city to filter...</option>
					{cities.map((c) => {
						return (
							<option value={c.id} key={c.id}>
								{c.name}
							</option>
						);
					})}
				</select>
			</div>
			<ul>
				{filteredWalkers.map((w) => {
					return <li key={w.id}>{w.name}</li>;
				})}
			</ul>
		</>
	);
};

export default WalkerList;
