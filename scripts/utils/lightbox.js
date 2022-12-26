function displayLightbox() {
  let linkMedia = null;
  const links = Array.from(document.querySelectorAll(".media-box"));
  const gallery = links.map((link) => link.getAttribute("href"));
  const titleArray = links.map((link) => link.getAttribute("title"));
  const page = document.querySelector('.page');

  links.forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      page.setAttribute('aria-hiddden', true);
      page.style.display='none'
      linkMedia = e.currentTarget.getAttribute("href");
      const altTitle = e.currentTarget.getAttribute("title");
      const lightbox = document.querySelector(".lightbox");
      lightbox.style.display = "block";

      if (linkMedia.slice(-3) == "mp4") {
        lightbox.innerHTML = `<button class="lightbox-close" aria-label="fermer la lightbox">Fermer</button>
          <button class="lightbox-prev" aria-label="image précédente">précédent</button>
          <button class="lightbox-next" aria-label="image suivante">suivant</button>
          <div class="ligthbox-container">
          <video src=${linkMedia} controls class="media-lightbox" alt="${altTitle}"></video>
          <p class="text-image" aria-label="titre de la photo">${altTitle}</p>
          </div>
          `;
      } else {
        lightbox.innerHTML = `<button class="lightbox-close" aria-label="fermer la lightbox">Fermer</button>
          <button class="lightbox-prev" aria-label="image précédente">précédent</button>
          <button class="lightbox-next" aria-label="image suivante">suivant</button>
          <div class="ligthbox-container">
          <img class="media-lightbox" src=${linkMedia} alt="${altTitle}" />
          <p class="text-image" aria-label="titre de la photo">${altTitle}</p>
          </div>
         
          `;
      }

      // listen to the button to close the modal
      let closeBtn = document.querySelector(".lightbox-close");
      closeBtn.addEventListener("click", () => {
        closeLightbox();
      });

      // next media
      let nextBtn = document.querySelector(".lightbox-next");
      nextBtn.addEventListener("click", () => {
        galleryNext();
      });

      // previous media
      let prevBtn = document.querySelector(".lightbox-prev");
      prevBtn.addEventListener("click", () => {
        galleryPrev();
      });
    })
  );



  // function to close the modal
  function closeLightbox() {
    const ligthbox = document.getElementById("lightbox");
    ligthbox.style.display = "none";
    page.setAttribute('aria-hiddden', false)
    page.style.display='block'
  }

  function galleryNext() {
    let currentMedia = document.querySelector(".media-lightbox");
    let media = currentMedia.getAttribute("src");
    let index;

    // we travels the media array
    if (gallery.indexOf(media) + 1 === gallery.length) {
      index = 0;
    } else {
      index = gallery.indexOf(media) + 1;
    }

    let blockMedia = document.querySelector(".ligthbox-container");
    let tilteBalise = document.querySelector(".text-image");
    // if media is video
    if (gallery[index].slice(-3) == "mp4") {
      blockMedia.removeChild(currentMedia);
      blockMedia.removeChild(tilteBalise);
      blockMedia.innerHTML = `<video controls src=${gallery[index]} class="media-lightbox"></video>
      <h3 class="text-image" aria-label="titre de la photo">${titleArray[index]}</h3>
      `;
      // else media is picture
    } else {
      blockMedia.removeChild(currentMedia);
      blockMedia.removeChild(tilteBalise);
      blockMedia.innerHTML = `<img class="media-lightbox" src=${gallery[index]} alt="" />
      <h3 class="text-image" aria-label="titre de la photo">${titleArray[index]}</h3>`;
    }
  }

  function galleryPrev() {
    let currentMedia = document.querySelector(".media-lightbox");
    let media = currentMedia.getAttribute("src");
    let index;

    // we travels the media array
    if (gallery.indexOf(media) - 1 === -1) {
      index = gallery.length - 1;
    } else {
      index = gallery.indexOf(media) - 1;
    }

    let blockMedia = document.querySelector(".ligthbox-container");
    let tilteBalise = document.querySelector(".text-image");

    // if media is video
    if (gallery[index].slice(-3) == "mp4") {
      blockMedia.removeChild(currentMedia);
      blockMedia.removeChild(tilteBalise);
      blockMedia.innerHTML = `<video class="media-lightbox">
      <source src=${gallery[index]} type="video/mp4">
      </video>
      <p class="text-image" aria-label="titre de la photo">${titleArray[index]}</p>`;
      // else media is picture
    } else {
      blockMedia.removeChild(currentMedia);
      blockMedia.removeChild(tilteBalise);
      blockMedia.innerHTML = `<img class="media-lightbox" src=${gallery[index]} alt="${titleArray[index]}" />
      <p class="text-image" aria-label="titre de la photo">${titleArray[index]}</p>`;
    }
  }

  return { galleryNext, galleryPrev, closeLightbox };
}
