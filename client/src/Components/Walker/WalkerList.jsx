import { useEffect, useState } from 'react';
import { getCities, getWalkers } from '../../apiManager';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';

const WalkerList = () => {
	const navigate = useNavigate();

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
			<Container>
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
			</Container>
			<ListGroup>
				{filteredWalkers.map((w) => {
					return (
						<ListGroupItem key={w.id}>
							<Link to={`/walkers/${w.id}`}>{w.name}</Link>{' '}
							<Button
								onClick={() => navigate(`./assigndog/${w.id}`)}>
								Add Dog
							</Button>
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</>
	);
};

export default WalkerList;
