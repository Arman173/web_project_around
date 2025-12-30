export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      throw new Error(`Popup element not found: ${popupSelector}`);
    }
    this._closeButton = this._popup.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this); //Ver si es necesario
    this._overlay = this._popup.querySelector(".popup__overlay");
    this.setEventListeners();
  }
  
  open() {
    this._popup.classList.add("popup__open");
    document.addEventListener("keydown", this._handleEscClose);
  }
  
  close() {
    this._popup.classList.remove("popup__open");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup__open") || evt.target === this._overlay) {
        this.close();
      }
    });
  }
}