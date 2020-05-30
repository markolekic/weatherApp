const wholeApi = {
    key: 'af794889934e1af62aadd3064a875800',
    url: 'https://api.openweathermap.org/data/2.5/'
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', searchOnEnter);

function searchOnEnter(e) {
    if (e.keyCode == 13) {
        results(searchbox.value)
    }
}

//Getting results form API
function results(resultsWeather) {
    fetch(`${wholeApi.url}weather?q=${resultsWeather}&units=metric&APPID=${wholeApi.key}&lang=sr`)
        .then(weather => {
            if (weather.ok) {
                return weather.json()
            } else {
                let errorMsg = document.querySelector('.location .city');
                errorMsg.innerText = 'Тражени резултат није пронађен, покушајте поново';

                let temp = document.querySelector('.current .temp')
                temp.innerHTML = `<span>°c</span>`;

                let weather_el = document.querySelector('.current .weather');
                weather_el.innerText = `Тренутно време`;
            }
        }).then(displeyResults)
};

//Displaying results to DOM
function displeyResults(weather) {
    console.log(weather)
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].description;
};

//Create Date function
function dateBuilder(date) {
    let months = ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул',
        'Авг', 'Сеп', 'Окт', 'Нов', 'Дец'
    ];
    let days = ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота'];

    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let datum = date.getDate();

    return `${day} • ${datum} ${month} ${year}`
}