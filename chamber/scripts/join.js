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

//Selecting modal elements
const nonProfitButton = document.querySelector('#nonButton')
const bronzeButton = document.querySelector('#bronzeButton')
const silverButton = document.querySelector('#silverButton')
const goldButton = document.querySelector('#goldButton')

const nonProfitModal = document.querySelector('#nonModal')
const bronzeModal = document.querySelector('#bronzeModal')
const silverModal = document.querySelector('#silverModal')
const goldModal = document.querySelector('#goldModal')

const nonCloseButton = document.querySelector('#noneCloseButton')
const bronzeCloseButton = document.querySelector('#bronzeCloseButton')
const silverCloseButton = document.querySelector('#silverCloseButton')
const goldCloseButton = document.querySelector('#goldCloseButton')

//Non Profit membership modal fuctions
nonProfitButton.addEventListener('click', () => {
    nonProfitModal.showModal()
})

nonCloseButton.addEventListener('click', () => {
    nonProfitModal.close()
})

//Bronze membership modal fuctions
bronzeButton.addEventListener('click', () => {
    bronzeModal.showModal()
})

bronzeCloseButton.addEventListener('click', () => {
    bronzeModal.close()
})


//Silver membership modal fuctions
silverButton.addEventListener('click', () => {
    silverModal.showModal()
})

silverCloseButton.addEventListener('click', () => {
    silverModal.close()
})


//Gold membership modal fuctions
goldButton.addEventListener('click', () => {
    goldModal.showModal()
})

goldCloseButton.addEventListener('click', () => {
    goldModal.close()
})
