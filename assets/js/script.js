var key = "02d6ab7456a8603457d345fd24af493e"
var cityHist = [];
var city = $('#city');
var todayWeather = $('#todayEl')
var submitBtn = $('#submitBtn')
var contHistEl = $('.history-container');
var fiveWeather = $('#fiveWeather')



//pulls the local storage down and creates buttons for the search history 
function getHistory() {
  var getcity = JSON.parse(localStorage.getItem('city'));
//clears the content so it doesnt create a billion buttons  
  $(contHistEl).empty();

//loops local storage array and creates the buttons 
	for (let i = 0; i < getcity.length; i++) {

		var rowEl = document.createElement('div');
		var btnEl = document.createElement('button');
    btnEl.classList = 'histBtn';
    btnEl.textContent = (getcity[i].toUpperCase());
		contHistEl.append(rowEl);
		rowEl.append(btnEl);
	} if (!city) {
		return;
	}
//makes the history buttons function
	$('.histBtn').on("click", function (event) {
		city = $(this).text();
    getWeather();
	});
};

//Uses the weather api to get the current weather
var getWeather = function() {

    var locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid='  + key;
    
    $(todayEl).empty();
//Gathers the lat and lon from the city name using the geo api to be used on the weather
    fetch(locationUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        var lon = data[0].lon;
        var lat = data[0].lat;
        var todayUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon +'&units=imperial&appid='  + key;
        fetch(todayUrl)
        .then(function (response) {
          return response.json();
        }) //Creates elements and the content that is needed for the todays weather card
        .then(function (data) {    
            var todayEl = document.createElement('div'); 
            todayEl.classList = 'card bg-primary mb-3 todayWeather';
            var cityName = document.createElement('h1');
            var icon = document.createElement('img');
            icon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png' );
            icon.classList = 'icons';
            var temp = document.createElement('li');
            var wind = document.createElement('li');
            var humidity = document.createElement('li');
            cityName.textContent = (data.name + ' ' +dayjs().format('MM-DD-YYYY'));   
            temp.textContent = ('Temp: ' + data.main.feels_like + ' °F');
            wind.textContent = ('Wind: ' +data.wind.speed + ' MPH');
            humidity.textContent = ('Humidity: ' +data.main.humidity + ' %');
            todayWeather.append(todayEl)
            todayEl.append(cityName);
            todayEl.append(icon);
            todayEl.append(temp);
            todayEl.append(wind);
            todayEl.append(humidity);
        });
        getFiveDayForecast()
    });
}

//Gathers a 5 day forcast 
function getFiveDayForecast() {
 var locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid='  + key;
    
 $(fiveWeather).empty();

 fetch(locationUrl)
 .then(function (response) {
   return response.json();
 })
 .then(function (data) {
     var lon = data[0].lon;
     var lat = data[0].lat;
     var fiveUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon=' + lon +'&units=imperial&appid='  + key;
     
     fetch(fiveUrl)
     .then(function (response) {
       return response.json();
     })
     .then(function (data) {
      var fiveDays = [data.list[5], data.list[13], data.list[21], data.list[29], data.list[37]];
console.log(data)
      var title = document.createElement('h1')
      title.textContent = ('5-Day Forcast: ')
      title.classList = 'title'
      fiveWeather.append(title)
//loops the 5 day array above and creates a card for each day and puts them on the page
      for (let i = 0; i < fiveDays.length; i++) {
        var weatherEl = document.createElement('div'); 
        weatherEl.classList = 'card bg-primary mb-3 five';
            var date = document.createElement('h1');
            var icon = document.createElement('img');
            icon.setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDays[i].weather[0].icon + '@2x.png' );
            icon.classList = 'icons';
            var temp = document.createElement('li');
            var wind = document.createElement('li');
            var humidity = document.createElement('li');
            date.textContent = dayjs(fiveDays[i].dt_txt).format('MM-DD-YYYY');
            temp.textContent = ('Temp: ' + fiveDays[i].main.feels_like + ' °F');
            wind.textContent = ('Wind: ' + fiveDays[i].wind.speed + ' MPH');
            humidity.textContent = ('Humidity: ' + fiveDays[i].main.humidity + ' %');
            fiveWeather.append(weatherEl)
            weatherEl.append(date);
            weatherEl.append(icon);
            weatherEl.append(temp);
            weatherEl.append(wind);
            weatherEl.append(humidity);
      }
     });
 });
};

//Gives the search button the ability to display the weather and saves to local storage
submitBtn.on("click", function (event) {
	event.preventDefault();
	city = $(this).siblings('#city').val();
	if (city === '') {
		return;
	};
	cityHist.push(city);

	localStorage.setItem('city', JSON.stringify(cityHist)); 

  getHistory();
  getWeather();
});
getHistory();