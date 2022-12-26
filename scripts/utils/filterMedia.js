function filterMedia(media, picture, mediaUser, user,mediaModel) {
  // filter
  const filter = document.querySelector(".filter");
  //on recupere le select
  const selectElt = document.querySelector("#select");
  selectElt.setAttribute('aria-hidden',true)

  // on créer le nouveau select
  const newSelect = document.createElement("button");
  // on lui ajoutes la classe "new select"
  newSelect.classList.add("new-select");

  newSelect.setAttribute('aria-haspopup',"listbox")
  newSelect.setAttribute('aria-expanded',false)
  newSelect.setAttribute('aria-label','bouton pour trier les médias')
  // on lui donne le contenu de l'option actuellement choisie dans le select
  newSelect.innerHTML = selectElt.options[selectElt.selectedIndex].innerHTML;

  filter.appendChild(newSelect);

  // on crée le menu deroulant
  const newMenu = document.createElement("div");
  newMenu.classList.add("select-items", "select-hide");
  newMenu.setAttribute('role','listbox');
  newMenu.setAttribute('aria-hidden',true);
  

  // on bloucle sur toutes les options du select et les copiers dans la div
 
  for (let option of selectElt.options) {
    
    // on crée une div pour cette option
    if(option.innerHTML !== newSelect.innerHTML){
      const newOption = document.createElement("button");
      // on copie le contenu de l'option
      newOption.innerHTML = option.innerHTML;
      //newOption.setAttribute('role','button')
      
      // on ajoute un écouteur d'évènement sur l'option
      newOption.addEventListener('click', function(e){
       e.preventDefault()
        for (let option of selectElt.options){
          const lastValue = newSelect.innerHTML
          
          if(option.innerHTML === this.innerHTML){
            selectElt.selectedIndex = option.index
            newSelect.innerHTML = this.innerHTML
            this.innerHTML = lastValue
            filterFunction()
            eventModal()
            
            let result = 0;
            for (const element of mediaUser) {
                 result += element.likes;
            }
            let totalLikes = document.querySelector('.like-total')
            totalLikes.textContent = result
            break;
          }   
        } 
      })
      // on ajoute l'option dans le newmenu
      newMenu.appendChild(newOption);
    }
  }
  
  //on affiche le menu
  filter.appendChild(newMenu);
  
  function eventModal(){
    
    newSelect.nextSibling.classList.toggle('select-hide')
    newSelect.classList.toggle("active")
    let bolleanAria = newSelect.getAttribute('aria-expanded')
    if(bolleanAria === 'true'){
      newSelect.setAttribute('aria-expanded',false)
      newMenu.setAttribute('aria-hidden',true);
    }else{
      newSelect.setAttribute('aria-expanded',true)
      newMenu.setAttribute('aria-hidden',false);
    }
  }

  // on ajoute l'evenement au click pour ouvrir la list
  newSelect.addEventListener('click', (e) => {
    e.preventDefault()
  })
  newSelect.addEventListener('click', eventModal)

  const filterFunction = () => {
    let value = newSelect.innerHTML
    let block = document.querySelector(".media-block");

    if (value === "Popularite") {
      if (block == null) {
        const mediaSection = document.createElement("div");
        mediaSection.classList.add("media-block");
      } else {
        let removeMedia = document.querySelector(".media-block");
        main.removeChild(removeMedia);
      }
      const mediaSection = document.createElement("div");
      mediaSection.classList.add("media-block");
      mediaUser
        .sort((a, b) => a.likes - b.likes)
        .reverse()
        .forEach((media) => {
          const mediaModel = mediaFactory(media, picture, mediaUser, user);
          const mediaList = mediaModel.getMedia();
          mediaSection.appendChild(mediaList);
        });
      main.appendChild(mediaSection);
    }

    if (value === "Date") {
      let removeMedia = document.querySelector(".media-block");
      main.removeChild(removeMedia);
      const mediaSection = document.createElement("div");
      mediaSection.classList.add("media-block");
      mediaUser
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .reverse()
        .forEach((media) => {
          const mediaModel = mediaFactory(media, picture, mediaUser, user);
          const mediaList = mediaModel.getMedia();
          mediaSection.appendChild(mediaList);
        });
      main.appendChild(mediaSection);
    }

    if (value === "Titre") {
      let removeMedia = document.querySelector(".media-block");
      main.removeChild(removeMedia);
      const mediaSection = document.createElement("div");
      mediaSection.classList.add("media-block");
      mediaUser
        .sort((a, b) => {
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
        })
        .forEach((media) => {
          const mediaModel = mediaFactory(media, picture, mediaUser, user);
          const mediaList = mediaModel.getMedia();
          mediaSection.appendChild(mediaList);
        });
      main.appendChild(mediaSection);
    }

    displayLightbox();
  };
  return { filterFunction };
}
