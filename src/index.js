import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  country: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const inputValue = e.target.value.trim();
  if (!inputValue) {
    refs.countryInfo.innerHTML = '';
    refs.country.innerHTML = '';
    return;
  }
  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length < 10 && countries.length > 1) {
        return renderCountriList(countries);
      } else {
        renderBoxCountryInfo(countries);
      }
    })
    .catch(onFetchError)
    .finally();
}

function renderCountriList(countries) {
  const countriInfo = countries
    .map(({ name, flags }) => {
      return `<li class="country-item"> <img src="${flags.svg}" alt="прапор держави" width=25px> ${name.official}</li>`;
    })
    .join('');
  refs.countryInfo.innerHTML = '';
  refs.country.innerHTML = countriInfo;
}

function renderBoxCountryInfo(countries) {
const boxContent = countries.map(({name, capital, population, languages, flags}) => {
  const languagesValue = Object.values(languages);
  return `<ul class="box-list">
  <li class="box-item"><img src="${flags.svg}" alt="прапор держави" width=40><h1> ${name.official}<h1></li>
  <li class="box-item">Capital:${capital}</li>
  <li class=box-item">Population:${population}</li>
  <li class=box-item">Languages:${languagesValue}</li>
  </ul>`;
});
refs.country.innerHTML = '';
refs.countryInfo.innerHTML = boxContent;
}

function onFetchError() {
  return Notify.failure("Oops, there is no country with that name");
}