const temperature = document.querySelector('#current-temp')
const weatherImage = document.querySelector('#weather-icon')
const figure = document.querySelector('figcaption')

const url= 'https://api.openweathermap.org/data/2.5/weather?lat=49.72555368121938&lon=6.850007554037216&appid=8c3616518147fd9878489d1494a91c1b&units=metric'

let weatherParams = []

async function apiFetch() {
    
    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json()
            console.log(data)
        }else{
            throw Error(await response.text())
            
        }
    } catch (error){
        console.log(error);
    }

    displayResults(weatherParams)
}

function displayResults(wheather){
    weatherParams.forEach(clime => {

        temperature.textContent = clime.main.temp

        temperature.appendChild(clime.main.temp)
        
    });
}

apiFetch()

