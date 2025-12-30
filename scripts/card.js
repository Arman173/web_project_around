import { openImagePopup } from "./utils.js";

export class Card {
  constructor(title, link) {
    this._id = window.crypto.randomUUID();
    this._title = title;
    this._link = link;
    this._like = false;
  }

  _getTemplate() {
    //Esta es la base de lo que vamos a crear (Template HTML)
    const cardTemplate = document
      .getElementById("elements-card")
      .content.cloneNode(true); //aqui lo clona

    return cardTemplate; //ESTÁ REGRESANDO EL CLON DEL TEMPLATE
  }

  generateCard() {
    //Aquí se está copiando la base y se está modificando
    const cardClone = this._getTemplate(); // Este metodo solo tiene la responsabilidad de clonar el template.

    const image = cardClone.querySelector(".elements__photo");
    const cardName = cardClone.querySelector(".elements__name");
    const likeButton = cardClone.querySelector(".elements__button");
    const deleteButton = cardClone.querySelector(".elements__delete");

    cardName.textContent = this._title;
    image.src = this._link;

    image.addEventListener("click", () => {
      this._openImagePopup(cardClone);
    });

    likeButton.addEventListener("click", () => {
      this._like = !this._like;
      likeButton.classList.toggle("elements__button-liked");
    });

    deleteButton.addEventListener("click", (evt) => {
      evt.target.closest(".elements__article").remove();
    });

    return cardClone;
  }

  _openImagePopup() {
    openImagePopup(this._title, this._link);
  }
}
