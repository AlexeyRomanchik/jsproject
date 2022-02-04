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
        modal = document.querySelector(".modal");

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

    modal.addEventListener("click", event => {
        if (event.target === modal || event.target.getAttribute("data-close") === "") {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout((openModel), 500000);

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

    const getData = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not get ${url}, status ${response.status}`);
        }

        return await response.json();
    };

    const createMenu = () => {
        const menuItems = [],
            items = getData("http://localhost:3000/menu").then(items => {
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

    const message = {
        loading: "img/form/spinner.svg",
        sucsess: "Спасибо! Наши специалисты свяжутся с вами в ближайшее время.",
        failure: "Что-то произошло не так..."
    };

    const forms = document.querySelectorAll("form");

    const showPostResultModal = (message) => {
        const prevModalDialog = modal.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        openModel();

        const tanksModal = document.createElement("div");
        tanksModal.classList.add("modal__dialog");
        tanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>`;

        prevModalDialog.parentElement.append(tanksModal);

        setTimeout(() => {
            tanksModal.remove();
            prevModalDialog.classList.remove("hide");
            prevModalDialog.classList.add("show");
            closeModal();
        }, 5000);
    };

    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        if (!response.ok) {
            throw new Error(`Could not get ${url}, status ${response.status}`);
        }

        return await response.json();
    };

    const bindData = (form) => {
        form.addEventListener("submit", event => {
            event.preventDefault();

            const formData = new FormData(event.target),
                statusImage = document.createElement("img"),
                json = JSON.stringify(Object.fromEntries(formData.entries()));

            statusImage.src = message.loading;
            statusImage.style.cssText = `
                display: block;
                margin: 0px auto;
            `;
            form.after(statusImage);

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showPostResultModal(message.sucsess);
                })
                .catch(() => {
                    showPostResultModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    statusImage.remove();
                });
        });
    };

    forms.forEach(form => {
        bindData(form);
    });

    const slides = document.querySelectorAll(".offer__slide"),
        prevButton = document.querySelector(".offer__slider-prev"),
        nextButton = document.querySelector(".offer__slider-next"),
        currentSlide = document.querySelector("#current"),
        totalSlides = document.querySelector("#total"),
        total = slides.length;

    let current = 0;

    const hideElement = (element) => {
        element.classList.remove("show", "fade");
        element.classList.add("hide");
    };

    const showElement = (element) => {
        element.classList.remove("hide");
        element.classList.add("show", "fade");
    };

    const createSlider = function () {
        slides.forEach(slide => {
            hideElement(slide);
        });

        currentSlide.textContent = addZero(current + 1);
        totalSlides.textContent = addZero(total);

        showElement(slides[current]);

        prevButton.onmousedown = prevButton.onselectstart =
            nextButton.onmousedown = prevButton.onselectstart = function () {
                return false;
            };
    }();

    prevButton.addEventListener("click", event => {
        hideElement(slides[current]);

        if (--current < 0) {
            current = total - 1;
        }

        showElement(slides[current]);
        currentSlide.textContent = addZero(current + 1);
    });

    nextButton.addEventListener("click", event => {
        hideElement(slides[current]);

        if (++current >= total) {
            current = 0;
        }

        showElement(slides[current]);
        currentSlide.textContent = addZero(current + 1);
    });
});