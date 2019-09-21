'use strict';

const searchWinesURL = 'https://api.spoonacular.com/food/wine/pairing';

function displayWinesResults(data) {
  // if there are previous results, remove them
  console.log(data);
  $('#wines-pairs').empty();
    $('#wines-pairs').append(
      `<li>
        <p>'${data.pairingText}'</p>
      </li>`
    )
    let item = '';
        for (let i = 0; i < data.productMatches.length; i++){
            console.log(data.productMatches[i]);
            item += `<a href = '${data.productMatches[i].link}' target = '_blank'><img src = ${data.productMatches[i].imageUrl}></a>`
    }
  $('#wines-display').html(item);
  //display the results section   
  $('#wines-results').removeClass('hidden');
};

function getWines(food) {
  const apiKey = '752a9b6e69854094b6c34d48a6cabe31';

  const url = searchWinesURL + '?' + 'food='+ food + '&apiKey=' + apiKey;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(data => displayWinesResults(data))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const food = $('#js-search-food').val();
    getWines(food);
  });
}

$(watchForm);
