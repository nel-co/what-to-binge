const button = document.querySelector('.button');
const resultsContainer = document.querySelector('.results-container');
const resultPoster = document.querySelector('.results-poster');
const resultTitle = document.querySelector('.results-title');
const summary = document.querySelector('.summary');
const network = document.querySelector('.network');
const rating = document.querySelector('.rating');

button.addEventListener('click', apiCall);
function apiCall() {
  fetch('http://api.tvmaze.com/shows').then(function(response) {
  	// Convert to JSON
  	return response.json();
  }).then(function(results) {
    let randomNumber = Math.round(Math.random() * (240 - 0) + 1);
    let sLength = (results[randomNumber].summary).length;
    if (sLength > 475-3) {
      resultPoster.src = results[randomNumber].image.medium;
      summary.innerHTML = (results[randomNumber].summary).substring(0, 495 - 3) + '...';
      network.innerText = results[randomNumber].network.name;
      rating.innerText = results[randomNumber].rating.average + '/10';
      resultTitle.innerText = results[randomNumber].name;
      if (resultsContainer.classList == 'results-container slide-class') {
        resultsContainer.classList.remove('slide-class');
        resultsContainer.classList.add('slide-class');
      } else if(resultsContainer.classList == 'results-container') {
        resultsContainer.classList.add('slide-class');
      }
    } else {
      resultPoster.src = results[randomNumber].image.medium;
      summary.innerHTML = results[randomNumber].summary;
      network.innerText = results[randomNumber].network.name;
      rating.innerText = results[randomNumber].rating.average + '/10';
      resultTitle.innerHTML = results[randomNumber].name;
      if (resultsContainer.classList == 'results-container') {
        resultsContainer.classList.add('slide-class');
        resultsContainer.classList.remove('slide-class');
      } else if(resultsContainer.classList == 'results-container') {
        resultsContainer.classList.add('slide-class');
      }
    }
  }).catch(function(err) {
  	// Error :(
    console.log('error');
  });
}
