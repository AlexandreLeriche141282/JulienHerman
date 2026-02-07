// Changement automatique de la date ----------------------------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();


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
document.addEventListener('DOMContentLoaded', function() {
    var dateInput = document.getElementById('date');
    
    dateInput.addEventListener('input', function() {
        var selectedDate = new Date(this.value);
        var day = selectedDate.getUTCDay();
        
        // Si c'est un dimanche (0) ou un lundi (1), réinitialiser la valeur
        if (day === 0 || day === 1) {
            this.value = '';
            alert('Veuillez choisir un jour du mardi au samedi.');
        }
    });

    // Définir la date minimale à aujourd'hui
    var today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Fonction pour obtenir le prochain jour valide
    function getNextValidDate(date) {
        do {
            date.setDate(date.getDate() + 1);
        } while (date.getUTCDay() === 0 || date.getUTCDay() === 1);
        return date;
    }

    // Désactiver les lundis et dimanches dans le calendrier
    dateInput.addEventListener('focus', function() {
        this.addEventListener('keydown', function(e) {
            e.preventDefault();
        });
    });

    dateInput.addEventListener('click', function() {
        var currentDate = new Date(this.value || new Date());
        if (currentDate.getUTCDay() === 0 || currentDate.getUTCDay() === 1) {
            currentDate = getNextValidDate(currentDate);
        }
        this.valueAsDate = currentDate;
    });
});

function sendMail() {
    let params = {
        name: document.getElementById("name").value,
        sujet: document.getElementById("sujet").value,
        email: document.getElementById("email").value,
        telephone: document.getElementById("telephone").value,
        message: document.getElementById("message").value,
        date: document.getElementById("date").value // Ajout du champ date
    }

    emailjs.send("service_86vpx3l", "template_2nhdv2u", params)
        .then(function(response) {
            alert("Votre message nous a bien été transmis");
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            alert("Une erreur s'est produite, veuillez réessayer");
            console.log('FAILED...', error);
        });
}

// Formulaire de contact ------------------------------------------------------------------------------
function sendMail3() {
    let params = {
        name: document.getElementById("name").value,
        sujet: document.getElementById("sujet").value,
        email: document.getElementById("email").value,
        telephone: document.getElementById("telephone").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_85xjoav", "template_ap4z49a", params)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);

            // Affiche un message temporaire dans la popup
            const popupContent = document.querySelector('.popup-content');
            popupContent.innerHTML = `
                <h2>Message envoyé avec succès !</h2>
                <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
            `;

            // Ferme la popup après 2 secondes
            setTimeout(() => {
                togglePopup();
            }, 2000);
        }, function(error) {
            alert("Une erreur s'est produite, veuillez réessayer");
            console.log('FAILED...', error);
        });
}

// Soumission propre du formulaire -------------------------------------------
document.getElementById('validation').addEventListener('submit', function(e) {
    e.preventDefault();
    sendMail3();
});


// ----------- Souscription newsletter------------//

function sendMail2(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    let consentCheckbox = document.getElementById("consent");
    if (!consentCheckbox.checked) {
        alert("Veuillez accepter la politique de confidentialité pour vous inscrire.");
        return false;
    }

    let param = {
        email2: document.getElementById("email2").value,
    }
    
    emailjs.send("service_eajv5m1", "template_pr30z85", param)
        .then(function(response) {
            alert("Votre inscription à la newsletter a bien été enregistrée");
        }, function(error) {
            alert("Une erreur s'est produite, veuillez réessayer plus tard");
        });

    return false; // Empêche la soumission du formulaire
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

// --------- Apparition machine à écrire ---------- //
// const line1 = "Voici notre carte des fêtes de fin d'année a télécharger en cliquant ici";
const line1 = "Pensez à réserver vos desserts pour la St Valentin. Cliquez-ici ici pour voir nos deux desserts !";
// const auteurs = "Marcelline et Julien";

function typeWriter(element, text, speed = 25, cb = null) {
  element.innerHTML = '';
  let i = 0;
  function typing() {
    if (i < text.length) {
      if (text[i] === "<") {
        let close = text.indexOf(">", i);
        element.innerHTML += text.substring(i, close + 1);
        i = close + 1;
      } else {
        element.innerHTML += text[i];
        i++;
      }
      setTimeout(typing, speed);
    } else if (cb) {
      cb();
    }
  }
  typing();
}

document.addEventListener("DOMContentLoaded", () => {
  const el1 = document.getElementById("actuLine1");
//   const el2 = document.getElementById("actuLine2");
  const elAuteurs = document.getElementById("auteursLine");

  typeWriter(el1, line1, 60, () => {
    setTimeout(() => {
    //   typeWriter(el2, line2, 20, () => {
    //     setTimeout(() => {
    //       typeWriter(elAuteurs, auteurs, 30);
    //     }, 700);
    //   });
    }, 1500);
  });
});

