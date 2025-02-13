//Getting the full year
const year = document.querySelector('#year')
const fullYear = new Date().getFullYear()

year.textContent = fullYear

//Menu button functionalities
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

//API call implementation

const url= 'https://api.openweathermap.org/data/2.5/weather?lat=15.911461095971282&lon=-85.9523698285993&appid=21f41c4766fe59c0c40d3a7fb615b230&units=metric'

const weatherContainer = document.querySelector('.weather')

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

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const icon = document.createElement('img')
    icon.setAttribute('src', iconUrl)
    icon.setAttribute('alt', data.weather[0].description)
    weatherContainer.appendChild(icon)
    const temp = document.createElement('p')
    temp.innerHTML = `<strong>${data.main.temp}</strong> ºC`
    weatherContainer.appendChild(temp)
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const description = document.createElement('p')
    description.textContent = capitalize(data.weather[0].description)
    weatherContainer.appendChild(description)
};