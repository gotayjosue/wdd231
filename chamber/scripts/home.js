const year = new Date().getFullYear()
const lastModified = document.querySelector('#modificationDate').textContent = `Last Modification: ${document.lastModified}`
const name = document.querySelector('#name').textContent = `\u00A9 ${year} Trujillo Chamber of Commerce`;

const menuButton = document.querySelector('#menuButton')
const navBar = document.querySelector('#navigation')

menuButton.addEventListener('click', () =>{

    navBar.classList.toggle('open')
    menuButton.classList.toggle('open')
})


window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { //Everytime the page gets bigger the class 'open' will be take out of the navBar and the menuButton//
        navBar.classList.remove('open');
        menuButton.classList.remove('open')
    }
});


//Black mode button function
const modeButton = document.querySelector('.light-mode')

modeButton.addEventListener('click', () =>{

    document.body.classList.toggle('black')

});

//getting spotlights
const spotlightContainer = document.querySelector('#spotlights')

let membersList = [];

const getMembers = async () => {
    
    const response = await fetch("https://gotayjosue.github.io/wdd231/chamber/data/members.json")

    membersList = await response.json();

    displayMembers(membersList);
}

function displayMembers(members){

    const filteredMembers = members.filter(member => member.membershipLevel == 2 || member.membershipLevel == 3)

    const selectedRandom = selected(filteredMembers, 3)

    selectedRandom.forEach(member => {

        const section = document.createElement('section')
        const title = document.createElement('h3')
        const tag = document.createElement('p')
        tag.className = "tag"

        const img = document.createElement('img')
        img.src = member.imageUrl
        img.alt = member.name

        const phone = document.createElement('p')
        phone.className = "phone"
        const site = document.createElement('a')
        site.className = "site"
        const address = document.createElement('p')
        address.className = "address"
        const membership = document.createElement('p')
        membership.className = "membership"

        title.textContent = member.name
        tag.textContent = member.bussinesTag
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`
        site.innerHTML = `<strong>URL:</strong> ${member.website}`
        address.innerHTML = `<strong>Address:</strong> ${member.address}`
        membership.innerHTML = `<strong>Membership level:</strong> ${member.membershipLevel}`

        section.appendChild(title)
        section.appendChild(tag)
        section.appendChild(img)
        section.appendChild(phone)
        section.appendChild(site)
        section.appendChild(address)
        section.appendChild(membership)

        
        spotlightContainer.appendChild(section)
     
    });

}

function selected (members, n){
    const result = []
    const copy = [...members]
    while (result.length < n && copy.length > 0){
        const ramdomSelection = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(ramdomSelection, 1)[0]);
    }
    return result;
}

getMembers()

//Weather API implementation

const temperature = document.querySelector('#temp')
const description = document.querySelector('#description')
const high = document.querySelector('#high')
const low = document.querySelector('#low')
const humidity = document.querySelector('#humidity')
const sunrise = document.querySelector('#sunrise')
const sunset = document.querySelector('#sunset')
const weatherContainer = document.querySelector('.currentWeather')

const url= 'https://api.openweathermap.org/data/2.5/weather?lat=15.911461095971282&lon=-85.9523698285993&appid=21f41c4766fe59c0c40d3a7fb615b230&units=metric'


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

function formatTime(date){
    let hours = date.getHours()
    let minutes = date.getMinutes()

    hours = hours % 12
    hours = hours ? hours : 12
    let ampm = hours > 12 ? 'PM' : 'AM'
    minutes = minutes < 10 ? '0' + minutes : minutes
    
    return `${hours}:${minutes} ${ampm}`
}


function displayResults(data){
    //Converting date data from the API
    const sunriseTimestamp = data.sys.sunrise
    const sunsetTimestamp = data.sys.sunset
    const sunriseHour = new Date(sunriseTimestamp * 1000)
    const sunsetHour = new Date(sunsetTimestamp * 1000)



    temperature.innerHTML = `<strong>${data.main.temp}</strong> ºC`
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const icon = document.createElement('img')
    icon.setAttribute('src', iconUrl)
    icon.setAttribute('alt', data.weather[0].description)
    weatherContainer.appendChild(icon)
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    description.textContent = capitalize(data.weather[0].description)
    humidity.innerHTML = `<strong>Humidity:</strong> ${data.main.humidity}%`
    high.innerHTML = `<strong>High:</strong> ${data.main.temp_max} ºC`
    low.innerHTML = `<strong>Low:</strong> ${data.main.temp_min} ºC`
    sunrise.innerHTML = `<strong>Sunrise:</strong> ${formatTime(sunriseHour)}`
    sunset.innerHTML = `<strong>Sunset:</strong> ${formatTime(sunsetHour)}`
};

//Forecast API implementation
const day1 = document.querySelector('#day1')
const day2 = document.querySelector('#day2')
const day3 = document.querySelector('#day3')
const forecast= 'https://api.openweathermap.org/data/2.5/forecast?lat=15.911461095971282&lon=-85.9523698285993&cnt=24&appid=21f41c4766fe59c0c40d3a7fb615b230&units=metric'


async function apiForecastFetch() {
    
    try{
        const forecastResponse = await fetch(forecast);
        if(forecastResponse.ok){
            const forecastData = await forecastResponse.json()
            console.log(forecastData)
            displayForecastResults(forecastData)
        }else{
            throw Error(await forecastResponse.text())
            
        }
    } catch (error){
        console.log(error);
    }


}
apiForecastFetch()

function displayForecastResults(forecastData){
    const dayOneTimestamp = forecastData.list[0].dt
    const dayTwoTimestamp = forecastData.list[10].dt
    const dayThreeTimestamp = forecastData.list[22].dt

    const dayOneName = new Date(dayOneTimestamp * 1000)
    const dayTwoName = new Date(dayTwoTimestamp * 1000)
    const dayThreeName = new Date(dayThreeTimestamp * 1000)

    function dayNames(date){
        const daysOfWeek = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
          ];
        return daysOfWeek[date.getDay()]
    }


    day1.innerHTML = `<strong>${dayNames(dayOneName)} ${formatTime(dayOneName)}:</strong> ${forecastData.list[0].main.temp}ºC`
    day2.innerHTML = `<strong>${dayNames(dayTwoName)} ${formatTime(dayTwoName)}:</strong> ${forecastData.list[1].main.temp}ºC`
    day3.innerHTML = `<strong>${dayNames(dayThreeName)} ${formatTime(dayThreeName)}:</strong> ${forecastData.list[2].main.temp}ºC`
}