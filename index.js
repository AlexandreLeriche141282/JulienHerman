// -------------- Scroll navBar --------------//
const menu = document.querySelector(".menu");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    if (window.scrollY < lastScroll) {
        menu.style.top ="0";
    } else {
        menu.style.top = "-140px"
    }
    lastScroll = window.scrollY;

});


// --------------ApparitiontextePhotoscroll-----------------// 
const sr = ScrollReveal();

sr.reveal(".titre1", {
    duration: 1000,
    origin: 'top',
    distance: '-200px',
    scale: '0.5',
    reset:'true'
});
sr.reveal(".titre2", {
    duration: 1000,
    origin: 'top',
    distance: '-200px',
    scale: '0.5',
    reset:'true'
});
sr.reveal(".titre3", {
    duration: 1000,
    origin: 'top',
    distance: '-200px',
    scale: '0.5',
    reset:'true'
});
sr.reveal(".titre4", {
    duration: 1000,
    origin: 'top',
    distance: '-200px',
    scale: '0.5',
    reset:'true'
});
sr.reveal(".titre5", {
    duration: 1000,
    origin: 'top',
    distance: '-200px',
    scale: '0.5',
    reset:'true'
});
sr.reveal(".titre6", {
    duration: 1000,
    origin: 'top',
    distance: '-200px',
    scale: '0.5',
    reset:'true'
});


// -----------------Effet toggle sur formulaire contact Popup----------------------------//
function togglePopup() {
    let popup = document.querySelector("#popup-overlay")
    popup.classList.toggle("active");
}

// --------------------------------------------------------------------------------
// -----------------Effet toggle sur formulaire réservation Popup----------------------------//
function togglePopupResa() {
    let popup2 = document.querySelector("#popup-overlayResa")
    popup2.classList.toggle("active");
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

// --------Formulaire réservation------------------///

// function sendMail3() {
//     let param3 = {
//         name3: document.getElementById("name").value,
//         sujet3: document.getElementById("sujet").value,
//         email3: document.getElementById("email").value,
//         telephone3: document.getElementById("telephone").value,
//         message3: document.getElementById("message").value,

//     }

//     emailjs.send("service_86vpx3l", "template_2nhdv2u", param3).then(alert("Votre message nous a bien été transmis"))
// }

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

// window.addEventListener("scroll", () => {
//     let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
//     if (scrollValue > 0.70) {

//         img1.style.width = "80%"
        

//     } else {
//         img1.style.width = "50%"
       
//     }

// });





