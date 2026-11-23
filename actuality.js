(function () {
  const lightbox = document.getElementById("actuality-lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector(".actuality-lightbox__img");
  const closeBtn = lightbox.querySelector(".actuality-lightbox__close");
  const links = document.querySelectorAll(".actuality .picturePaques a[href]");

  if (!lightboxImg || links.length === 0) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.removeAttribute("src");
    lightboxImg.alt = "";
    document.body.style.overflow = "";
  }

  links.forEach(function (link) {
    link.classList.add("actuality-img-enlarge");
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const thumb = link.querySelector("img");
      openLightbox(link.getAttribute("href"), thumb ? thumb.alt : "");
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
})();