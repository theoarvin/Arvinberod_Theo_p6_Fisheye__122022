const main = document.querySelector('#main');

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute('aria-hidden', false)
  main.setAttribute('aria-hidden', true)
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', true)
  main.setAttribute('aria-hidden', false)
}


// formulaire

const form = document.querySelector(".form");
const firstError = document.querySelector('.firstError')
const lastError = document.querySelector(".lastError");
const emailError = document.querySelector(".emailError");
const messageError = document.querySelector(".messageError");
const closeForm = document.querySelector('.close-form');




// first name validation
const validFirstName = (input) => {
  if (input.value.split(" ").join("").length < 2) {
    firstError.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    form.prenom.style.border = " 2px solid red";
    form.prenom.setAttribute('aria-invalid',true)
    return false;
  } else {
    firstError.innerHTML = "";
    form.prenom.style.border = "none";
    form.prenom.setAttribute('aria-invalid',false)
    return true;
  }
};

// last name validation
const validLastName = (input) => {
  if (input.value.split(" ").join("").length < 2) {
    lastError.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    form.nom.style.border = " 2px solid red";
    form.nom.setAttribute('aria-invalid',true)
    return false;
  } else {
    lastError.innerHTML = "";
    form.nom.style.border = "none";
    form.nom.setAttribute('aria-invalid',false)
    return true;
  }
};

// email validation
const validEmail = (input) => {
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );

  if (emailRegExp.test(input.value) === true) {
    emailError.innerHTML = "";
    form.email.style.border = "none";
    form.email.setAttribute('aria-invalid',false)
    return true;
  } else {
    emailError.innerHTML = "Veuillez rentrer un email valide";
    form.email.style.border = " 2px solid red";
    form.email.setAttribute('aria-invalid',true)
    return false;
  }
};

// message validation
const validMessage = (input) => {
  if (input.value.split(" ").join("").length < 5) {
    messageError.innerHTML =
      "Veuillez entrer 5 caractères ou plus pour le champ du message.";
    form.message.style.border = " 2px solid red";
    form.message.setAttribute('aria-invalid',true)
    return false;
  } else {
    messageError.innerHTML = "";
    form.message.style.border = "none";
    form.message.setAttribute('aria-invalid',false)
    return true;
  }
};

// input listening
form.prenom.addEventListener("change", function () {
  validFirstName(this);
});
form.nom.addEventListener("change", function () {
  validLastName(this);
});
form.email.addEventListener("change", function () {
  validEmail(this);
});
form.message.addEventListener("change", function () {
  validMessage(this);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(
    validFirstName(form.prenom)&&
    validLastName(form.nom)&&
    validEmail(form.email)&&
    validMessage(form.message)
    ){
    console.log('prenom :' ,form.prenom.value);
    console.log('nom :', form.nom.value);
    console.log('email :',form.email.value );
    console.log('message :', form.message.value);
  }
});
