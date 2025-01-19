const year = new Date().getFullYear()
const lastModified = document.querySelector('#modificationDate').textContent = `Last Modification: ${document.lastModified}`
const name = document.querySelector('#name').textContent = `\u00A9 ${year} Trujillo Chamber of Commerce`;

const menuButton = document.querySelector('#menuButton')
const navBar = document.querySelector('#navigation')

menuButton.addEventListener('click', () =>{

    navBar.classList.toggle('open')
    menuButton.classList.toggle('open')
})

const membersContainer = document.querySelector('#members');

let membersList = [];

const getMembers = async () => {
    
    const response = await fetch("https://gotayjosue.github.io/wdd231/chamber/data/members.json")

    membersList = await response.json();

    displayMembers(membersList);
}

function displayMembers(members){

    members.forEach(member => {

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

        title.textContent = member.name
        tag.textContent = member.bussinesTag
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`
        site.innerHTML = `<strong>URL:</strong> ${member.website}`

        section.appendChild(title)
        section.appendChild(tag)
        section.appendChild(img)
        section.appendChild(phone)
        section.appendChild(site)

        membersContainer.appendChild(section)
    });

};

getMembers()
