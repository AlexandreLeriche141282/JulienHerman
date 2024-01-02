const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");
const menu = document.querySelector(".menu");
let lastScroll = 0;

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
    if (scrollValue > 0.70) {

        img1.style.width = "100%"
        

    } else {
        img1.style.width = "80%"
       
    }

});
window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.70) {

        img2.style.width = "100%"
        

    } else {
        img2.style.width = "80%"
       
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
