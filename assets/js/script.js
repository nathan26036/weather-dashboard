var key = "02d6ab7456a8603457d345fd24af493e"
var cityHist = [];
var city = $('#city');
var todayWeather = $('#todayEl')
var submitBtn = $('#submitBtn')
var contHistEl = $('.history-container');
var fiveWeather = $('#fiveWeather')


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


function getHistory() {

  $(contHistEl).empty();


	for (let i = 0; i < cityHist.length; i++) {

		var rowEl = document.createElement('div');
		var btnEl = document.createElement('button');
    btnEl.classList = 'histBtn';
    btnEl.textContent = (cityHist[i].toUpperCase());
		contHistEl.append(rowEl);
		rowEl.append(btnEl);
	} if (!city) {
		return;
	}
	//Allows the buttons to start a search as well
	$('.histBtn').on("click", function (event) {
		city = $(this).text();
    getWeather();
	});
  console.log(cityHist)
};


var getWeather = function() {
    var locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid='  + key;
    
    $(todayEl).empty();


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
            var todayEl = document.createElement('div'); 
            todayEl.classList = 'card bg-primary mb-3 todayWeather';
            var cityName = document.createElement('h1');
            var icon = todayWeather.innerHTML = "<i>"+ data.weather[0].icon +"</i>" ;
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


function getFiveDayForecast() {
 //find out how to add classes to elemets
 //fix whatever bug is in the city history
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
      var fiveDays = [data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]];

      var title = document.createElement('h1')
      title.textContent = ('5-Day Forcast: ')
      title.classList = 'title'
      fiveWeather.append(title)

      for (let i = 0; i < fiveDays.length; i++) {
        var weatherEl = document.createElement('div'); 
        weatherEl.classList = 'card bg-primary mb-3 five';
            var date = document.createElement('h1');
            var icon = todayWeather.innerHTML = "<i>"+fiveDays[i].weather.icon +'</i>' ;
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
