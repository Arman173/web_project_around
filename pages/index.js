import { Card, updateBtnLike } from "../components/card.js";
import { FormValidator } from "../components/formValidator.js";
import { Section } from "../components/section.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { PopupWithConfirmation } from "../components/popupWithConfirmation.js";
import { Userinfo } from "../components/userInfo.js";
import { Api } from "../components/Api.js";

// const initialCards = [
//   {
//     name: "Valle de Yosemite",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
//     like: false,
//     id: 1,
//   },
//   {
//     name: "Lago Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
//     like: false,
//     id: 2,
//   },
//   {
//     name: "Montañas Calvas",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
//     like: false,
//     id: 3,
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
//     like: false,
//     id: 4,
//   },
//   {
//     name: "Parque Nacional de la Vanoise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
//     like: false,
//     id: 5,
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
//     like: false,
//     id: 6,
//   },
// ];
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "270223bd-c9b7-4c65-8b92-afc11ab42b37",
    "Content-Type": "application/json",
  },
});

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
const profilePhoto = document.querySelector("#profileAvatarContainer");
// imagen de perfil
const profilePhotoImg = document.querySelector(".profile__photo");

// --- 1. Instancias Globales ---

// 1.1 UserInfo: Maneja los datos del perfil en la página
const userInfo = new Userinfo({
  name_selector: "#profileName",
  about_selector: "#profileAbout"
});

api.getUserInfo()
  .then(userData => {
    console.log("Datos del usuario:", userData);
    profilePhotoImg.src = userData.avatar;
    userInfo.setUserInfo({
      name: userData.name,
      work: userData.about
    });
  });

// 1.2 PopupWithImage
const imagePopup = new PopupWithImage("#imagePopup");
// 1.3 PopupWithConfirmation para confirmar el delete de cards
let cardToDelete = null; // Variable para almacenar la tarjeta a eliminar
const confirmPopup = new PopupWithConfirmation("#PopupConfirm", () => {
  console.log("Botón de confirmación clickeado");
  api.deleteCard(cardToDelete._id)
    .then(() => {
      console.log("Tarjeta eliminada exitosamente");
      cardToDelete.removeCard();
      confirmPopup.close();
    })
    .catch(err => {
      console.error("Error al eliminar la tarjeta:", err);
    });
});

// --- 2. Lógica de las Tarjetas (Card y Section) ---

// Función "Factory" para crear una carta.
// La necesitamos en dos lugares: al cargar la página y al añadir una nueva.
function createCard(item) {
  const card = new Card({
    cardData: item,
    cardSelector: "#elements-card",
    handles: {
      handleCardClick: cardData => {
        const { title, link } = cardData;
        imagePopup.open(title, link);
      },
      handleLike: (cardData, likeButton) => {
        console.log("Estado actual del like:", cardData, likeButton);
        api.likeCard(cardData._id, cardData._like)
          .then(() => {
            console.log("Like actualizado en el servidor");
            updateBtnLike(cardData._like, likeButton);
          })
          .catch(err => {
            console.error("Error al actualizar el like:", err);
          });
      },
      handleDelete: card => {
        console.log("Tarjeta a eliminar:", card);
        cardToDelete = card; // Guardamos la tarjeta a eliminar
        confirmPopup.open();
        // api.deleteCard(card._id)
        //   .then(() => {
        //     console.log("Tarjeta eliminada exitosamente");
        //     card.removeCard();
        //     confirmPopup.close();
        //   })
        //   .catch(err => {
        //     console.error("Error al eliminar la tarjeta:", err);
        //   });
      }
    }
  });
  return card.generateCard();
}

// Section: Se encarga de pintar la lista inicial
const cardSection = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item);

    // retornamos el card creado
    return cardElement;
  }
    // contenedor de las cards
}, "#elements");

// Cargamos las cards iniciales desde la API
api.getInitialCards()
  .then(initialCards => {
    console.log("Tarjetas iniciales:", initialCards);
    cardSection.assignItems(initialCards);
    cardSection.renderItems();
  });

// --- 3. Popups con Formularios ---

// 3.1 Popup de Editar Perfil
const profilePopup = new PopupWithForm("#Popup", inputValues => {
  console.log(inputValues);
  const { name, about } = inputValues;

  api.updateUserInfo({name, about})
    .then(res => {
      console.log("Respuesta de actualización:", res);
      userInfo.setUserInfo({
        name: res.name,
        work: res.about
      });
    })
    .catch(err => {
      console.error("Error al actualizar el perfil:", err);
    })
    .finally(() => {
      console.log("Proceso de actualización finalizado");
      profilePopup.close();
    });
});

// 3.2 Popup de Editar Foto de Perfil
const profilePhotoPopup = new PopupWithForm("#PopupAvatar", inputValues => {
  console.log(inputValues);
  const { avatar } = inputValues;
  api.updateProfilePicture(avatar)
    .then(res => {
      console.log("Respuesta de actualización de avatar:", res);
      profilePhotoImg.src = res.avatar;
    })
    .catch(err => {
      console.error("Error al actualizar el avatar:", err);
    })
    .finally(() => {
      console.log("Proceso de actualización de avatar finalizado");
      profilePhotoPopup.close();
    });
});

// Listener para el botón de editar
editProfileBtn.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  profilePopup.open();
});

// Listener para el click en la foto de perfil
profilePhoto.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  profilePhotoPopup.open();
});

// 3.2 Popup de Añadir Tarjeta
const addCardPopup = new PopupWithForm("#popupPlace", inputValues => {
  console.log(inputValues);
  const { title, link } = inputValues;

  api.addCard({ name: title, link })
    .then(newCardData => {
      console.log("Tarjeta añadida:", newCardData);
      const { name, link } = newCardData;

      // Creamos la carta usando la info de la respuesta de la API
      const newCardElement = createCard({name, link});

      // La agregamos al contenedor usando Section
      cardSection.addItem(newCardElement);
    })
    .catch(err => {
      console.error("Error al añadir la tarjeta:", err);
    })
    .finally(() => {
      console.log("Proceso de añadir tarjeta finalizado");
      addCardPopup.close();
    });
});

// Listener para el botón de añadir
addCardBtn.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});

// --- 4. Validación de Formularios ---

const profileFormValidator = new FormValidator(validationConfig, document.querySelector("#form"));
profileFormValidator.enableValidation();

const profilePhotoFormValidator = new FormValidator(validationConfig, document.querySelector("#avatarForm"));
profilePhotoFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, document.querySelector("#formAdd"));
addFormValidator.enableValidation();