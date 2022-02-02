'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabcontent"),
        tabHeaderItemsParent = document.querySelector(".tabheader__items"),
        tabHeaderItems = tabHeaderItemsParent.querySelectorAll(".tabheader__item");

    tabHeaderItemsParent.addEventListener("click", event => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabHeaderItems.forEach((item, i) => {
                if(item == target){
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
});