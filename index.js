'use strict';

// National Park API key
const apiKey = '6rvYbQvg3dqTf9zQDDqdrAQPEO1Y8yN9cz1UXELl'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?stateCode=';
//'https://developer.nps.gov/api/v1/stateCode=me&api_key=INSERT-API-KEY-HERE'

function formatQueryParams(params) {
 const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each park object in the items array, add a list item to the results 
    //list with the park name, description, and url
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].url}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParksList(limit=50) {
 const stateSearch = $('#js-search-term').val();
 console.log(stateSearch);
  const params = {
    limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + stateSearch + '&api_key='+ apiKey;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const limit = $('#js-max-results').val();
    const stateSearch = $('#js-search-term').val();
    getParksList(stateSearch, limit);
  });
}

$(watchForm);