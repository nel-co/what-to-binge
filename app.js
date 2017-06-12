const button = document.querySelector('.button');
const resultsContainer = document.querySelector('.results-container');
const resultPoster = document.querySelector('.results-poster');
const resultTitle = document.querySelector('.results-title');
const summary = document.querySelector('.summary');
const network = document.querySelector('.network');
const rating = document.querySelector('.rating');

let showArray = [];

button.addEventListener('mouseup', getShow);
resultsContainer.addEventListener('click', getShow);
//channelChange();

(function apiCall() {
  let pageNum = Math.floor(Math.random() * (5 - 0)) + 0;
  fetch('//api.tvmaze.com/shows?page=' + pageNum).then(function(response) {
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
  let tvShow = showArray[randomNumber];
  let sLength = (tvShow.summary).length;
  if (sLength > 250-3) {
    summary.innerHTML = (tvShow.summary).substring(0, 248 - 3) + '...';
  } else {
    summary.innerHTML = tvShow.summary;
  }
  resultPoster.src = tvShow.image.medium;
  (tvShow.network.name == null || tvShow.network.name == undefined) ? network.innerHTML = '' : network.innerHTML = tvShow.network.name;
  tvShow.name == null ? resultTitle.innerText = '' : resultTitle.innerText = tvShow.name;
  tvShow.rating.average == null ? rating.innerText = 'unrated' : rating.innerText = tvShow.rating.average + '/10';
  resultsContainer.classList.add('slide-class');
  resultsContainer.style.visibility = 'visible';
  resultsContainer.style.display = 'flex';
  setTimeout(function(){ resultsContainer.classList.remove('slide-class'); }, 300);
}

//Change overlay color on interval
function channelChange() {
  setInterval(function () {
    let colorArr = ['rgba(230,65,49,.4)', 'rgba(230,49,181,.4)','rgba(49,74,230,.4)','rgba(49,230,220,.4)','rgba(49,230,53,.4)'];
    let randomColor = colorArr[Math.floor(Math.random() * colorArr.length)];
    document.body.style.backgroundColor = randomColor;
    document.body.style.backgroundImage = "url('tv-shows.png')";
    console.log(randomColor);
  }, 1500);
}
