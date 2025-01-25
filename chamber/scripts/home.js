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


    filteredMembers.forEach(member => {

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
    const copy = [members]
    while (result.length < n && copy.length > 0){
        const ramdomSelection = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(ramdomSelection, 1)[0]);
    }
    return result;
}

getMembers()