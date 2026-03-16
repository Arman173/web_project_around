class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(
      //El Array.from convierte un iterable en un array
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  // Para mostrar error de input
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
  }

  // Para ocultar error de input
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
  }

  // Para verificar la validez de un campo
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Para verificar si hay algún input inválido
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      //some devuelte true si cualquier elemento del array es true
      return !inputElement.validity.valid;
    });
  }

  // Para cambiar el estado del botón submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "");
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  // Para agregar event listeners a los inputs
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("change", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // ES UN MÈTODO PÚBLICO para activar la validación
  enableValidation() {
    this._setEventListeners();
  }

  // Método público para resetear validaciones
  resetValidation() {
    // Quita errores de todos los inputs
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    // Resetea el estado del botón
    this._toggleButtonState();
  }
}

export { FormValidator };
