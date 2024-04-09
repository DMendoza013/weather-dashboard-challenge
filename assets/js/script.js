const searchFormEl = document.querySelector('#weather-form')




function handleSearchFormSubmit (event) {
    event.preventDefault();

    const searchInputVal = document.querySelector('#search-input').value;

    return console.log(searchInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);