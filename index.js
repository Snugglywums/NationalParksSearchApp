'use strict';

const apiKey = '6rvYbQvg3dqTf9zQDDqdrAQPEO1Y8yN9cz1UXELl'; 
const searchUrl = 'https://developer.nps.gov/api/v1/parks?';


function formatQueryParams(params) {
 const queryItems = Object.keys(params)
   .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
   console.log(queryItems)
  return queryItems.join('&');
}


function getParksList(query, limit=50) {

 const params = {
  stateCode: query,
  limit,
  api_key: apiKey,

 };

 

 let queryString = formatQueryParams(params)
 const url = searchUrl  + queryString;
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


function displayResults(responseJson) {
  
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  $('#results').removeClass('hidden');
  for (let i = 0; i < responseJson.data.length; i++){
    let index = 0;
    
          $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <h4>${responseJson.data[i].addresses[index].line1}, ${responseJson.data[i].addresses[index].city}, ${responseJson.data[i].addresses[index].stateCode}</h4>
            <p>${responseJson.data[i].description}</p>
            <p>${responseJson.data[i].url}</p>
            </li>`
          )
         
  };

}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
   const limit = $('#js-max-results').val();
    const query = $('#js-search-multiple').val();
    getParksList(query, limit);
  });
}

$(watchForm);
