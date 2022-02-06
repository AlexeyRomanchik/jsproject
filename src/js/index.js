'use strict';

import tabs from "./modules/tabs";
import timer from "./modules/timer";
import cards from "./modules/cards";
import modal from "./modules/modal";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calc from "./modules/calc";
import openModel from "./modules/modal";

document.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => openModel(".modal"), 500000);

    tabs(".tabcontent", ".tabheader__items", ".tabheader__item", "tabheader__item_active");
    timer("2022-02-15", ".timer");
    cards();
    modal(".modal", modalTimerId);
    forms("form", ".modal");
    slider({
        sliderSelector: ".offer__slider",
        sliderWrapperSelector: ".offer__slider-wrapper",
        sliderInnerSelector: ".offer_slider-inner",
        slidesSelector: ".offer__slide",
        prevButtonSelector: ".offer__slider-prev",
        nextButtonSelector: ".offer__slider-next",
        currentSlideSelector: "#current",
        totalSlidesSelector: "#total"
    });
    calc();
});