function photographerFactory(data, media) {
  const { name, id, city, country, portrait, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const cityText = document.createElement("p");
    const taglineText = document.createElement("p");
    const priceTag = document.createElement("span");
    const lien = document.createElement("a");

    img.setAttribute("src", picture);
    img.setAttribute("alt", "liens vers le profil de " + name);
    h2.textContent = name;
    cityText.textContent = city + "," + country;
    taglineText.textContent = tagline;
    priceTag.textContent = `${price}€/jour`;
    lien.setAttribute("href", `photographer.html?id=${id}`);

    article.appendChild(lien);
    lien.appendChild(img);
    lien.appendChild(h2);
    article.appendChild(cityText);
    article.appendChild(taglineText);
    article.appendChild(priceTag);

    return article;
  }

  function getUserHeader() {
    const blockHeader = document.createElement("div");
    const textHeader = document.createElement("div");
    const blockBtn = document.createElement("div");
    const blockImg = document.createElement("div");
    const h1 = document.createElement("h1");
    const cityText = document.createElement("h2");
    const taglineText = document.createElement("span");
    const btn = document.createElement("button");
    const img = document.createElement("img");

    blockHeader.classList.add("block-header");
    textHeader.classList.add("text-header");
    blockBtn.classList.add("block-btn");
    blockImg.classList.add("block-img");
    btn.classList.add("contact_button");

    h1.textContent = name;
    cityText.textContent = city + ", " + country;
    taglineText.textContent = tagline;
    btn.textContent = "Contactez-moi";

    h1.setAttribute("aria-label", "nom du photographe");
    cityText.setAttribute("aria-label", "localisation du photographe");
    taglineText.setAttribute("aria-label", "bio du photographe");
    btn.setAttribute("onClick", "displayModal()");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    textHeader.appendChild(h1);
    textHeader.appendChild(cityText);
    textHeader.appendChild(taglineText);
    blockHeader.appendChild(textHeader);
    blockBtn.appendChild(btn);
    blockImg.appendChild(img);
    blockHeader.appendChild(blockBtn);
    blockHeader.appendChild(blockImg);

    return blockHeader;
  }

  return { name, picture, getUserCardDOM, getUserHeader };
}
