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
    const modalTimerId = setTimeout(() =>openModel(".modal"), 500000);

    tabs();
    timer();
    cards();
    modal(".modal", modalTimerId);
    forms(".modal");
    slider();
    calc();
});