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

export default calc;