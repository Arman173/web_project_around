import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
  constructor(selector){
    super(selector)
    // 1. Los buscamos SOLO UNA VEZ y los guardamos como propiedad de la clase
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__name");
  }

  open(name, src) {

    this._image.src = src;
    this._image.alt = name || "Imagen ampliada";
    this._caption.textContent = name;

    super.open();
  }
}