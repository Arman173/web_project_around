import { Popup } from "./popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(selector, handleButtonClick) {
        super(selector);
        this._handleButtonClick = handleButtonClick;
    }

    setEventListeners() {
        super.setEventListeners();

        this._confirmButton = this._popup.querySelector(".popup__button");
        if (!this._confirmButton) {
            console.error("Error al obtener el botón de confirmación", this._confirmButton);
        }
        this._textButton = this._confirmButton.textContent;

        // agregamos el evento click al botón de confirmación
        this._confirmButton.addEventListener("click", (evt) => {
            // ejecutamos el callback del botón de confirmación
            this._handleButtonClick();
        });
    }

    setBtnText(text) {
        if (this._confirmButton) {
            this._confirmButton.textContent = text;
        }
    }

    close() {
        // ejecutamos tambien lo que tiene la clase padre Popup
        super.close();

        // restablecemos el texto del botón
        this._confirmButton.textContent = this._textButton;
    }
}