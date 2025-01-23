const temperature = document.querySelector('#current-temp')
const weatherImage = document.querySelector('#weather-icon')
const figure = document.querySelector('figcaption')

const url= 'https://api.openweathermap.org/data/2.5/weather?lat=49.72555368121938&lon=6.850007554037216&appid=8c3616518147fd9878489d1494a91c1b&units=metric'


async function apiFetch() {
    
    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json()
            console.log(data)
            displayResults(data)
        }else{
            throw Error(await response.text())
            
        }
    } catch (error){
        console.log(error);
    }


}
apiFetch()

function displayResults(data){
    temperature.textContent = `${data.main.temp}ºC`
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherImage.setAttribute('src', iconUrl)
    weatherImage.setAttribute('alt', data.weather[0].description)
    figure.textContent = data.weather[0].description
};




