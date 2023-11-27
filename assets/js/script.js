var key = "02d6ab7456a8603457d345fd24af493e"
var cityHist = [];
var city = $('#city');
var todayWeather = $('#todayWeather')
var submitBtn = $('#submitBtn')
var contHistEl = $('#cityHist');



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
  console.log(city)
  console.log(cityHist)
});


function getHistory() {

	for (let i = 0; i < cityHist.length; i++) {

		var rowEl = document.createElement('div');
		var btnEl = document.createElement('button');
    btnEl.textContent = (cityHist[i])

		contHistEl.append(rowEl);
		rowEl.append(btnEl);
	} if (!city) {
		return;
	}
	//Allows the buttons to start a search as well
	submitBtn.on("click", function (event) {
		city = $(this).text();
		getWeather();
	});
  console.log(cityHist)
};


var getWeather = function() {
    var locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid='  + key;
    
    fetch(locationUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
        var lon = data[0].lon;
        var lat = data[0].lat;
        var todayUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon +'&units=imperial&appid='  + key;
        console.log(todayUrl)
        fetch(todayUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
            var cityName = document.createElement('h1');
            var icon = document.createElement('img');
            var temp = document.createElement('li');
            var wind = document.createElement('li');
            var humidity = document.createElement('li');
            cityName.textContent = (data.name);
            icon.textContent = (data.weather[0].icon);
            temp.textContent = ('Temp: ' + data.main.feels_like + ' °F');
            wind.textContent = ('Wind: ' +data.wind.speed + ' MPH');
            humidity.textContent = ('Humidity: ' +data.main.humidity + ' %');
            todayWeather.append(cityName);
            todayWeather.append(icon);
            todayWeather.append(temp);
            todayWeather.append(wind);
            todayWeather.append(humidity);
            console.log(icon)
        });
    });
}


function getFiveDayForecast() {
 // make an arry maybe and pull from those to get the 5 days and loop the same function as above
 //find out how to add classes to elemets
 //fix whatever bug is in the city history
};
