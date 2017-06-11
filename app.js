const button = document.querySelector('.button');
const resultsContainer = document.querySelector('.results-container');
const resultPoster = document.querySelector('.results-poster');
const resultTitle = document.querySelector('.results-title');
const summary = document.querySelector('.summary');
const network = document.querySelector('.network');
const rating = document.querySelector('.rating');

let showArray = [];

button.addEventListener('click', getShow);

(function apiCall() {
  let pageNum = Math.floor(Math.random() * (5 - 0)) + 0;
  fetch('http://api.tvmaze.com/shows?page=' + pageNum).then(function(response) {
  	// Convert to JSON
  	return response.json();
  }).then(function(results) {
    showArray = results;
  }).catch(function(err) {
  	// Error :(
    console.log('error');
  });
})();

function getShow() {
  let randomNumber = Math.floor(Math.random() * (240 - 0) + 0);
  let prevNumber = randomNumber;
  prevNumber == randomNumber ? randomNumber = Math.floor(Math.random() * (240 - 0) + 0) : randomNumber = Math.floor(Math.random() * (240 - 0) + 0);
  let sLength = (showArray[randomNumber].summary).length;
  if (sLength > 475-3) {
    summary.innerHTML = (showArray[randomNumber].summary).substring(0, 495 - 3) + '...';
  } else {
    summary.innerHTML = showArray[randomNumber].summary;
  }
  resultPoster.src = showArray[randomNumber].image.medium;
  network.innerText = showArray[randomNumber].network.name;
  showArray[randomNumber].name == null ? resultTitle.innerText = '' : resultTitle.innerText = showArray[randomNumber].name;
  showArray[randomNumber].rating.average == null ? rating.innerText = 'unrated' : rating.innerText = showArray[randomNumber].rating.average + '/10';
  resultsContainer.style.visibility = 'visible';
  resultsContainer.style.animation = 'slideresults .3s cubic-bezier(.17,.67,.31,.89)';
}
