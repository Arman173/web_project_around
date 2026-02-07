export class Card {
  /**
   * Registra un usuario.
   * @param {Object} config_card objeto de configuracion del Card
   * @param {string} config_card.title Titulo del Card
   * @param {string} config_card.link Link del Card
   * @param {string} config_card.cardSelector Selector del Card
   * @param {callback} config_card.handleCardClick Funcion de callback para el click
 */
  constructor(config_card) {
    const { title, link, cardSelector, handleCardClick } = config_card;
    this._id = window.crypto.randomUUID();
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._like = false;
  }

  _getTemplate() {
    //Esta es la base de lo que vamos a crear (Template HTML)
    const cardTemplate = document
      .querySelector(this._cardSelector) // buscamos el elemento mediante el selector pasado por parametro
      .content
      .querySelector(".elements__article")
      .cloneNode(true); // clonamos

    return cardTemplate; // regresamos el clon
  }

  generateCard() {
    // obtenemos un clon del template
    this._element = this._getTemplate(); // Este metodo solo tiene la responsabilidad de clonar el template.

    const image = this._element.querySelector(".elements__photo");
    const cardName = this._element.querySelector(".elements__name");
    const likeButton = this._element.querySelector(".elements__button");
    const deleteButton = this._element.querySelector(".elements__delete");

    cardName.textContent = this._title;
    image.src = this._link;
    image.alt = this._title;

    // Acoplamiento debil
    image.addEventListener("click", () => {
      this._handleCardClick({
        title: this._title,
        link:  this._link
      });
    });

    likeButton.addEventListener("click", () => {
      this._like = !this._like;
      likeButton.classList.toggle("elements__button-liked");
    });

    deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    return this._element;
  }

}
