import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const refs = {
    input: document.querySelector('#search-box'),
    country: document.querySelector('.country-list'),
    countryInfo: document.querySelector('country-info'),
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const inputValue = e.target.value.trim();
    if (!inputValue) {
        refs.country.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }
    fetchCountries(inputValue).then(countries => {
        if (countries.length > 10) {
            return Notify.info("Too many matches found. Please enter a more specific name.")
        }
    });

} 








