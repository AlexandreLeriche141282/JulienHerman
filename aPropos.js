const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");

// ---------- Apparition Photos ------------------ //


// window.addEventListener("scroll", () => {
//     let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
//     if (scrollValue > 0.50) {

//         img1.style.width = "80%"
//         img2.style.width = "80%"

//     } else {
//         img1.style.width = "50%"
//         img2.style.width = "50%"
//     }
// console.log(scrollValue);
// });

// -------------------------------------------------//


// Changement automatique de la date ----------------------------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();