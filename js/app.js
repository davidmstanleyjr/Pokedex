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

const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

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
