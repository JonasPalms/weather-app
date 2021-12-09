const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = data => {


    // use destructuring to extract properties from data object 
    // remember: only works if propery name is the same as object key
    const { cityDets, weather } = data;
    console.log(cityDets, weather);


    // update details template

    details.innerHTML = ` 
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-h3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute("src", iconSrc);

    let timeSrc = weather.IsDayTime ? `img/day.svg` : `img/night.svg`;

    time.setAttribute("src", timeSrc);
    // remove the d-none class if present.

    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none")
    }
}

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    // bruger object shorthand notation. JS antager at key og value har samme
    // så behøver ikke skrive begge
    return { cityDets, weather };
}

cityForm.addEventListener("submit", (e) => {
    // prevent default action
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update UI with new city 
    updateCity(city).then(data => updateUI(data))
        .catch(err => console.log(err));
});



