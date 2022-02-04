'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabcontent"),
        tabHeaderItemsParent = document.querySelector(".tabheader__items"),
        tabHeaderItems = tabHeaderItemsParent.querySelectorAll(".tabheader__item");

    tabHeaderItemsParent.addEventListener("click", event => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabHeaderItems.forEach((item, i) => {
                if (item == target) {
                    hideTabs();
                    showTab(i);
                }
            });
        }
    });

    const hideTabs = () => {
        tabs.forEach(item => {
            item.classList.remove("show", "fade");
            item.classList.add("hide");
        });

        tabHeaderItems.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    };

    const showTab = (i = 0) => {
        tabs[i].classList.remove("hide");
        tabs[i].classList.add("show", "fade");
        tabHeaderItems[i].classList.add("tabheader__item_active");
    };

    hideTabs();
    showTab();


    const deadLine = '2022-02-15',
        timer = document.querySelector(".timer");

    const getInterval = (endTime) => {
        const total = Date.parse(endTime) - Date.now(),
            days = Math.floor(total / 1000 / 60 / 60 / 24),
            hours = Math.floor(total / 1000 / 60 / 60 % 24),
            minutes = Math.floor(total / 1000 / 60 % 60),
            seconds = Math.floor(total / 1000 % 60);

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    };

    const addZero = (num) => {
        return (num >= 0 && num < 10) ? `0${num}` : num;
    };

    const renderTimer = (endTime, timerElement) => {
        const days = timerElement.querySelector("#days"),
            hours = timerElement.querySelector("#hours"),
            minutes = timerElement.querySelector("#minutes"),
            seconds = timerElement.querySelector("#seconds"),
            intervalId = setInterval(changeTimer, 1000);

        changeTimer();

        function changeTimer() {
            const interval = getInterval(endTime);

            days.textContent = addZero(interval.days);
            hours.textContent = addZero(interval.hours);
            minutes.textContent = addZero(interval.minutes);
            seconds.textContent = addZero(interval.seconds);

            if (interval.total <= 0) {
                clearInterval(intervalId);
            }
        }
    };

    renderTimer(deadLine, timer);

    const modalButtons = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        closeButton = modal.querySelector(".modal__close");

    const openModel = () => {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    };

    const closeModal = () => {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    };

    modalButtons.forEach(modalButton => {
        modalButton.addEventListener("click", openModel);
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout((openModel), 5000);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1) {
            openModel();
            window.removeEventListener("scroll", showModalByScroll);
        }
    };

    window.addEventListener("scroll", showModalByScroll);

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

    const vegyImg = new Image("img/tabs/vegy.jpg", "vegy"),
        eliteImg = new Image("img/tabs/elite.jpg", "elite"),
        postImg = new Image("img/tabs/post.jpg", "post");

    const vegyPrice = new Price(229, "$/день"),
        elitePrice = new Price(550, "$/день"),
        postPrice = new Price(430, "$/день");

    const vegyDescription = new Description("Меню 'Фитнес'", `Меню "Фитнес" - 
        это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
        Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой
        и высоким качеством!`),
        eliteDescription = new Description("Меню 'Премиум'", `В меню “Премиум” мы используем
        не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба,
        морепродукты, фрукты - ресторанное меню без похода в ресторан!`),
        postDescription = new Description('Меню "Постное"', `Меню “Постное” - это тщательный
        подбор ингредиентов: полное отсутствие продуктов животного происхождения,
        молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет 
        тофу и импортных вегетарианских стейков.`);

    const veguMenuItem = new MenuItem(vegyDescription, vegyImg, vegyPrice),
        eliteMenuItem = new MenuItem(eliteDescription, eliteImg, elitePrice),
        postMenuItem = new MenuItem(postDescription, postImg, postPrice);

    const menuItems = [veguMenuItem, eliteMenuItem, postMenuItem],
        menu = new Menu("Наше меню на день", menuItems);


    const menuContainer = document.querySelector(".menu-container");
    menuContainer.innerHTML = menu.render();

    const forms = document.querySelectorAll("form");

    const postData = (form) => {
        form.addEventListener("submit", event => {
            event.preventDefault();

            const request = new XMLHttpRequest(),
                formData = new FormData(event.target),
                data = {};

            formData.forEach((value, key) => {
                data[key] = value;
            });

            request.open("POST", "server.php");
            request.setRequestHeader("Content-type", "application/json");
            request.send(JSON.stringify(data));

            request.addEventListener("load", event => {
                if (request.status === 200) {
                    console.log(request.response);
                    form.reset();
                }
            });
        });
    };


    forms.forEach(form => {
        postData(form);
    });



});