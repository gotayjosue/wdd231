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

const detailsContainer = document.querySelector('.activityDetails')


document.addEventListener('DOMContentLoaded', () =>{
    const selectedActivity = JSON.parse(localStorage.getItem('selectedActivity')); /*This line here retrieve the data of the photo the user clicked on the home page*/
  
    if (selectedActivity){
        function monthNames(monthNumber){
            const monthsOfYear = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 
                'August', 'September', 'October', 'November', 'December'
              ];
            return monthsOfYear[monthNumber - 1]
        }
        const activityMonth = parseInt(selectedActivity.date.split('-')[1])
        const activityDay = selectedActivity.date.split('-')[2]
        const activityYear = selectedActivity.date.split('-')[0]

        const p1 = document.createElement('p')
        const p2 = document.createElement('p')
        const location = document.createElement('p')
        const date = document.createElement('p')
        const time = document.createElement('p')
        const responsible = document.createElement('p')
        const organization = document.createElement('p')

        p1.innerHTML = `<strong>Activity: </strong>${selectedActivity.activity}`

        if(selectedActivity.completed === false){
            p2.innerHTML = `<strong>Status: </strong>Pending`
        }else{
            p2.innerHTML = `<strong>Status: </strong>Completed`
        }

        location.innerHTML = `<strong>Locacion: </strong>${selectedActivity.location}`
        date.innerHTML = `<strong>Date:</strong> ${activityDay} ${monthNames(activityMonth)} ${activityYear}`
        time.innerHTML = `<strong>Time:</strong> ${selectedActivity.time}`
        responsible.innerHTML = `<strong>Responsible:</strong> ${selectedActivity.responsible}`

        if(selectedActivity.org === 'kids'){
            organization.innerHTML = `<strong>Organization:</strong> Primary`
        }
        if(selectedActivity.org === 'women'){
            organization.innerHTML = `<strong>Organization:</strong> Relief Society`
        }
        if(selectedActivity.org === 'men'){
            organization.innerHTML = `<strong>Organization:</strong> Elders Cuorum`
        }
        if(selectedActivity.org === 'youngMen'){
            organization.innerHTML = `<strong>Organization:</strong> Young Men`
        }
        if(selectedActivity.org === 'youngWomen'){
            organization.innerHTML = `<strong>Organization:</strong> Young Women`
        }
        if(selectedActivity.org === 'forAll'){
            organization.innerHTML = `<strong>Organization:</strong> For all members`
        }

        detailsContainer.appendChild(p1)
        detailsContainer.appendChild(p2)
        detailsContainer.appendChild(location)
        detailsContainer.appendChild(date)
        detailsContainer.appendChild(time)
        detailsContainer.appendChild(responsible)
        detailsContainer.appendChild(organization)
    }
})


