//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
  const jsonFile = "./data/photographers.json";
  const response = await fetch(jsonFile);
  const data = await response.json();
  const photographers = await data;
  return photographers;
}

async function displayData(photographers, id) {
  
  const photographersSection = document.querySelector(".photograph-header");
  // get the current photographer
  const user = photographers.filter((user) => user.id == id);
  const photographerModel = photographerFactory(user[0]);
  const userHeader = photographerModel.getUserHeader();
  photographersSection.appendChild(userHeader);
}

async function displayMedia(photographers, media, id) {
  // get the current photographer
  const user = photographers.filter((user) => user.id == id);
  // with the current user and his id we retrieve his images
  const mediaUser = media.filter((media) => media.photographerId == user[0].id);
  // name recovery to recover the image in the media folder
  const mediaFolder = [user[0].name].join("").split(" ").splice(0, 1).join("");
  const picture = `assets/media/${mediaFolder}`;

  
  const mediaModel = mediaFactory(media, picture, mediaUser, user);
  mediaModel.getUserInfos();
  

  const titleModalForm = document.createElement('h1')
  titleModalForm.setAttribute('id','title')
  const ModalForm = document.querySelector(".title-form");
  const modal = document.querySelector('.modal');
  
  titleModalForm.textContent = `Contactez-moi ${user[0].name}`;
  modal.setAttribute('aria-labelledby','title')
  ModalForm.appendChild(titleModalForm)


  // listen to the keyboard keys on the lightbox
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      console.log(e.key);
      const lightbox = displayLightbox();
      lightbox.closeLightbox();
    }
    if (e.key === "ArrowRight") {
      console.log(e.key);
      const lightbox = displayLightbox();
      lightbox.galleryNext();
    }
    if (e.key === "ArrowLeft") {
      console.log(e.key);
      const lightbox = displayLightbox();
      lightbox.galleryPrev();
    }
  });

  const filtre = filterMedia(media, picture, mediaUser, user);
  filtre.filterFunction();
  
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers();
  const params = new URL(document.location).searchParams;
  const id =  params.get("id");
  await displayData(photographers, id);
  await displayMedia(photographers, media, id);
}

init();
