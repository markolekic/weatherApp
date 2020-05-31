//Class with key-api and url
const wholeApi = {
    key: 'af794889934e1af62aadd3064a875800',
    url: 'https://api.openweathermap.org/data/2.5/'
};

//Event on keypress
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', searchOnEnter);

//Function for Event on Enter key
function searchOnEnter(e) {
    if (e.keyCode == 13) {
        //getting value from searchbox
        results(searchbox.value)
    }
}

//Getting results form API
function results(q) {
    //Set fetch request 
    fetch(`${wholeApi.url}weather?q=${q}&units=metric&APPID=${wholeApi.key}&lang=sr`)
    //return weather and confirm to JSON and pass JSON through displayResults
    .then(weather => {
        //Checking if search results are correct and displayResults
        if (weather.ok) {
            return weather.json()
            //If results are not found, return display errorMsg
        } else {
            let errorMsg = document.querySelector('.location .city');
            errorMsg.innerText = 'Тражени резултат није пронађен, покушајте поново';

            let temp = document.querySelector('.current .temp');
            temp.innerHTML = `<span>°c</span>`;

            let weather_el = document.querySelector('.current .weather');
            weather_el.innerText = `Тренутна прогноза`;
        }
    }).then(displeyResults)
};

//Displaying results to DOM
function displeyResults(weather) {
    //Display for location
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}`;
    //Display for Date
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    //Display for temperature
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    //Display for weather condition
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].description;
};

//Create Date function
function dateBuilder(date) {
    //Months array
    let months = ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул',
        'Авг', 'Сеп', 'Окт', 'Нов', 'Дец'
    ];
    //Days array
    let days = ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота'];

    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let datum = date.getDate();

    return `${day} • ${datum} ${month} ${year}`;
};
