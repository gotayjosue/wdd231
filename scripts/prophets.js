const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url)

    if (response.ok){

        const data = await response.json();
        console.table(data.prophets);
        displayProphets(data.prophets)
    }
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {

        const section = document.createElement('section')
        const fullName = document.createElement('h2')
        const birthday = document.createElement('p')
        const place = document.createElement('p')

        const portrait = document.createElement('img')
        portrait.setAttribute("src", prophet.imageurl)
        portrait.setAttribute("alt", `${prophet.name} ${prophet.lastname}`)
        portrait.setAttribute("loading", "lazy")
        portrait.setAttribute("width","250")
        portrait.setAttribute("height","300")

        fullName.textContent = `${prophet.name} ${prophet.lastname}`
        birthday.textContent = `Date of Birth: ${prophet.birthdate}`
        place.textContent = `Place of Birth: ${prophet.birthplace}`

        section.appendChild(fullName)
        section.appendChild(birthday)
        section.appendChild(place)
        section.appendChild(portrait)
        cards.appendChild(section)

        
    });
}

