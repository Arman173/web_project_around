import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        const formData = new FormData(this._form);

        // retornamos un objeto {llave:valor} de los campos del formulario
        return Object.fromEntries(formData);
    }

    setEventListeners() {
        // heredamos el setEventListeners de Popup
        // esto para que ejecute tambien el codigo de la clase padre
        super.setEventListeners();

        this._popupButton = this._popup.querySelector(".popup__button");
        if (!this._popupButton) {
            console.error("Error al obtener el botón del popup", this._popupButton);
        }
        this._textButton = this._popupButton.textContent;

        // obtenemos el formulario del popup
        this._form = this._popup.querySelector(".popup__form");
        if (!this._form) {
            console.error("Error al obtener el formulario", this._form);
        }

        // añadimos la funcionalidad del submit
        this._form.addEventListener("submit", (evt) => {
            // quitamos la recarga de la pagina por defecto
            evt.preventDefault();

            // obtenemos la informacion actual del formulario
            const inputValues = this._getInputValues();

            // hacemos las respectivas verificaciones

            // ejecutamos el callback del submit
            this._handleFormSubmit(inputValues);
        });
    }

    setBtnText(text) {
        if (this._popupButton) {
            this._popupButton.textContent = text;
        }
    }

    close() {
        // ejecutamos tambien lo que tiene la clase padre Popup
        super.close();

        // restablecemos el texto del botón
        this._popupButton.textContent = this._textButton;

        // restablecemos el formulario
        this._form.reset();
    }
}