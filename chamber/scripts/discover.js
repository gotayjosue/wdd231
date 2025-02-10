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

const placesContainer = document.querySelector('.cards')

import { places } from "../data/places.mjs";
console.log(places)

function displayPlaces(places){

    places.forEach(place => {
        
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const picture = document.createElement('picture')
        const caption = document.createElement('figcaption')
        const img = document.createElement('img')
        const address = document.createElement('address')
        const p = document.createElement('p')
        const button = document.createElement('button')

        h2.textContent = place.name
        img.src = place.imageUrl
        img.alt = place.name
        caption.textContent = place.name
        address.textContent = place.address
        p.textContent = place.description
        button.textContent = 'Learn more'

        div.appendChild(h2)
        div.appendChild(picture)
        picture.appendChild(img)
        picture.appendChild(caption)
        div.appendChild(address)
        div.appendChild(p)
        div.appendChild(button)

        placesContainer.appendChild(div)

    });
}

displayPlaces(places)

