export class Section {
  constructor({ items, renderer }, container) {
    this._items = items;          // lista de la informacion a mostrar
    this._renderer = renderer;    // funcion de renderizado
    this._container = document.querySelector(container);  // contenedor de los elementos a renderizar

    // función que renderizará los elementos de nuestros items
    // con respecto a la funcion de renderizado y colocandolos
    // dentro de nuestro contenedor
    this.renderItems();
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
