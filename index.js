// -------------- Scroll navBar --------------//

window.addEventListener("scroll", () => {
    if (window.scrollY < lastScroll) {
        menu.style.top = 0;
    } else {
        menu.style.top = "-140px"
    }
    lastScroll = window.scrollY;

});


// --------------ApparitiontextePhotoscroll-----------------// 
let lastScroll = 0;

const menu = document.querySelector(".menu");
const textVisible1 = document.querySelector(".titre1");
const textVisible2 = document.querySelector(".titre2");
const textVisible3 = document.querySelector(".titre3");
const textVisible4 = document.querySelector(".titre4");
const textVisible5 = document.querySelector(".titre5");
const textVisible6 = document.querySelector(".titre6");






window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.40 ) {

        textVisible1.style.opacity = "1"
        textVisible1.style.top = "45%"

    } else {
        textVisible1.style.opacity = "0"
        textVisible1.style.top = "75%"
    }

});

window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.40) {

        textVisible2.style.opacity = "1"
        textVisible2.style.top = "45%"

    } else {
        textVisible2.style.opacity = "0"
        textVisible2.style.top = "75%"
    }

});
window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.40) {

        textVisible3.style.opacity = "1"
        textVisible3.style.top = "45%"

    } else {
        textVisible3.style.opacity = "0"
        textVisible3.style.top = "75%"
    }

});
window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.40) {

        textVisible4.style.opacity = "1"
        textVisible4.style.top = "45%"

    } else {
        textVisible4.style.opacity = "0"
        textVisible4.style.top = "75%"
    }

});
window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.60) {

        textVisible5.style.opacity = "1"
        textVisible5.style.top = "45%"

    } else {
        textVisible5.style.opacity = "0"
        textVisible5.style.top = "75%"
    }

});
window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.60) {

        textVisible6.style.opacity = "1"
        textVisible6.style.top = "45%"

    } else {
        textVisible6.style.opacity = "0"
        textVisible6.style.top = "75%"
    }

});
// --------------------------------------------------------------------------------
// -----------------Effet toggle sur formulaire Popup----------------------------//
function togglePopup() {
    let popup = document.querySelector("#popup-overlay")
    popup.classList.toggle("active");
}

// --------------------------------------------------------------------------------
// -----------------Fonction pour envoi de formulaire via EmailJs-----------------//
function sendMail() {
    let params = {
        name: document.getElementById("name").value,
        sujet: document.getElementById("sujet").value,
        email: document.getElementById("email").value,
        telephone: document.getElementById("telephone").value,
        message: document.getElementById("message").value,

    }

    emailjs.send("service_86vpx3l", "template_2nhdv2u", params).then(alert("Votre message nous a bien été transmis"))
}

// ----------- Souscription newsletter------------//

function sendMail2() {
    let param = {
        
        email2: document.getElementById("email2").value,
        

    }

    emailjs.send("service_eajv5m1", "template_pr30z85", param).then(alert("Votre message nous a bien été transmis"))
}


// -------- Burger menu ----------------------//

const burgerMenu = document.querySelector(".menuBurger");
const ulMenu = document.querySelector(".ulMenu");
const croix = document.querySelector(".croix")

burgerMenu.addEventListener("click", () => {
    ulMenu.classList.toggle('mobileMenu')
    
});
croix.addEventListener("click", () => {
    ulMenu.classList.toggle('mobileMenu')
    
});



