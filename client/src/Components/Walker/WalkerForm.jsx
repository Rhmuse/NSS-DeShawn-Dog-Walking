import { useEffect, useState } from 'react';
import { Button, Container, Input, Label } from 'reactstrap';
import { getCities, getWalkers, putWalker } from '../../apiManager';
import { useNavigate, useParams } from 'react-router-dom';

const WalkerForm = () => {
	const { walkerId } = useParams();
	const [cities, setCities] = useState([]);
	const [walkerUpdateBuilder, setWalkerUpdateBuilder] = useState({
		name: '',
		cityIds: [],
	});

	const navigate = useNavigate();

	useEffect(() => {
		getCities().then((cities) => {
			setCities(cities);
		});
		getWalkers().then((walkers) => {
			const foundWalker = walkers.find(
				(w) => w.id === parseInt(walkerId)
			);
			let startingBuilder = {
				name: foundWalker.name,
				cityIds: [],
			};
			for (const city of foundWalker.cities) {
				startingBuilder.cityIds.push(city.id);
			}
			setWalkerUpdateBuilder(startingBuilder);
		});
	}, []);

	return (
		<>
			<Label htmlFor='nameInput'>Name: </Label>
			<Input
				id='nameInput'
				type='text'
				value={walkerUpdateBuilder.name}
				onChange={(e) => {
					let copy = { ...walkerUpdateBuilder };
					copy.name = e.target.value;
					setWalkerUpdateBuilder(copy);
				}}
			/>
			<Label htmlFor='cityInput'>Select available cities: </Label>
			<div
				className='form-check'
				id='cityInput'
				onChange={(e) => {
					let copy = { ...walkerUpdateBuilder };
					if (e.target.checked) {
						const cityId = copy.cityIds.find(
							(ci) => ci === parseInt(e.target.value)
						);
						if (!cityId) {
							copy.cityIds.push(parseInt(e.target.value));
							setWalkerUpdateBuilder(copy);
						}
					} else {
						const cityId = copy.cityIds.find(
							(ci) => ci === parseInt(e.target.value)
						);
						if (cityId) {
							let filteredCopy = copy;
							filteredCopy.cityIds = copy.cityIds.filter(
								(ci) => ci !== parseInt(e.target.value)
							);
							setWalkerUpdateBuilder(filteredCopy);
						}
					}
				}}>
				{cities.map((c) => {
					return (
						<Container key={c.id}>
							{walkerUpdateBuilder?.cityIds?.find(
								(cid) => cid === c.id
							) ? (
								<>
									<input
										className='form-check-input'
										type='checkbox'
										value={c.id}
										id={c.id}
										checked
										onChange={(e) => {}}
									/>
									<label
										className='form-check-label'
										htmlFor={c.id}>
										{c.name}
									</label>
								</>
							) : (
								<>
									{' '}
									<input
										className='form-check-input'
										type='checkbox'
										value={c.id}
										id={c.id}
										onChange={(e) => {}}
									/>
									<label
										className='form-check-label'
										htmlFor={c.id}>
										{c.name}
									</label>
								</>
							)}
						</Container>
					);
				})}
				<Button
					onClick={(e) => {
						e.preventDefault();
						putWalker(walkerUpdateBuilder, walkerId);
						navigate('/walkers');
					}}>
					Submit
				</Button>
			</div>
		</>
	);
};

export default WalkerForm;
