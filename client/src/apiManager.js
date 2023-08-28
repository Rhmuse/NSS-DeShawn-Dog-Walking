// Dogs

export const getDogs = async () => {
	const res = await fetch("/api/dogs");
	return res.json();
}

export const getDogById = async (id) => {
	const res = await fetch(`/api/dogs/${id}`);
	return res.json();
}

export const postDog = async (dog) => {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(dog)
	}

	const res = await fetch('/api/dogs', options)
	return res.json();
}

export const putDog = async (dog) => {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(dog)
	}

	const res = await fetch(`/api/dogs/${dog.id}`, options);
	return res.json();
}

export const deleteDog = async (dogId) => {
	const options = {
		method: "Delete"
	}
	fetch(`/api/dogs/${dogId}`, options);
}


// Cities
export const getCities = async () => {
	const res = await fetch('/api/cities');
	return res.json();
}


export const postCity = async (city) => {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(city)
	}

	const res = await fetch('/api/cities', options);
	return res.json();
}

//Walkers

export const getWalkers = async () => {
	const res = await fetch('/api/walkers');
	return res.json();
}

export const putWalker = async (walkerUpdateDTO, walkerId) => {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(walkerUpdateDTO)
	}

	const res = await fetch(`/api/walkers/${walkerId}`, options);
	return res.json();
}