import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDogById } from '../../apiManager';

const DogDetails = () => {
	const { id } = useParams();
	const [dog, setDog] = useState({
		name: '',
		id: 0,
		walkerId: 0,
		walker: {},
	});

	useEffect(() => {
		getDogById(id).then((dog) => {
			setDog(dog);
		});
	}, [id]);

	return (
		<>
			<h2>{dog.name}</h2>
			<p>Walker: {dog.walker?.name}</p>
			<p>City: {dog.city?.name}</p>
		</>
	);
};

export default DogDetails;
