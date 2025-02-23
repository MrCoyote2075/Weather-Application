const status = document.getElementById('weatherStatus')
const search = document.querySelector('#search')
const displayError = document.getElementById('displayError')

async function getWeatherData(cityName) {
    var APIKey = '922785039feb46bd2d2147e95fa86093';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
    return fetch(url)
                .then((response,error) => {
                    console.log(response);
                    if(response.ok)
                        return response.json()
                    else 
                        throw Error("can't fetch");
                })
                .catch(error => {
                    console.log(error);
                    displayError.textContent = "*Invalid location, Please Enter a Valid City.."
                });
}

async function displayWeatherDataOf(cityName){
    const data = await getWeatherData(cityName)
    if(data == undefined) return
    displayError.textContent = ""
    var icon = `<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`
    var weatherName = `${data.weather[0].main}` 
    var name = data.name
    var temp = Math.floor(data.main.temp - 273.15)
    var humidity = data.main.humidity
    var details = `<pre class="weatherDetailes"> ${icon} <br> ${weatherName} <br><br> City : ${name} <br> Temperature : ${temp}°C <br> Humidity : ${humidity}% </pre>`
    status.innerHTML = details
}

async function searchData() {
    var cityName = document.getElementById('cityName').value;
    console.log(cityName); 
    displayWeatherDataOf(cityName);
}

window.addEventListener('keydown', (key) => {
    if(key.key == 'Enter')
        searchData();
}); 