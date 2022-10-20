export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,name.official,capital,population,flags,languages`,
  ).then(response => {
    return response.json();
  });
}
