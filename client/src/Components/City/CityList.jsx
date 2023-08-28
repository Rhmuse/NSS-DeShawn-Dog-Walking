import { useEffect, useState } from 'react';
import { getCities, postCity } from '../../apiManager';
import { Button, Container, Input, ListGroup, ListGroupItem } from 'reactstrap';

const CityList = () => {
	const [cities, setCities] = useState([]);
	const [cityBuilder, setCityBuilder] = useState({
		name: '',
	});

	useEffect(() => {
		if (cityBuilder.name.length === 0)
			getCities().then((cities) => {
				setCities(cities);
			});
	}, [cityBuilder]);

	return (
		<Container>
			<Input
				type='text'
				id='cityNameInput'
				value={cityBuilder.name}
				onChange={(e) => {
					let input = { ...cityBuilder };
					input.name = e.target.value;
					setCityBuilder(input);
				}}></Input>
			<Button
				onClick={(e) => {
					e.preventDefault();
					postCity(cityBuilder).then(() => {
						setCityBuilder({ name: '' });
					});
				}}>
				Add City
			</Button>
			<ListGroup>
				{cities.map((c) => {
					return <ListGroupItem key={c.id}>{c.name}</ListGroupItem>;
				})}
			</ListGroup>
		</Container>
	);
};

export default CityList;
