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

//Creating activities list

const activityContainer = document.querySelector('.calendar')

import { activities } from "../data/activities.mjs"

function displayActivities(activities){
    activities.forEach( activity => {
        
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const date = document.createElement('p')
        const time = document.createElement('p')
        const reponsible = document.createElement('p')
        const img = document.createElement('img')

        h3.textContent = activity.activity
        date.innerHTML = `<strong>Date:</strong> ${activity.date}`
        time.innerHTML = `<strong>Time:</strong> ${activity.time}`
        reponsible.innerHTML = `<strong>Responsible:</strong> ${activity.responsible}`
        img.src = 'images/activities.png'
        img.alt = 'Activity Icon'

        div.appendChild(img)
        div.appendChild(h3)
        div.appendChild(date)
        div.appendChild(time)
        div.appendChild(reponsible)
        

        activityContainer.appendChild(div)

        if(activity.completed === true){

            div.style.background = "#6b9080"
            div.style.color = "white"
            img.style.filter = "invert(1)"
            div.style.border = "none"
            div.style.cursor = "pointer"
            div.addEventListener('click', () => {
                window.location.href = "details.html"
            })
            const advice = document.createElement('p')
            advice.textContent = "Completed✅"
            div.appendChild(advice)
        }

    });
}

displayActivities(activities)