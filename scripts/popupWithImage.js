import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
  constructor(selector){
    super(selector)
  }

  open(name, src) {
    const imagePopupImage = this._popup.querySelector(".popup__image");
    const imagePopupName = this._popup.querySelector(".popup__name");

    imagePopupImage.src = src;
    imagePopupImage.alt = name || "Imagen ampliada";
    imagePopupName.textContent = name;

    super.open();
  }
}