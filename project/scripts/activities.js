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

        function monthNames(monthNumber){
            const monthsOfYear = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 
                'August', 'September', 'October', 'November', 'December'
              ];
            return monthsOfYear[monthNumber - 1]
        }

        const activityMonth = parseInt(activity.date.split('-')[1])
        const activityDay = activity.date.split('-')[2]
        const activityYear = activity.date.split('-')[0]
        
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const date = document.createElement('p')
        const time = document.createElement('p')
        const reponsible = document.createElement('p')
        const img = document.createElement('img')

        h3.textContent = activity.activity
        date.innerHTML = `<strong>Date:</strong> ${activityDay} ${monthNames(activityMonth)} ${activityYear}`
        time.innerHTML = `<strong>Time:</strong> ${activity.time}`
        reponsible.innerHTML = `<strong>Responsible:</strong> ${activity.responsible}`
        img.src = 'images/activities.webp'
        img.alt = 'Activity Icon'

        div.appendChild(img)
        div.appendChild(h3)
        div.appendChild(date)
        div.appendChild(time)
        div.appendChild(reponsible)
        

        activityContainer.appendChild(div)

        div.style.cursor = "pointer"
        //Adding the click event to the activity container. Every it is clicked it leads to the details page
        div.addEventListener('click', () => {
            window.location.href = "details.html"
        })
        //Sending data to the local storage in form of json the details page. This data will be retrieved later.
        div.addEventListener('click', () =>{
            localStorage.setItem('selectedActivity', JSON.stringify(activity))
            window.location.href = "details.html"
        });

        if(activity.completed === true){

            div.style.background = "#6b9080"
            div.style.color = "white"
            img.style.filter = "invert(1)"
            div.style.border = "none"
    
            const advice = document.createElement('p')
            advice.textContent = "Completed✅"
            div.appendChild(advice)
        }

    });
}

displayActivities(activities)

//Defining the reset function to clear the activity container to show the filtered content
function reset(){
    activityContainer.innerHTML = ''
}

/* filter by month and by organization function */

function filterActivities(activities) {
    const actfilter = document.querySelector("#month").value;
    const orgfilter = document.querySelector('#org').value
    reset()

    let filteredActivities = activities

    if (actfilter !== "all"){
        filteredActivities = filteredActivities.filter(activity => {
            const month = activity.date.split('-')[1];
            return month === actfilter;
        });
    }

    if (orgfilter !==  "all"){
        filteredActivities = filteredActivities.filter(activity => {
            return activity.org === orgfilter;
        });

    }

    displayActivities(filteredActivities);

}


    document.querySelector('#month').addEventListener('change', () =>{
        filterActivities(activities);
        });

    document.querySelector('#org').addEventListener('change', () =>{
        filterActivities(activities)
});




