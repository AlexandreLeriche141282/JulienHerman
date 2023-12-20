let lastScroll = 0;
const menu = document.querySelector(".menu");
const textChoux = document.getElementById("textChoux")
const textFinger=document.getElementById("textFinger")

window.addEventListener("scroll", () => {
    if (window.scrollY < lastScroll) {
        menu.style.top=0;
    } else {
    menu.style.top="-116px"
    }
    lastScroll = window.scrollY;

  });
window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.90) {
        textChoux.style.visibility = "visible"
        textChoux.style.opacity = "1"
        textChoux.style.top = "20%"
    }
    
});
window.addEventListener("scroll", () => {
    let scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;
    if (scrollValue > 0.90) {
        textFinger.style.visibility = "visible"
        textFinger.style.opacity = "1"
        textFinger.style.top = "20%"
    }
    
    });