/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector(".calculating span");

    let sex, height, weight, age, actCoff;

    const setDefaultValues = () => {
        if (localStorage.getItem("sex")) {
            sex = localStorage.getItem("sex");
        } else {
            sex = "female";
            localStorage.setItem("sex", "female");
        }

        if (localStorage.getItem("actCoff")) {
            actCoff = localStorage.getItem("actCoff");
        } else {
            actCoff = 1.375;
            localStorage.setItem("actCoff", 1.375);
        }
    };

    const setActiveClass = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);

            if (actCoff == element.getAttribute("data-act-coff")) {
                element.classList.add(activeClass);
            }
            if (sex == element.getAttribute("id")) {
                element.classList.add(activeClass);
            }
        });
    };

    const calсCalories = () => {
        if (sex && height && weight && age && actCoff) {
            if (sex === "male") {
                result.textContent = Math.round(
                    (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * actCoff);
            } else {
                result.textContent = Math.round(
                    (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * actCoff);
            }
        } else {
            result.textContent = "____";
        }
    };

    const getStaticInformation = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener("click", event => {
                if (event.target.getAttribute("data-act-coff")) {
                    actCoff = +event.target.getAttribute("data-act-coff");
                    localStorage.setItem("actCoff", +event.target.getAttribute("data-act-coff"));
                } else {
                    sex = event.target.getAttribute("id");
                    localStorage.setItem("sex", event.target.getAttribute("id"));
                }

                elements.forEach(element => element.classList.remove(activeClass));
                element.classList.add(activeClass);

                calсCalories();
            });
        });
    };

    const getInputInformation = (selector) => {

        const input = document.querySelector(selector);

        input.addEventListener("input", event => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            switch (input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calсCalories();
        });
    };

    setDefaultValues();

    setActiveClass("#gender div", "calculating__choose-item_active");
    setActiveClass(".calculating__choose_big div", "calculating__choose-item_active");

    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

    getInputInformation("#height");
    getInputInformation("#weight");
    getInputInformation("#age");

    calсCalories();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_getData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/getData */ "./src/js/services/getData.js");


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
        const menuItems = [],
            items = (0,_services_getData__WEBPACK_IMPORTED_MODULE_0__["default"])("http://localhost:3000/menu").then(items => {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_postData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/postData */ "./src/js/services/postData.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");



function forms(modalSelector) {
    const message = {
        loading: "img/form/spinner.svg",
        sucsess: "Спасибо! Наши специалисты свяжутся с вами в ближайшее время.",
        failure: "Что-то произошло не так..."
    };

    const forms = document.querySelectorAll("form");

    const showPostResultModal = (message) => {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_1__.openModel)(modalSelector);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.closeModal)(modalSelector);
        }, 5000);
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

            (0,_services_postData__WEBPACK_IMPORTED_MODULE_0__["default"])("http://localhost:3000/requests", json)
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openModel": () => (/* binding */ openModel),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const openModel = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
};

const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
};

function modal(modalSelector, modalTimerId) {
    const modalButtons = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(modalSelector);

    modalButtons.forEach(modalButton => {
        modalButton.addEventListener("click", () => openModel(modalSelector, modalTimerId));
    });

    modal.addEventListener("click", event => {
        if (event.target === modal || event.target.getAttribute("data-close") === "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", event => {
        if (event.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1) {
            openModel(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    };

    window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_addZero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/addZero */ "./src/js/services/addZero.js");


function slider() {
    const slider = document.querySelector(".offer__slider"),
        sliderWrapper = slider.querySelector(".offer__slider-wrapper"),
        sliderInner = sliderWrapper.querySelector(".offer_slider-inner"),
        slides = sliderInner.querySelectorAll(".offer__slide"),
        prevButton = slider.querySelector(".offer__slider-prev"),
        nextButton = slider.querySelector(".offer__slider-next"),
        currentSlide = slider.querySelector("#current"),
        totalSlides = slider.querySelector("#total"),
        width = window.getComputedStyle(sliderWrapper).width,
        total = slides.length,
        dots = [];

    let current = 0,
        offset = 0;

    const createSlider = function () {
        slides.forEach(slider => slider.style.width = width);

        slider.style.position = "relative";

        const indicators = document.createElement("ol");
        indicators.classList.add("carousel-indicators");
        slider.append(indicators);

        for (let i = 0; i < total; i++) {
            const dot = document.createElement("li");
            dot.setAttribute("data-slide-to", i);
            dot.classList.add("dot");

            if (i == 0) {
                dot.style.opacity = 1;
            }

            indicators.append(dot);
            dots.push(dot);
        }

        sliderInner.style.width = 100 * total + "%";
        sliderInner.style.display = "flex";
        sliderInner.style.transition = "0.5s all";
        sliderWrapper.style.overflow = "hidden";

        totalSlides.textContent = (0,_services_addZero__WEBPACK_IMPORTED_MODULE_0__["default"])(total);
        currentSlide.textContent = (0,_services_addZero__WEBPACK_IMPORTED_MODULE_0__["default"])(current + 1);

        prevButton.onmousedown = prevButton.onselectstart =
            nextButton.onmousedown = prevButton.onselectstart = function () {
                return false;
            };
    }();

    const changeSliderIndicator = () => {
        sliderInner.style.transform = `translateX(-${offset}px)`;
        currentSlide.textContent = (0,_services_addZero__WEBPACK_IMPORTED_MODULE_0__["default"])(current + 1);

        dots.forEach(dot => dot.style.opacity = 0.5);
        dots[current].style.opacity = 1;
    };

    nextButton.addEventListener("click", event => {
        if (offset == +width.replace(/\D/g, "") * (total - 1)) {
            offset = 0;
            current = 0;
        } else {
            offset += +width.replace(/\D/g, "");
            current++;
        }

        changeSliderIndicator();
    });

    prevButton.addEventListener("click", event => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, "") * (total - 1);
            current = total - 1;
        } else {
            offset -= +width.replace(/\D/g, "");
            current--;
        }

        changeSliderIndicator();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", event => {
            const slideTo = event.target.getAttribute("data-slide-to");

            current = +slideTo;
            offset = +width.replace(/\D/g, "") * (slideTo);

            sliderInner.style.transform = `translateX(-${offset}px)`;
            changeSliderIndicator();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/addZero.js":
/*!************************************!*\
  !*** ./src/js/services/addZero.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function addZero(num) {
    return (num >= 0 && num < 10) ? `0${num}` : num;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addZero);

/***/ }),

/***/ "./src/js/services/getData.js":
/*!************************************!*\
  !*** ./src/js/services/getData.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
async function getData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Could not get ${url}, status ${response.status}`);
    }

    return await response.json();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getData);

/***/ }),

/***/ "./src/js/services/postData.js":
/*!*************************************!*\
  !*** ./src/js/services/postData.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
async function postData(url, data) {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postData);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");











document.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() =>(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])(".modal"), 500000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])(".modal", modalTimerId);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])(".modal");
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map