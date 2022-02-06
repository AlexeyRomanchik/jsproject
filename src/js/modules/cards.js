import getData from "../services/getData";

function cards() {
    class Image {
        constructor(url, alt) {
            this.url = url;
            this.alt = alt;
        }
    }

    class Price {
        constructor(total, currency) {
            this.total = total;
            this.currency = currency;
        }
    }

    class Description {
        constructor(title, text) {
            this.title = title;
            this.text = text;
        }
    }

    class MenuItem {
        constructor(description, image, price) {
            this.description = description;
            this.image = image;
            this.price = price;
        }

        render() {
            return (
                `<div class="menu__item">
                <img src="${this.image.url}" alt="${this.image.alt}}">
                <h3 class="menu__item-subtitle">${this.description.title}</h3>
                <div class="menu__item-descr">${this.description.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total">
                        <span>${this.price.total}</span> ${this.price.currency}
                    </div>
                </div>
            </div>`);
        }
    }

    class Menu {
        constructor(title, menuItems) {
            this.title = title;
            this.menuItems = menuItems;
        }

        render() {
            let items = "";
            this.menuItems.forEach(menuItem => {
                items += menuItem.render();
            });

            return (
                `<div class="menu">
                <h2 class="title">${this.title}</h2>
                <div class="menu__field">
                    <div class="container">
                            ${items}
                        </div>
                    </div>
                </div>
            </div>`);
        }
    }

    const createMenu = () => {
        const menuItems = [];
        
        getData("http://localhost:3000/menu").then(items => {
            items.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                menuItems.push(new MenuItem(
                    new Description(title, descr),
                    new Image(img, altimg),
                    new Price(price, "$/день")
                ));
            });

            const menuContainer = document.querySelector(".menu-container"),
                menu = new Menu("Наше меню на день", menuItems);

            menuContainer.innerHTML = menu.render();
        });
    };

    createMenu();
}

export default cards;