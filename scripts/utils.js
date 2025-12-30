import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import {PopupWithImage} from "./popupWithImage.js";
import { Userinfo } from "./userInfo.js";

const userInfo = new Userinfo({
  name_selector: "#profileName",
  work_selector: "#profileAbout"
});

setTimeout(() => {
  console.log(userInfo.getUserInfo());
  userInfo.setUserInfo({
    name: "Armando",
    work: "Web Developer"
  });
  console.log(userInfo.getUserInfo());
}, 3000);

const Popup = document.querySelector("#Popup");
const openPopupBtn = document.querySelector("#openPopupBtn");
const closePopupBtn = document.querySelector("#closePopupBtn");
const profileOverlay = document.querySelector("#profileOverlay");
const placeOverlay = document.querySelector("#placeOverlay");

function openPopup() {
  document.addEventListener("keydown", profileEsc); // se añade un evento para detectar la tecla que se está oprimiendo
  Popup.classList.add("popup__open");
}
function closePopup() {
  Popup.classList.remove("popup__open");
  document.removeEventListener("keydown", profileEsc); // se elimina el evento, porque si no, a pesar de que se haya cerrado el Popup, se seguirá registrando el evento y eso es mala práctica.
}
//function hey() {
// console.log("hey");
//}
//overlay.addEventListener("click", hey);

openPopupBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);
profileOverlay.addEventListener("click", closePopup);

function profileEsc(evt) {
  //la función sirve para que al apretar Escape, se cierre el Popup.
  if (evt.key === "Escape") {
    closePopup();
  }
}

const popupPlace = document.querySelector("#popupPlace");
const openAddBtn = document.querySelector("#openAddBtn");
const closeAddBtn = document.querySelector("#closeAddBtn");

function openPopupAdd() {
  popupPlace.classList.add("popup__open");
  document.addEventListener("keydown", addEsc);
}
function closePopupAdd() {
  popupPlace.classList.remove("popup__open");
  document.removeEventListener("keydown", addEsc);
}

openAddBtn.addEventListener("click", openPopupAdd);
closeAddBtn.addEventListener("click", closePopupAdd);
placeOverlay.addEventListener("click", closePopupAdd);

function addEsc(evt) {
  if (evt.key === "Escape") {
    closePopupAdd();
  }
}

const form = document.querySelector("#form");
const profileName = document.querySelector("#profileName");
const profileAbout = document.querySelector("#profileAbout");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  profileName.textContent = formData.get("name");
  profileAbout.textContent = formData.get("about");
  Popup.classList.remove("popup__open");
});
const cardTemplate = document.getElementById("elements-card");


const popupImage = new PopupWithImage("#imagePopup");
const openImagePopup = (name, src) => popupImage.open(name, src);
// const imagePopup = document.querySelector("#imagePopup");
// const imagePopupCloseBtn = document.querySelector(".popup__closebtn-image");
// const imagePopupImage = document.querySelector(".popup__image");
// const imagePopupName = document.querySelector(".popup__name");
// const imageOverlay = document.querySelector("#imageOverlay");

// function openImagePopup(name, link) {
//   imagePopupImage.src = link;
//   imagePopupName.textContent = name;
//   imagePopup.classList.add("popup__open");
//   document.addEventListener("keydown", imageEsc);
// }
// function closeImagePopup() {
//   imagePopup.classList.remove("popup__open");
//   document.removeEventListener("keydown", imageEsc);
// }
function imageEsc(evt) {
  if (evt.key === "Escape") {
    closeImagePopup();
  }
}

// imagePopupCloseBtn.addEventListener("click", closeImagePopup);
// imageOverlay.addEventListener("click", closeImagePopup);


const formAdd = document.querySelector("#formAdd");

formAdd.addEventListener("submit", function (e) {
  e.preventDefault();
  const container = document.getElementById("elements");
  const titleInput = formAdd.querySelector(".popup__input-name").value;
  const linkInput = formAdd.querySelector(".popup__input-about").value;

  if (!titleInput || !linkInput) {
    alert("Por favor, completa ambos campos.");
    return;
  }
  const newElement = new Card(titleInput, linkInput).generateCard();

  container.appendChild(newElement);

  popupPlace.classList.remove("popup__open");
  formAdd.reset();
});
// Configuración para la validación de formularios
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Crear instancias de FormValidator para cada formulario
const profileFormValidator = new FormValidator(validationConfig, form);
const addFormValidator = new FormValidator(validationConfig, formAdd);

// Activar la validación para ambos formularios
profileFormValidator.enableValidation();
addFormValidator.enableValidation();

export { 
  openImagePopup,
};
