//These are my DOM objects
const pokeName = document.querySelector('.poke-name');
const mainScreen = document.querySelector('.main-screen');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

//this is for pokemon types
const TYPES = [
	'normal',
	'fighting',
	'flying',
	'poison',
	'ground',
	'rock',
	'bug',
	'ghost',
	'steel',
	'fire',
	'water',
	'grass',
	'electric',
	'psychic',
	'ice',
	'dragon',
	'dark',
	'fairy'
];
let prevUrl = null;
let nextUrl = null;

//Functions
//Capitalizes the first letter of each name and type.
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);
//removes previous pokemon from the screen
const resetScreen = () => {
	mainScreen.classList.remove('hide');
	for (const type of TYPES) {
		mainScreen.classList.remove(type);
	}
};

//This fetches the list of Pokemon
const fetchPokeList = (url) => {
	fetch(url).then((res) => res.json()).then((data) => {
		const { results, previous, next } = data;
		prevUrl = previous;
		nextUrl = next;

		for (let i = 0; i < pokeListItems.length; i++) {
			const pokeListItem = pokeListItems[i];
			const resultData = results[i];

			if (resultData) {
				const { name, url } = resultData;
				const urlArray = url.split('/');
				const id = urlArray[urlArray.length - 2];
				pokeListItem.textContent = id + ' . ' + capitalize(name);
			} else {
				pokeListItem.textContent = '';
			}
		}
	});
};

//This fetches the pokeData
const fetchPokeData = (id) => {
	fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()).then((data) => {
		resetScreen();

		const dataTypes = data['types'];
		const dataFirstType = dataTypes[0];
		const dataSecondType = dataTypes[1];
		pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
		if (dataSecondType) {
			pokeTypeTwo.classList.remove('hide');
			pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
		} else {
			pokeTypeTwo.classList.add('hide');
			pokeTypeTwo.textContent = '';
		}
		mainScreen.classList.add(dataFirstType['type']['name']);
		//Pokemon attributes
		pokeName.textContent = capitalize(data['name']);
		pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
		pokeWeight.textContent = data['weight'];
		pokeHeight.textContent = data['height'];
		//if front or back default is null, the empty string takes care that
		pokeFrontImage.src = data['sprites']['front_default'] || '';
		pokeBackImage.src = data['sprites']['back_default'] || '';
	});
};

//This handles left button clicks
const handleLeftButtonClick = () => {
	if (prevUrl) {
		fetchPokeList(prevUrl);
	}
};

//This handles right button clicks
const handleRightButtonClick = () => {
	if (nextUrl) {
		fetchPokeList(nextUrl);
	}
};
