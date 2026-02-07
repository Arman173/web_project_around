export class Userinfo {
    constructor(selectors) {
        const { name_selector, about_selector } = selectors;
        this.name_element = document.querySelector(name_selector);
        this.about_element = document.querySelector(about_selector);

        if (!this.name_element || !this.about_element) {
            console.error("Error al obtener algun elemento", this.name_element, this.about_element);
        }
    }

    getUserInfo() {
        return {
            name: this.name_element.textContent,
            work: this.about_element.textContent
        };
    }

    setUserInfo(info) {
        const { name, work } = info;
        this.name_element.textContent = name;
        this.about_element.textContent = work;
    }
}