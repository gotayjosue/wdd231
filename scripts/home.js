const currentYear = new Date().getFullYear();
const copyrightSymbol = "\u00A9" //This is the copyright simbol in Unicode//
const lastModified = new Date(document.lastModified);

document.getElementById('currentyear').textContent = `${copyrightSymbol}${currentYear}`;
document.getElementById('name').textContent = `Josué Gotay `;
document.getElementById('country').textContent = `Honduras`;
document.getElementById('lastModified').textContent = `Last modification ${document.lastModified}`;

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active")
        navigation.classList.toggle("menu-open");
    });
});