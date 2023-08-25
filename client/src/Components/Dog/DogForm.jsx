import { useEffect, useState } from 'react';
import { getCities, postDog } from '../../apiManager';
import { useNavigate } from 'react-router-dom';

const DogForm = () => {
	const [cities, setCities] = useState([]);
	const [dogBuilder, setDogBuilder] = useState({
		name: '',
		cityId: 0,
	});

	const navigate = useNavigate();

	useEffect(() => {
		getCities().then((cities) => {
			setCities(cities);
		});
	}, []);

	return (
		<>
			<form>
				<label>Name: </label>
				<input
					type='text'
					onChange={(e) => {
						let dog = { ...dogBuilder };
						dog.name = e.target.value;
						setDogBuilder(dog);
					}}
				/>
				<select
					id='select-cities'
					onChange={(e) => {
						let dog = { ...dogBuilder };
						dog.cityId = e.target.value;
						setDogBuilder(dog);
					}}>
					<option value={0}>Select a city...</option>
					{cities.map((c) => {
						return (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						);
					})}
				</select>
			</form>
			<button
				onClick={async () => {
					postDog(dogBuilder).then((dog) => {
						navigate(`/dogs/${dog.id}`);
					});
				}}>
				submit
			</button>
		</>
	);
};

export default DogForm;
