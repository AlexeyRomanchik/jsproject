export const openModel = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
};

export const closeModal = (modalSelector) => {
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

export default modal;