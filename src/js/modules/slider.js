import addZero from "../services/addZero";

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

        totalSlides.textContent = addZero(total);
        currentSlide.textContent = addZero(current + 1);

        prevButton.onmousedown = prevButton.onselectstart =
            nextButton.onmousedown = prevButton.onselectstart = function () {
                return false;
            };
    }();

    const changeSliderIndicator = () => {
        sliderInner.style.transform = `translateX(-${offset}px)`;
        currentSlide.textContent = addZero(current + 1);

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

export default slider;