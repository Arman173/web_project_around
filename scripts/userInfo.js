export class Userinfo {
    constructor(selectors) {
        const { name_selector, work_selector } = selectors;
        this.name_element = document.querySelector(name_selector);
        this.work_element = document.querySelector(work_selector);

        if (!this.name_element || !this.work_element) {
            console.error("Error al obtener algun elemento", this.name_element, this.work_element);
        }
    }

    getUserInfo() {
        return {
            name: this.name_element.textContent,
            work: this.work_element.textContent
        };
    }

    setUserInfo(info) {
        const { name, work } = info;
        this.name_element.textContent = name;
        this.work_element.textContent = work;
    }
}