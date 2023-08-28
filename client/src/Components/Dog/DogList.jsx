import { useState, useEffect } from 'react';
import { deleteDog, getDogs } from '../../apiManager';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';

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
			<Container>
				<Button
					onClick={() => {
						navigate('/dogs/new');
					}}>
					Add Dog
				</Button>
			</Container>
			<ListGroup>
				{dogs?.map((d) => {
					return (
						<ListGroupItem key={d.id}>
							<Link to={`dogs/${d.id}`}>{d.name}</Link>{' '}
							<Button
								onClick={() => {
									deleteDog(d.id);
									getDogs().then((dogs) => {
										setDogs(dogs);
									});
								}}>
								Remove
							</Button>
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</>
	);
};

export default DogList;
