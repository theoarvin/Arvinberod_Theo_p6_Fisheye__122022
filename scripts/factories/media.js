function mediaFactory(data, picture, mediaUser, user) {
  const { title, image, video, likes, price, date } = data;

  const heartRed = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
  </svg>`;
  const heartBlack = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.125 18.35L7.85625 17.03C3.35 12.36 0.375 9.28 0.375 5.5C0.375 2.42 2.4925 0 5.1875 0C6.71 0 8.17125 0.81 9.125 2.09C10.0788 0.81 11.54 0 13.0625 0C15.7575 0 17.875 2.42 17.875 5.5C17.875 9.28 14.9 12.36 10.3937 17.04L9.125 18.35Z" fill="black"/>
  </svg>
  `;

  function getUserInfos() {
    // creation of the info block
    const blockInfos = document.createElement("div");
    const totalLikes = document.createElement("p");
    const spanHeart = document.createElement("span");
    const priceInfos = document.createElement("p");
    spanHeart.classList.add("span-heart");
    totalLikes.classList.add("like-total");
    blockInfos.classList.add("block-infos");
    spanHeart.setAttribute("aria-hidden", true);
    totalLikes.setAttribute("aria-label", "les likes du photographe");
    priceInfos.setAttribute("aria-label", "prix journalier du photographe");
    // boucle to calcul total like
    let result = 0;
    for (const element of mediaUser) {
      result += element.likes;
    }
    totalLikes.textContent = result;
    spanHeart.innerHTML = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.125 18.35L7.85625 17.03C3.35 12.36 0.375 9.28 0.375 5.5C0.375 2.42 2.4925 0 5.1875 0C6.71 0 8.17125 0.81 9.125 2.09C10.0787 0.81 11.54 0 13.0625 0C15.7575 0 17.875 2.42 17.875 5.5C17.875 9.28 14.9 12.36 10.3938 17.04L9.125 18.35Z" fill="black"/>
  </svg>
  `;
    priceInfos.textContent = `${user[0].price} € / jour`;
    blockInfos.appendChild(totalLikes);
    blockInfos.appendChild(spanHeart);
    blockInfos.appendChild(priceInfos);
    main.appendChild(blockInfos);
    
  }

  function getMedia() {
    // creation card
    const card = document.createElement("div");
    const blockText = document.createElement("div");
    const titleText = document.createElement("h3");
    const btnLike = document.createElement("button");
    const count = document.createElement("span");
    const mediaBox = document.createElement("a");

    blockText.classList.add("card-text");
    card.classList.add("card");
    count.classList.add("count");
    btnLike.classList.add("btn-likes");
    mediaBox.classList.add("media-box");

    titleText.setAttribute("aria-label", title);
    count.setAttribute("aria-label", "likes");
    btnLike.setAttribute("aria-label", "liker");
    mediaBox.setAttribute("title", title);

    count.textContent = likes;
    btnLike.innerHTML = heartRed;
    titleText.textContent = title;

    // returns an image or a video
    if (image !== undefined) {
      picture += `/${image}`;
      const img = document.createElement("img");
      mediaBox.setAttribute("href", picture);
      img.setAttribute("src", picture);
      img.setAttribute("alt", title);
      mediaBox.appendChild(img);
      card.appendChild(mediaBox);
    } else {
      picture += `/${video}`;
      mediaBox.setAttribute("href", picture);
      mediaBox.innerHTML = `<video controls class="video-block" >
      <source src=${picture} type="video/mp4">
      </video>`;
      card.appendChild(mediaBox);
    }

    // likes
    const totalLikes = document.querySelector(".like-total");
    let condition = false;
    btnLike.addEventListener("click", () => {
      if (condition === false) {
        count.textContent++;
        btnLike.innerHTML = heartBlack;
        btnLike.setAttribute("aria-label", "vous avez liké");
        totalLikes.textContent++;
        condition = true;
      } else {
        count.textContent--;
        btnLike.innerHTML = heartRed;
        btnLike.setAttribute("aria-label", "vous avez enlevé votre like");
        totalLikes.textContent--;
        condition = false;
      }
      
    });

    blockText.appendChild(titleText);
    blockText.appendChild(count);
    blockText.appendChild(btnLike);
    card.appendChild(blockText);
    return card;
  }

  return { getUserInfos, getMedia };
}
