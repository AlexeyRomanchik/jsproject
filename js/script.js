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
});