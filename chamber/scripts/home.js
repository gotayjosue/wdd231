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
const icon = document.querySelector('#weatherIcon')

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



function displayResults(data){
    //Converting date data from the API
    const sunriseTimestamp = data.sys.sunrise
    const sunsetTimestamp = data.sys.sunset
    const sunriseHour = new Date(sunriseTimestamp * 1000)
    const sunsetHour = new Date(sunsetTimestamp * 1000)

    function formatTime(date){
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return(`${hours}:${minutes}`)
    }

    temperature.innerHTML = `<strong>${data.main.temp}</strong> ºC`
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.setAttribute('src', iconUrl)
    icon.setAttribute('alt', data.weather[0].description)
    description.textContent = data.weather[0].description
    humidity.textContent = `Humidity: ${data.main.humidity}%`
    high.textContent = `High ${data.main.temp_max} ºC`
    low.textContent = `Low ${data.main.temp_min} ºC`
    sunrise.textContent = `Sunrise: ${formatTime(sunriseHour)}`
    sunset.textContent = `Sunset: ${formatTime(sunsetHour)}`
};

//Forecast API implementation
const day1 = document.querySelector('#day1')
const day2 = document.querySelector('#day2')
const day3 = document.querySelector('#day3')
const forecast= 'https://api.openweathermap.org/data/2.5/forecast?lat=15.911461095971282&lon=-85.9523698285993&cnt=3&appid=21f41c4766fe59c0c40d3a7fb615b230&units=metric'


async function apiForcastFetch() {
    
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
apiForcastFetch()

function displayForecastResults(forecastData){
    dayOneTimestamp = forecastData.list[0].dt
    dayTwoTimestamp = forecastData.list[1].dt
    dayThreeTimestamp = forecastData.list[2].dt

    dayOneName = new Date(dayOneTimestamp * 1000)
    dayTwoName = new Date(dayTwoTimestamp * 1000)
    dayThreeName = new Date(dayThreeTimestamp * 1000)

    function dayNames(date){
        const daysOfWeek = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
          ];
        return daysOfWeek[date.getDay()]
    }


    day1.innerHTML = `<strong>${dayNames(dayOneName)}:</strong> ${forecastData.list[0].main.temp}`
    day2.innerHTML = `<strong>${dayNames(dayTwoName)}:</strong> ${forecastData.list[1].main.temp}`
    day3.innerHTML = `<strong>${dayNames(dayThreeName)}:</strong> ${forecastData.list[2].main.temp}`
}