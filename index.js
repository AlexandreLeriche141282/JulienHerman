// ------------------------Apparition textePhoto scroll--------------------------------//
let lastScroll = 0;

const menu = document.querySelector(".menu");
const textVisible1 = document.querySelector(".titre1");
const textVisible2 = document.querySelector(".titre2");
const textVisible3 = document.querySelector(".titre3");
const textVisible4 = document.querySelector(".titre4");
const textVisible5 = document.querySelector(".titre5");
const textVisible6 = document.querySelector(".titre6");


window.addEventListener("scroll", () => {
    if (window.scrollY < lastScroll) {
        menu.style.top = 0;
    } else {
        menu.style.top = "-140px"
    }
    lastScroll = window.scrollY;

});



window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.40) {

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
    if (scrollValue > 0.50) {

        textVisible3.style.opacity = "1"
        textVisible3.style.top = "45%"

    } else {
        textVisible3.style.opacity = "0"
        textVisible3.style.top = "75%"
    }

});
window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.50) {

        textVisible4.style.opacity = "1"
        textVisible4.style.top = "45%"

    } else {
        textVisible4.style.opacity = "0"
        textVisible4.style.top = "75%"
    }

});
window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.65) {

        textVisible5.style.opacity = "1"
        textVisible5.style.top = "45%"

    } else {
        textVisible5.style.opacity = "0"
        textVisible5.style.top = "75%"
    }

});
window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.65) {

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
// ------------------------------------------------------------------------------------



// window.addEventListener("scroll", () => {
//     let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
//     if (scrollValue > 0.40) {

//         img1.style.size ="100%"
        

//     } else {
//         img1.style.size="80%"
//     }

// });

