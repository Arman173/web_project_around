import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./popupWithImage.js";
import { PopupWithForm } from "./popupWithForm.js";
import { Userinfo } from "./userInfo.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    like: false,
    id: 1,
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    like: false,
    id: 2,
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    like: false,
    id: 3,
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    like: false,
    id: 4,
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    like: false,
    id: 5,
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
    like: false,
    id: 6,
  },
];

// const cardRenderer = (item) => {
//   const card = new Card(item.name, item.link);
//   return card.generateCard();
// };

// const cardSection = new Section(
//   { items: initialCards, renderer: cardRenderer },
//   document.querySelector("#elements")
// );

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Botones para abrir popups
const editProfileBtn = document.querySelector("#openPopupBtn");
const addCardBtn = document.querySelector("#openAddBtn");

// --- 1. Instancias Globales ---

// 1.1 UserInfo: Maneja los datos del perfil en la página
const userInfo = new Userinfo({
  name_selector: "#profileName",
  about_selector: "#profileAbout"
});

// 1.2 PopupWithImage
const imagePopup = new PopupWithImage("#imagePopup");

// --- 2. Lógica de las Tarjetas (Card y Section) ---

// Función "Factory" para crear una carta.
// La necesitamos en dos lugares: al cargar la página y al añadir una nueva.
function createCard(item) {
  const card = new Card({
    title: item.name,
    link: item.link,
    cardSelector: "#elements-card",
    handleCardClick: cardData => {
      const { title, link } = cardData;
      imagePopup.open(title, link);
    }
  });
  return card.generateCard();
}

// Section: Se encarga de pintar la lista inicial
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);

    // retornamos el card creado
    return cardElement;
  }
    // contenedor de las cards
}, "#elements");

// Pintamos las tarjetas iniciales
cardSection.renderItems();

// --- 3. Popups con Formularios ---

// 3.1 Popup de Editar Perfil
const profilePopup = new PopupWithForm("#Popup", inputValues => {
  console.log(inputValues);
  
  userInfo.setUserInfo({
    name: inputValues.name,
    work: inputValues.about
  });
  profilePopup.close();
});

// Listener para el botón de editar
editProfileBtn.addEventListener("click", () => {
  profilePopup.open();
});

// 3.2 Popup de Añadir Tarjeta
const addCardPopup = new PopupWithForm("#popupPlace", inputValues => {
  console.log(inputValues);
  
  // Creamos la carta usando la info del form
  const newCardElement = createCard({
    name: inputValues.title,
    link: inputValues.link
  });
  
  // La agregamos al contenedor usando Section
  cardSection.addItem(newCardElement);
  
  addCardPopup.close();
});

// Listener para el botón de añadir
addCardBtn.addEventListener("click", () => {
  addFormValidator.resetValidation(); // Para que el botón empiece desactivado
  addCardPopup.open();
});

// --- 4. Validación de Formularios ---

const profileFormValidator = new FormValidator(validationConfig, document.querySelector("#form"));
profileFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, document.querySelector("#formAdd"));
addFormValidator.enableValidation();