import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".popup__form");
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

    close() {
        // ejecutamos tambien lo que tiene la clase padre Popup
        super.close();

        // restablecemos el formulario
        this._form.reset();
    }
}